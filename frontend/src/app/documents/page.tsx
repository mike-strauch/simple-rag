"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAddDocument, useDocuments } from "@/hooks/Document.hooks";
import { CgSpinner } from "react-icons/cg";
import ActionButton from "@/components/ActionButton";

export default function DocumentView() {
  return (
    <div className="min-h-full py-12 flex flex-col gap-8 items-center overflow-auto">
      <AddDocumentForm/>
      <DocumentList/>
    </div>
  );
}

const DocumentList = () => {
  const [documentsLoading, documents] = useDocuments();
  const hasDocuments = documents && documents.length > 0;
  const sortedDocuments = documents ? documents.sort() : [];

  return <div className="my-12 w-[60%] flex flex-col gap-2 items-center">
    <legend className="self-start font-semibold">All Documents</legend>
    <div className="w-full max-h-96 overflow-auto border border-purple-200 boxy-purple-shadow rounded-b-md">
      <table className="w-full divide-y divide-y-purple-200">
        <thead>
          <tr className="sticky top-0 z-20 bg-gray-700 border-b border-b-purple-200">
            <th className="z-10 px-2 py-2 text-left border-l border-purple-100 first:border-l-0">Name</th>
            <th className="z-10 px-2 py-2 text-left border-l border-purple-100">Creation Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-y-purple-200">
        {!hasDocuments && !documentsLoading && <tr><td colSpan={2} className="w-[65%] px-2 py-3">No Documents Found</td></tr>}
        {hasDocuments && sortedDocuments.map(document =>
          <tr key={document} className="hover:bg-gray-100/10 divide-x divide-x-purple-100">
            <td className="w-[65%] px-2 py-3">{document}</td>
            <td className="w-[35%] px-2 py-3"></td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  </div>
}

const AddDocumentForm = () => {
  const textFieldRef = useRef<HTMLTextAreaElement>(null);
  const [documentContent, setDocumentContent] = useState<string>("");
  const [isAddingDocument, addDocument] = useAddDocument();

  useEffect(() => {
    if (textFieldRef.current) textFieldRef.current.focus();
  }, []);

  const handleAddDocument = useCallback(async () => {
    await addDocument(documentContent);
    setDocumentContent("");
  }, [addDocument, documentContent]);

  return <form className="w-full flex flex-col" onSubmit={handleAddDocument}>
    <fieldset className="flex w-full flex-col items-center justify-center">
      <div className="flex h-[30%] w-[60%] flex-col gap-2">
        <div className="flex items-center w-full">
          <label htmlFor="contentText" className="hidden">Paste / Type Content to Index</label>
          <div className="ml-auto">
            {isAddingDocument && <CgSpinner className="mx-4 inline-block size-4 animate-spin" />}
            <ActionButton type="submit" label="Add Document" />
          </div>
        </div>
        <textarea
          placeholder="Paste / Type Content to Index"
          ref={textFieldRef}
          id="contentText"
          value={documentContent}
          onChange={(e) => setDocumentContent(e.target.value)}
          className="min-h-48 border rounded-b-md bg-gray-900 border-gray-500 p-2 focus:outline-1 focus:outline-gray-400 boxy-purple-shadow"
        ></textarea>
      </div>
    </fieldset>
  </form>;
}
