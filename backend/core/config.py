

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    pinecone_api_key: str
    pinecone_index: str
    open_ai_api_key: str

    class Config:
        env_file = ".env"

settings = Settings()