import React, { useState, useEffect } from 'react';

export default function ObjectKeyVisualizerOutput() {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const logs = [];
    logs.push('Step 1: Initialize objects a = {}, b = { key: "b" }, c = { key: "c" }');

    const a = {};
    const b = { key: 'b' };
    const c = { key: 'c' };

    logs.push('Step 2: a[b] = 123');
    a[b] = 123;
    logs.push('Step 3: a[c] = 456');
    a[c] = 456;

    logs.push('Step 4: console.log(a[b]) ?');
    logs.push(`Output: ${a[b]} (Why? Because object keys are converted to strings: b and c both become '[object Object]')`);

    setSteps(logs);
  }, []);

  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left 40% Explanation */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Object Key Conversion in JavaScript</h2>
        <p className="mb-3 text-gray-700">Demonstrates how using objects as keys in plain JS objects leads to unexpected results.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>JS object keys are always strings (unless using Map)</li>
          <li>Both b and c as keys are converted to '[object Object]'</li>
          <li>Hence a[b] is overwritten by a[c]</li>
          <li>Expected output is 456, not 123</li>
        </ul>
      </div>

      {/* Center 30% Code */}
      <div className="w-3/10 flex flex-col border-r p-2 overflow-auto">
        <pre className="bg-gray-100 p-2 h-full">
{`let a = {};
let b = { key: 'b' };
let c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]); // ?`}</pre>
      </div>

      {/* Right 30% Step Output */}
      <div className="w-3/10 p-6 bg-black text-white rounded-lg overflow-auto">
        <h3 className="font-bold mb-2">Step by Step Output</h3>
        {steps.map((step, idx) => (
          <div key={idx} className="mb-2 font-mono text-sm">
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}