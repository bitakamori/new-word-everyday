"use client";

import { useEffect } from "react";
import { AlertProps } from "@/types/api";

export const Alert = ({ type, message, onClose }: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const alertStyles = {
    error: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
  };

  return (
    <div
      role="alert"
      className={`${alertStyles[type]} p-4 rounded-lg flex justify-between items-center mt-4 animate-fade-in w-full`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 p-1 hover:bg-black/10 rounded-full transition-colors"
        aria-label="Close alert"
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
    </div>
  );
};
