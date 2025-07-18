// Configuração da API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://new-word-everyday-backend.fly.dev' 
    : 'http://localhost:3001');

// Função utilitária para fazer requests autenticados
export const createAuthenticatedRequest = (token: string) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };
};
