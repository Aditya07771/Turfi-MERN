import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-lg rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => (
  <div className="border-b pb-2 mb-2">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

export const CardContent = ({ children }) => <div>{children}</div>;
