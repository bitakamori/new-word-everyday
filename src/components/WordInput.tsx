"use client";

import { useState, KeyboardEvent } from "react";

interface WordInputProps {
  onAddWord: (word: string) => void;
}

export const WordInput = ({ onAddWord }: WordInputProps) => {
  const [word, setWord] = useState("");

  const handleSubmit = () => {
    const trimmedWord = word.trim();
    if (trimmedWord && !trimmedWord.includes(" ")) {
      onAddWord(trimmedWord);
      setWord("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Adicione uma palavra"
        className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-label="Word input"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Add word"
      >
        Add
      </button>
    </div>
  );
};
