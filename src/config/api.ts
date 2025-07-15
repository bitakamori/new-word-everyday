// Configuração da API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Função utilitária para fazer requests autenticados
export const createAuthenticatedRequest = (token: string) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };
};
