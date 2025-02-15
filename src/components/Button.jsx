const Button = ({ isActive, onClick, children }) => {
  return (
    <button
      className={`px-4 py-2 hover:cursor-pointer ${isActive ? "border-b-2 border-blue-500 font-medium" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
