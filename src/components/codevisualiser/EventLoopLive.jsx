// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const EventLoopLiveVisualizer = () => {
//   const [tasks, setTasks] = useState([]);
//   const [consoleLogs, setConsoleLogs] = useState([]);
 


//   const events = [
//   { label: "console.log('start')", type: "sync", output: "start" },
//   { label: "setTimeout(...)", type: "macrotask", output: "timeout" },
//   { label: "Promise.resolve(...)", type: "microtask", output: "promise" },
//   { label: "console.log('end')", type: "sync", output: "end" },
// ];


//   const stagePositions = {
//     callstack: { x: 50, y: 50 },
//     webapi: { x: 250, y: 50 },
//     microtaskqueue: { x: 250, y: 150 },
//     taskqueue: { x: 250, y: 250 },
//     executed: { x: 50, y: 350 },
//   };

// //   const startFlow = () => {
// //     setTasks([]);
// //     setConsoleLogs([]);

// //     let delay = 0;

// //     events.forEach((event, idx) => {
// //       // Push to Call Stack
// //       setTimeout(() => {
// //         setTasks((prev) => [...prev, { ...event, stage: "callstack", id: idx }]);
// //       }, delay);

// //       // Sync execution
// //       if (event.type === "sync") {
// //         delay += 1000;
// //         setTimeout(() => {
// //           setTasks((prev) =>
// //             prev.map((t) => (t.id === idx ? { ...t, stage: "executed" } : t))
// //           );
// //           setConsoleLogs((prev) => [...prev, event.label.replace("console.log(", "").replace(")", "")]);
// //         }, delay);
// //       }

// //       // Microtask handling
// //       if (event.type === "microtask") {
// //         delay += 1000;
// //         setTimeout(() => {
// //           setTasks((prev) =>
// //             prev.map((t) => (t.id === idx ? { ...t, stage: "microtaskqueue" } : t))
// //           );
// //         }, delay);

// //         delay += 1000;
// //         setTimeout(() => {
// //           setTasks((prev) =>
// //             prev.map((t) => (t.id === idx ? { ...t, stage: "callstack" } : t))
// //           );
// //            setConsoleLogs((prev) => [...prev, event.label.replace("console.log(", "").replace(")", "")]);
// //         //setConsoleLogs((prev) => [...prev, event.output]);
// //         }, delay);
// //       }

// //       // Macrotask handling
// //       if (event.type === "macrotask") {
// //         delay += 1000;
// //         setTimeout(() => {
// //           setTasks((prev) =>
// //             prev.map((t) => (t.id === idx ? { ...t, stage: "webapi" } : t))
// //           );
// //         }, delay);

// //         delay += 1000;
// //         setTimeout(() => {
// //           setTasks((prev) =>
// //             prev.map((t) => (t.id === idx ? { ...t, stage: "taskqueue" } : t))
// //           );
// //         }, delay);

// //         delay += 1000;
// //         setTimeout(() => {
// //           setTasks((prev) =>
// //             prev.map((t) => (t.id === idx ? { ...t, stage: "callstack" } : t))
// //           );
// //           setConsoleLogs((prev) => [...prev, event.label.replace("console.log(", "").replace(")", "")]);
// //         }, delay);
// //       }
// //     });
// //   };

//  const startFlow = () => {
//     let microtaskQ = [];
//     let macrotaskQ = [];

//     // step 1: execute sync
//     events.forEach((e, i) => {
//       animateBlock(e, "callstack", i * 800);

//       if (e.type === "sync") {
//         setTimeout(() => {
//           setConsoleLogs(prev => [...prev, e.output]);
//         }, i * 800 + 600);
//       }

//       if (e.type === "microtask") microtaskQ.push(e);
//       if (e.type === "macrotask") macrotaskQ.push(e);
//     });

//     // step 2: run microtasks
//     microtaskQ.forEach((m, i) => {
//       const delay = events.length * 800 + i * 800;
//       animateBlock(m, "microtaskqueue", delay);
//       animateBlock(m, "callstack", delay + 600);

//       setTimeout(() => {
//         setConsoleLogs(prev => [...prev, m.output]);
//       }, delay + 1000);
//     });

//     // step 3: run macrotasks
//     macrotaskQ.forEach((t, i) => {
//       const delay =
//         events.length * 800 + microtaskQ.length * 800 + i * 800;

//       animateBlock(t, "taskqueue", delay);
//       animateBlock(t, "callstack", delay + 600);

//       setTimeout(() => {
//         setConsoleLogs(prev => [...prev, t.output]);
//       }, delay + 1000);
//     });
//   };

//   let consoleOut = [];
// let microtaskQ = [];
// let macrotaskQ = [];

// for (const e of events) {
//   if (e.type === "sync") consoleOut.push(e.output);
//   if (e.type === "microtask") microtaskQ.push(e.output);
//   if (e.type === "macrotask") macrotaskQ.push(e.output);
// }

// // after sync finishes
// consoleOut.push(...microtaskQ);

