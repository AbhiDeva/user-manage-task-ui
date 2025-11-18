// import React, { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowRightCircle,
//   Zap,
//   Clock,
//   Activity,
//   PlayCircle,
//   Layers,
//   Monitor
// } from "lucide-react";

// // ScriptLoadingVisualizer: enhanced with arrows, timeline, waterfall, multiple scripts,
// // and a simplified browser rendering preview. This component is self-contained and
// // simulates network/download/execute timings for visual explanation.

// const DEFAULT_SCRIPTS = [
//   { id: 1, name: "analytics.js", attr: "normal", sizeKb: 50 },
//   { id: 2, name: "widget.js", attr: "async", sizeKb: 120 },
//   { id: 3, name: "app.js", attr: "defer", sizeKb: 200 }
// ];

// function randRange(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function formatMs(ms) {
//   return `${Math.round(ms)}ms`;
// }

// export default function ScriptLoadingVisualizer() {
//   const [scripts, setScripts] = useState(DEFAULT_SCRIPTS);
//   const [runId, setRunId] = useState(0); // bump to re-run simulation
//   const [scale, setScale] = useState(1); // timeline zoom

//   const totalSize = useMemo(() => scripts.reduce((s, x) => s + x.sizeKb, 0), [scripts]);

//   function addScript() {
//     const nextId = scripts.length ? Math.max(...scripts.map((s) => s.id)) + 1 : 1;
//     setScripts((p) => [
//       ...p,
//       {
//         id: nextId,
//         name: `extra-${nextId}.js`,
//         attr: ["normal", "async", "defer"][randRange(0, 2)],
//         sizeKb: randRange(20, 300)
//       }
//     ]);
//   }

//   function removeScript(id) {
//     setScripts((p) => p.filter((s) => s.id !== id));
//   }

//   // Build a simulated timeline (ms). We will simulate:
//   // - HTML parsing: starts at 0, duration depends on size of HTML (fixed here)
//   // - For each script: download start/finish, execute time depending on attribute
//   function simulate() {
//     const htmlParseTime = 400; // ms - time to parse main HTML
//     const baseDownloadPerKb = 2; // ms per KB (simulated)

//     // download start times: normal scripts block parsing, async/defer download in parallel
//     // simulate network concurrency with staggered starts for async/defer

//     let now = 0;
//     const timeline = [];

//     // HTML parsing starts
//     timeline.push({ type: "parse:start", t: now, dur: htmlParseTime });
//     now += htmlParseTime;

//     // For accurate visuals we will instead produce per-script traces with start/download/exec
//     const traces = scripts.map((s) => {
//       const downloadTime = Math.max(50, s.sizeKb * baseDownloadPerKb + randRange(-80, 80));
//       // Determine when download begins:
//       let dlStart = 0;
//       if (s.attr === "normal") {
//         // normal: parser blocks at encountering script -> download starts at encounter
//         // we'll simulate encounter at 120ms into parsing
//         dlStart = 120;
//       } else {
//         // async/defer: download can start as soon as resource is discovered (parallel)
//         dlStart = 50 + randRange(0, 120);
//       }

//       const dlEnd = dlStart + downloadTime;

//       // Execution time: minimal + some random
//       const execTime = 30 + randRange(0, 120);

//       // Execution start depends on attribute:
//       // normal: execution starts immediately when download finishes and blocks parsing
//       // async: execution starts immediately when download finishes (may interrupt parse)
//       // defer: execution starts after parsing finishes, in document order

//       return {
//         ...s,
//         dlStart,
//         dlEnd,
//         downloadTime,
//         execTime,
//         execStart: null,
//         execEnd: null
//       };
//     });

//     // Determine execution times taking into account blocking behaviour
//     // First: sort normal scripts by dlEnd encounter order
//     const normalOrder = traces.filter((t) => t.attr === "normal").sort((a, b) => a.dlStart - b.dlStart);
//     const asyncOnes = traces.filter((t) => t.attr === "async");
//     const deferOnes = traces.filter((t) => t.attr === "defer").sort((a, b) => a.id - b.id);

