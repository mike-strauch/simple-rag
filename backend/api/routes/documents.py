from fastapi import APIRouter
from schemas.document import Document
from services.search_service import SearchService
import random

router = APIRouter(prefix="/api/documents", tags=["Documents"])

def init_document_routes(search_service: SearchService):
    @router.get('/:id')
    def get_document():
        return {'doc': 'some doc'}

    @router.get('/')
    def get_documents():
        return {'success': True, 'documents': search_service.get_documents()}

    @router.post('/')
    def add_document(document: Document):
        try:
            #TODO: Document id should be more meaningful
            search_service.add_document(document.content, str(random.randint(1, 1000)))
        except Exception as e:
            return {'success': False, 'message': f'error adding document: {e}'}

        return {'success': True}

    return router