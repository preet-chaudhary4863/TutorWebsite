import React from "react";

export default function Card({ title, children, icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <div className="flex items-start gap-4">
        <div className="text-2xl text-purple-600">{icon}</div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="mt-2 text-sm text-gray-600">{children}</p>
        </div>
      </div>
    </div>
  );
}
