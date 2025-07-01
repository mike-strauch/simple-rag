"use client";
import { useEffect, useRef } from "react";

export default function Home() {
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textFieldRef.current) textFieldRef.current.focus();
  }, []);

  return (
    <main className="size-full">
      <form noValidate autoComplete="off" className="size-full p-12">
        <fieldset className="flex size-full flex-col items-center justify-center gap-4">
          <div className="flex h-[30%] w-[60%] flex-col gap-2">
            <label htmlFor="promptText">Enter Prompt</label>
            <textarea
              ref={textFieldRef}
              id="promptText"
              className="min-h-24 rounded-md border-0 p-1 focus:outline-1 focus:outline-gray-300"
            ></textarea>
          </div>
          <div className="flex h-[30%] w-[60%] flex-col gap-2">
            <label htmlFor="contentText">Paste Content to Index</label>
            <textarea
              ref={textFieldRef}
              id="contentText"
              className="min-h-48 rounded-md border-0 p-1 focus:outline-1 focus:outline-gray-300"
            ></textarea>
          </div>
        </fieldset>
      </form>
    </main>
  );
}