//     // Simulate timeline with parser state
//     let parserTime = 0;
//     let parseCompleted = false;
//     const events = [];

//     // Parser starts at 0 and proceeds until maybe blocked by normal script execution
//     parserTime = 0;
//     const parserProgressEvent = { type: "parser", start: 0, end: htmlParseTime };

//     // We'll compute execStart/execEnd for each script

//     // Normal scripts: when parser hits them (dlStart approximate), parser pauses for download+exec
//     normalOrder.forEach((n) => {
//       // parser reaches script at n.dlStart (if parser hasn't already passed)
//       const encounter = Math.min(n.dlStart, htmlParseTime);
//       // If download hasn't finished by encounter, parser waits for download
//       let execStart = Math.max(n.dlEnd, encounter);
//       n.execStart = execStart;
//       n.execEnd = execStart + n.execTime;
//       // parser resumes after execEnd (if it was parsing)
//     });

//     // Async: execute whenever download finishes (may interleave)
//     asyncOnes.forEach((a) => {
//       a.execStart = a.dlEnd;
//       a.execEnd = a.execStart + a.execTime;
//     });

//     // Defer: execute after parsing completes (htmlParseTime) and in document order
//     let deferCursor = htmlParseTime;
//     deferOnes.forEach((d) => {
//       d.execStart = Math.max(d.dlEnd, deferCursor);
//       d.execEnd = d.execStart + d.execTime;
//       deferCursor = d.execEnd;
//     });

//     // If a normal script's execStart pushes parsing further, adjust defer exec times
//     const parsingBlockersEnd = normalOrder.reduce((acc, n) => Math.max(acc, n.execEnd || 0), 0);
//     const finalParseEnd = Math.max(htmlParseTime, parsingBlockersEnd);

//     // Adjust defer scripts to execute after finalParseEnd if needed
//     let cursor = finalParseEnd;
//     deferOnes.forEach((d) => {
//       d.execStart = Math.max(d.execStart, cursor);
//       d.execEnd = d.execStart + d.execTime;
//       cursor = d.execEnd;
//     });

//     // Merge traces back
//     const finalTraces = traces.map((t) => {
//       const execStart = t.execStart !== null ? t.execStart : (t.attr === "defer" ? htmlParseTime : t.dlEnd);
//       const execEnd = execStart + t.execTime;
//       return { ...t, execStart, execEnd };
//     });

//     // Build visual timeline items for UI
//     return { parser: { start: 0, end: finalParseEnd }, traces: finalTraces };
//   }

//   const sim = useMemo(() => simulate(), [scripts, runId]);

//   // Helper to restart the simulation
//   function rerun() {
//     setRunId((r) => r + 1);
//   }

//   // Controls UI only; heavy animation handled in render
//   return (
//     <div className="w-full min-h-screen p-6 bg-slate-900 text-slate-50">
//       <header className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">Script Loading Visualiser — Interactive</h1>
//           <p className="text-sm text-slate-300 mt-1 max-w-xl">
//             Visual explanation of <code>&lt;script&gt;</code>, <code>async</code>, and <code>defer</code> with
//             arrow animations, timeline, waterfall network view, multiple scripts, and a browser preview.
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600"
//             onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
//           >
//             -
//           </button>
//           <div className="px-3 py-1 rounded bg-slate-800">zoom: {scale}x</div>
//           <button className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600" onClick={() => setScale((s) => s + 0.25)}>
//             +
//           </button>
//           <button className="ml-2 px-3 py-1 rounded bg-emerald-500 text-black" onClick={rerun}>
//             Run
//           </button>
//           <button className="ml-2 px-3 py-1 rounded bg-sky-600" onClick={addScript}>
//             Add script
//           </button>
//         </div>
//       </header>

