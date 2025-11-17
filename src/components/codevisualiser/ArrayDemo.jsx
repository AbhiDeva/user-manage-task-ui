import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ArrayDemo() {
  /* ===================== DATASETS ===================== */
  const DATASETS = {
    normal: [5, 2, 9, 1, 7],
    numeric: [10, 20, 30, 40, 50],
    object: [
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 3, name: "C" }
    ],
    nested: [
      { id: 1, info: { score: 20 } },
      { id: 2, info: { score: 40 } },
      { id: 3, info: { score: 10 } }
    ]
  };

  const [dataType, setDataType] = useState("normal");
  const [array, setArray] = useState(DATASETS[dataType]);
  const [previousArray, setPreviousArray] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [explanation, setExplanation] = useState(
    "Choose an array type and method to visualize operations."
  );
  const [complexityColor, setComplexityColor] = useState("bg-green-500");

  /* ===================== COMPLEXITY MAP ===================== */
  const COMPLEXITY = {
    O1: "bg-green-500",
    On: "bg-yellow-500",
    OnLogN: "bg-red-500",
  };

  /* ===================== RESET ARRAY ===================== */
  const resetArray = (type) => {
    setDataType(type);
    setArray(DATASETS[type]);
    setTimeline([]);
    setPreviousArray([]);
    setExplanation("Array reset.");
  };

  /* ===================== HANDLE OPERATION ===================== */
  const handleOperation = (method) => {
    let newArr = JSON.parse(JSON.stringify(array));
    let prev = JSON.parse(JSON.stringify(array));

    const apply = (callback, explain, cx) => {
      callback();
      setTimeline((t) => [...t, method]);
      setPreviousArray(prev);
      setExplanation(explain);
      setComplexityColor(COMPLEXITY[cx]);
      setArray(newArr);
    };

    switch (method) {
      case "push":
        apply(() => newArr.push("New"), "push() → O(1) append", "O1");
        break;

      case "pop":
        apply(() => newArr.pop(), "pop() → O(1) remove last", "O1");
        break;

      case "shift":
        apply(() => newArr.shift(), "shift() → O(n) reindex", "On");
        break;

      case "unshift":
        apply(() => newArr.unshift("X"), "unshift() → O(n) reindex", "On");
        break;

      case "map":
        apply(() => {
          newArr = newArr.map((x) => (typeof x === "number" ? x * 2 : x));
        }, "map() → O(n) iterate", "On");
        break;

      case "filter":
        apply(() => {
          newArr = newArr.filter((x) => (typeof x === "number" ? x > 10 : true));
        }, "filter() → O(n) iterate", "On");
        break;

      case "find":
        apply(() => {
          newArr = [newArr.find((x) => x.id === 2 || x === 20)];
        }, "find() → O(n) search", "On");
        break;

      case "reduce":
        apply(() => {
          const sum = newArr.reduce((acc, x) => acc + (typeof x === "number" ? x : 0), 0);
          newArr = [sum];
        }, "reduce() → O(n) accumulate", "On");
        break;

      case "slice":
        apply(() => {
          newArr = newArr.slice(0, 3);
        }, "slice() → O(n) copy", "On");
        break;

      case "splice":
        apply(() => newArr.splice(1, 1), "splice() → O(n) modify & shift", "On");
        break;

      case "sort":
        apply(() => {
          if (dataType === "object") newArr.sort((a, b) => a.name.localeCompare(b.name));
          else if (dataType === "nested") newArr.sort((a, b) => a.info.score - b.info.score);
          else newArr.sort((a, b) => a - b);
        }, "sort() → O(n log n)", "OnLogN");
        break;

      default:
        break;
    }
  };

  /* ===================== 40 METHODS LIST ===================== */
  const METHOD_EXAMPLES = {
    push: "Adds an item to the end of the array",
    pop: "Removes the last item",
    shift: "Removes the first item",
    unshift: "Adds an item to the beginning",
    map: "Transforms each element",
    filter: "Keeps elements that pass a condition",
    find: "Returns first matching element",
    reduce: "Accumulates values into one output",
    slice: "Copies a portion of the array",
    splice: "Removes/Replaces elements in place",
    sort: "Sorts array items",
    every: "Checks if ALL items match condition",
    some: "Checks if ANY item matches condition",
    includes: "Checks if value exists",
    indexOf: "Returns first index of a value",
    lastIndexOf: "Returns last index of a value",
    flat: "Flattens nested arrays",
    flatMap: "Maps then flattens",
    reverse: "Reverses array order",
    join: "Joins elements into a string",
    concat: "Merges arrays",
    fill: "Replaces array elements",
    copyWithin: "Copies part of array internally",
    toString: "Converts to comma string",
    entries: "Returns index-value pairs",
    keys: "Returns indexes",
    values: "Returns values",
    findIndex: "Finds index of first match",
    at: "Gets element by index (supports negative)",
    from: "Creates array from iterable",
    isArray: "Checks if value is array",
    of: "Creates array from args",
    reduceRight: "Right-to-left reduce",
    toLocaleString: "Locale-aware string join",
    group: "Groups elements (ES2023)",
    groupToMap: "Groups into Map",
    with: "Returns copy with updated index",
    toReversed: "Returns reversed copy",
    toSorted: "Returns sorted copy",
    toSpliced: "Returns spliced copy"
  };

  // --- code examples for each method (shown when a method is selected) ---
  const METHOD_CODE = {
    push: `// push adds to end
const a = [1,2]; a.push(3); // [1,2,3]`,
    pop: `// pop removes last
const a = [1,2,3]; a.pop(); // [1,2]`,
    shift: `// shift removes first
const a = [1,2,3]; a.shift(); // [2,3]`,
    unshift: `// unshift adds to start
const a = [2,3]; a.unshift(1); // [1,2,3]`,
    map: `// map returns new array
[1,2,3].map(x => x*2); // [2,4,6]`,
    filter: `// filter returns subset
[1,2,3,4].filter(x => x%2===0); // [2,4]`,
    find: `// find first matching
[1,2,3].find(x => x>1); // 2`,
    reduce: `// reduce to sum
[1,2,3].reduce((s,x)=>s+x,0); // 6`,
    slice: `// slice copies part
[1,2,3,4].slice(0,2); // [1,2]`,
    splice: `// splice mutates
const a=[1,2,3]; a.splice(1,1); // a === [1,3]`,
    sort: `// numeric sort
[3,1,2].sort((a,b)=>a-b); // [1,2,3]`,
    every: `// every all pass?
[2,4].every(x=>x%2===0); // true`,
    some: `// some any pass?
[1,2].some(x=>x%2===0); // true`,
    includes: `// includes value
[1,2,3].includes(2); // true`,
    indexOf: `// indexOf
[1,2,1].indexOf(1); // 0`,
    lastIndexOf: `// lastIndexOf
[1,2,1].lastIndexOf(1); // 2`,
    flat: `// flat one level
[1,[2,3]].flat(); // [1,2,3]`,
    flatMap: `// flatMap map then flat
[1,2].flatMap(x=>[x,x*2]); // [1,2,2,4]`,
    reverse: `// reverse in place
[1,2,3].reverse(); // [3,2,1]`,
    join: `// join to string
[1,2,3].join('-'); // '1-2-3'`,
    concat: `// concat arrays
[1].concat([2,3]); // [1,2,3]`,
    fill: `// fill values
new Array(3).fill(0); // [0,0,0]`,
    copyWithin: `// copyWithin
[1,2,3,4].copyWithin(0,2); // [3,4,3,4]`,
    toString: `// toString
[1,2].toString(); // '1,2'`,
    entries: `// entries iterator
for (const [i,v] of [1,2].entries()) console.log(i,v);`,
    keys: `// keys iterator
for (const k of [1,2].keys()) console.log(k);`,
    values: `// values iterator
for (const v of [1,2].values()) console.log(v);`,
    findIndex: `// findIndex
[1,2,3].findIndex(x=>x>1); // 1`,
    at: `// at supports negative
[1,2,3].at(-1); // 3`,
    from: `// Array.from
Array.from('abc'); // ['a','b','c']`,
    isArray: `// Array.isArray
Array.isArray([]); // true`,
    of: `// Array.of
Array.of(1,2); // [1,2]`,
    reduceRight: `// reduceRight
['a','b','c'].reduceRight((a,b)=>a+b); // 'cba'`,
    toLocaleString: `// toLocaleString
[1000].toLocaleString();`,
    group: `// group (ES2023)
[1,2,3].group(x=>x%2); // { '1': [1,3], '0':[2] } (conceptual)`,
    groupToMap: `// groupToMap
// returns Map instead of object`,
    with: `// with (proposal) returns copy with change`,
    toReversed: `// toReversed returns reversed copy`,
    toSorted: `// toSorted returns sorted copy`,
    toSpliced: `// toSpliced returns spliced copy`
  };

  const METHODS = [
    "push", "pop", "shift", "unshift", "map", "filter", "find", "reduce",
    "slice", "splice", "sort",
    "every", "some", "includes", "indexOf", "lastIndexOf",
    "flat", "flatMap", "reverse", "join", "concat",
    "fill", "copyWithin", "toString", "entries", "keys", "values",
    "findIndex", "at", "from", "isArray", "of",
    "reduceRight", "toLocaleString", "group", "groupToMap",
    "with", "toReversed", "toSorted", "toSpliced", "with"
  ];

  const TYPES = [
    { label: "Normal Array", value: "normal" },
    { label: "Numeric Array", value: "numeric" },
    { label: "Object Array", value: "object" },
    { label: "Nested Object Array", value: "nested" }
  ];

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-mono">
      <h1 className="text-3xl font-bold mb-6">JavaScript Array Method Visualizer</h1>

      <div className="grid grid-cols-12 gap-6">

        {/* LEFT - Controls */}
        <div className="col-span-3 space-y-6">
          {/* Array Types */}
          <div className="bg-gray-800 p-4 rounded-xl shadow-xl">
            <h2 className="text-xl mb-3">Array Types</h2>
            {TYPES.map((t) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`w-full p-2 rounded-lg mb-2 ${
                  dataType === t.value ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => resetArray(t.value)}
                key={t.value}
              >
                {t.label}
              </motion.button>
            ))}
          </div>

          {/* Methods */}
          <div className="bg-gray-800 p-4 rounded-xl h-[600px] overflow-y-scroll space-y-3">
            <h2 className="text-xl mb-3">Array Methods (40)</h2>
            {METHODS.map((m) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`w-full p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-left`}
                onClick={() => {
                  setExplanation(METHOD_EXAMPLES[m] || "Method executed");
                  handleOperation(m);
                }}
                key={m}
              >
                {m}()
              </motion.button>
            ))}
          </div>
        </div>

        {/* RIGHT - Array Visualization */}
        <div className="col-span-9 bg-gray-800 p-6 rounded-xl shadow-xl space-y-6">
          <h2 className="text-xl mb-3">Array State</h2>

          <div className="flex gap-3 flex-wrap min-h-[80px]">
            {array.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`${complexityColor} px-4 py-2 rounded-lg text-black font-bold shadow-lg`}
              >
                {typeof item === "object" ? JSON.stringify(item) : item}
              </motion.div>
            ))}
          </div>

          {/* Before / After Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="text-lg mb-2">Before</h3>
              {previousArray.map((i, idx) => (
                <div key={idx} className="text-sm text-gray-300">{typeof i === "object" ? JSON.stringify(i) : i}</div>
              ))}
            </div>

            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="text-lg mb-2">After</h3>
              {array.map((i, idx) => (
                <div key={idx} className="text-sm text-green-300">{typeof i === "object" ? JSON.stringify(i) : i}</div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-700 p-3 rounded-lg">
            <h3 className="text-lg mb-2">Timeline</h3>
            <div className="flex flex-wrap gap-2">
              {timeline.map((t, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-600 rounded">{t}</span>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-700 rounded-lg text-yellow-300">{explanation}</div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-sm text-gray-300 mb-2">Code Example</h4>
                  <pre className="bg-gray-900 text-xs p-3 rounded text-green-200 overflow-auto">
{METHOD_CODE[timeline[timeline.length-1]] || "Select a method to see example code."}
                  </pre>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}
