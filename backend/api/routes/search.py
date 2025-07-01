from fastapi import APIRouter
from schemas.search import Search

router = APIRouter(prefix="/api/search", tags=["Search"])

@router.post('/')
def create_search(search: Search):
    return {'prompt':search.prompt}