//       <main className="mt-6 grid grid-cols-12 gap-6">
//         {/* Left column: controls & script list */}
//         <section className="col-span-4 bg-slate-800 p-4 rounded-xl shadow">
//           <h2 className="font-medium">Scripts</h2>
//           <div className="mt-3 space-y-3">
//             {scripts.map((s) => (
//               <div key={s.id} className="flex items-center justify-between gap-3 bg-slate-700/40 p-2 rounded">
//                 <div>
//                   <div className="font-medium">{s.name}</div>
//                   <div className="text-xs text-slate-300">attr: {s.attr} • size: {s.sizeKb} KB</div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <select
//                     value={s.attr}
//                     onChange={(e) =>
//                       setScripts((p) => p.map((x) => (x.id === s.id ? { ...x, attr: e.target.value } : x)))
//                     }
//                     className="bg-slate-700 text-slate-50 rounded px-2 py-1 text-sm"
//                   >
//                     <option value="normal">(none)</option>
//                     <option value="async">async</option>
//                     <option value="defer">defer</option>
//                   </select>
//                   <button onClick={() => removeScript(s.id)} className="px-2 py-1 rounded bg-red-600 text-sm">
//                     remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-4 text-sm text-slate-300">
//             <div>Total size: {totalSize} KB</div>
//             <div className="mt-2">Tip: change attributes and press <strong>Run</strong> to see differences.</div>
//           </div>
//         </section>

//         {/* Right column: visual timeline + waterfall + preview */}
//         <section className="col-span-8 space-y-4">
//           {/* Timeline */}
//           <div className="bg-slate-800 p-4 rounded-xl shadow">
//             <div className="flex items-center justify-between">
//               <h3 className="font-medium">Timeline</h3>
//               <div className="text-xs text-slate-300">Zoom controls affect timeline scale</div>
//             </div>

//             <div className="mt-4">
//               <div className="relative h-40 overflow-x-auto overflow-y-hidden">
//                 <div className="absolute left-2 top-2 text-xs text-slate-400">0ms</div>

//                 {/* Parser bar */}
//                 <div className="absolute left-0 top-10 h-4 bg-slate-600 rounded" style={{ width: `${(sim.parser.end / (sim.parser.end + 300)) * 90}%` }} />

//                 {/* Script traces */}
//                 {sim.traces.map((t, i) => {
//                   const left = Math.max(0, (t.dlStart / (sim.parser.end + 400)) * 100);
//                   const dlWidth = Math.max(3, (t.downloadTime / (sim.parser.end + 400)) * 100);
//                   const execLeft = Math.max(0, (t.execStart / (sim.parser.end + 400)) * 100);
//                   const execWidth = Math.max(2, (t.execEnd - t.execStart) / (sim.parser.end + 400) * 100);

//                   return (
//                     <div key={t.id} className="absolute left-0 top-6" style={{ transform: `translateX(${left * scale}px)` }}>
//                       <div className="flex items-center gap-2">
//                         <div className="w-36 text-xs">{t.name} ({t.attr})</div>
//                         <div className="relative w-full h-6">
//                           {/* download */}
//                           <div
//                             className="absolute top-1 h-2 rounded"
//                             style={{ left: `${left}%`, width: `${dlWidth}%`, background: "linear-gradient(90deg,#60a5fa,#1e3a8a)" }}
//                           />

//                           {/* execute */}
//                           <div
//                             className="absolute top-1 h-2 rounded"
//                             style={{ left: `${execLeft}%`, width: `${execWidth}%`, background: t.attr === "defer" ? "#34d399" : "#fb923c" }}
//                           />

