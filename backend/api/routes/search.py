
from fastapi import APIRouter, HTTPException
from schemas.search import Search
from services.llm_service import LLMService
from services.search_service import SearchService

router = APIRouter(prefix="/api/search", tags=["Search"])

def init_search_routes(llm_service: LLMService, search_service: SearchService):
    @router.post('/')
    def create_search(search: Search):
        if not search.prompt:
            raise HTTPException(status_code=400, detail="Prompt must not be empty.")

        similar_documents = search_service.find_similar_documents(search)
        if not similar_documents or not similar_documents.matches:
            return {'success': False, 'message': 'No relevant documents found'}

        high_match_docs = sorted(similar_documents.matches, key=lambda doc: doc.score, reverse=True)[:2]
        if not high_match_docs:
            return {'success': False, 'message': 'No documents with high enough relevance found'}

        high_match_content_chunks = [doc.metadata['text'] for doc in high_match_docs]
        response = llm_service.generate_response(search.prompt, high_match_content_chunks)
        return {'success': True, 'llm_response': response}

    return router