import { useCallback, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const useSubmitPrompt = (): [boolean, ((prompt: string) => Promise<string | null>)] => {
  const [loading, setLoading] = useState<boolean>(false);

  const callback = useCallback(async (prompt: string): Promise<string | null> => {
    if(!prompt) {
      toast.warn('Prompt is empty');
      return '';
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/search', {
        prompt: prompt
      });

      setLoading(false);
      if(!response.data.success) {
        toast.error(response.data.message);
        return null;
      }

      return response.data.llm_response;
    }
    catch(e) {
      toast.error('Failed to submit prompt: ' + (e as Error).message);
    }
    setLoading(false);
    return null;
  },[]);

  return [loading, callback];
}