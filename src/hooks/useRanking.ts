'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

interface RankingUser {
  id: number;
  nickname: string;
  points: number;
}

export const useRanking = () => {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRanking = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/ranking`);

      if (!response.ok) {
        throw new Error('Erro ao carregar ranking');
      }

      const data = await response.json();
      setRanking(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRanking();
  }, []);

  return {
    ranking,
    isLoading,
    error,
    refreshRanking: loadRanking,
  };
};
