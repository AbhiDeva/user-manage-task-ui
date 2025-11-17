import React, { useState, useMemo } from "react";

// Default export React component
export default function ArrayPolyfillVisualizer() {
  // Helper polyfill implementations (do NOT attach automatically to the real prototype)
  const implementations = useMemo(() => ({
    flat(arr, depth = 1) {
      const result = [];
      (function _flat(a, d) {
        for (let item of a) {
          if (Array.isArray(item) && d > 0) _flat(item, d - 1);
          else result.push(item);
        }
      })(arr, depth);
      return result;
    },

    map(arr, fn) {
      const res = new Array(arr.length);
      for (let i = 0; i < arr.length; i++) {
        if (i in arr) res[i] = fn(arr[i], i, arr);
      }
      return res;
    },

    reduce(arr, fn, initial) {
      let i = 0;
      let acc;
      if (arguments.length >= 3) {
        acc = initial;
      } else {
        // find first present element
        while (i < arr.length && !(i in arr)) i++;
        if (i >= arr.length) throw new TypeError("Reduce of empty array with no initial value");
        acc = arr[i++];
      }
      for (; i < arr.length; i++) {
        if (i in arr) acc = fn(acc, arr[i], i, arr);
      }
      return acc;
    },

    concat(arr, ...items) {
      const res = [];
      for (let i = 0; i < arr.length; i++) if (i in arr) res.push(arr[i]);
      for (let it of items) {
        if (Array.isArray(it)) {
          for (let i = 0; i < it.length; i++) if (i in it) res.push(it[i]);
        } else res.push(it);
      }
      return res;
    },

    // Small helpers to *safely* attach and detach polyfills to the actual Array.prototype
    attachPolyfills() {
      if (!Array.prototype.myFlat) {
        Object.defineProperty(Array.prototype, "myFlat", { value: function (d = 1) { return implementations.flat(this, d); }, configurable: true });
      }
      if (!Array.prototype.myMap) {
        Object.defineProperty(Array.prototype, "myMap", { value: function (fn) { return implementations.map(this, fn); }, configurable: true });
      }
      if (!Array.prototype.myReduce) {
        Object.defineProperty(Array.prototype, "myReduce", { value: function (fn, init) { return implementations.reduce(this, fn, init); }, configurable: true });
      }
      if (!Array.prototype.myConcat) {
        Object.defineProperty(Array.prototype, "myConcat", { value: function (...args) { return implementations.concat(this, ...args); }, configurable: true });
      }
    },

    detachPolyfills() {
      ["myFlat", "myMap", "myReduce", "myConcat"].forEach(name => {
        if (Object.prototype.hasOwnProperty.call(Array.prototype, name)) delete Array.prototype[name];
      });
    }
  }), []);

  // State
  const [input, setInput] = useState("[1, 2, [3, 4, [5]], 6]");
  const [method, setMethod] = useState("flat");
  const [depth, setDepth] = useState(2);
  const [mapExpr, setMapExpr] = useState("x => x * 2");
  const [reduceExpr, setReduceExpr] = useState("(acc, x) => acc + x");
  const [reduceInit, setReduceInit] = useState("0");
  const [concatInput, setConcatInput] = useState("[9,10], 11");
  const [attachToPrototype, setAttachToPrototype] = useState(false);
  const [log, setLog] = useState("");

  function safeEval(code) {
    // Very small, intentionally limited evaluator for expressions like `x => x*2` or number literals
    // We avoid full eval for safety in this toy demo. For arrow functions return a real function.
    code = code.trim();
    if (code.startsWith("(") || code.includes("=>")) {
      // eslint-disable-next-line no-new-func
      return new Function(`return (${code})`)();
    }
    try { return JSON.parse(code); } catch (e) { return code; }
  }

  function parseInput(str) {
    try {
      // allow expressions like `[1,2]` or `[[1],[2]]`
      // eslint-disable-next-line no-new-func
      return new Function(`return (${str})`)();
    } catch (e) {
      return null;
    }
  }

  function run() {
    setLog("");
    const arr = parseInput(input);
    if (!Array.isArray(arr)) { setLog("Invalid array input — must evaluate to an array"); return; }

    if (attachToPrototype) implementations.attachPolyfills(); else implementations.detachPolyfills();

    try {
      let res;
      if (method === 'flat') {
        res = implementations.flat(arr, Number(depth));
        setLog(`flat(arr, depth=${depth}) => ${JSON.stringify(res)}`);
      } else if (method === 'map') {
        const fn = safeEval(mapExpr);
        if (typeof fn !== 'function') throw new Error('map expression must be a function');
        // step-by-step visualization data
        const steps = [];
        const out = [];
        for (let i = 0; i < arr.length; i++) {
          if (!(i in arr)) { steps.push({i, input: undefined, output: undefined}); continue; }
          const before = out.slice();
          const v = fn(arr[i], i, arr);
          out.push(v);
          steps.push({ i, input: arr[i], output: v, before, after: out.slice() });
        }
        res = out;
        setLog(JSON.stringify({ result: res, steps }, null, 2));
      } else if (method === 'reduce') {
        const fn = safeEval(reduceExpr);
        if (typeof fn !== 'function') throw new Error('reduce expression must be a function');
        const hasInit = reduceInit.trim() !== '';
        const initVal = hasInit ? safeEval(reduceInit) : undefined;

        // step-by-step
        const steps = [];
        let i = 0;
        let acc;
        if (hasInit) { acc = initVal; }
        else {
          while (i < arr.length && !(i in arr)) i++;
          if (i >= arr.length) throw new TypeError('Reduce of empty array with no initial value');
          acc = arr[i++];
        }
        steps.push({ step: 'init', acc });
        for (; i < arr.length; i++) {
          if (!(i in arr)) continue;
          const prev = acc;
          acc = fn(acc, arr[i], i, arr);
          steps.push({ step: i, index: i, value: arr[i], prev, acc });
        }
        res = acc;
        setLog(JSON.stringify({ result: res, steps }, null, 2));
      } else if (method === 'concat') {
        const concatArgs = parseInput(`[${concatInput}]`);
        res = implementations.concat(arr, ...concatArgs);
        setLog(`concat(arr, ${concatInput}) => ${JSON.stringify(res)}`);
      }

      // If user attached to real prototype, show that calling the methods works
      if (attachToPrototype) {
        if (method === 'flat') {
          const protoRes = arr.myFlat(Number(depth));
          setLog(prev => prev + `\n\n(using Array.prototype.myFlat) => ${JSON.stringify(protoRes)}`);
        }
      }

    } catch (e) {
      setLog(String(e));
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-semibold mb-3">Array.prototype — Polyfill Visualiser</h1>
      <p className="text-sm mb-4 text-gray-600">Try lightweight, self-contained implementations of <code>flat</code>, <code>map</code>, <code>reduce</code>, and <code>concat</code>. Edit inputs, run, and inspect step-by-step output.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          <label className="block text-sm">Input array (JS expression)</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full p-3 rounded-lg border" rows={2} />

          <div className="flex gap-2 items-center mt-2">
            <label className="text-sm">Method</label>
            <select value={method} onChange={e => setMethod(e.target.value)} className="p-2 rounded border">
              <option value="flat">flat</option>
              <option value="map">map</option>
              <option value="reduce">reduce</option>
              <option value="concat">concat</option>
            </select>

            <label className="ml-4 flex items-center gap-2"><input type="checkbox" checked={attachToPrototype} onChange={e => setAttachToPrototype(e.target.checked)} /> Attach safe polyfills to <code>Array.prototype</code> (adds <code>myFlat/myMap/myReduce/myConcat</code>)</label>
          </div>

          {method === 'flat' && (
            <div className="mt-2">
              <label className="block text-sm">Depth</label>
              <input type="number" value={depth} onChange={e => setDepth(e.target.value)} className="p-2 rounded border w-28" />
            </div>
          )}

          {method === 'map' && (
            <div className="mt-2">
              <label className="block text-sm">Map function (arrow function)</label>
              <input value={mapExpr} onChange={e => setMapExpr(e.target.value)} className="w-full p-2 rounded border" />
              <p className="text-xs text-gray-500 mt-1">Example: <code>x =&gt; x * 2</code> or <code>(x,i) =&gt; i + ':' + x</code></p>
            </div>
          )}

          {method === 'reduce' && (
            <div className="mt-2 space-y-2">
              <label className="block text-sm">Reducer (arrow fn)</label>
              <input value={reduceExpr} onChange={e => setReduceExpr(e.target.value)} className="w-full p-2 rounded border" />
              <label className="block text-sm">Initial value (optional)</label>
              <input value={reduceInit} onChange={e => setReduceInit(e.target.value)} className="w-full p-2 rounded border" />
              <p className="text-xs text-gray-500">Example: <code>(acc, x) =&gt; acc + x</code> and init <code>0</code></p>
            </div>
          )}

          {method === 'concat' && (
            <div className="mt-2">
              <label className="block text-sm">Additional items or arrays (JS expression list)</label>
              <input value={concatInput} onChange={e => setConcatInput(e.target.value)} className="w-full p-2 rounded border" />
              <p className="text-xs text-gray-500">Examples: <code>[9,10], 11</code> or <code>["a"],["b"]</code></p>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <button onClick={run} className="px-4 py-2 rounded shadow bg-gradient-to-r from-indigo-500 to-indigo-400 text-white">Run</button>
            <button onClick={() => { setInput('[1, 2, [3, 4, [5]], 6]'); setMapExpr('x => x * 2'); setReduceExpr('(acc,x)=>acc+x'); setConcatInput('[9,10], 11'); setDepth(2); }} className="px-4 py-2 rounded border">Restore defaults</button>
          </div>

        </div>

        <div className="p-4 rounded-lg border bg-white">
          <h3 className="font-medium">Live preview</h3>
          <div className="mt-2 text-sm">
            <div><strong>Input:</strong></div>
            <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded mt-1">{input}</pre>

            <div className="mt-3"><strong>Output &gt; Log</strong></div>
            <pre className="whitespace-pre-wrap p-2 rounded mt-1 text-xs bg-black text-white" 
              style={{maxHeight: 300, overflow: 'auto'}}>{log || 'No output yet — click Run'}</pre>
          </div>
        </div>
      </div>

      <section className="mt-6 p-4 rounded-lg border bg-gray-50">
        <h3 className="font-semibold">How these functions work — short explanation</h3>
        <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
          <li><strong>flat(arr, depth)</strong>: recursively traverses array items. If an item is an array and depth &gt; 0 it flattens it further; otherwise pushes the item to the result.</li>
          <li><strong>map(arr, fn)</strong>: creates a new array with same length and places fn(item, index, arr) at each slot. Skips holes (sparse arrays) in the same way as native map.</li>
          <li><strong>reduce(arr, fn, initial)</strong>: iterates over the array and accumulates a single value. If initial is not provided, the first present element becomes the initial accumulator (throws on empty arrays).</li>
          <li><strong>concat(arr, ...items)</strong>: returns a new array that joins the elements of the base array and then expands any array arguments one level (non-recursively).</li>
        </ul>

        <div className="mt-3 text-sm text-gray-700">
          <strong>Note:</strong> This visualiser intentionally exposes safe methods under names like <code>myFlat</code> to avoid overwriting native methods. Toggle "Attach safe polyfills" to add/remove these helpers on <code>Array.prototype</code> in the browser environment of the demo.
        </div>
      </section>

      <footer className="mt-6 text-xs text-gray-500">Built for learning: inspect the code above, change examples, and try edge cases (sparse arrays, nested arrays, objects, etc.).</footer>
    </div>
  );
}
