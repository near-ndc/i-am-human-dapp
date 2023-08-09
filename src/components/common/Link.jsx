export const Link = ({ link, children }) => {
  return (
    <span
      onClick={() => window.open(link, '_blank')}
      className="text-purple-600 cursor-pointer decoration-solid underline"
    >
      {children}
    </span>
  );
};
