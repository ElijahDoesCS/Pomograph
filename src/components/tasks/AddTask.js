import React from "react";

export default function AddTask({ addTask }) {
  return (
    <div
      className="flex items-center justify-center h-10 mt-4 rounded-md opacity-50 outline-dashed outline-2 shadow-md w-full bg-white cursor-pointer mb-5"
      onClick={addTask}
    >
      <svg
        className="h-6 w-6 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </div>
  );
}
