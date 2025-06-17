"use client";

import { WordInput } from "@/components/WordInput";
import { WordList } from "@/components/WordList";
import { useWordCollection } from "@/hooks/useWordCollection";

export default function Home() {
  const { words, addWord, removeWord } = useWordCollection();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl text-gray-600 font-bold text-center mb-8">
          Uma nova palavra todo dia
        </h1>
        <div className="space-y-6 flex flex-col items-center">
          <WordInput onAddWord={addWord} />
          <WordList words={words} onRemoveWord={removeWord} />
        </div>
      </div>
    </main>
  );
}
