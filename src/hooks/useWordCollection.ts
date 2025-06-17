'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'wordCollection';

export const useWordCollection = () => {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    const storedWords = localStorage.getItem(STORAGE_KEY);
    if (storedWords) {
      setWords(JSON.parse(storedWords));
    }
  }, []);
  const addWord = (word: string) => {
    const newWord = word.toLowerCase();
    if (!words.includes(newWord)) {
      const updatedWords = [...words, newWord];
      setWords(updatedWords);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWords));
    }
  };

  const removeWord = (index: number) => {
    const updatedWords = words.filter((_, i) => i !== index);
    setWords(updatedWords);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWords));
  };

  return { words, addWord, removeWord };
};
