"use client";

import { useState, KeyboardEvent } from "react";
import { Alert } from "./Alert";
import { useDictionaryAPI } from "@/hooks/useDictionaryAPI";
import { AlertType } from "@/types/api";

interface WordInputProps {
  onAddWord: (word: string) => void;
}

interface AlertState {
  type: AlertType;
  message: string;
}

export const WordInput = ({ onAddWord }: WordInputProps) => {
  const [word, setWord] = useState("");
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { verifyWord } = useDictionaryAPI();

  const handleSubmit = async () => {
    const trimmedWord = word.trim().toLowerCase();
    if (!trimmedWord || trimmedWord.includes(" ")) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await verifyWord(trimmedWord);

      if (result.error) {
        setAlert({
          type: "error",
          message: result.error,
        });
      } else if (result.exists) {
        onAddWord(trimmedWord);
        setWord("");
      } else {
        setAlert({
          type: "error",
          message: "Está palavra não existe ou não existe na api. :)",
        });
      }
    } catch (error) {
      console.error("Error verifying word:", error);
      setAlert({
        type: "error",
        message:
          "Desculpe, ocorreu um erro ao verificar a palavra. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSubmitting) {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="flex gap-2 w-full">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Adicione uma palavra"
          className="flex-1 px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Word input"
          disabled={isSubmitting}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Add word"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Checking..." : "Add"}
        </button>
      </div>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
};
