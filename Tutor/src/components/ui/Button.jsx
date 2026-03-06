import React from "react";

export function PrimaryButton({
  children,
  className = "",
  color = "purple",
  ...props
}) {
  const base =
    "px-12 py-6 rounded-md shadow-sm text-white inline-flex items-center gap-2";
  const colors = {
    purple: "bg-purple-600 hover:bg-purple-700",
    green: "bg-green-600 hover:bg-green-700",
  };
  return (
    <button
      className={`${base} ${colors[color] || colors.purple} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
