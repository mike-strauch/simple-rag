
from pinecone import Pinecone
from core.config import settings
from schemas.search import Search
import tiktoken

EMBEDDING_MODEL = "text-embedding-ada-002"

# TODO: maybe rename eventually
class SearchService:
    def __init__(self):
        self.client = Pinecone(api_key=settings.pinecone_api_key)
        self.index = self.client.Index(settings.pinecone_index)

    def add_document(self, content: str, document_id: str):
        if not content:
            return

        content_chunks = self._chunk_text(content)
        embeddings = self._generate_embeddings(content_chunks)
        vectors = [
            {
                "id": f"fragment-{i}",
                "values": embedding.values,
                "metadata": {
                    "text": content_chunk,
                    "original_doc": document_id
                }
            }
            for i, (content_chunk, embedding) in enumerate(zip(content_chunks, embeddings.data))
        ]

        self.index.upsert(vectors)


    def find_similar_documents(self, search: Search):
        if not search.prompt:
            raise Exception("No prompt specified")

        prompt_as_embedding = self._generate_embeddings([search.prompt])
        #TODO: Finish searching
        #self.index.search()
        return ['doc1', 'doc2']


    def _generate_embeddings(self, content_chunks: list[str]):
        embeddings = self.client.inference.embed(
            model="llama-text-embed-v2",
            inputs=content_chunks,
            parameters={"input_type": "passage", "truncate": "END"}
        )
        return embeddings


    def _chunk_text(self, content: str):
        chunk_size = 800
        overlap = 100
        enc = tiktoken.encoding_for_model(EMBEDDING_MODEL)
        tokens = enc.encode(content)

        chunks = []
        start = 0
        while start < len(tokens):
            end = start + chunk_size
            chunk = tokens[start:end]
            decoded = enc.decode(chunk)
            chunks.append(decoded)
            start += chunk_size - overlap

        return chunks
