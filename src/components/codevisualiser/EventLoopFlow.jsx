import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EventLoopFlowVisualizer = () => {
  const [functions, setFunctions] = useState([]);

  const tasks = [
    { label: "console.log('start')", type: "sync" },
    { label: "setTimeout(() => console.log('timeout'), 0)", type: "macrotask" },
    { label: "Promise.resolve().then(() => console.log('promise'))", type: "microtask" },
    { label: "console.log('end')", type: "sync" },
  ];

  const startFlow = () => {
    setFunctions([]);
    let delay = 0;

    tasks.forEach((task, idx) => {
      setTimeout(() => {
        setFunctions((prev) => [
          ...prev,
          { ...task, stage: "callstack", id: idx },
        ]);
      }, delay);

      // Simulate async movement
      if (task.type === "macrotask") {
        delay += 1000;
        setTimeout(() => {
          setFunctions((prev) =>
            prev.map((f) => (f.id === idx ? { ...f, stage: "webapi" } : f))
          );
        }, delay);

        delay += 1000;
        setTimeout(() => {
          setFunctions((prev) =>
            prev.map((f) => (f.id === idx ? { ...f, stage: "taskqueue" } : f))
          );
        }, delay);

        delay += 1000;
        setTimeout(() => {
          setFunctions((prev) =>
            prev.map((f) => (f.id === idx ? { ...f, stage: "callstack" } : f))
          );
        }, delay);
      }

      if (task.type === "microtask") {
        delay += 1000;
        setTimeout(() => {
          setFunctions((prev) =>
            prev.map((f) => (f.id === idx ? { ...f, stage: "microtaskqueue" } : f))
          );
        }, delay);

        delay += 1000;
        setTimeout(() => {
          setFunctions((prev) =>
            prev.map((f) => (f.id === idx ? { ...f, stage: "callstack" } : f))
          );
        }, delay);
      }

      if (task.type === "sync") {
        delay += 1000;
        setTimeout(() => {
          setFunctions((prev) =>
            prev.map((f) => (f.id === idx ? { ...f, stage: "executed" } : f))
          );
        }, delay);
      }
    });
  };

  // Stage positions for visualization
  const stagePositions = {
    callstack: { x: 50, y: 50 },
    webapi: { x: 250, y: 50 },
    microtaskqueue: { x: 250, y: 150 },
    taskqueue: { x: 250, y: 250 },
    executed: { x: 50, y: 350 },
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Event Loop Flow Visualizer</h2>
      <div className="relative w-full h-[400px] border rounded bg-gray-50 overflow-hidden">
        {functions.map((f) => (
          <motion.div
            key={f.id}
            layout
            initial={{ opacity: 0 }}
            animate={{
              x: stagePositions[f.stage].x,
              y: stagePositions[f.stage].y,
              opacity: 1,
            }}
            transition={{ duration: 0.8 }}
            className={`absolute p-2 rounded text-xs font-semibold text-white ${
              f.type === "sync"
                ? "bg-blue-500"
                : f.type === "macrotask"
                ? "bg-yellow-500"
                : "bg-pink-500"
            }`}
          >
            {f.label}
          </motion.div>
        ))}

        {/* Arrows for flow (simplified) */}
        <svg className="absolute w-full h-full top-0 left-0 pointer-events-none">
          {/* Call Stack → Web API */}
          <line x1="100" y1="60" x2="250" y2="60" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
          {/* Microtask queue → Call Stack */}
          <line x1="300" y1="160" x2="100" y2="360" stroke="red" strokeWidth="2" markerEnd="url(#arrowhead)" />
          {/* Task queue → Call Stack */}
          <line x1="300" y1="260" x2="100" y2="360" stroke="orange" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="black" />
            </marker>
          </defs>
        </svg>
      </div>

      <button
        onClick={startFlow}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Start Event Loop Flow
      </button>
    </div>
  );
};

export default EventLoopFlowVisualizer;
