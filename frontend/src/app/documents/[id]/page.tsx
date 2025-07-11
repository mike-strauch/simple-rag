"use client";
import React from "react";
import { useDocument } from "@/hooks/Document.hooks";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function DocumentView() {
  const params = useParams();
  const [, document] = useDocument(params.id + "");

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 overflow-auto p-16">
      <Link href="/documents" className="pl-2 hover:text-purple-200">
        &lt; Back
      </Link>
      <div className="flex min-h-[30%] w-[40%] min-w-96 flex-col gap-2 border border-gray-300 p-6 rounded-b-md boxy-purple-shadow">
        <h1 className="text-3xl">Document Information</h1>
        <dl className="flex flex-col gap-4">
          <div>
            <dt className="font-semibold">Id:</dt>
            <dd>{document.id}</dd>
          </div>
          <div>
            <dt className="font-semibold">Text:</dt>
            <dd className="line-clamp-10">{document.text}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
