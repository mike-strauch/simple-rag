import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';
import SearchDocument from "@/types/SearchDocument";

export const useDocument = (id: string):[boolean, SearchDocument] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [document, setDocument] = useState<SearchDocument>(new SearchDocument());

  useEffect(() => {
    const loadDocuments = async () => {
      if(!id)
        return;

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/documents/${id}`);

        setLoading(false);
        if (!response.data.success) {
          toast.error(response.data.message);
          return null;
        }

        setDocument(new SearchDocument(response.data.document));
      } catch (e) {
        setLoading(false);
        toast.error('Unable to add document: ' + (e as Error).message);
      }
    }
    loadDocuments().then(() => {});
  },[id]);

  return [loading, document];
}

export const useDocuments = (): [boolean, SearchDocument[]] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [documents, setDocuments] = useState<SearchDocument[]>([]);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/documents');

        setLoading(false);
        if (!response.data.success) {
          toast.error(response.data.message);
          return null;
        }

        setDocuments(response.data.documents.map((doc: Partial<SearchDocument>) => new SearchDocument(doc)));
      } catch (e) {
        setLoading(false);
        toast.error('Unable to add document: ' + (e as Error).message);
      }
    }
    loadDocuments().then(() => {});
  },[]);

  return [loading, documents];
}

export const useAddDocument = (): [boolean, ((document: string) => Promise<void>)] => {
  const [loading, setLoading] = useState<boolean>(false);
  const callback =  useCallback(async (documentData: string) => {
    if(!documentData) {
      toast.warn('No document specified');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/documents', {
        content: documentData
      });

      setLoading(false);
      if(!response.data.success) {
        toast.error(response.data.message);
        return null;
      }

      toast.success('Document Added!');
      return response.data;
    }
    catch(e) {
      setLoading(false);
      toast.error('Unable to add document: ' + (e as Error).message);
    }
  },[]);

  return [loading, callback]
}