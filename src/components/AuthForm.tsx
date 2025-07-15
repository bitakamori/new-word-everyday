"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const authSchema = z.object({
  nickname: z
    .string()
    .min(3, "Nickname deve ter pelo menos 3 caracteres")
    .max(20, "Nickname deve ter no máximo 20 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type AuthFormData = z.infer<typeof authSchema>;

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: AuthFormData) => Promise<void>;
  isLoading?: boolean;
}

export default function AuthForm({ mode, onSubmit, isLoading }: AuthFormProps) {
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const handleFormSubmit = async (data: AuthFormData) => {
    try {
      setError("");
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-pink-600 rounded-full flex items-center justify-center mb-6">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              ></path>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {mode === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {mode === "login"
              ? "Faça login para continuar adicionando palavras e ganhando pontos"
              : "Comece sua jornada no New Word Everyday Game e desafie outros jogadores"}
          </p>
          <p className="text-sm text-gray-500">
            {mode === "login" ? (
              <>
                Não tem uma conta?{" "}
                <a
                  href="/register"
                  className="font-semibold text-pink-600 hover:text-pink-500 transition-colors"
                >
                  Cadastre-se aqui
                </a>
              </>
            ) : (
              <>
                Já tem uma conta?{" "}
                <a
                  href="/login"
                  className="font-semibold text-pink-600 hover:text-pink-500 transition-colors"
                >
                  Faça login
                </a>
              </>
            )}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="nickname"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nickname
                </label>
                <input
                  {...register("nickname")}
                  type="text"
                  autoComplete="username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-lg"
                  placeholder="Digite seu nickname"
                />
                {errors.nickname && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg
                      className="h-6 w-6 mr-1 mb-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {errors.nickname.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Senha
                </label>
                <input
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-lg"
                  placeholder="Digite sua senha"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg
                      className="h-6 w-6 mr-1 mb-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-sm text-red-700 font-medium">
                    {error}
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-4 px-6 border border-transparent text-lg font-semibold rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
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
                  {mode === "login" ? "Entrando..." : "Cadastrando..."}
                </>
              ) : (
                <>
                  {mode === "login" ? "Entrar na conta" : "Criar conta"}
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    ></path>
                  </svg>
                </>
              )}
            </button>
          </form>

          {mode === "register" && (
            <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
              <div className="text-md text-pink-800">
                <p className="font-medium mb-2">
                  🎮 Como funciona o New Word Everyday Game:
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Adicione palavras válidas em inglês</li>
                  <li>• Ganhe 1 ponto para cada letra da palavra</li>
                  <li>• Compete no ranking com outros jogadores</li>
                  <li>• Não pode repetir palavras que já adicionou</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
