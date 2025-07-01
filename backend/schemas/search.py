from pydantic import BaseModel

class Search(BaseModel):
    prompt: str