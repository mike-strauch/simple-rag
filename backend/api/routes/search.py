
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
        if not similar_documents:
            return {'success': True, 'message': 'No relevant documents found'}

        #TODO: need to convert document objects to strings?
        response = llm_service.generate_response(search.promp, similar_documents)
        return {'success': True, 'message': response}

    return router