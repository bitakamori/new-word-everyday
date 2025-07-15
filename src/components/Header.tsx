"use client";

import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              New Word Everyday Game
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="/dashboard"
              className="text-pink-100 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/add-word"
              className="text-pink-100 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Adicionar Palavra
            </a>
            <a
              href="/ranking"
              className="text-pink-100 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Ranking
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-pink-100">
                Olá,{" "}
                <span className="font-medium text-white">{user?.nickname}</span>
              </span>
              <div className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {user?.points} pontos
              </div>
            </div>

            <button
              onClick={logout}
              className="bg-pink-700 hover:bg-pink-800 text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
