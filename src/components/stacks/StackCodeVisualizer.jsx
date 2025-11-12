import React from "react";

export default function StackCodeVisualizer({ code }) {
  return (
    <pre className="bg-gray-900 p-3 rounded-xl text-sm font-mono overflow-x-auto border border-gray-700">
      <code>{code}</code>
    </pre>
  );
}
