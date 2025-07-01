
from pinecone import Pinecone
from core.config import settings
from schemas.search import Search


# TODO: maybe rename eventually
class SearchService:
    def __init__(self):
        self.pinecone_client = Pinecone(api_key=settings.pinecone_api_key, environment=settings.pinecone_environment)
        self.pinecone_index = self.pinecone_client.Index(settings.pinecone_index)

    def add_document(self, content: str, document_id: str):
        if not content:
            return

        content_chunks = self._chunk_text(content)
        embeddings = self._generate_embeddings(content_chunks, document_id)
        vectors = [
            {
                "id": f"fragment-{i}",
                "values": embedding,
                "metadata": {
                    "text": doc,
                    "original_doc": document_id
                }
            }
            for i, (doc, embedding) in enumerate(zip(content_chunks, embeddings))
        ]

        self.pinecone_index.upsert(vectors)

    def find_similar_documents(self, search: Search):
        return

    def _generate_embeddings(self, content_chunks: str, document_id: str):
        response = self.pinecone_client.embeddings.create(
            model="text-embedding-ada-002",
            input=[content_chunks]
        )
        return response

    def _chunk_text(self, content: str):
        return content
