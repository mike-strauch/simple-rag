import { Message } from "./Message";

export class Conversation {
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