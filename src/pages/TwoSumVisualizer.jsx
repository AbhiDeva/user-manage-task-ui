// TwoSumVisualizer.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaRedo, FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * TwoSumVisualizer
 * Props:
 *  - initialCode: (string) the code text of the card (used to try to extract default nums/target)
 */
export default function TwoSumVisualizer({ initialCode = "" }) {
  // Try to auto-extract simple arrays and target from the code.
  // looking for patterns like: nums = [2,7,11,15] or function example in a string
  const extractFromCode = (code) => {
    if (!code) return null;
    // try to find an explicit example: nums = [..], target = X or example in comment
    const numsMatch = code.match(/\[ *(-?\d+(\s*,\s*-?\d+)*) *\]/);
    const targetMatch = code.match(/target\s*=\s*(-?\d+)/) || code.match(/target\s*:\s*(-?\d+)/);
    const nums = numsMatch ? numsMatch[0].replace(/\s/g, "") : null;
    try {
      return {
        nums: nums ? JSON.parse(nums) : [2, 7, 11, 15],
        target: targetMatch ? Number(targetMatch[1]) : 9,
      };
    } catch {
      return { nums: [2, 7, 11, 15], target: 9 };
    }
  };

  const extracted = extractFromCode(initialCode) || { nums: [2, 7, 11, 15], target: 9 };

  // mode tabs: Flow, Memory, Performance
  const [innerTab, setInnerTab] = useState("flow");
  const [nums, setNums] = useState(extracted.nums);
  const [target, setTarget] = useState(extracted.target);

  // runtime state
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [mapEntries, setMapEntries] = useState([]); // array of {key, val}
  const [found, setFound] = useState(null); // [i,j] or null
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(600); // ms delay per step
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const [iterations, setIterations] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  // helpers
  const resetState = () => {
    setCurrentIndex(-1);
    setMapEntries([]);
    setFound(null);
    setRunning(false);
    setIterations(0);
    setElapsedMs(0);
    startTimeRef.current = null;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    resetState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nums.join(","), target]);

  // single step of the algorithm (non-blocking)
//   const step = () => {
//     // if already found or finished
//     if (found || currentIndex >= nums.length - 1) {
//       setRunning(false);
//       return;
//     }

//     const i = currentIndex + 1;
//     setCurrentIndex(i);
//     setIterations((s) => s + 1);

//     // complement
//     const val = nums[i];
//     const complement = target - val;

//     // check map for complement
//     const entry = mapEntries.find((e) => e.key === complement);
//     if (entry) {
//       // found
//       setFound([entry.val, i]);
//       setMapEntries((m) => m.slice()); // trigger re-render
//       // set elapsed time
//       if (startTimeRef.current) setElapsedMs(Date.now() - startTimeRef.current);
//       setRunning(false);
//       return;
//     }

//     // otherwise insert
//     setTimeout(() => {
//       setMapEntries((m) => [...m, { key: val, val: i, time: Date.now() }]);
//     }, speed / 4); // slight delay for insertion visual

//     // continue if running
//     timerRef.current = setTimeout(() => {
//       // update elapsed
//       if (startTimeRef.current) setElapsedMs(Date.now() - startTimeRef.current);

//       if (i < nums.length - 1 && running) {
//         step();
//       } else {
//         // reached last index without finding
//         if (!found) {
//           setRunning(false);
//           if (startTimeRef.current) setElapsedMs(Date.now() - startTimeRef.current);
//         }
//       }
//     }, speed);
//   };

