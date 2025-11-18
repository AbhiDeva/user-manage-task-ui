import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import MonacoEditor from "@monaco-editor/react";



// ------------------------------
// Files (shown in explorer)
// ------------------------------
const FILES = {
  "useCounter.js": `// Non-optimized useCounter (recreates functions on each render)
import { useState } from 'react';

export default function useCounter(initial = 0, options = {}) {
  const { step: initialStep = 1 } = options;
  const [count, setCount] = useState(initial);
  const [step, setStep] = useState(initialStep);

  const increment = (by = step) => setCount((c) => c + by);
  const decrement = (by = step) => setCount((c) => c - by);
  const reset = () => setCount(initial);
  const set = (v) => setCount(Number(v));
  const increaseStep = (v = 1) => setStep((s) => s + v);
  const decreaseStep = (v = 1) => setStep((s) => s - v);

  return { count, step, increment, decrement, reset, set, increaseStep, decreaseStep };
}
`,

  "useCounterOptimized.js": `// Optimized useCounter: stable function instances across re-renders
import { useState, useRef, useCallback } from 'react';

export default function useCounterOptimized(initial = 0, options = {}) {
  const { step: initialStep = 1 } = options;
  const [count, setCount] = useState(initial);
  const [step, setStep] = useState(initialStep);

  // refs to always hold latest state values
  const countRef = useRef(count);
  const stepRef = useRef(step);
  countRef.current = count;
  stepRef.current = step;

  // stable, memoized functions that use refs internally
  const increment = useCallback((by) => {
    const delta = typeof by === 'number' ? by : stepRef.current;
    setCount((c) => c + delta);
  }, []);

  const decrement = useCallback((by) => {
    const delta = typeof by === 'number' ? by : stepRef.current;
    setCount((c) => c - delta);
  }, []);

  const reset = useCallback(() => setCount(initial), [initial]);
  const set = useCallback((v) => setCount(Number(v)), []);
  const increaseStep = useCallback((v = 1) => setStep((s) => s + v), []);
  const decreaseStep = useCallback((v = 1) => setStep((s) => s - v), []);

  return { count, step, increment, decrement, reset, set, increaseStep, decreaseStep };
}
`,

  "DemoNonOptimized.jsx": `import React, { useRef } from 'react';
import useCounter from './useCounter';

export function DemoNonOptimized({ initial = 0, step = 1, onRender }) {
  const { count, increment, decrement, reset } = useCounter(initial, { step });
  useRenderCounter(onRender);

  return (
    <div className="p-3 border rounded">
      <div>Count: <strong>{count}</strong></div>
      <div className="mt-2 flex gap-2">
        <button onClick={() => decrement()}>-</button>
        <button onClick={() => increment()}>+</button>
        <button onClick={() => reset()}>Reset</button>
      </div>
    </div>
  );
}
`,

  "DemoOptimized.jsx": `import React from 'react';
import useCounterOptimized from './useCounterOptimized';

export function DemoOptimized({ initial = 0, step = 1, onRender }) {
  const { count, increment, decrement, reset } = useCounterOptimized(initial, { step });
  useRenderCounter(onRender);

  return (
    <div className="p-3 border rounded">
      <div>Count: <strong>{count}</strong></div>
      <div className="mt-2 flex gap-2">
        <button onClick={() => decrement()}>-</button>
        <button onClick={() => increment()}>+</button>
        <button onClick={() => reset()}>Reset</button>
      </div>
    </div>
  );
}
`,

  "README.md": `Optimized vs Non-Optimized useCounter visualizer.

- useCounter.js (non-optimized)
- useCounterOptimized.js (stable handlers)
- DemoNonOptimized.jsx
- DemoOptimized.jsx`
};

// ------------------------------
// Utility: render counter hook used by demos
// ------------------------------
function useRenderCounter(report) {
  const renders = useRef(0);
  renders.current += 1;
  useEffect(() => {
    if (report) report(renders.current);
  });
}