//                           {/* arrow from download end to execute start */}
//                           <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: i * 0.15 }}
//                             className="absolute -top-4 text-xs flex items-center gap-2"
//                             style={{ left: `${Math.min(95, execLeft)}%` }}
//                           >
//                             <ArrowRightCircle size={14} />
//                             <span className="text-xs">{formatMs(t.downloadTime)} dl • exec {formatMs(t.execTime)}</span>
//                           </motion.div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Waterfall / Network view */}
//           <div className="bg-slate-800 p-4 rounded-xl shadow">
//             <h3 className="font-medium">Waterfall / Network</h3>
//             <div className="mt-3 space-y-2">
//               {sim.traces.map((t) => (
//                 <div key={t.id} className="flex items-center gap-3">
//                   <div className="w-40 text-sm">{t.name}</div>
//                   <div className="flex-1 h-6 bg-slate-700/30 rounded relative overflow-hidden">
//                     <div
//                       className="absolute left-0 top-0 bottom-0"
//                       style={{ width: `${(t.dlStart / (sim.parser.end + 400)) * 100}%`, background: "transparent" }}
//                     />
//                     <motion.div
//                       initial={{ width: 0 }}
//                       animate={{ width: `${(t.downloadTime / (sim.parser.end + 400)) * 100}%` }}
//                       transition={{ duration: Math.min(1.8, t.downloadTime / 800) }}
//                       className="absolute top-0 bottom-0 bg-gradient-to-r from-sky-500 to-indigo-700"
//                       style={{ left: `${(t.dlStart / (sim.parser.end + 400)) * 100}%` }}
//                     />
//                     {/* execution marker */}
//                     <div
//                       className="absolute top-0 bottom-0"
//                       style={{ left: `${(t.execStart / (sim.parser.end + 400)) * 100}%`, width: 2, background: t.attr === "defer" ? "#10b981" : "#f97316" }}
//                     />
//                   </div>
//                   <div className="w-28 text-xs text-slate-300">dl: {formatMs(t.downloadTime)} • exec: {formatMs(t.execTime)}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Browser-like preview */}
//           <div className="bg-slate-800 p-4 rounded-xl shadow">
//             <div className="flex items-center justify-between">
//               <h3 className="font-medium">Browser Rendering Preview</h3>
//               <div className="text-xs text-slate-300">Shows parsing / blocking behaviour</div>
//             </div>

//             <div className="mt-3 grid grid-cols-3 gap-4">
//               <div className="col-span-2 bg-white text-black p-4 rounded">
//                 <div className="text-sm font-medium">DOM (document)</div>
//                 <div className="mt-2 text-xs text-slate-800">
//                   <div>• HTML parsing ends at: <strong>{formatMs(sim.parser.end)}</strong></div>
//                   <div className="mt-2">• Script execution order:</div>
//                   <ol className="ml-4 mt-1 list-decimal text-xs">
//                     {sim.traces
//                       .slice()
//                       .sort((a, b) => a.execStart - b.execStart)
//                       .map((t) => (
//                         <li key={t.id} className="mt-1">
//                           {t.name} — <span className="text-slate-600">{t.attr}</span> — executed at {formatMs(t.execStart)}
//                         </li>
//                       ))}
//                   </ol>
//                 </div>
//               </div>

//               <div className="bg-white text-black p-4 rounded">
//                 <div className="text-sm font-medium">Live frame</div>
//                 <div className="mt-3 text-xs">
//                   <div>• Content visible while parsing: <strong>Header, skeleton</strong></div>
//                   <div className="mt-2">• Blocking scripts pause DOM updates until executed.</div>
//                   <div className="mt-3">
//                     <div className="p-2 border rounded bg-slate-50 text-xs text-slate-800">Rendered at {formatMs(Math.max(0, sim.parser.end))}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className="mt-6 text-xs text-slate-400">Tip: Try adding many async scripts to see race conditions in execution order.</footer>
//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRightCircle,
  Zap,
  Clock,
  Activity,
  PlayCircle,
  Layers,
  Monitor
} from "lucide-react";

// ScriptLoadingVisualizer: enhanced with arrows, timeline, waterfall, multiple scripts,
// and a simplified browser rendering preview. This component is self-contained and
// simulates network/download/execute timings for visual explanation.

const DEFAULT_SCRIPTS = [
  { id: 1, name: "analytics.js", attr: "normal", sizeKb: 50 },
  { id: 2, name: "widget.js", attr: "async", sizeKb: 120 },
  { id: 3, name: "app.js", attr: "defer", sizeKb: 200 }
];

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatMs(ms) {
  return `${Math.round(ms)}ms`;
}

