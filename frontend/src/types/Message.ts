export class Message {
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