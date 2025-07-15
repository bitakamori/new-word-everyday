"use client";

import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import { useWordCollection } from "../../hooks/useWordCollection";
import { useRanking } from "../../hooks/useRanking";

export default function DashboardPage() {
  const { user } = useAuth();
  const { words, isLoading: wordsLoading } = useWordCollection();
  const { ranking, isLoading: rankingLoading } = useRanking();

  const userPosition = ranking.findIndex((u) => u.id === user?.id) + 1;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Estatísticas do usuário */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Suas Estatísticas
                  </h2>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600">
                        {userPosition > 0 ? `#${userPosition}` : "-"}
                      </div>
                      <div className="text-sm text-purple-800">
                        Posição no Ranking
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ações rápidas */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Ações Rápidas
                  </h2>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <a
                      href="/add-word"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 transition-colors"
                    >
                      ➕ Adicionar Nova Palavra
                    </a>

                    <a
                      href="/ranking"
                      className="flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      🏆 Ver Ranking Completo
                    </a>
                  </div>
                </div>

                {/* Últimas palavras */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Suas Últimas Palavras
                  </h2>

                  {wordsLoading ? (
                    <div className="text-center py-4">
                      <div className="text-gray-500">Carregando...</div>
                    </div>
                  ) : words.length > 0 ? (
                    <div className="space-y-2">
                      {words
                        .slice(-5)
                        .reverse()
                        .map((word, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <span className="font-medium text-gray-900">
                              {word}
                            </span>
                            <span className="text-sm text-gray-500">
                              {word.length}{" "}
                              {word.length === 1 ? "ponto" : "pontos"}
                            </span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-gray-500">
                        Nenhuma palavra adicionada ainda
                      </div>
                      <a
                        href="/add-word"
                        className="text-pink-600 hover:text-pink-500 font-medium"
                      >
                        Adicione sua primeira palavra!
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Ranking lateral */}
              <div className="lg:col-span-1">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Top 10 Ranking
                  </h2>

                  {rankingLoading ? (
                    <div className="text-center py-4">
                      <div className="text-gray-500">Carregando...</div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {ranking.slice(0, 10).map((user, index) => (
                        <div
                          key={user.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            user.id === user?.id
                              ? "bg-pink-50 border border-pink-200"
                              : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span
                              className={`text-sm font-bold ${
                                index === 0
                                  ? "text-yellow-600"
                                  : index === 1
                                  ? "text-gray-600"
                                  : index === 2
                                  ? "text-orange-600"
                                  : "text-gray-500"
                              }`}
                            >
                              #{index + 1}
                            </span>
                            <span className="font-medium text-gray-900">
                              {user.nickname}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            {user.points}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
