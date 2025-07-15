"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config/api";

interface User {
  id: number;
  nickname: string;
  points: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (nickname: string, password: string) => Promise<void>;
  register: (nickname: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserPoints: (points: number) => void;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se existe token armazenado
    const storedToken = Cookies.get("auth_token");
    const storedUser = Cookies.get("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (nickname: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro no login");
      }

      const data = await response.json();

      // Armazenar token e dados do usuário
      Cookies.set("auth_token", data.access_token, { expires: 1 }); // 1 dia
      Cookies.set("user", JSON.stringify(data.user), { expires: 1 });

      setToken(data.access_token);
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (nickname: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro no cadastro");
      }

      const data = await response.json();

      // Armazenar token e dados do usuário
      Cookies.set("auth_token", data.access_token, { expires: 1 });
      Cookies.set("user", JSON.stringify(data.user), { expires: 1 });

      setToken(data.access_token);
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("auth_token");
    Cookies.remove("user");
    setToken(null);
    setUser(null);
  };

  const updateUserPoints = (points: number) => {
    if (user) {
      const updatedUser = { ...user, points };
      setUser(updatedUser);
      Cookies.set("user", JSON.stringify(updatedUser), { expires: 1 });
    }
  };

  const refreshUser = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 1 });
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      // Caso o endpoint falhe, apenas mantenha os dados atuais
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    updateUserPoints,
    refreshUser,
    isLoading,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
