import React from 'react';

export const OutlineButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-auto rounded-md border border-gray-500 border-1 px-5 text-center py-2 font-light text-black shadow-sm"
    >
      {children}
    </button>
  );
};
