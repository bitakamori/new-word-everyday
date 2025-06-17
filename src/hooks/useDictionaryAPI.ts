'use client';

import { DictionaryResponse } from '@/types/api';

const API_BASE_URL = 'https://api.dicionario-aberto.net/word';

export const useDictionaryAPI = () => {
  const verifyWord = async (word: string): Promise<{ exists: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(word)}`);
      
      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data: DictionaryResponse = await response.json();
      return {
        exists: data.length > 0
      };
    } catch (error) {
        console.error("Error verifying word:", error);
      return {
        exists: false,
        error: 'Desculpe, ocorreu um erro ao verificar a palavra. Tente novamente.'
      };
    }
  };

  return { verifyWord };
};