export default function ScriptLoadingVisualizer() {
  const [scripts, setScripts] = useState(DEFAULT_SCRIPTS);
  const [runId, setRunId] = useState(0); // bump to re-run simulation
  const [scale, setScale] = useState(1); // timeline zoom

  const totalSize = useMemo(() => scripts.reduce((s, x) => s + x.sizeKb, 0), [scripts]);

  function addScript() {
    const nextId = scripts.length ? Math.max(...scripts.map((s) => s.id)) + 1 : 1;
    setScripts((p) => [
      ...p,
      {
        id: nextId,
        name: `extra-${nextId}.js`,
        attr: ["normal", "async", "defer"][randRange(0, 2)],
        sizeKb: randRange(20, 300)
      }
    ]);
  }

  function removeScript(id) {
    setScripts((p) => p.filter((s) => s.id !== id));
  }

  // Build a simulated timeline (ms). We will simulate:
  // - HTML parsing: starts at 0, duration depends on size of HTML (fixed here)
  // - For each script: download start/finish, execute time depending on attribute
  function simulate() {
    const htmlParseTime = 400; // ms - time to parse main HTML
    const baseDownloadPerKb = 2; // ms per KB (simulated)

    // download start times: normal scripts block parsing, async/defer download in parallel
    // simulate network concurrency with staggered starts for async/defer

    let now = 0;
    const timeline = [];

    // HTML parsing starts
    timeline.push({ type: "parse:start", t: now, dur: htmlParseTime });
    now += htmlParseTime;

    // For accurate visuals we will instead produce per-script traces with start/download/exec
    const traces = scripts.map((s) => {
      const downloadTime = Math.max(50, s.sizeKb * baseDownloadPerKb + randRange(-80, 80));
      // Determine when download begins:
      let dlStart = 0;
      if (s.attr === "normal") {
        // normal: parser blocks at encountering script -> download starts at encounter
        // we'll simulate encounter at 120ms into parsing
        dlStart = 120;
      } else {
        // async/defer: download can start as soon as resource is discovered (parallel)
        dlStart = 50 + randRange(0, 120);
      }

      const dlEnd = dlStart + downloadTime;

      // Execution time: minimal + some random
      const execTime = 30 + randRange(0, 120);

      // Execution start depends on attribute:
      // normal: execution starts immediately when download finishes and blocks parsing
      // async: execution starts immediately when download finishes (may interrupt parse)
      // defer: execution starts after parsing finishes, in document order

      return {
        ...s,
        dlStart,
        dlEnd,
        downloadTime,
        execTime,
        execStart: null,
        execEnd: null
      };
    });

    // Determine execution times taking into account blocking behaviour
    // First: sort normal scripts by dlEnd encounter order
    const normalOrder = traces.filter((t) => t.attr === "normal").sort((a, b) => a.dlStart - b.dlStart);
    const asyncOnes = traces.filter((t) => t.attr === "async");
    const deferOnes = traces.filter((t) => t.attr === "defer").sort((a, b) => a.id - b.id);

    // Simulate timeline with parser state
    let parserTime = 0;
    let parseCompleted = false;
    const events = [];

    // Parser starts at 0 and proceeds until maybe blocked by normal script execution
    parserTime = 0;
    const parserProgressEvent = { type: "parser", start: 0, end: htmlParseTime };

    // We'll compute execStart/execEnd for each script

    // Normal scripts: when parser hits them (dlStart approximate), parser pauses for download+exec
    normalOrder.forEach((n) => {
      // parser reaches script at n.dlStart (if parser hasn't already passed)
      const encounter = Math.min(n.dlStart, htmlParseTime);
      // If download hasn't finished by encounter, parser waits for download
      let execStart = Math.max(n.dlEnd, encounter);
      n.execStart = execStart;
      n.execEnd = execStart + n.execTime;
      // parser resumes after execEnd (if it was parsing)
    });

    // Async: execute whenever download finishes (may interleave)
    asyncOnes.forEach((a) => {
      a.execStart = a.dlEnd;
      a.execEnd = a.execStart + a.execTime;
    });

    // Defer: execute after parsing completes (htmlParseTime) and in document order
    let deferCursor = htmlParseTime;
    deferOnes.forEach((d) => {
      d.execStart = Math.max(d.dlEnd, deferCursor);
      d.execEnd = d.execStart + d.execTime;
      deferCursor = d.execEnd;
    });

    // If a normal script's execStart pushes parsing further, adjust defer exec times
    const parsingBlockersEnd = normalOrder.reduce((acc, n) => Math.max(acc, n.execEnd || 0), 0);
    const finalParseEnd = Math.max(htmlParseTime, parsingBlockersEnd);

    // Adjust defer scripts to execute after finalParseEnd if needed
    let cursor = finalParseEnd;
    deferOnes.forEach((d) => {
      d.execStart = Math.max(d.execStart, cursor);
      d.execEnd = d.execStart + d.execTime;
      cursor = d.execEnd;
    });

    // Merge traces back
    const finalTraces = traces.map((t) => {
      const execStart = t.execStart !== null ? t.execStart : (t.attr === "defer" ? htmlParseTime : t.dlEnd);
      const execEnd = execStart + t.execTime;
      return { ...t, execStart, execEnd };
    });

    // Build visual timeline items for UI
    return { parser: { start: 0, end: finalParseEnd }, traces: finalTraces };
  }

  const sim = useMemo(() => simulate(), [scripts, runId]);

  // Helper to restart the simulation
  function rerun() {
    setRunId((r) => r + 1);
  }

  // Controls UI only; heavy animation handled in render
  return (
    <div className="w-full min-h-screen p-6 bg-slate-900 text-slate-50">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Script Loading Visualiser — Interactive</h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Visual explanation of <code>&lt;script&gt;</code>, <code>async</code>, and <code>defer</code> with
            arrow animations, timeline, waterfall network view, multiple scripts, and a browser preview.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600"
            onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
          >
            -
          </button>
          <div className="px-3 py-1 rounded bg-slate-800">zoom: {scale}x</div>
          <button className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600" onClick={() => setScale((s) => s + 0.25)}>
            +
          </button>
          <button className="ml-2 px-3 py-1 rounded bg-emerald-500 text-black" onClick={rerun}>
            Run
          </button>
          <button className="ml-2 px-3 py-1 rounded bg-sky-600" onClick={addScript}>
            Add script
          </button>
        </div>
      </header>

      <main className="mt-6 grid grid-cols-12 gap-6">
        {/* Left column: controls & script list */}
        <section className="col-span-4 bg-slate-800 p-4 rounded-xl shadow">
          <h2 className="font-medium">Scripts</h2>
          <div className="mt-3 space-y-3">
            {scripts.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-3 bg-slate-700/40 p-2 rounded">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-slate-300">attr: {s.attr} • size: {s.sizeKb} KB</div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={s.attr}
                    onChange={(e) =>
                      setScripts((p) => p.map((x) => (x.id === s.id ? { ...x, attr: e.target.value } : x)))
                    }
                    className="bg-slate-700 text-slate-50 rounded px-2 py-1 text-sm"
                  >
                    <option value="normal">(none)</option>
                    <option value="async">async</option>
                    <option value="defer">defer</option>
                  </select>
                  <button onClick={() => removeScript(s.id)} className="px-2 py-1 rounded bg-red-600 text-sm">
                    remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-slate-300">
            <div>Total size: {totalSize} KB</div>
            <div className="mt-2">Tip: change attributes and press <strong>Run</strong> to see differences.</div>
          </div>
        </section>

        {/* Right column: visual timeline + waterfall + preview */}
        <section className="col-span-8 space-y-4">
          {/* Timeline */}
          <div className="bg-slate-800 p-4 rounded-xl shadow">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Timeline</h3>
              <div className="text-xs text-slate-300">Zoom controls affect timeline scale</div>
            </div>

            <div className="mt-4">
              <div className="relative h-40 overflow-x-auto overflow-y-hidden">
                <div className="absolute left-2 top-2 text-xs text-slate-400">0ms</div>

                {/* Parser bar */}
                <div className="absolute left-0 top-10 h-4 bg-slate-600 rounded" style={{ width: `${(sim.parser.end / (sim.parser.end + 300)) * 90}%` }} />

                {/* Script traces */}
                {sim.traces.map((t, i) => {
                  const left = Math.max(0, (t.dlStart / (sim.parser.end + 400)) * 100);
                  const dlWidth = Math.max(3, (t.downloadTime / (sim.parser.end + 400)) * 100);
                  const execLeft = Math.max(0, (t.execStart / (sim.parser.end + 400)) * 100);
                  const execWidth = Math.max(2, (t.execEnd - t.execStart) / (sim.parser.end + 400) * 100);

                  return (
                    <div key={t.id} className="absolute left-0 top-6" style={{ transform: `translateX(${left * scale}px)` }}>
                      <div className="flex items-center gap-2">
                        <div className="w-36 text-xs">{t.name} ({t.attr})</div>
                        <div className="relative w-full h-6">
                          {/* download */}
                          <div
                            className="absolute top-1 h-2 rounded"
                            style={{ left: `${left}%`, width: `${dlWidth}%`, background: "linear-gradient(90deg,#60a5fa,#1e3a8a)" }}
                          />

                          {/* execute */}
                          <div
                            className="absolute top-1 h-2 rounded"
                            style={{ left: `${execLeft}%`, width: `${execWidth}%`, background: t.attr === "defer" ? "#34d399" : "#fb923c" }}
                          />

                          {/* arrow from download end to execute start */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.15 }}
                            className="absolute -top-4 text-xs flex items-center gap-2"
                            style={{ left: `${Math.min(95, execLeft)}%` }}
                          >
                            <ArrowRightCircle size={14} />
                            <span className="text-xs">{formatMs(t.downloadTime)} dl • exec {formatMs(t.execTime)}</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Waterfall / Network view */}
          <div className="bg-slate-800 p-4 rounded-xl shadow">
            <h3 className="font-medium">Waterfall / Network</h3>
            <div className="mt-3 space-y-2">
              {sim.traces.map((t) => (
                <div key={t.id} className="flex items-center gap-3">
                  <div className="w-40 text-sm">{t.name}</div>
                  <div className="flex-1 h-6 bg-slate-700/30 rounded relative overflow-hidden">
                    <div
                      className="absolute left-0 top-0 bottom-0"
                      style={{ width: `${(t.dlStart / (sim.parser.end + 400)) * 100}%`, background: "transparent" }}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(t.downloadTime / (sim.parser.end + 400)) * 100}%` }}
                      transition={{ duration: Math.min(1.8, t.downloadTime / 800) }}
                      className="absolute top-0 bottom-0 bg-gradient-to-r from-sky-500 to-indigo-700"
                      style={{ left: `${(t.dlStart / (sim.parser.end + 400)) * 100}%` }}
                    />
                    {/* execution marker */}
                    <div
                      className="absolute top-0 bottom-0"
                      style={{ left: `${(t.execStart / (sim.parser.end + 400)) * 100}%`, width: 2, background: t.attr === "defer" ? "#10b981" : "#f97316" }}
                    />
                  </div>
                  <div className="w-28 text-xs text-slate-300">dl: {formatMs(t.downloadTime)} • exec: {formatMs(t.execTime)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Browser-like preview */}
          <div className="bg-slate-800 p-4 rounded-xl shadow">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Browser Rendering Preview</h3>
              <div className="text-xs text-slate-300">Shows parsing / blocking behaviour</div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-white text-black p-4 rounded">
                <div className="text-sm font-medium">DOM (document)</div>
                <div className="mt-2 text-xs text-slate-800">
                  <div>• HTML parsing ends at: <strong>{formatMs(sim.parser.end)}</strong></div>
                  <div className="mt-2">• Script execution order:</div>
                  <ol className="ml-4 mt-1 list-decimal text-xs">
                    {sim.traces
                      .slice()
                      .sort((a, b) => a.execStart - b.execStart)
                      .map((t) => (
                        <li key={t.id} className="mt-1">
                          {t.name} — <span className="text-slate-600">{t.attr}</span> — executed at {formatMs(t.execStart)}
                        </li>
                      ))}
                  </ol>
                </div>
              </div>

              <div className="bg-white text-black p-4 rounded">
                <div className="text-sm font-medium">Live frame</div>
                <div className="mt-3 text-xs">
                  <div>• Content visible while parsing: <strong>Header, skeleton</strong></div>
                  <div className="mt-2">• Blocking scripts pause DOM updates until executed.</div>
                  <div className="mt-3">
                    <div className="p-2 border rounded bg-slate-50 text-xs text-slate-800">Rendered at {formatMs(Math.max(0, sim.parser.end))}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-6 text-xs text-slate-400">Tip: Try adding many async scripts to see race conditions in execution order.</footer>

{/* Advantages / Disadvantages / Use Cases */}
<div className="mt-10 bg-slate-800 p-6 rounded-xl shadow">
  <h2 className="text-xl font-semibold mb-4">Advantages, Disadvantages & Use Cases</h2>

  <div className="grid grid-cols-3 gap-6 text-sm">
    {/* Normal Script */}
    <div className="bg-slate-700/40 p-4 rounded-xl">
      <h3 className="font-medium text-lg mb-2">&lt;script&gt; (Normal)</h3>
      <p className="mt-2 text-slate-300">🔵 Default blocking script</p>
      <h4 className="font-medium mt-3">Advantages</h4>
      <ul className="list-disc ml-4 mt-1 text-slate-200">
        <li>Guaranteed execution order</li>
        <li>Useful for scripts that must run immediately</li>
      </ul>
      <h4 className="font-medium mt-3">Disadvantages</h4>
      <ul className="list-disc ml-4 mt-1 text-slate-200">
        <li>Blocks HTML parsing</li>
        <li>Slows page rendering</li>
      </ul>
      <h4 className="font-medium mt-3">Use Cases</h4>
      <ul className="list-disc ml-4 mt-1 text-slate-200">
        <li>Critical inline scripts</li>
        <li>Polyfills needed before any DOM code</li>
      </ul>
    </div>

    {/* Async Script */}
    <div className="bg-slate-700/40 p-4 rounded-xl">
      <h3 className="font-medium text-lg mb-2">&lt;script async&gt;</h3>
      <p className="mt-2 text-slate-300">🟢 Downloads in parallel, executes ASAP</p>
      <h4 className="font-medium mt-3">Advantages</h4>
      <ul className="list-disc ml-4 mt-1 text-slate-200">
        <li>Does not block parsing while downloading</li>
        <li>Fastest loading experience</li>
      </ul>
      <h4 className="font-medium mt-3">Disadvantages</h4>
      <ul className="list-disc ml-4 mt-1 text-slate-200">
        <li>Execution order not guaranteed</li>
        <li>Might interrupt parsing if execution triggers early</li>
      </ul>
      <h4 className="font-medium mt-3">Use Cases</h4>
      <ul className="list-disc ml-4 mt-1 text-slate-200">
        <li>Analytics scripts</li>
        <li>Ads, tracking, non-critical widgets</li>
        <li>Scripts independent from DOM</li>
      </ul>
    </div>

    {/* Defer Script */}
    <div className="bg-slate-700/40 p-4 rounded-xl">
      <h3 className="font-medium text-lg mb-2">&lt;script defer&gt;</h3>
      <p className="mt-2 text-slate-300">🟡 Downloads in parallel, executes after parsing</p>
      <h4 className="font-medium mt-3">Advantages</h4>
      <ul className="list-disc ml-4 mt-1 text-slate-200">
        <li>No blocking of HTML parsing</li>
        <li>Preserves script execution order</li>
        <li>Great for DOM-dependent scripts</li>
      </ul>
      <h4 className="font-medium mt-3">Disadvantages</h4>
      <ul className="list-disc ml-4 mt-1 text-slate-200">
        <li>Works only for external scripts</li>
        <li>Executes later (after parse)</li>
      </ul>
      <h4 className="font-medium mt-3">Use Cases</h4>
      <ul className="list-disc ml-4 mt-1 text-slate-200">
        <li>Framework scripts (React, Angular, Vue)</li>
        <li>UI logic dependent on DOM</li>
        <li>Large script bundles</li>
      </ul>
    </div>
  </div>
</div>

<footer className="mt-6 text-xs text-slate-400">Tip: Try adding many async scripts to see race conditions in execution order.</footer>
    </div>
  );
}

