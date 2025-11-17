import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

import {
  MdAutoAwesome,     // Sparkles
  MdRefresh,         // RefreshCw
  MdPlayArrow        // Play
} from "react-icons/md";


export default function PureImpureVisualiser() {
  // Inputs
  const [numberInput, setNumberInput] = useState(2);
  const [arrayInput, setArrayInput] = useState('[1, 2, 3]');
  const [runs, setRuns] = useState(3);

  // Logs and results
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState([]);
  const originalArrayRef = useRef(null);

  // Example functions
  const examples = {
    pureAdd: {
      name: 'pureAdd(x) => x + 1',
      type: 'pure',
      fn: (x) => x + 1,
      description: 'Simple deterministic pure function: same input -> same output, no side effects.'
    },
    pureMapDouble: {
      name: 'pureMapDouble(arr) => arr.map(x => x * 2)',
      type: 'pure',
      fn: (arr) => arr.map((x) => x * 2),
      description: 'Does not mutate input array and returns new array.'
    },
    impureRandom: {
      name: 'impureRandom(x) => Math.random() * x',
      type: 'impure',
      fn: (x) => Math.random() * x,
      description: 'Non-deterministic: returns different outputs for same input.'
    },
    impureMutatePush: {
      name: 'impureMutatePush(arr) => arr.push(100)',
      type: 'impure',
      fn: (arr) => { arr.push(100); return arr.length; },
      description: 'Mutates the input array (side effect) and returns new length.'
    },
    impureConsole: {
      name: 'impureConsole(x) => { console.log(x); return x }',
      type: 'impure',
      fn: (x) => { console.log('side-effect log:', x); return x; },
      description: 'Produces a side effect (console logging) while returning value.'
    }
  };

  const [selectedKey, setSelectedKey] = useState('pureAdd');

  const selected = examples[selectedKey];

  function runExample() {
    setLogs([]);
    setResults([]);

    // parse inputs safely
    let parsedArray;
    try {
      parsedArray = JSON.parse(arrayInput);
    } catch (e) {
      parsedArray = null;
    }

    // keep original copy for mutation detection
    originalArrayRef.current = parsedArray ? JSON.parse(JSON.stringify(parsedArray)) : null;

    const newLogs = [];
    const newResults = [];

    for (let i = 0; i < runs; i++) {
      let input;
      if (selectedKey.includes('Map') || selectedKey.includes('Push')) input = parsedArray;
      else input = Number(numberInput);

      // run and capture side-effects and exceptions
      try {
        const out = selected.fn(input);
        newResults.push(out === undefined ? 'undefined' : JSON.stringify(out));
        newLogs.push({ run: i + 1, out });
      } catch (err) {
        newResults.push('Error: ' + String(err));
        newLogs.push({ run: i + 1, error: String(err) });
      }

      // shallow snapshot after run to detect mutated inputs
      if (parsedArray) {
        try {
          newLogs[newLogs.length - 1].postArray = JSON.stringify(parsedArray);
        } catch (e) {
          newLogs[newLogs.length - 1].postArray = 'unserializable';
        }
      }
    }

    setResults(newResults);
    setLogs(newLogs);
  }

  function resetInputs() {
    setNumberInput(2);
    setArrayInput('[1, 2, 3]');
    setLogs([]);
    setResults([]);
    originalArrayRef.current = null;
  }

  // small helper labels
  const badge = (t) => (
    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${t === 'pure' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
      {t}
    </span>
  );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Left: Controls */}
          <motion.aside layout className="w-1/3 p-4 rounded-2xl bg-white shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Function Selector</h3>
              <div className="flex items-center gap-2">
                <MdAutoAwesome className="w-5 h-5 text-amber-500" />
              </div>
            </div>

            <div className="space-y-3">
              {Object.keys(examples).map((k) => (
                <button
                  key={k}
                  onClick={() => setSelectedKey(k)}
                  className={`w-full text-left p-3 rounded-lg border ${selectedKey === k ? 'border-indigo-300 bg-indigo-50 shadow-inner' : 'border-gray-100 bg-white hover:bg-gray-50'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{examples[k].name}</div>
                      <div className="text-xs text-gray-500">{examples[k].description}</div>
                    </div>
                    <div className="ml-3">{badge(examples[k].type)}</div>
                  </div>
                </button>
              ))}
            </div>

            <hr className="my-4" />

            <div className="space-y-3">
              <label className="block text-sm font-medium">Number input</label>
              <input type="number" value={numberInput} onChange={(e) => setNumberInput(e.target.value)} className="w-full p-2 border rounded" />

              <label className="block text-sm font-medium">Array input (JSON)</label>
              <textarea value={arrayInput} onChange={(e) => setArrayInput(e.target.value)} className="w-full p-2 border rounded h-20" />

              <label className="block text-sm font-medium">Runs</label>
              <input type="number" min={1} max={10} value={runs} onChange={(e) => setRuns(Number(e.target.value))} className="w-24 p-2 border rounded" />

              <div className="flex gap-2 mt-2">
                <button onClick={runExample} className="flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 text-white">
                  <MdPlayArrow className="w-4 h-4" /> Run
                </button>
                <button onClick={resetInputs} className="flex items-center gap-2 px-4 py-2 rounded border">
                  <MdRefresh className="w-4 h-4" /> Reset
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <div className="font-medium">Selected:</div>
                <div>{selected.name} {badge(selected.type)}</div>
                <div className="mt-2 text-xs text-gray-500">{selected.description}</div>
              </div>
            </div>
          </motion.aside>

          {/* Right: Visualiser */}
          <motion.main layout className="flex-1 p-4 rounded-2xl bg-white shadow-md border border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Pure vs Impure Visualiser</h2>
                <p className="text-sm text-gray-600 mt-1">Watch how the selected function behaves over {runs} run(s). Observe outputs, determinism, and whether inputs mutate.</p>
              </div>
              <div className="text-right text-sm">
                <div className="font-medium">Quick facts</div>
                <div className="text-gray-500">Pure: deterministic • No side effects</div>
                <div className="text-gray-500">Impure: may be non-deterministic or cause side effects</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {/* Outputs */}
              <div className="p-4 rounded-lg border bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Run Results</div>
                  <div className="text-xs text-gray-500">{selected.type.toUpperCase()}</div>
                </div>

                <div className="mt-3 space-y-2">
                  {results.length === 0 && <div className="text-sm text-gray-500">No runs yet — click Run</div>}
                  {results.map((r, i) => (
                    <div key={i} className="p-2 rounded bg-white border flex justify-between items-center">
                      <div className="text-sm">Run {i + 1}: <span className="font-mono">{r}</span></div>
                      <div className="text-xs text-gray-400">{selected.type === 'pure' ? 'predictable' : 'may vary / have side effects'}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mutation detector + input snapshot */}
              <div className="p-4 rounded-lg border bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Mutation Detector</div>
                  <div className="text-xs text-gray-500">Detects input mutation (arrays)</div>
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  <div className="font-medium">Original input</div>
                  <pre className="p-2 bg-white border rounded text-xs max-h-28 overflow-auto">{originalArrayRef.current ? JSON.stringify(originalArrayRef.current) : '—'}</pre>

                  <div className="mt-2 font-medium">After runs</div>
                  <div className="space-y-2 mt-2">
                    {logs.length === 0 && <div className="text-gray-500 text-sm">No data</div>}
                    {logs.map((l, idx) => (
                      <div key={idx} className="p-2 rounded bg-white border text-xs">
                        <div>Run {l.run}</div>
                        {l.postArray !== undefined && <div className="mt-1 font-mono">{l.postArray}</div>}
                        {l.error && <div className="text-red-600">Error: {l.error}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Explanation / properties */}
              <div className="p-4 rounded-lg border bg-white col-span-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Why this matters</div>
                  <div className="text-xs text-gray-500">Where used</div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <div className="font-semibold">Pure Functions</div>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>Deterministic (same inputs → same outputs)</li>
                      <li>No side effects (do not modify external state)</li>
                      <li>Easier to test, memoize, parallelize</li>
                      <li>Common in functional programming, reducers (Redux), pure utility libraries</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold">Impure Functions</div>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>May rely on or modify external state</li>
                      <li>May perform I/O: logging, network requests, DOM manipulation</li>
                      <li>Necessary for real-world programs (reading time, user input, persistence)</li>
                      <li>Used in effects, event handlers, services, middleware</li>
                    </ul>
                  </div>
                </div>

                <hr className="my-4" />
                <div className="text-sm text-gray-600">
                  <div className="font-medium">Quick checklist to decide purity</div>
                  <ol className="list-decimal ml-5 mt-2 space-y-1">
                    <li>Does it always return the same result for the same arguments?</li>
                    <li>Does it avoid changing variables or data outside its scope?</li>
                    <li>Does it avoid I/O and observable side effects?</li>
                  </ol>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="px-3 py-2 rounded border" onClick={() => { navigator.clipboard?.writeText(selected.name); }}>
                    Copy function name
                  </button>
                  <button className="px-3 py-2 rounded border" onClick={() => { alert('Tip: Make impure logic isolated in services/effects to keep core logic pure.'); }}>
                    Best practice tip
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-500">Made with ❤️ — change functions or add your own to experiment.</div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}
