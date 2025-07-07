"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSubmitPrompt } from "@/hooks/Search.hooks";
import { CgSpinner } from "react-icons/cg";
import { motion } from "framer-motion";
import ActionButton from "@/components/ActionButton";
import { Conversation } from "@/types/Converstion";

export default function Converse() {
  const [prompt, setPrompt] = useState<string>("");
  const [conversation, setConversation] = useState<Conversation>(new Conversation({}),);
  const [isSubmittingPrompt, submitPrompt] = useSubmitPrompt();
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textFieldRef.current) textFieldRef.current.focus();
  }, []);

  const handleSubmitPrompt = useCallback(async (e) => {
    e.preventDefault();
    const promptResult = await submitPrompt(prompt);
    if (promptResult) {
      setConversation((prevConversation) => {
        const newConversation = new Conversation(prevConversation);
        newConversation.addMessage(prompt, promptResult);
        return newConversation;
      });
    }
    setPrompt("");
  }, [prompt, submitPrompt]);

  return (
    <div className="flex flex-col gap-12 overflow-auto">
      <ConversationView conversation={conversation} />
      <form
        noValidate
        autoComplete="off"
        className="w-full px-12"
        onSubmit={handleSubmitPrompt}
      >
        <fieldset className="flex w-full flex-col items-center justify-center gap-24">
          <div className="flex h-[30%] w-[60%] flex-col gap-2">
            <div className="flex w-full">
              <label htmlFor="promptText" className="hidden">Enter Prompt</label>
              <div className="ml-auto">
                {isSubmittingPrompt && <CgSpinner className="mx-4 inline-block size-4 animate-spin" />}
                <ActionButton type="submit" label="Submit" />
              </div>
            </div>
            <textarea
              onKeyDown={async (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  await handleSubmitPrompt(e);
                }
              }}
              placeholder="Enter Prompt"
              ref={textFieldRef}
              id="promptText"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-24 border rounded-b-md bg-gray-900 border-gray-500 p-2 focus:outline-1 focus:outline-gray-400 boxy-purple-shadow"
            ></textarea>
            <div className="pt-2 text-center text-gray-400 text-lg">Type above to query your stored documents for relevant information.</div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

const ConversationView = ({ conversation }: { conversation: Conversation }) => {
  const latestResponseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(latestResponseRef.current)
      latestResponseRef.current.scrollIntoView();
  },[conversation]);

  return (
    <div className="flex w-full flex-col items-center">
      {conversation.hasMessages() && (
        <div className="divide-y-1 flex w-[50%] flex-col items-center justify-center gap-10 divide-gray-500 px-12">
          {conversation.getOrderedMessages().map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex w-full flex-col gap-4"
            >
              <div className="ml-auto text-sm text-gray-400">
                {new Date(message.created).toLocaleString()}
              </div>
              <div className="ml-auto max-w-[50%] rounded-md bg-purple-800 p-2 text-white">
                {message.prompt}
              </div>
              <div ref={latestResponseRef} className="mr-auto max-w-[60%] rounded-md bg-gray-700 p-2 text-white">
                {message.response}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};