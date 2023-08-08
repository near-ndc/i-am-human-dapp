import React from 'react';

export const OutlineButton = ({
  onClick,
  children,
  classes,
  disabled,
  ref,
}) => {
  return (
    <button
      ref={ref}
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

export const PrimaryButton = ({
  onClick,
  children,
  classes,
  disabled,
  ref,
}) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={
        `rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-5 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700 ` +
        classes
      }
    >
      {children}
    </button>
  );
};
