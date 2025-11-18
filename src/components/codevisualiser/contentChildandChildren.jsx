import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaCodeBranch, FaLayerGroup } from "react-icons/fa";

function Event({ label, level = 0 }) {
  if (!label) return null;
  return (
    <div className={`flex items-center gap-2 my-1 ml-${level * 4}`}>
      <FaLayerGroup className="w-3 h-3 text-gray-400" />
      <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-xl text-sm shadow-sm">
        {label}
      </div>
    </div>
  );
}

export default function ContentChildVisualizer() {
  const [events, setEvents] = useState([]);

  const runFlow = () => {
    const sequence = [
      { label: "ContentChild Example:", level: 0 },
      { label: "Parent queries projected single content using @ContentChild", level: 1 },
      { label: "ProjectedChildComponent initialized", level: 2 },
      { label: "Parent reads @ContentChild property → manipulates projected content", level: 1 },

      { label: "\nContentChildren Example:", level: 0 },
      { label: "Parent queries multiple projected children using @ContentChildren", level: 1 },
      { label: "ProjectedChildComponent #1 initialized", level: 2 },
      { label: "ProjectedChildComponent #2 initialized", level: 2 },
      { label: "Parent iterates QueryList → performs actions on each projected child", level: 1 },

      { label: "Logical Difference:", level: 0 },
      { label: "@ContentChild: single reference → access one projected child", level: 1 },
      { label: "@ContentChildren: multiple references → iterate over all projected children", level: 1 },

      { label: "Example Use Cases:", level: 0 },
      { label: "@ContentChild → Apply styling or call method on single projected element", level: 1 },
      { label: "@ContentChildren → Loop over projected items and attach listeners or modify content", level: 1 }
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
        <FaCodeBranch className="w-6 h-6 text-purple-600" /> ContentChild vs ContentChildren Visualizer
      </h2>

      <button
        onClick={runFlow}
        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-700 transition-all"
      >
        <FaPlay className="w-4 h-4" /> Run Example
      </button>

      <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200 h-[500px] overflow-auto shadow-inner">
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