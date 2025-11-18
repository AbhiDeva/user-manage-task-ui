import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Highlight, { defaultProps } from "prism-react-renderer";
//import Highlight, { defaultProps } from "prism-react-renderer";
//import { Highlight, defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
//import theme from "prism-react-renderer/themes/nightOwl";
//const theme = require("prism-react-renderer/themes/vsDark");
import { ChevronDown } from "lucide-react";

// --- Files we'll show in the explorer ---
const FILES = {
  "useCounter.js": `import { useState, useCallback } from 'react';

export default function useCounter(initial = 0, options = {}) {
  const { step: initialStep = 1 } = options;
  const [count, setCount] = useState(initial);
  const [step, setStep] = useState(initialStep);

  const increment = useCallback((by = step) => {
    setCount((c) => c + by);
  }, [step]);

  const decrement = useCallback((by = step) => {
    setCount((c) => c - by);
  }, [step]);

  const reset = useCallback(() => setCount(initial), [initial]);

  const set = useCallback((value) => {
    setCount(Number(value));
  }, []);

  const increaseStep = useCallback((value = 1) => {
    setStep((s) => s + value);
  }, []);

  const decreaseStep = useCallback((value = 1) => {
    setStep((s) => s - value);
  }, []);

  return {
    count,
    step,
    increment,
    decrement,
    reset,
    set,
    increaseStep,
    decreaseStep,
  };
}
`,

  "ExampleUsage.jsx": `import React from 'react';
import useCounter from './useCounter';

export default function ExampleUsage() {
  const { count, step, increment, decrement, reset, set, increaseStep, decreaseStep } = useCounter(5, { step: 2 });

  return (
    <div className=\"p-4 bg-white rounded shadow\"> 
      <h3 className=\"text-lg font-bold mb-2\">useCounter demo</h3>
      <div className=\"mb-2\">Count: <strong>{count}</strong></div>
      <div className=\"mb-2\">Step: <strong>{step}</strong></div>

      <div className=\"flex gap-2 mb-2\">
        <button onClick={() => decrement()} className=\"px-3 py-1 bg-red-100 rounded\">-</button>
        <button onClick={() => increment()} className=\"px-3 py-1 bg-green-100 rounded\">+</button>
        <button onClick={() => reset()} className=\"px-3 py-1 bg-gray-100 rounded\">Reset</button>
      </div>

      <div className=\"flex gap-2 mb-2\">
        <button onClick={() => increaseStep()} className=\"px-3 py-1 bg-blue-100 rounded\">Step +</button>
        <button onClick={() => decreaseStep()} className=\"px-3 py-1 bg-blue-100 rounded\">Step -</button>
        <button onClick={() => set(100)} className=\"px-3 py-1 bg-yellow-100 rounded\">Set 100</button>
      </div>
    </div>
  );
}
`,

  "index.js": `import React from 'react';
import { createRoot } from 'react-dom/client';
import ExampleUsage from './ExampleUsage';

createRoot(document.getElementById('root')).render(<ExampleUsage />);
`,

  "README.md": `# useCounter Hook\n\nA small hook that manages a numeric counter with convenience utilities: increment, decrement, reset, set, and step adjustments.\n\nFiles:\n- useCounter.js (the hook)\n- ExampleUsage.jsx (demo)\n- index.js (entry)`
};

