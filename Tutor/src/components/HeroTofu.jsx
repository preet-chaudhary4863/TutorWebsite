import React, { useEffect } from "react";

export default function HeroTofu({
  message = "Action successful",
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div className="bg-white shadow-lg rounded-lg px-4 py-3 border border-gray-200">
        <div className="font-semibold text-gray-900">{message}</div>
      </div>
    </div>
  );
}
