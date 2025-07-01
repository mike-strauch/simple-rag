import { useCallback } from "react";
import axios from 'axios';

export const useSubmitPrompt = () => {
  return useCallback(async (prompt: string) => {
    try {
      const response = await axios.post('localhost:8000/api/search', {
        prompt: prompt
      });
      return response.data;
    }
    catch(e) {
      alert('Failed to submit prompt: ' + (e as Error).message);
    }
  },[]);
}