// // then 1 macrotask
// consoleOut.push(...macrotaskQ);

// // display
// console.log(consoleOut);
//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Event Loop Live Visualizer</h2>

//       <div className="relative w-full h-[400px] border rounded bg-gray-50 overflow-hidden mb-4">
//         {tasks.map((t) => (
//           <motion.div
//             key={t.id}
//             layout
//             initial={{ opacity: 0 }}
//             animate={{
//               x: stagePositions[t.stage].x,
//               y: stagePositions[t.stage].y,
//               opacity: 1,
//             }}
//             transition={{ duration: 0.8 }}
//             className={`absolute p-2 rounded text-xs font-semibold text-white ${
//               t.type === "sync"
//                 ? "bg-blue-500"
//                 : t.type === "macrotask"
//                 ? "bg-yellow-500"
//                 : "bg-pink-500"
//             }`}
//           >
//             {t.label}
//           </motion.div>
//         ))}

//         {/* Arrows */}
//         <svg className="absolute w-full h-full top-0 left-0 pointer-events-none">
//           <line x1="100" y1="60" x2="250" y2="60" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
//           <line x1="300" y1="160" x2="100" y2="360" stroke="red" strokeWidth="2" markerEnd="url(#arrowhead)" />
//           <line x1="300" y1="260" x2="100" y2="360" stroke="orange" strokeWidth="2" markerEnd="url(#arrowhead)" />
//           <defs>
//             <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
//               <polygon points="0 0, 10 3.5, 0 7" fill="black" />
//             </marker>
//           </defs>
//         </svg>
//       </div>

//       {/* Live Console Output */}
//       <div className="bg-gray-900 text-green-400 p-4 rounded h-32 overflow-y-auto mb-4">
//         <h4 className="font-semibold mb-2">Console Output:</h4>
//         <AnimatePresence>
//           {consoleLogs.map((log, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0 }}
//               className="mb-1 text-sm"
//             >
//               {log}
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//       <button
//         onClick={startFlow}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//       >
//         Start Live Event Loop
//       </button>
//     </div>
//   );
// };




// export default EventLoopLiveVisualizer;


// EventLoopLiveVisualizerCorrected.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Next-level Event Loop Visualizer
 * - animateBlock function implemented
 * - console output is produced in correct order (start, end, promise, timeout)
 * - visual movement is animated but doesn't control execution order
 */