export default function UseCounterVisualizer() {
  const [selectedFile, setSelectedFile] = useState("useCounter.js");

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-100">
      <PanelGroup direction="horizontal">
        {/* LEFT — Explanation (30%) */}
        <Panel defaultSize={30} minSize={18}>
          <div className="h-full p-6 overflow-auto bg-white border-r">
            <h1 className="text-2xl font-bold mb-3">useCounter Hook — Explanation</h1>
            <p className="text-gray-700 mb-3">This small hook manages a numeric counter and provides convenient utility methods so you don't have to write the same helpers everywhere.</p>

            <h3 className="font-semibold mt-3">What it provides</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1 mt-2">
              <li><strong>count</strong> — current value</li>
              <li><strong>step</strong> — increment/decrement step</li>
              <li><strong>increment(by?)</strong> — increase counter (defaults to step)</li>
              <li><strong>decrement(by?)</strong> — decrease counter</li>
              <li><strong>reset()</strong> — set back to initial value</li>
              <li><strong>set(value)</strong> — set to a specific number</li>
              <li><strong>increaseStep / decreaseStep</strong> — adjust step value</li>
            </ul>

            <h3 className="font-semibold mt-4">Why use a hook?</h3>
            <p className="text-gray-700">Encapsulates counter logic once and reuse it across components. Tests, edge-cases, and helpers live in one place.</p>
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-gray-300 hover:bg-blue-400 transition-all" />

        {/* MIDDLE — Code viewer (40%) */}
        <Panel defaultSize={40} minSize={25}>
          <div className="h-full overflow-auto bg-[#1e1e1e] p-5 font-mono text-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-white font-bold">{selectedFile}</h2>
            </div>

            <Highlight {...defaultProps} code={FILES[selectedFile]} language={selectedFile.endsWith('.js') || selectedFile.endsWith('.jsx') ? 'jsx' : 'markup'} theme={theme}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} p-4 rounded-lg`} style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>

            <div className="mt-4 text-sm text-gray-300">
              Click files in the bottom-left explorer to view their source here.
            </div>
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-gray-300 hover:bg-blue-400 transition-all" />

        {/* RIGHT — Explorer + Live Output (30%) */}
        <Panel defaultSize={30} minSize={18}>
          <div className="h-full flex flex-col">
            {/* File Explorer (top of right panel) */}
            <div className="bg-gray-900 text-white p-4 border-b overflow-auto" style={{ flexBasis: '40%' }}>
              <h3 className="font-bold mb-3">Files</h3>
              <ul className="space-y-2 text-sm">
                {Object.keys(FILES).map((f) => (
                  <li key={f} onClick={() => setSelectedFile(f)} className={`cursor-pointer flex items-center gap-2 p-1 rounded ${selectedFile === f ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>
                    <span>
                      {f.endsWith('.js') || f.endsWith('.jsx') ? '📄' : '📁'}
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Live Output (bottom of right panel) */}
            <div className="p-6 overflow-auto bg-white" style={{ flexBasis: '60%' }}>
              <h3 className="text-xl font-bold mb-4">Live Demo</h3>

              {/* Inline simplified demo that uses the hook (not executing code from the editor) */}
              <DemoUsingHook />
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

// ---- Demo component that uses the hook ----
function DemoUsingHook() {
  // inline implementation matches useCounter API for demo purposes
  const { count, step, increment, decrement, reset, set, increaseStep, decreaseStep } = useCounterDemo();

  return (
    <div>
      <div className="mb-2">Count: <strong>{count}</strong></div>
      <div className="mb-3">Step: <strong>{step}</strong></div>

      <div className="flex gap-2 mb-3">
        <button className="px-3 py-1 bg-red-100 rounded" onClick={() => decrement()}>-</button>
        <button className="px-3 py-1 bg-green-100 rounded" onClick={() => increment()}>+</button>
        <button className="px-3 py-1 bg-gray-100 rounded" onClick={() => reset()}>Reset</button>
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-1 bg-blue-100 rounded" onClick={() => increaseStep()}>Step +</button>
        <button className="px-3 py-1 bg-blue-100 rounded" onClick={() => decreaseStep()}>Step -</button>
        <button className="px-3 py-1 bg-yellow-100 rounded" onClick={() => set(42)}>Set 42</button>
      </div>
    </div>
  );
}

// ---- Simple demo hook implementation used only for live preview inside the visualizer ----
function useCounterDemo(initial = 0, options = {}) {
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
