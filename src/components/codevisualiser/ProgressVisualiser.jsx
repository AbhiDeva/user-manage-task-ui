import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Default Tailwind-based React component
// Usage: drop this file in a CRA/Vite React app and import <ProgressVisualiser /> where you want it.

export default function ProgressVisualiser() {
  const [jobs, setJobs] = useState([]); // { id, progress, status: 'queued'|'running'|'done', duration }
  const [durationSec, setDurationSec] = useState(4); // default 4s (user requested 3-5s)
  const [concurrency, setConcurrency] = useState(3);
  const nextId = useRef(1);
  const runningCount = useRef(0);
  const timers = useRef(new Map());

  useEffect(() => {
    // cleanup on unmount
    return () => {
      timers.current.forEach((t) => clearInterval(t));
      timers.current.clear();
    };
  }, []);

  function pushJob() {
    const id = nextId.current++;
    const job = { id, progress: 0, status: "queued", duration: durationSec };
    setJobs((s) => [...s, job]);
    // try to start
    setTimeout(tryStartNext, 0);
  }

  function tryStartNext() {
    setJobs((currentJobs) => {
      const currentlyRunning = currentJobs.filter((j) => j.status === "running").length;
      const toStartIndex = currentJobs.findIndex((j) => j.status === "queued");
      if (toStartIndex === -1) return currentJobs; // nothing queued
      if (currentlyRunning >= concurrency) return currentJobs; // can't start yet

      // start the queued job (the earliest queued)
      const updated = currentJobs.map((j, idx) => {
        if (idx === toStartIndex) return { ...j, status: "running" };
        return j;
      });

      // actually start its timer after state commit
      const startedJobId = updated[toStartIndex].id;
      startProgressTimer(startedJobId);
      return updated;
    });
  }

  function startProgressTimer(jobId) {
    // prevent double-start
    if (timers.current.has(jobId)) return;

    const tickMs = 100; // update every 100ms
    const job = jobs.find((j) => j.id === jobId) || null;
    // read duration from latest state when started
    // We'll set up an interval that increments progress towards 100 in (duration * 1000) ms

    // We compute increment per tick dynamically to avoid drift
    setJobs((cur) => {
      const found = cur.find((c) => c.id === jobId);
      const duration = found ? found.duration : durationSec;
      const totalTicks = Math.max(1, Math.round((duration * 1000) / tickMs));
      const inc = 100 / totalTicks;

      let ticks = 0;
      const id = setInterval(() => {
        ticks += 1;
        setJobs((inner) => {
          return inner.map((j) => {
            if (j.id !== jobId) return j;
            const newProgress = Math.min(100, +(j.progress + inc).toFixed(2));
            if (newProgress >= 100) {
              // finish
              clearInterval(id);
              timers.current.delete(jobId);
              // mark done and schedule next queued start
              setTimeout(() => {
                setJobs((prev) => prev.map((x) => (x.id === jobId ? { ...x, progress: 100, status: "done" } : x)));
                // after marking done, try to start next queued job
                setTimeout(tryStartNext, 0);
              }, 0);
            }
            return { ...j, progress: newProgress };
          });
        });
      }, tickMs);

      timers.current.set(jobId, id);
      return cur;
    });
  }

  function clearAll() {
    timers.current.forEach((t) => clearInterval(t));
    timers.current.clear();
    setJobs([]);
    nextId.current = 1;
  }

  // When concurrency or duration changes we should try to start queued jobs
  useEffect(() => {
    tryStartNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concurrency]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Progress Bar Visualiser</h2>

      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <div className="flex gap-2 items-center">
          <button
            className="px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 shadow"
            onClick={pushJob}
          >
            Add Progress Bar
          </button>
          <button
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={clearAll}
          >
            Clear All
          </button>
        </div>

        <label className="flex items-center gap-2">
          <span className="text-sm">Duration (secs):</span>
          <input
            type="range"
            min={3}
            max={8}
            value={durationSec}
            onChange={(e) => setDurationSec(Number(e.target.value))}
            className="w-40"
          />
          <span className="w-8 text-sm">{durationSec}s</span>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-sm">Concurrency:</span>
          <input
            type="number"
            min={1}
            max={10}
            value={concurrency}
            onChange={(e) => setConcurrency(Math.max(1, Number(e.target.value) || 1))}
            className="w-16 px-2 py-1 border rounded"
          />
        </label>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              layout
              className="p-3 bg-white rounded shadow-sm border"
            >
              <div className="flex justify-between items-center gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="font-mono text-sm">#{job.id}</div>
                  <div className="text-sm text-gray-600">{job.status.toUpperCase()}</div>
                </div>
                <div className="text-sm text-gray-500">{Math.round(job.progress)}%</div>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
                <motion.div
                  className={`h-full rounded-lg shadow-inner ${job.status === 'running' ? 'bg-gradient-to-r from-sky-400 via-sky-600 to-sky-700' : job.status === 'done' ? 'bg-green-500' : 'bg-gray-400'}`}
                  initial={false}
                  animate={{ width: `${job.progress}%` }}
                  transition={{ ease: "linear", duration: 0.12 }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <strong>How throttling works:</strong> Only <strong>{concurrency}</strong> progress bars run simultaneously. New ones wait in the queue until a running bar completes.
      </div>
    </div>
  );
}
