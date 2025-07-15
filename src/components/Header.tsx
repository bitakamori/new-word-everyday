"use client";

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <header className="bg-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              <span className="inline">New Word Everyday Game</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
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

          {/* Desktop User Info */}
          <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-pink-100 hover:text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu principal</span>
              {/* Hambúrguer icon */}
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                /* X icon */
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-pink-500 bg-pink-600 shadow-lg">
              {/* User info section */}
              <div className="px-3 py-4 bg-pink-700 rounded-lg mb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-medium text-white">
                      Olá, {user?.nickname}
                    </p>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                        {user?.points} pontos
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation links */}
              <a
                href="/dashboard"
                onClick={closeMobileMenu}
                className="text-pink-100 hover:bg-pink-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                📊 Dashboard
              </a>

              <a
                href="/add-word"
                onClick={closeMobileMenu}
                className="text-pink-100 hover:bg-pink-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                ➕ Adicionar Nova Palavra
              </a>

              <a
                href="/ranking"
                onClick={closeMobileMenu}
                className="text-pink-100 hover:bg-pink-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                🏆 Ranking
              </a>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="w-full text-left text-pink-100 hover:bg-pink-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors mt-4 border-t border-pink-500 pt-4"
              >
                🚪 Sair
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
