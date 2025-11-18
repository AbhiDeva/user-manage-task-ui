import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaSyncAlt, FaCodeBranch, FaBolt, FaArrowRight } from "react-icons/fa";

function Event({ label, level = 0 }) {
     if (!label) return null; // Prevent undefined errors
  return (
    <div className={`flex items-center gap-2 my-1 ml-${level * 4}`}>
      <FaArrowRight className="w-3 h-3 text-gray-400" />
      <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-xl text-sm shadow-sm">
        {label}
      </div>
    </div>
  );
}

export default function AngularLifecycleSequenceVisualizer() {
  const [events, setEvents] = useState([]);

  const runFlow = () => {
    const sequence = [];

    sequence.push({ label: "Parent: ngOnChanges()", level: 0 });
    sequence.push({ label: "Parent: ngOnInit()", level: 0 });
    sequence.push({ label: "Parent: ngDoCheck()", level: 0 });
    sequence.push({ label: "Parent: ngAfterContentInit() — Children Start →", level: 0 });

    sequence.push({ label: "Child: ngOnInit()", level: 1 });
    sequence.push({ label: "Child: ngDoCheck()", level: 1 });
    sequence.push({ label: "Child: ngAfterContentInit() — GrandChild Start →", level: 1 });

    sequence.push({ label: "GrandChild: ngOnInit()", level: 2 });
    sequence.push({ label: "GrandChild: ngDoCheck()", level: 2 });
    sequence.push({ label: "GrandChild: ngAfterContentInit() — GreatGrandChild Start →", level: 2 });

    sequence.push({ label: "GreatGrandChild: ngOnInit()", level: 3 });
    sequence.push({ label: "GreatGrandChild: ngDoCheck()", level: 3 });
    sequence.push({ label: "GreatGrandChild: ngAfterContentInit()", level: 3 });

    sequence.push({ label: "Parent: ngAfterViewInit()", level: 0 });
    sequence.push({ label: "Parent: ngAfterViewChecked()", level: 0 });

    sequence.push({ label: "Change Detection Cycle → ngDoCheck() on all components", level: 0 });

    sequence.push({ label: "Destroying Components…", level: 0 });
    sequence.push({ label: "GreatGrandChild: ngOnDestroy()", level: 3 });
    sequence.push({ label: "GrandChild: ngOnDestroy()", level: 2 });
    sequence.push({ label: "Child: ngOnDestroy()", level: 1 });
    sequence.push({ label: "Parent: ngOnDestroy()", level: 0 });

    let i = 0;
    setEvents([]);

    const interval = setInterval(() => {
      setEvents(prev => [...prev, sequence[i]]);
      i++;
      if (i === sequence.length) clearInterval(interval);
    }, 600);
  };

  return (
    <div className="p-6 w-full h-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaCodeBranch className="w-6 h-6 text-purple-600" /> Angular Lifecycle Visualizer
      </h2>

      <button
        onClick={runFlow}
        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-700 transition-all"
      >
        <FaPlay className="w-4 h-4" /> Run Sequence
      </button>

      <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200 h-[500px] overflow-auto shadow-inner">
        {events.map((e, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Event label={e.label} level={e.level} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
