interface WordListProps {
  words: string[];
  onRemoveWord: (index: number) => void;
}

export const WordList = ({ words, onRemoveWord }: WordListProps) => {
  return (
    <ul
      className="mt-6 space-y-2 w-full"
      role="list"
      aria-label="Collection of words"
    >
      {words.map((word, index) => (
        <li
          key={`${word}-${index}`}
          className="px-4 py-2 bg-gray-600 rounded-lg flex justify-between items-center text-white"
          role="listitem"
        >
          <span>{word}</span>
          <button
            onClick={() => onRemoveWord(index)}
            className="ml-2 p-1 hover:bg-gray-500 rounded-full transition-colors"
            aria-label={`Remove ${word}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
};
