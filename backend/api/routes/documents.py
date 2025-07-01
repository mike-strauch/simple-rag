from fastapi import APIRouter
from schemas.document import Document

router = APIRouter(prefix="/api/documents", tags=["Documents"])

@router.get('/')
def get_document():
    return {'doc': 'some doc'}

@router.post('/')
def add_document(document: Document):
    return {'success': True}