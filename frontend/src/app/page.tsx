"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="w-[80%] flex flex-col items-center">
      <div className="">
        Simple RAG (Retrieval-Augmented Generation). A system that allows you to submit documents and then search them by conversing with an &quot;agent&quot;.
      </div>
      <div>
        <p>Under the hood, this system uses:</p>
        <ul>
          <li><Link href="https://www.pinecone.io/">Pinecone</Link> for generating and storing vector embeddings and for similarity search</li>
          <li>OpenAI AI (GPT-4) to generate conversational results</li>
        </ul>
      </div>
    </div>
  );
}