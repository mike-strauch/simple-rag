import { useCallback, useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';

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