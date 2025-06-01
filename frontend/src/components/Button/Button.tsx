import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, disabled, ...rest }) => {
  return (
    <button
      disabled={disabled || loading}
      {...rest}
      className={`px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${
        rest.className ?? ""
      }`}
    >
      Create Snippet
    </button>
  );
};

export default Button;