const step = () => {
  // if already found or finished
  if (found || currentIndex >= nums.length - 1) {
    setRunning(false);
    return;
  }

  const i = currentIndex + 1;
  setCurrentIndex(i);
  setIterations((s) => s + 1);

  const val = nums[i];
  const complement = target - val;

  // check map for complement
  const entry = mapEntries.find((e) => e.key === complement);

  if (entry) {
    // found ✅ stop everything immediately
    setFound([entry.val, i]);
    setMapEntries((m) => m.slice());
    if (startTimeRef.current) setElapsedMs(Date.now() - startTimeRef.current);

    // clear timer and stop run
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setRunning(false);
    return;
  }

  // otherwise insert and continue
  setMapEntries((m) => [...m, { key: val, val: i, time: Date.now() }]);

  // continue only if not found
  if (i < nums.length - 1) {
    timerRef.current = setTimeout(() => {
      if (running && !found) {
        if (startTimeRef.current) setElapsedMs(Date.now() - startTimeRef.current);
        step();
      }
    }, speed);
  } else {
    setRunning(false);
    if (startTimeRef.current) setElapsedMs(Date.now() - startTimeRef.current);
  }
};


  // play/pause handlers
  const handlePlay = () => {
    if (running) return;
    setRunning(true);
    // set start time if first step
    if (!startTimeRef.current) startTimeRef.current = Date.now();

    // if we haven't started yet, begin stepping
    if (currentIndex === -1) {
      step();
    } else {
      // resume stepping
      timerRef.current = setTimeout(step, speed);
    }
  };

  const handlePause = () => {
    setRunning(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (startTimeRef.current) setElapsedMs(Date.now() - startTimeRef.current);
  };

//   const handleReset = () => {
//     resetState();
//     // small delay to allow visuals to clear
//     setTimeout(() => {
//       setNums((s) => [...s]);
//     }, 50);
//   };

const handleReset = () => {
  if (timerRef.current) {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }
  resetState();
  setTimeout(() => {
    setNums((s) => [...s]);
  }, 50);
};


  // manual next / prev (useful for stepping manually)
  const handleNext = () => {
    if (found || currentIndex >= nums.length - 1) return;
    setRunning(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    // single step without auto loop
    const i = currentIndex + 1;
    setCurrentIndex(i);
    setIterations((s) => s + 1);
    const val = nums[i];
    const complement = target - val;
    const entry = mapEntries.find((e) => e.key === complement);
    if (entry) {
      setFound([entry.val, i]);
      if (startTimeRef.current) setElapsedMs(Date.now() - startTimeRef.current);
      return;
    }
    setMapEntries((m) => [...m, { key: val, val: i, time: Date.now() }]);
    if (!startTimeRef.current) startTimeRef.current = Date.now();
  };

  const handlePrev = () => {
    // Only allow stepping back while not running.
    if (running) return;
    if (currentIndex <= -1) return;
    // remove last inserted if it matches currentIndex
    const last = mapEntries[mapEntries.length - 1];
    setMapEntries((m) => {
      const copy = [...m];
      if (last && last.val === currentIndex) copy.pop();
      return copy;
    });
    setCurrentIndex((c) => c - 1);
    setIterations((s) => Math.max(0, s - 1));
    setFound(null);
  };

  // when running is toggled on, start stepping (effect)
  useEffect(() => {
    if (running) {
      // if we are mid-run and currentIndex -1, start immediate step
      if (currentIndex === -1) step();
      else timerRef.current = setTimeout(step, speed);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
    // cleanup on unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, speed]);

  // UI helpers for drawing arrow positions: use refs to boxes to compute coordinates
  const itemRefs = useRef([]);
  itemRefs.current = [];
  const setItemRef = (el, idx) => {
    itemRefs.current[idx] = el;
  };

  const mapRef = useRef(null);

  // compute arrow coordinates for current lookup to complement (if present in array as index)
  const getArrowCoords = () => {
    if (currentIndex < 0) return null;
    const fromEl = itemRefs.current[currentIndex];
    if (!fromEl) return null;
    const complement = target - nums[currentIndex];
    // find index in array of the complement (if exists)
    const complementIndex = nums.findIndex((n, idx) => n === complement && idx !== currentIndex && idx <= currentIndex);
    // Allow pointing to earlier indices (which would be in map) — otherwise point to map box
    if (complementIndex !== -1) {
      const toEl = itemRefs.current[complementIndex];
      if (!toEl) return null;
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      return {
        from: { x: fromRect.right - 8, y: fromRect.top + fromRect.height / 2 },
        to: { x: toRect.left + 8, y: toRect.top + toRect.height / 2 },
      };
    } else {
      // Point from item to the map area (mapRef)
      if (!mapRef.current) return null;
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = mapRef.current.getBoundingClientRect();
      return {
        from: { x: fromRect.right - 8, y: fromRect.top + fromRect.height / 2 },
        to: { x: toRect.left + 12, y: toRect.top + 20 },
      };
    }
  };

  const arrowCoords = getArrowCoords();

  // small helper: update nums from text input
  const handleNumsChange = (text) => {
    const arr = text
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !Number.isNaN(n));
    if (arr.length) setNums(arr);
  };

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => (running ? handlePause() : handlePlay())}
            className="px-3 py-2 bg-gray-800 text-white rounded-md"
            title="Play / Pause"
          >
            {running ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handlePrev} className="px-3 py-2 bg-gray-200 rounded-md" title="Prev">
            <FaChevronLeft />
          </button>
          <button onClick={handleNext} className="px-3 py-2 bg-gray-200 rounded-md" title="Next">
            <FaChevronRight />
          </button>
          <button onClick={handleReset} className="px-3 py-2 bg-gray-200 rounded-md" title="Reset">
            <FaRedo />
          </button>

          <label className="ml-3 text-sm text-gray-700">Speed</label>
          <input
            type="range"
            min="150"
            max="1200"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="mx-2"
            style={{ width: 150 }}
          />
          <span className="text-sm text-gray-700">{Math.round(speed)}ms</span>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-gray-200 rounded-md px-2 py-1">
            <label className="text-sm text-gray-700">nums</label>
            <input
              className="bg-transparent outline-none text-sm px-1"
              value={nums.join(",")}
              onChange={(e) => handleNumsChange(e.target.value)}
              disabled={running}
            />
          </div>
          <div className="flex items-center gap-2 bg-gray-200 rounded-md px-2 py-1">
            <label className="text-sm text-gray-700">target</label>
            <input
              className="bg-transparent outline-none text-sm px-1 w-16"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              disabled={running}
              type="number"
            />
          </div>
        </div>
      </div>

      {/* Inner tabs: Flow / Memory / Performance */}
      <div className="mb-4">
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-md ${innerTab === "flow" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}`}
            onClick={() => setInnerTab("flow")}
          >
            Flow
          </button>
          <button
            className={`px-3 py-1 rounded-md ${innerTab === "memory" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}`}
            onClick={() => setInnerTab("memory")}
          >
            Memory Map
          </button>
          <button
            className={`px-3 py-1 rounded-md ${innerTab === "perf" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}`}
            onClick={() => setInnerTab("perf")}
          >
            Performance
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        {/* FLOW Tab */}
        <div className={`${innerTab !== "flow" ? "hidden" : ""}`}>
          <div className="mb-4">
            <div className="flex gap-3 items-center overflow-x-auto pb-2">
              {nums.map((n, idx) => (
                <div
                  key={idx}
                  ref={(el) => setItemRef(el, idx)}
                  className={`min-w-[56px] h-12 flex items-center justify-center rounded-md border ${
                    idx === currentIndex
                      ? "bg-gray-800 text-white border-gray-900 scale-105"
                      : found && found.includes(idx)
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-800"
                  } transition-shadow`}
                >
                  <div className="text-sm font-mono">{n}</div>
                </div>
              ))}
            </div>

            {/* Arrow canvas (absolute positioned) */}
            <div className="relative h-28">
              {/* draw an svg arrow if we have coordinates */}
              {arrowCoords && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 z" fill="#374151" />
                    </marker>
                  </defs>
                  <line
                    x1={arrowCoords.from.x - arrowCoords.from.x /* use absolute coords adjusted */ ? arrowCoords.from.x : 0}
                    y1={arrowCoords.from.y}
                    x2={arrowCoords.to.x}
                    y2={arrowCoords.to.y}
                    stroke="#374151"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                </svg>
              )}
              <div className="absolute left-0 right-0 top-0 flex justify-center">
                <div className="text-xs text-gray-600">Visualization of lookups — arrows point to map / complement</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-2 text-gray-700">Map (hash)</h4>
              <div ref={mapRef} className="min-h-[120px] border border-gray-200 rounded-md p-2 bg-white">
                <div className="flex flex-wrap gap-2">
                  {mapEntries.length === 0 && <div className="text-sm text-gray-500">Empty</div>}
                  {mapEntries.map((e, i) => (
                    <motion.div
                      key={`${e.key}-${e.val}-${i}`}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`px-3 py-1 rounded-md border text-sm ${
                        found && (found[0] === e.val || found[1] === e.val) ? "bg-green-200 border-green-400" : "bg-gray-100 border-gray-300"
                      }`}
                    >
                      {e.key} → {e.val}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2 text-gray-700">Notes & Status</h4>
              <div className="min-h-[120px] border border-gray-200 rounded-md p-3 bg-white text-sm">
                <div>
                  <b>Current index:</b> {currentIndex >= 0 ? currentIndex : "—"}
                </div>
                <div>
                  <b>Checked value:</b> {currentIndex >= 0 ? nums[currentIndex] : "—"}
                </div>
                <div>
                  <b>Complement:</b> {currentIndex >= 0 ? target - nums[currentIndex] : "—"}
                </div>
                <div className="mt-2">
                  {found ? (
                    <div className="text-sm text-green-700 font-medium">✅ Found pair: [{found.join(", ")}]</div>
                  ) : currentIndex === -1 ? (
                    <div className="text-sm text-gray-600">Press Play to start visualisation</div>
                  ) : (
                    <div className="text-sm text-gray-600">Searching…</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MEMORY MAP Tab */}
        <div className={`${innerTab !== "memory" ? "hidden" : ""}`}>
          <h4 className="text-sm font-semibold mb-2 text-gray-700">Full Map Timeline</h4>
          <div className="min-h-[160px] border border-gray-200 rounded-md p-3 bg-white overflow-auto">
            {mapEntries.length === 0 && <div className="text-sm text-gray-500">Empty</div>}
            <div className="space-y-2">
              {mapEntries.map((e, i) => (
                <motion.div
                  key={`${e.key}-${e.val}-${i}`}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.25 + i * 0.01 }}
                  className="flex items-center justify-between bg-gray-100 rounded-md p-2 border border-gray-200"
                >
                  <div className="text-sm font-mono">{e.key} → {e.val}</div>
                  <div className="text-xs text-gray-500">{new Date(e.time).toLocaleTimeString()}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* PERFORMANCE Tab */}
        <div className={`${innerTab !== "perf" ? "hidden" : ""}`}>
          <h4 className="text-sm font-semibold mb-2 text-gray-700">Performance</h4>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="p-3 bg-white border border-gray-200 rounded-md text-sm">
              <div className="text-xs text-gray-500">Iterations</div>
              <div className="text-lg font-medium">{iterations}</div>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-md text-sm">
              <div className="text-xs text-gray-500">Elapsed Time (ms)</div>
              <div className="text-lg font-medium">{elapsedMs}</div>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-md text-sm">
              <div className="text-xs text-gray-500">Map Size</div>
              <div className="text-lg font-medium">{mapEntries.length}</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white border border-gray-200 rounded-md text-sm">
            <div><b>Complexity (theoretical):</b></div>
            <div>Time: O(n) — single pass with Map lookups</div>
            <div>Space: O(n) — additional Map storage</div>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            Tip: adjust the speed and step through to watch how runtime and map size grow with input.
          </div>
        </div>
      </div>
    </div>
  );
}
