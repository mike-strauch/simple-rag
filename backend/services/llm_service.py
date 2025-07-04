from typing import cast

from openai import OpenAI
from openai.types.chat import ChatCompletionMessageParam
from core.config import settings


class LLMService:

    def __init__(self):
        self.open_ai_client = OpenAI(api_key=settings.open_ai_api_key)


    def generate_response(self, prompt: str, relevant_snippets: list[str]):
        indexed_docs = [f"Document {i}:\n {snippet}\n\n" for i, snippet in enumerate(relevant_snippets)]
        combined_docs = "".join(indexed_docs)
        prompt_with_docs = combined_docs + '\n' + prompt

        messages: list[ChatCompletionMessageParam] = cast(list[ChatCompletionMessageParam], [
            {"role": "system", "content": "Answer the prompt using the provided documents as source material but don't reference the fact that the documents exist just use them as guiding information. If the documents do not contain information to help answer the user prompt then indicate that"},
            {"role": "user", "content": prompt_with_docs}
        ])

        response = self.open_ai_client.chat.completions.create(
            model="gpt-4",
            messages=messages
        )

        return response.choices[0].message.content