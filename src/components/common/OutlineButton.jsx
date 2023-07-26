import React from 'react';

export const OutlineButton = ({ onClick, children, classes, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        `rounded-md border border-gray-500 border-1 px-5 text-center py-2 font-light text-black shadow-sm ` +
        classes
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
};