export default function EventLoopLiveVisualizer() {
  const [visualTasks, setVisualTasks] = useState([]); // { id, label, type, stage }
  const [consoleLogs, setConsoleLogs] = useState([]);

  const events = [
    { id: 1, label: "console.log('start')", type: "sync", output: "start" },
    { id: 2, label: "setTimeout(...)", type: "macrotask", output: "timeout" },
    { id: 3, label: "Promise.then(...)", type: "microtask", output: "promise" },
    { id: 4, label: "console.log('end')", type: "sync", output: "end" },
  ];

  // stagePositions used by animate styling (not strictly required for framer layout)
  const stagePositions = {
    callstack: { left: 28, top: 28 },
    webapi: { left: 320, top: 28 },
    microtaskqueue: { left: 320, top: 140 },
    taskqueue: { left: 320, top: 240 },
    executed: { left: 28, top: 360 },
  };

  /**
   * animateBlock(task, stage, delay)
   * - Schedules the visual update of a task's stage after `delay` ms.
   * - Updates visualTasks state by adding or updating the task entry.
   */
  const animateBlock = (task, stage, delay = 0) => {
    setTimeout(() => {
      setVisualTasks((prev) => {
        // If task exists, update its stage; otherwise add new entry
        const exists = prev.find((p) => p.id === task.id);
        if (exists) {
          return prev.map((p) => (p.id === task.id ? { ...p, stage } : p));
        } else {
          return [...prev, { ...task, stage }];
        }
      });
    }, delay);
  };

  /**
   * runVisualizer: orchestrates animation AND schedules console outputs
   * Execution (console output) order is computed first, animation is scheduled to reflect movement.
   */
  const runVisualizer = () => {
    setVisualTasks([]);
    setConsoleLogs([]);

    const step = 700; // base step for animation staggering (visual only)

    // Precompute queues according to real event loop rules
    const syncEvents = events.filter((e) => e.type === "sync");
    const microEvents = events.filter((e) => e.type === "microtask");
    const macroEvents = events.filter((e) => e.type === "macrotask");

    // 1) Visual: Push all tasks briefly into Call Stack in code order (small stagger)
    events.forEach((e, idx) => {
      animateBlock(e, "callstack", idx * 120); // visual push to callstack
    });

    // 2) Execution scheduling (real event loop):
    // sync execute order: as they appear
    // microtasks execute after all sync
    // macrotasks execute after microtasks

    // compute base times for execution (purely scheduling when console log should appear)
    const syncPhaseEnd = events.length * 120 + step; // safe offset after initial pushes
    // microtasks start after syncPhaseEnd
    const microStart = syncPhaseEnd;
    // macrotasks start after microtasks
    const macroStart = microStart + microEvents.length * step;

    // SCHEDULE animations and console outputs for SYNC tasks
    syncEvents.forEach((e, i) => {
      // visual: already in callstack; animate to executed
      const visualExecTime = i * step + syncPhaseEnd - step; // stagger visually
      animateBlock(e, "executed", visualExecTime);

      // push console output at the same time as visual execution completes
      setTimeout(() => {
        setConsoleLogs((prev) => [...prev, e.output]);
      }, visualExecTime + 120);
    });

    // SCHEDULE microtasks: visual move to microtask queue, then back to callstack, then execute
    microEvents.forEach((m, i) => {
      const tToMicroqueue = syncPhaseEnd + i * step;
      const tBackToCallstack = tToMicroqueue + 350; // visual transit time
      const tConsole = microStart + i * step + 200; // actual execution time (ensures ordering)

      animateBlock(m, "microtaskqueue", tToMicroqueue);
      animateBlock(m, "callstack", tBackToCallstack);

      setTimeout(() => {
        setConsoleLogs((prev) => [...prev, m.output]);
      }, tConsole);
      // also mark executed visually shortly after
      animateBlock(m, "executed", tConsole + 120);
    });

    // SCHEDULE macrotasks: visual: webapi -> taskqueue -> callstack -> execute
    macroEvents.forEach((mt, i) => {
      const tWebApi = syncPhaseEnd + microEvents.length * step + i * step;
      const tTaskQueue = tWebApi + 350;
      const tBackToCallstack = macroStart + i * step + 250;
      const tConsole = macroStart + i * step + 400;

      animateBlock(mt, "webapi", tWebApi);
      animateBlock(mt, "taskqueue", tTaskQueue);
      animateBlock(mt, "callstack", tBackToCallstack);

      setTimeout(() => {
        setConsoleLogs((prev) => [...prev, mt.output]);
      }, tConsole);

      animateBlock(mt, "executed", tConsole + 120);
    });
  };

  // simple renderer helper to get stage classes/positions
  const stageStyle = (stage) => {
    switch (stage) {
      case "callstack":
        return "left-[28px] top-[28px]";
      case "webapi":
        return "left-[320px] top-[28px]";
      case "microtaskqueue":
        return "left-[320px] top-[140px]";
      case "taskqueue":
        return "left-[320px] top-[240px]";
      case "executed":
        return "left-[28px] top-[360px]";
      default:
        return "left-[28px] top-[28px]";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-3">Event Loop Visualizer — Corrected</h2>

      <div className="flex gap-6 mb-4">
        <div className="w-2/3">
          <div className="relative w-full h-[420px] border rounded bg-gray-50 overflow-hidden">
            {/* Visual zones labels */}
            <div className="absolute left-4 top-2 text-xs text-gray-600">Call Stack</div>
            <div className="absolute left-[320px] top-2 text-xs text-gray-600">Web APIs</div>
            <div className="absolute left-[320px] top-[120px] text-xs text-gray-600">Microtask Queue</div>
            <div className="absolute left-[320px] top-[220px] text-xs text-gray-600">Task Queue (Macrotask)</div>
            <div className="absolute left-4 top-[340px] text-xs text-gray-600">Executed</div>

            {/* Arrows (static) */}
            <svg className="absolute w-full h-full top-0 left-0 pointer-events-none">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
                </marker>
              </defs>
              <line x1="120" y1="40" x2="320" y2="40" stroke="#444" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="320" y1="160" x2="120" y2="380" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="320" y1="260" x2="120" y2="380" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
            </svg>

            {/* Animated task blocks */}
            <AnimatePresence>
              {visualTasks.map((t) => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    // we let framer handle position via absolute + className offsets
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`absolute ${stageStyle(t.stage)} z-10`}
                >
                  <div
                    className={`px-3 py-1 rounded text-xs font-medium text-white ${
                      t.type === "sync" ? "bg-blue-600" : t.type === "microtask" ? "bg-pink-600" : "bg-yellow-600"
                    }`}
                    style={{ minWidth: 160 }}
                  >
                    {t.label}
                    <div className="text-[10px] text-white/80 mt-1">{t.stage}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-3">
            <button
              onClick={runVisualizer}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Start Live Event Loop
            </button>
          </div>
        </div>

        {/* Console output column */}
        <div className="w-1/3 flex flex-col">
          <div className="bg-gray-900 text-green-400 p-3 rounded h-[360px] overflow-y-auto">
            <div className="font-semibold mb-2">Console Output (real order)</div>
            <div className="space-y-1">
              {consoleLogs.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm"
                >
                  {c}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-3 p-2 bg-gray-100 rounded text-sm">
            <div className="font-semibold">Notes</div>
            <ul className="text-xs list-disc ml-4 mt-1">
              <li>Animations are visual only — execution timing follows the event loop engine.</li>
              <li>Microtasks (Promises) execute after current sync work and before macrotasks.</li>
              <li>Macrotasks (setTimeout) run after microtasks are flushed.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
