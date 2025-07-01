import { useCallback, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const useSubmitPrompt = (): [boolean, ((prompt: string) => Promise<void>)] => {
  const [loading, setLoading] = useState<boolean>(false);

  const callback = useCallback(async (prompt: string) => {
    if(!prompt) {
      toast.warn('Prompt is empty');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/search', {
        prompt: prompt
      });

      if(response.data.message) toast.success(response.data.message);
      setLoading(false);
      return response.data;
    }
    catch(e) {
      toast.error('Failed to submit prompt: ' + (e as Error).message);
    }
    setLoading(false);
  },[]);

  return [loading, callback];
}