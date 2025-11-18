import React, { useState } from 'react';
//import { Button } from '@headlessui/react';
//import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { MdCheck } from "react-icons/md";

// Curry utility
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...next) => curried(...args, ...next);
    }
  };
}

// Example function to curry
function addThree(a, b, c) {
  return a + b + c;
}

export default function CurryVisualizer() {
  const [result, setResult] = useState(null);

  const handleCurry = () => {
    const curriedAdd = curry(addThree);
    const step1 = curriedAdd(2);
    const step2 = step1(3);
    const finalResult = step2(5);
    setResult(finalResult);
  };

  const sectionClass = "bg-gray-50 p-3 rounded shadow mb-3";
  const headingClass = "text-lg font-semibold mb-2 text-blue-600";

  return (
    <div className="p-6 border rounded-2xl w-96 bg-gradient-to-br from-white to-gray-50 shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Currying Visualizer</h2>
      <p className="mb-4 text-gray-700">Converts a function with multiple arguments into chained functions that accept single arguments. Click below to see an example in action.</p>
      <button onClick={handleCurry} className="px-5 py-2 mb-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all">Run Curried Example</button>
      {result !== null && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded flex items-center gap-2">
          <MdCheck className="w-5 h-5" />
          Result: <strong>{result}</strong>
        </div>
      )}

      <div className={sectionClass}>
        <h3 className={headingClass}>Code Example:</h3>
        <pre className="mt-1 p-2 bg-gray-100 border rounded text-sm overflow-x-auto">
{`function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...next) => curried(...args, ...next);
    }
  };
}`}        </pre>
      </div>

      <div className={sectionClass}>
        <h3 className={headingClass}>Advantages:</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Enables function reuse with partial application.</li>
          <li>Makes code more readable and modular.</li>
          <li>Allows delayed execution and composition of functions.</li>
        </ul>
      </div>

      <div className={sectionClass}>
        <h3 className={headingClass}>Drawbacks:</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>May be less intuitive for beginners.</li>
          <li>Can lead to too many nested function calls if overused.</li>
          <li>Potential performance overhead in some cases.</li>
        </ul>
      </div>

      <div className={sectionClass}>
        <h3 className={headingClass}>Use Cases:</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Partial function application for configuration or pre-setting parameters.</li>
          <li>Functional programming and composing complex operations.</li>
          <li>Event handlers or middleware that require chained functions.</li>
        </ul>
      </div>
    </div>
  );
}