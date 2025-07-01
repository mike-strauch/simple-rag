# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import search, documents
from services.llm_service import LLMService
from services.search_service import SearchService


search_service = SearchService()
llm_service = LLMService()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

document_router = documents.init_document_routes(search_service)
search_router = search.init_search_routes(llm_service, search_service)
app.include_router(search_router)
app.include_router(document_router)

@app.get("/api/hello")
def read_root():
    return {"message": "Hello from FastAPI!"}