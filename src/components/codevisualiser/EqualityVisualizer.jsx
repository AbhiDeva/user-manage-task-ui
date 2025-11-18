import React, { useState } from 'react';

// Equality Visualiser: Single-file React component
// Usage: Put this component in any React app (TailwindCSS recommended).
// Features:
// - Live examples for Arrays, Objects, Strings
// - Toggle/create identical-by-value vs identical-by-reference
// - Shows results for == and === and short explanations
// - Comparison summary, advantages/disadvantages, and real-world scenarios

export default function EqualityVisualiser() {
  // Strings
  const [stringA, setStringA] = useState('5');
  const [stringB, setStringB] = useState(5);

  // Arrays / Objects - we can create by-value and by-reference
  const makeArray = (items) => items.slice();
  const makeObject = (obj) => ({ ...obj });

  const [arrayA, setArrayA] = useState([1, 2, 3]);
  // start with a different instance but same contents
  const [arrayB, setArrayB] = useState([1, 2, 3]);
  const [arraySameRef] = useState(arrayA); // reference copy

  const [objA, setObjA] = useState({ a: 1, b: 2 });
  const [objB, setObjB] = useState({ a: 1, b: 2 });
  const [objSameRef] = useState(objA);

  const [showExplain, setShowExplain] = useState(true);

  // helper to render boolean result nicely
  const badge = (v) => (
    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${v ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {String(v)}
    </span>
  );

  // computed comparisons
  const results = {
    // strings
    string_eq_eq: stringA == stringB,
    string_eq_strict: stringA === stringB,
    // arrays
    array_diff_val_eq: arrayA == arrayB,
    array_diff_val_strict: arrayA === arrayB,
    array_same_ref_eq: arrayA == arraySameRef,
    array_same_ref_strict: arrayA === arraySameRef,
    // objects
    obj_diff_val_eq: objA == objB,
    obj_diff_val_strict: objA === objB,
    obj_same_ref_eq: objA == objSameRef,
    obj_same_ref_strict: objA === objSameRef,
    // special
    null_undefined_eq: null == undefined,
    null_undefined_strict: null === undefined,
  };

  // helper actions
  function replaceArrayBWithNew() {
    setArrayB([1, 2, 3]);
  }
  function mutateArrayA() {
    // mutate same reference to show shared mutation effect
    const copy = arrayA.slice();
    copy.push(Math.floor(Math.random() * 10));
    setArrayA(copy);
  }
  function replaceObjBWithNew() {
    setObjB({ a: 1, b: 2 });
  }
  function mutateObjA() {
    const copy = { ...objA };
    copy.c = (copy.c || 0) + 1;
    setObjA(copy);
  }
  function coerceStringBToString() {
    setStringB(String(stringB));
  }
  function coerceStringAToNumber() {
    const asNum = Number(stringA);
    setStringA(asNum);
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 font-sans">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Equality Visualiser — <span className="text-indigo-600">==</span> vs <span className="text-teal-600">===</span></h1>
          <p className="text-sm text-gray-600">Interactive demos for Arrays, Objects, and Strings. See how JavaScript performs comparisons and when references matter.</p>
        </div>
        <div>
          <button onClick={() => setShowExplain((s) => !s)} className="px-3 py-1 rounded bg-gray-100 border">{showExplain ? 'Hide' : 'Show'} explanations</button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h2 className="font-semibold mb-2">Strings</h2>
          <div className="space-y-3">
            <label className="text-xs text-gray-500">Left (stringA)</label>
            <input value={String(stringA)} onChange={(e) => setStringA(e.target.value)} className="w-full px-3 py-2 border rounded" />

            <label className="text-xs text-gray-500">Right (stringB)</label>
            <input value={String(stringB)} onChange={(e) => {
              const raw = e.target.value;
              // try parse number when the input looks numeric
              if (/^-?\d+$/.test(raw)) setStringB(Number(raw));
              else setStringB(raw);
            }} className="w-full px-3 py-2 border rounded" />

            <div className="flex gap-2">
              <button onClick={coerceStringBToString} className="px-2 py-1 rounded border">Force stringB to String()</button>
              <button onClick={coerceStringAToNumber} className="px-2 py-1 rounded border">Force stringA to Number()</button>
            </div>

            <div className="mt-2">
              <div className="flex items-center gap-4">
                <div> <strong>==</strong> result: {badge(results.string_eq_eq)} </div>
                <div> <strong>===</strong> result: {badge(results.string_eq_strict)} </div>
              </div>
              {showExplain && (
                <p className="text-sm text-gray-600 mt-2">Explanation: <strong>==</strong> coerces types (e.g. '5' == 5 is true). <strong>===</strong> checks both value and type (so '5' === 5 is false).</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h2 className="font-semibold mb-2">Arrays</h2>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500">arrayA (left)</div>
              <pre className="bg-gray-50 p-2 rounded">{JSON.stringify(arrayA)}</pre>
            </div>
            <div>
              <div className="text-xs text-gray-500">arrayB (right)</div>
              <pre className="bg-gray-50 p-2 rounded">{JSON.stringify(arrayB)}</pre>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setArrayA([1,2,3])} className="px-2 py-1 rounded border">Reset A</button>
              <button onClick={replaceArrayBWithNew} className="px-2 py-1 rounded border">Replace B with new [1,2,3]</button>
              <button onClick={mutateArrayA} className="px-2 py-1 rounded border">Mutate A (push)</button>
            </div>

            <div className="mt-2">
              <div className="flex items-center gap-4">
                <div><strong>arrayA == arrayB</strong>: {badge(results.array_diff_val_eq)}</div>
                <div><strong>arrayA === arrayB</strong>: {badge(results.array_diff_val_strict)}</div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div><strong>arrayA == arraySameRef</strong>: {badge(results.array_same_ref_eq)}</div>
                <div><strong>arrayA === arraySameRef</strong>: {badge(results.array_same_ref_strict)}</div>
              </div>
              {showExplain && (
                <p className="text-sm text-gray-600 mt-2">Explanation: Arrays are reference types. Two different arrays with the same contents are <em>not</em> equal by either <strong>==</strong> or <strong>===</strong>. Only when two variables reference the exact same array object do both equality forms return true.</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h2 className="font-semibold mb-2">Objects</h2>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500">objA (left)</div>
              <pre className="bg-gray-50 p-2 rounded">{JSON.stringify(objA)}</pre>
            </div>
            <div>
              <div className="text-xs text-gray-500">objB (right)</div>
              <pre className="bg-gray-50 p-2 rounded">{JSON.stringify(objB)}</pre>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setObjA({ a:1, b:2 })} className="px-2 py-1 rounded border">Reset A</button>
              <button onClick={replaceObjBWithNew} className="px-2 py-1 rounded border">Replace B with new {"{ a:1, b:2 }"}</button>
              <button onClick={mutateObjA} className="px-2 py-1 rounded border">Mutate A (add c)</button>
            </div>

            <div className="mt-2">
              <div className="flex items-center gap-4">
                <div><strong>objA == objB</strong>: {badge(results.obj_diff_val_eq)}</div>
                <div><strong>objA === objB</strong>: {badge(results.obj_diff_val_strict)}</div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div><strong>objA == objSameRef</strong>: {badge(results.obj_same_ref_eq)}</div>
                <div><strong>objA === objSameRef</strong>: {badge(results.obj_same_ref_strict)}</div>
              </div>
              {showExplain && (
                <p className="text-sm text-gray-600 mt-2">Explanation: Objects are reference types just like arrays. Equality checks whether both sides point to the same object reference.</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h2 className="font-semibold mb-2">Special cases &amp; gotchas</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-4"><div><strong>null == undefined</strong></div><div>{badge(results.null_undefined_eq)}</div></div>
            <div className="flex items-center gap-4"><div><strong>null === undefined</strong></div><div>{badge(results.null_undefined_strict)}</div></div>
            {showExplain && (
              <div className="text-gray-600">Note: <strong>null == undefined</strong> is true because == treats them as loosely equal; but with === they are different types and not equal.</div>
            )}
          </div>
        </div>

      </section>

      <section className="p-4 border rounded-lg bg-white shadow-sm">
        <h2 className="font-semibold mb-2">Side-by-side comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium">== (Abstract equality)</h3>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              <li>Performs type coercion according to ECMAScript Abstract Equality Comparison.</li>
              <li>Useful when you intentionally want loose comparison (e.g. checking user input '0' vs 0 — but risky).</li>
              <li>Some surprising rules: null == undefined is true; but null == 0 is false.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium">=== (Strict equality)</h3>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              <li>No type coercion — both type and value must match.</li>
              <li>Safer for predictable code. Preferred in most codebases.</li>
              <li>Reference types (objects/arrays/functions) compare references.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="p-4 border rounded-lg bg-white shadow-sm">
        <h2 className="font-semibold mb-2">Advantages &amp; Disadvantages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium">Pros of ==</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              <li>Concise when you want flexible matching and don't care about type (quick checks).</li>
              <li>Can be handy in legacy codebases where values may come as strings or numbers.</li>
            </ul>
            <h4 className="font-medium mt-3">Cons of ==</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              <li>Prone to subtle bugs due to coercion rules.</li>
              <li>Harder to reason about; some comparisons are unintuitive.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Pros of ===</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              <li>Predictable: no hidden coercions.</li>
              <li>Encourages you to handle conversions explicitly (better code clarity).</li>
            </ul>
            <h4 className="font-medium mt-3">Cons of ===</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              <li>Can be verbose if you intentionally wanted a flexible match (but explicit conversion is preferred).</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="p-4 border rounded-lg bg-white shadow-sm">
        <h2 className="font-semibold mb-2">Real-world scenarios where each helps</h2>
        <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-2">
          <li><strong>Use <code>===</code>:</strong> When validating API responses (IDs, statuses), ensuring types match — e.g., compare numeric DB ids after parsing them to Number.</li>
          <li><strong>Use <code>===</code>:</strong> Checking for exact sentinel values like <code>false</code>, <code>0</code>, or distinguishing <code>null</code> vs <code>undefined</code>.</li>
          <li><strong>Potentially use <code>==</code>:</strong> Quick loose checks in scripts where inputs may be strings — but prefer explicit conversions. Example: quick checks accepting '0' and 0 similarly in CLI tools.</li>
          <li><strong>Reference checks:</strong> When comparing arrays or objects for equality, prefer deep-equality utilities (like lodash/isEqual or structuredClone+JSON compare) — because both == and === compare references, not contents.</li>
          <li><strong>Form handling:</strong> When reading values from <code>input.value</code> (always string) and comparing to numeric constants, convert first (Number(...)) and then use <code>===</code> to avoid surprises.</li>
        </ol>
      </section>

      <footer className="text-xs text-gray-500">Tip: In most modern codebases the common rule is: <strong>use ===</strong> by default; only use <strong>==</strong> when you have a carefully considered reason and document it.</footer>
    </div>
  );
}
