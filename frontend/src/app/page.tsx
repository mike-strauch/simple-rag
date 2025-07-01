"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAddDocument } from "@/hooks/Document.hooks.jsx";
import { useSubmitPrompt } from "@/hooks/Search.hooks.jsx";

export default function Home() {
  const [documentContent, setDocumentContent] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const addDocument = useAddDocument();
  const submitPrompt = useSubmitPrompt();
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textFieldRef.current) textFieldRef.current.focus();
  }, []);

  const handleAddDocument = useCallback(async () => {
    await addDocument(documentContent);
    setDocumentContent(documentContent);
  }, [addDocument, documentContent]);

  const handleSubmitPrompt = useCallback(async () => {
    await submitPrompt(prompt);
    setPrompt('');
  },[prompt, submitPrompt]);

  return (
    <main className="size-full">
      <form noValidate autoComplete="off" className="size-full p-12">
        <fieldset className="flex size-full flex-col items-center justify-center gap-4">
          <div className="flex h-[30%] w-[60%] flex-col gap-2">
            <div className="w-full flex justify-between">
              <label htmlFor="promptText">Enter Prompt</label>
              <ActionButton
                type="button"
                onClick={handleSubmitPrompt}
                label="Find Documents"
              />
            </div>
            <textarea
              ref={textFieldRef}
              id="promptText"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-24 rounded-md border-0 p-1 focus:outline-1 focus:outline-gray-300"
            ></textarea>
          </div>
          <div className="flex h-[30%] w-[60%] flex-col gap-2">
            <div className="w-full flex justify-between">
              <label htmlFor="contentText">Enter Content to Index</label>
              <ActionButton
                type="button"
                onClick={handleAddDocument}
                label="Add Document"
              />
            </div>
            <textarea
              id="contentText"
              value={documentContent}
              onChange={(e) => setDocumentContent(e.target.value)}
              className="min-h-48 rounded-md border-0 p-1 focus:outline-1 focus:outline-gray-300"
            ></textarea>
          </div>
        </fieldset>
      </form>
    </main>
  );
}

const ActionButton = ({label = "Submit", type ="button"}: {label: string} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button
    type={type}
    className="px-2 rounded-md border border-purple-200 hover:border-purple-300 active:scale-x-[95%] active:scale-y-[95%] font-semibold">
    {label}
  </button>
}
