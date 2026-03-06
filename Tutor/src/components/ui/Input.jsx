import React from "react";

export default function Input({ label, ...props }) {
  return (
    <label className="block">
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <input
        className="mt-1 block w-full rounded-md border-gray-200 shadow-sm px-3 py-2 focus:ring-2 focus:ring-purple-200"
        {...props}
      />
    </label>
  );
}
