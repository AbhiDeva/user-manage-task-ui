import React, { useState, useEffect } from 'react';

export default function HoistingOutputVisualizer() {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const logs = [];
    logs.push('Step 1: Global variable declared: var employeeId = "1234abe"');
    var employeeId = '1234abe';

    logs.push('Step 2: Enter first IIFE (function() { ... })');
    logs.push('Hoisting: Inside IIFE, var employeeId is hoisted but undefined initially');
    logs.push('Step 3: console.log(employeeId) inside IIFE');
    logs.push('Output: undefined (due to variable hoisting of employeeId within IIFE)');

    logs.push('Step 4: var employeeId = "122345" inside IIFE now sets local variable');

    logs.push('Step 5: Enter nested IIFE');
    logs.push('Nested IIFE declares var employeeId = "abc1234" (local to nested IIFE)');
    logs.push('Nested IIFE does nothing else');

    logs.push('Step 6: End of both IIFEs');

    setSteps(logs);
  }, []);

  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left 40% Explanation */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">JavaScript Hoisting Visualizer</h2>
        <p className="mb-3 text-gray-700">Demonstrates how variable hoisting works with <code>var</code> inside IIFEs.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Variables declared with <code>var</code> are hoisted to the top of their function scope.</li>
          <li>Hoisted variables are initialized with <code>undefined</code> until the assignment line is executed.</li>
          <li>This explains why <code>console.log(employeeId)</code> inside the IIFE outputs <code>undefined</code> instead of the global value.</li>
        </ul>
      </div>

      {/* Center 30% Code */}
      <div className="w-3/10 flex flex-col border-r p-2 overflow-auto">
        <pre className="bg-gray-100 p-2 h-full">
{`var employeeId = '1234abe';
(function() {
  console.log(employeeId);
  var employeeId = '122345';
  (function() {
    var employeeId = 'abc1234';
  }());
}());`}</pre>
      </div>

      {/* Right 30% Step Output */}
      <div className="w-3/10 p-6 bg-black text-white rounded-lg overflow-auto">
        <h3 className="font-bold mb-2">Step by Step Output</h3>
        {steps.map((step, idx) => (
          <div key={idx} className="mb-2 font-mono text-sm">
            {step}
          </div>
        ))}
        <div className="mt-2 font-mono text-yellow-300">
          Final console.log output: undefined
        </div>
      </div>
    </div>
  );
}