// ------------------------------
// Main Visualizer App
// ------------------------------
export default function UseCounterFullVisualizer() {
  const [selectedFile, setSelectedFile] = useState("useCounter.js");
  const [codeFiles, setCodeFiles] = useState(FILES);

  // storybook-like controls
  const [initial, setInitial] = useState(0);
  const [step, setStep] = useState(1);
  const [benchmark, setBenchmark] = useState(false);

  // benchmarks: track render counts for both demos
  const nonOptRenders = useRef(0);
  const optRenders = useRef(0);

  const reportNonOpt = (n) => (nonOptRenders.current = n);
  const reportOpt = (n) => (optRenders.current = n);

  // Monaco onChange handler (edits code but does not rewire live hooks for safety)
  const handleEditorChange = (value) => {
    setCodeFiles((prev) => ({ ...prev, [selectedFile]: value }));
  };

  // Reset counts when controls change
  useEffect(() => {
    nonOptRenders.current = 0;
    optRenders.current = 0;
  }, [initial, step]);

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-100">
      <PanelGroup direction="horizontal">
        {/* Explanation */}
        <Panel defaultSize={25} minSize={18}>
          <div className="h-full p-6 overflow-auto bg-white border-r">
            <h1 className="text-2xl font-bold mb-3">useCounter — Optimized vs Non-Optimized</h1>
            <p className="text-gray-700 mb-3">This visualizer compares two implementations: one which recreates handler functions on every render and an optimized version which returns stable function instances.</p>

            <h3 className="font-semibold mt-3">Controls</h3>
            <div className="mt-2 space-y-2">
              <label className="block">Initial value</label>
              <input type="number" value={initial} onChange={(e) => setInitial(Number(e.target.value))} className="w-full p-1 border rounded" />
              <label className="block mt-2">Step</label>
              <input type="number" value={step} onChange={(e) => setStep(Number(e.target.value))} className="w-full p-1 border rounded" />

              <div className="mt-3 flex items-center gap-2">
                <label className="flex items-center gap-2"><input type="checkbox" checked={benchmark} onChange={(e) => setBenchmark(e.target.checked)} /> Benchmark mode</label>
              </div>

              <div className="mt-4 text-sm text-gray-600">Tip: Toggle benchmark mode and click the + / - buttons in the demos to compare render counts.</div>
            </div>
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-gray-300 hover:bg-blue-400 transition-all" />

        {/* Code Editor + Explorer */}
        <Panel defaultSize={45} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="p-3 bg-[#1e1e1e]">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-bold">{selectedFile}</h2>
                <div className="text-sm text-gray-300">Editable (Monaco)</div>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Monaco Editor */}
              <div className="flex-1">
                <MonacoEditor
                  height="100%"
                  defaultLanguage={selectedFile.endsWith('.js') || selectedFile.endsWith('.jsx') ? 'javascript' : 'markdown'}
                  value={codeFiles[selectedFile]}
                  onChange={handleEditorChange}
                  options={{ minimap: { enabled: false }, fontSize: 13 }}
                />
              </div>

              {/* File Explorer */}
              <div className="w-48 bg-gray-900 text-white p-3 border-l overflow-auto">
                <h4 className="font-bold mb-2">Files</h4>
                <ul className="space-y-2 text-sm">
                  {Object.keys(codeFiles).map((f) => (
                    <li key={f} onClick={() => setSelectedFile(f)} className={`cursor-pointer p-1 rounded ${selectedFile === f ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>
                      <span className="mr-2">{f.endsWith('.md') ? '📄' : '📁'}</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-gray-300 hover:bg-blue-400 transition-all" />

        {/* Demos: side-by-side */}
        <Panel defaultSize={30} minSize={18}>
          <div className="h-full p-4 bg-white overflow-auto">
            <h3 className="text-xl font-bold mb-3">Demos</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Non-Optimized</h4>
                <DemoNonOptimized initial={initial} step={step} onRender={(n) => { if (benchmark) nonOptRenders.current = n; }} />
                <div className="mt-2 text-sm text-gray-600">Renders: {benchmark ? nonOptRenders.current : '—'}</div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Optimized</h4>
                <DemoOptimized initial={initial} step={step} onRender={(n) => { if (benchmark) optRenders.current = n; }} />
                <div className="mt-2 text-sm text-gray-600">Renders: {benchmark ? optRenders.current : '—'}</div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Notes</h4>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                <li>The optimized hook returns stable function instances using <code>useCallback</code> + refs.</li>
                <li>This reduces renders when passing handlers to child components that depend on referential equality.</li>
              </ul>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

// ------------------------------
// Demo components (use the in-file implementations)
// ------------------------------
function DemoNonOptimized({ initial = 0, step = 1, onRender }) {
  // inline non-optimized implementation (uses code from FILES but not eval)
  const [count, setCount] = useState(initial);
  const [s, setS] = useState(step);
  useRenderCounter(onRender);

  const increment = (by = s) => setCount((c) => c + by);
  const decrement = (by = s) => setCount((c) => c - by);
  const reset = () => setCount(initial);

  return (
    <div className="p-3 border rounded">
      <div>Count: <strong>{count}</strong></div>
      <div className="mt-2 flex gap-2">
        <button className="px-2 py-1 border rounded" onClick={() => decrement()}>-</button>
        <button className="px-2 py-1 border rounded" onClick={() => increment()}>+</button>
        <button className="px-2 py-1 border rounded" onClick={() => reset()}>Reset</button>
      </div>
    </div>
  );
}

function DemoOptimized({ initial = 0, step = 1, onRender }) {
  // inline optimized implementation matching useCounterOptimized
  const [count, setCount] = useState(initial);
  const [s, setS] = useState(step);
  const stepRef = useRef(s);
  stepRef.current = s;

  const increment = useCallback((by) => {
    const delta = typeof by === 'number' ? by : stepRef.current;
    setCount((c) => c + delta);
  }, []);

  const decrement = useCallback((by) => {
    const delta = typeof by === 'number' ? by : stepRef.current;
    setCount((c) => c - delta);
  }, []);

  const reset = useCallback(() => setCount(initial), [initial]);

  useRenderCounter(onRender);

  return (
    <div className="p-3 border rounded">
      <div>Count: <strong>{count}</strong></div>
      <div className="mt-2 flex gap-2">
        <button className="px-2 py-1 border rounded" onClick={() => decrement()}>-</button>
        <button className="px-2 py-1 border rounded" onClick={() => increment()}>+</button>
        <button className="px-2 py-1 border rounded" onClick={() => reset()}>Reset</button>
      </div>
    </div>
  );
}

// small hook to report renders
// function useRenderCounter(report) {
//   const renders = useRef(0);
//   renders.current += 1;
//   useEffect(() => {
//     if (report) report(renders.current);
//   });
// }
