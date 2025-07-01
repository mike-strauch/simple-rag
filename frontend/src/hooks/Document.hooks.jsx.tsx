import { useCallback } from "react";
import axios from 'axios';

export const useAddDocument = () => {
  return useCallback(async (documentData: string) => {
    try {
      const response = await axios.post('localhost:8000/api/documents', {
        content: documentData
      });
      return response.data;
    }
    catch(e) {
      alert('Unable to add document: ' + (e as Error).message);
    }
  },[]);
}