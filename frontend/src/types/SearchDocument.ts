
class SearchDocument {
  id: string;
  text: string;

  constructor(props: Partial<SearchDocument> = {}) {
      this.id = props.id ? props.id : "";
      this.text = props.text ? props.text : "";
  }
}

export default SearchDocument;