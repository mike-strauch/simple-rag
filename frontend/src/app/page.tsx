"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAddDocument } from "@/hooks/Document.hooks";
import { useSubmitPrompt } from "@/hooks/Search.hooks";
import { CgSpinner } from "react-icons/cg";
import { motion } from "framer-motion";

export default function Home() {
  const [documentContent, setDocumentContent] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [conversation, setConversation] = useState<Conversation>(new Conversation({}));

  const [isAddingDocument, addDocument] = useAddDocument();
  const [isSubmittingPrompt, submitPrompt] = useSubmitPrompt();

  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textFieldRef.current) textFieldRef.current.focus();
  }, []);

  const handleAddDocument = useCallback(async () => {
    await addDocument(documentContent);
    setDocumentContent('');
  }, [addDocument, documentContent]);

  const handleSubmitPrompt = useCallback(async () => {
    const promptResult = await submitPrompt(prompt);
    if(promptResult) {
      setConversation(prevConversation => {
        const newConversation = new Conversation(prevConversation);
        newConversation.addMessage(prompt, promptResult);
        return newConversation;
      })
    }
    setPrompt('');
  },[prompt, submitPrompt]);

  return (
    <main className="py-10 size-full flex flex-col gap-12">
      <ConversationView conversation={conversation}/>
      <form noValidate autoComplete="off" className="w-full px-12">
        <fieldset className="flex w-full flex-col items-center justify-center gap-24">
          <div className="flex h-[30%] w-[60%] flex-col gap-2">
            <div className="w-full flex justify-between">
              <label htmlFor="promptText">Enter Prompt</label>
              {isSubmittingPrompt &&
                <CgSpinner className="inline-block size-4 animate-spin"/>
              }
              <ActionButton
                type="button"
                onClick={handleSubmitPrompt}
                label="Submit"
              />
            </div>
            <textarea
              ref={textFieldRef}
              id="promptText"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-24 rounded-md border-0 p-2 focus:outline-1 focus:outline-gray-400"
            ></textarea>
          </div>
          <div className="flex h-[30%] w-[60%] flex-col gap-2">
            <div className="w-full flex justify-between">
              <label htmlFor="contentText">Enter Content to Index</label>
              {isAddingDocument &&
                <CgSpinner className="inline-block size-4 animate-spin"/>
              }
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
              className="min-h-48 rounded-md border-0 p-2 focus:outline-1 focus:outline-gray-400"
            ></textarea>
          </div>
        </fieldset>
      </form>
    </main>
  );
}

const ConversationView = ({conversation}:{conversation: Conversation}) => {
  return (
    <div className="w-full flex flex-col items-center">
      {conversation.hasMessages() && (
        <div className="w-[60%] flex flex-col gap-10 items-center justify-center px-12 divide-y-1 divide-gray-500">
          {conversation.getOrderedMessages().map(message =>
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col gap-4"
            >
              <div className="ml-auto text-sm text-gray-400">{new Date(message.created).toLocaleString()}</div>
              <div className="p-2 ml-auto max-w-[50%] bg-purple-800 text-white rounded-md">
                {message.prompt}
              </div>
              <div className="p-2 mr-auto max-w-[60%] bg-gray-700 text-white rounded-md">
                {message.response}
              </div>
            </motion.div>
          )
          }
        </div>
      )}
    </div>
  );
}

const ActionButton = ({label = "Submit", type ="button", ...rest}: {label: string} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button
    type={type}
    className="px-2 rounded-md border border-purple-200 hover:border-purple-300 active:scale-x-[95%] active:scale-y-[95%] font-semibold"
    {...rest}
  >
    {label}
  </button>
}

class Conversation {
  messages: Message[];

  constructor(props:Partial<Conversation>) {
    this.messages = props.messages ? props.messages.map(message => new Message(message)) : [];
  }

  addMessage(prompt: string, response: string) {
    this.messages.push(new Message({prompt, response}));
  }

  hasMessages(): boolean {
    return this.messages?.length > 0;
  }

  getOrderedMessages() {
    return this.messages?.sort((a, b) => a.created - b.created) || [];
  }
}

class Message {
  id: number;
  created: number;
  prompt: string;
  response: string;

  constructor(props: Partial<Message>) {
    this.id = props.id || new Date().getTime();
    this.created = props.created || new Date().getTime();
    this.prompt = props.prompt || '';
    this.response = props.response || '';
  }
}
