'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL, createAuthenticatedRequest } from '../config/api';

interface Word {
  id: number;
  word: string;
  userId: number;
}

export const useWordCollection = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, user, updateUserPoints } = useAuth();

  // Carregar palavras do usuário
  useEffect(() => {
    if (token && user) {
      loadUserWords();
    }
  }, [token, user]);

  const loadUserWords = async () => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/words/my-words`, {
        ...createAuthenticatedRequest(token),
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar palavras');
      }

      const data = await response.json();
      setWords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const addWord = async (word: string): Promise<{ success: boolean; message?: string; points?: number }> => {
    if (!token) {
      return { success: false, message: 'Usuário não autenticado' };
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/words/add`, {
        method: 'POST',
        ...createAuthenticatedRequest(token),
        body: JSON.stringify({ word }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || 'Erro ao adicionar palavra' };
      }

      // Recarregar a lista de palavras após adicionar
      await loadUserWords();
      
      // Atualizar os pontos do usuário no contexto de autenticação
      if (data.points !== undefined && user) {
        const newTotalPoints = user.points + data.points;
        updateUserPoints(newTotalPoints);
      }
      
      return { 
        success: true, 
        message: data.message,
        points: data.points 
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const removeWord = (index: number) => {
    // Esta funcionalidade pode ser implementada no backend futuramente
    console.log('Remove word not implemented in API yet:', index);
  };

  return {
    words: words.map(w => w.word), // Manter compatibilidade com a interface anterior
    fullWords: words, // Dados completos para novos componentes
    addWord,
    removeWord,
    isLoading,
    error,
    refreshWords: loadUserWords,
  };
};
