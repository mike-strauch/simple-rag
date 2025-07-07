"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="size-full flex flex-col items-center pt-[10%]">
      <div className="w-[70%] flex flex-col items-center gap-10">
        <h1 className="text-5xl text-shadow-purple-300 text-shadow-sm">Simple RAG</h1>
        <div className="w-[80%] flex flex-col gap-5">
          <div>
            This system allows you to add documents to a knowledge-store and then search for information contained in those documents using an agentic conversation interface.
          </div>
          <div>
            <p>Under the hood, this system uses:</p>
            <ul className="px-5 py-1 list-disc space-y-1">
              <li><Link href="https://www.pinecone.io/" className="text-purple-300 underline">Pinecone</Link> for generating and storing vector embeddings and for similarity search</li>
              <li><Link href="https://openai.com/" className="text-purple-300 underline">OpenAI</Link> API (GPT-4) to generate conversational results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}