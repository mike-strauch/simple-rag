

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    pinecone_api_key: str
    pinecone_environment: str
    pinecone_index: str

    class Config:
        env_file = ".env"

settings = Settings()