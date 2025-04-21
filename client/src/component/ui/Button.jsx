import React from "react";

const Button = ({ variant = "default", children, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
