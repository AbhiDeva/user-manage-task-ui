import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaSyncAlt, FaCodeBranch, FaBolt, FaLayerGroup } from "react-icons/fa";

function Event({ label, level = 0 }) {
  if (!label) return null; // Prevent undefined errors
  return (
    <div className={`flex items-center gap-2 my-1 ml-${level * 4}`}>
      <FaLayerGroup className="w-3 h-3 text-gray-400" />
      <div className="px-3 py-1 bg-green-100 text-green-800 rounded-xl text-sm shadow-sm">
        {label}
      </div>
    </div>
  );
}

export default function ViewChildVisualizer() {
  const [events, setEvents] = useState([]);

  const runFlow = () => {
    const sequence = [
      { label: "Parent: Access single child via ViewChild", level: 0 },
      { label: "ChildComponent initialized", level: 1 },
      { label: "Parent reads @ViewChild property", level: 0 },
      { label: "Parent: Access multiple children via ViewChildren", level: 0 },
      { label: "ChildComponent #1 initialized", level: 1 },
      { label: "ChildComponent #2 initialized", level: 1 },
      { label: "Parent reads QueryList via @ViewChildren", level: 0 }
    ];

    setEvents([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setEvents(prev => [...prev, sequence[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 800);
  };

  return (
    <div className="p-6 w-full h-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaCodeBranch className="w-6 h-6 text-green-600" /> ViewChild vs ViewChildren Visualizer
      </h2>

      <button
        onClick={runFlow}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-green-700 transition-all"
      >
        <FaPlay className="w-4 h-4" /> Run Example
      </button>

      <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200 h-[400px] overflow-auto shadow-inner">
        {events.map((e, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Event label={e?.label} level={e?.level} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
