// Script para testar a configuração da API
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://new-word-everyday-backend.fly.dev"
    : "http://localhost:3001");

console.log("Environment:", process.env.NODE_ENV);
console.log("API_BASE_URL:", API_BASE_URL);
console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);

// Teste da URL
fetch(`${API_BASE_URL}/`)
  .then((response) => response.text())
  .then((data) => {
    console.log("✅ Backend conectado com sucesso!");
    console.log("Response:", data);
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar com o backend:", error);
  });
