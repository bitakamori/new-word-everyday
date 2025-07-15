"use client";

import React from "react";
import Header from "../../components/Header";
import { useRanking } from "../../hooks/useRanking";
import { useAuth } from "../../contexts/AuthContext";

export default function RankingPage() {
  const { ranking, isLoading, refreshRanking } = useRanking();
  const { user, isAuthenticated } = useAuth();

  const userPosition = ranking.findIndex((u) => u.id === user?.id) + 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Header />}

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header da página */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  🏆 Ranking de Jogadores
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Veja quem são os melhores coletores de palavras!
                </p>
              </div>

              <button
                onClick={refreshRanking}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                ) : (
                  <svg
                    className="-ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                )}
                Atualizar
              </button>
            </div>
          </div>

          {/* Posição do usuário (se logado) */}
          {isAuthenticated && userPosition > 0 && (
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="text-2xl">🎯</div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-pink-900">
                    Sua Posição: #{userPosition}
                  </h3>
                  <p className="text-pink-700">
                    Você tem {user?.points || 0} pontos no total
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pódio (Top 3) */}
          {ranking.length >= 3 && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6 text-center">
                🥇 Pódio dos Campeões
              </h2>

              <div className="flex items-end justify-center space-x-4 mb-6">
                {/* 2º Lugar */}
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 w-24 h-20 flex items-center justify-center mb-2">
                    <span className="text-2xl">🥈</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {ranking[1]?.nickname}
                  </div>
                  <div className="text-xs text-gray-600">
                    {ranking[1]?.points} pts
                  </div>
                </div>

                {/* 1º Lugar */}
                <div className="text-center">
                  <div className="bg-yellow-100 rounded-lg p-4 w-28 h-24 flex items-center justify-center mb-2">
                    <span className="text-3xl">👑</span>
                  </div>
                  <div className="text-base font-bold text-gray-900">
                    {ranking[0]?.nickname}
                  </div>
                  <div className="text-sm text-gray-600">
                    {ranking[0]?.points} pts
                  </div>
                </div>

                {/* 3º Lugar */}
                <div className="text-center">
                  <div className="bg-orange-100 rounded-lg p-4 w-24 h-20 flex items-center justify-center mb-2">
                    <span className="text-2xl">🥉</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {ranking[2]?.nickname}
                  </div>
                  <div className="text-xs text-gray-600">
                    {ranking[2]?.points} pts
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lista completa do ranking */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Ranking Completo
              </h2>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="text-gray-500">Carregando ranking...</div>
              </div>
            ) : ranking.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {ranking.map((user, index) => (
                  <div
                    key={user.id}
                    className={`px-6 py-4 flex items-center justify-between ${
                      user.id === user?.id ? "bg-pink-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? "bg-yellow-100 text-yellow-800"
                            : index === 1
                            ? "bg-gray-100 text-gray-800"
                            : index === 2
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-50 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div>
                        <div
                          className={`text-sm font-medium ${
                            user.id === user?.id
                              ? "text-pink-900"
                              : "text-gray-900"
                          }`}
                        >
                          {user.nickname}
                          {user.id === user?.id && (
                            <span className="ml-2 text-xs text-pink-600">
                              (Você)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-sm font-medium ${
                          user.id === user?.id
                            ? "text-pink-700"
                            : "text-gray-900"
                        }`}
                      >
                        {user.points} pontos
                      </span>

                      {index < 3 && (
                        <span className="text-lg">
                          {index === 0 ? "👑" : index === 1 ? "🥈" : "🥉"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Nenhum jogador no ranking ainda
              </div>
            )}
          </div>

          {/* Call to action para usuários não logados */}
          {!isAuthenticated && (
            <div className="mt-6 bg-white shadow rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Quer participar do ranking?
              </h3>
              <p className="text-gray-600 mb-4">
                Cadastre-se e comece a adicionar palavras para ganhar pontos!
              </p>
              <div className="space-x-4">
                <a
                  href="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                >
                  Cadastrar
                </a>
                <a
                  href="/login"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Fazer Login
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
