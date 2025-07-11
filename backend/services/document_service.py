
from pinecone import Pinecone
from core.config import settings
from schemas.search import Search
from transformers import AutoTokenizer
import random

EMBEDDING_MODEL = "llama-text-embed-v2"
MODEL_DIMENSONS = 1024

# so we're not hitting pinecone all the time to get document list
document_cache = []

# TODO: maybe rename eventually
class DocumentService:
    def __init__(self):
        self.client = Pinecone(api_key=settings.pinecone_api_key)
        self.index = self.client.Index(settings.pinecone_index)
        self.tokenizer = AutoTokenizer.from_pretrained("NousResearch/Llama-2-7b-hf")


    def add_document(self, content: str, document_id: str):
        if not content:
            return

        content_chunks = self._chunk_text(content)
        embeddings = self._generate_embeddings(content_chunks)
        vectors = [
            {
                "id": f"fragment-{i * random.randint(1, 10000)}",
                "values": embedding.values,
                "metadata": {
                    "text": content_chunk,
                    "original_doc": document_id
                }
            }
            for i, (content_chunk, embedding) in enumerate(zip(content_chunks, embeddings.data))
        ]

        self.index.upsert(vectors)
        global document_cache
        document_cache = []

    def get_document(self, doc_id: str):
        global document_cache
        matching_document = next((doc for doc in document_cache if doc.id == doc_id), None)
        if matching_document:
            return matching_document

        results = self.index.fetch(ids=[doc_id])
        return results.vectors[doc_id]

    def get_documents(self):
        global document_cache
        if document_cache:
            return document_cache

        results = self.index.query(
            vector=[0.0] * MODEL_DIMENSONS,
            top_k=100,
            include_metadata=True
        )

        document_cache = [match for match in results.matches]
        return document_cache


    def find_similar_documents(self, search: Search):
        if not search.prompt:
            raise Exception("No prompt specified")

        prompt_as_embedding = self._generate_embeddings([search.prompt])[0]
        results = self.index.query(
            vector=prompt_as_embedding.values,
            top_k=5,
            include_metadata=True
        )

        return results


    def _generate_embeddings(self, content_chunks: list[str]):
        embeddings = self.client.inference.embed(
            model=EMBEDDING_MODEL,
            inputs=content_chunks,
            parameters={"input_type": "passage", "truncate": "END"}
        )
        return embeddings


    def _chunk_text(self, content: str):
        chunk_size = 512
        overlap = 50
        tokens = self.tokenizer.encode(content, add_special_tokens=False)

        chunks = []
        for i in range(0, len(tokens), chunk_size - overlap):
            chunk_tokens = tokens[i:i + chunk_size]
            chunk_text = self.tokenizer.decode(chunk_tokens)
            chunks.append(chunk_text)

        return chunks