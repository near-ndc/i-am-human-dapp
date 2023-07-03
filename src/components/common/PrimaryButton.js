import React from 'react';

export const PrimaryButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-5 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
    >
      {children}
    </button>
  );
};
