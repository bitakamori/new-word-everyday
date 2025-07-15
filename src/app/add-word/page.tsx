"use client";

import React, { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Header from "../../components/Header";
import { useWordCollection } from "../../hooks/useWordCollection";
import { useAuth } from "../../contexts/AuthContext";

export default function AddWordPage() {
  const [word, setWord] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const { addWord, isLoading, words } = useWordCollection();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;

    const result = await addWord(word.trim());

    if (result.success) {
      setMessage({
        type: "success",
        text: `✅ ${result.message} (+${result.points} pontos)`,
      });
      setWord("");
    } else {
      setMessage({
        type: "error",
        text: `❌ ${result.message}`,
      });
    }

    // Limpar mensagem após 5 segundos
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Formulário para adicionar palavra */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Adicionar Nova Palavra
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="word"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Digite uma palavra em inglês
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      id="word"
                      value={word}
                      onChange={(e) => setWord(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Ex: beautiful, amazing, wonderful..."
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !word.trim()}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Verificando...
                        </>
                      ) : (
                        "Adicionar"
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <p>
                    💡 <strong>Dica:</strong> Palavras são verificadas
                    automaticamente no dicionário inglês
                  </p>
                  <p>
                    🎯 <strong>Pontuação:</strong> Você ganha 1 ponto para cada
                    letra da palavra
                  </p>
                  <p>
                    ⚠️ <strong>Regra:</strong> Você não pode adicionar a mesma
                    palavra duas vezes
                  </p>
                </div>
              </form>
            </div>

            {/* Mensagem de feedback */}
            {message && (
              <div
                className={`rounded-md p-4 mb-6 ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div
                  className={`text-sm ${
                    message.type === "success"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            )}

            {/* Estatísticas do usuário */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Suas Estatísticas
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-pink-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-pink-600">
                    {user?.points || 0}
                  </div>
                  <div className="text-sm text-pink-800">Pontos Totais</div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {words.length}
                  </div>
                  <div className="text-sm text-green-800">
                    Palavras Adicionadas
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de palavras */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Suas Palavras ({words.length})
              </h2>

              {words.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {words.map((word, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium text-gray-900">{word}</span>
                      <span className="text-sm text-gray-500">
                        {word.length} {word.length === 1 ? "ponto" : "pontos"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma palavra adicionada ainda. Adicione sua primeira
                  palavra acima!
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
