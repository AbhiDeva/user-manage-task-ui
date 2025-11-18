import React, { useState, useEffect } from 'react';

export default function ObjectReferenceVisualizer2() {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const logs = [];
    logs.push('Step 1: Initialize objects');
    logs.push('obj1 = { key: "value" }, obj2 = obj1, obj3 = obj2');

    let obj1 = { key: 'value' };
    let obj2 = obj1;
    let obj3 = obj2;

    logs.push('Step 2: obj1.key = "new value"');
    obj1.key = 'new value';

    logs.push('Step 3: obj2 = { key: "another value" }');
    obj2 = { key: 'another value' };

    logs.push('Step 4: console.log(obj1.key, obj2.key, obj3.key)');
    logs.push(`Output: obj1.key = ${obj1.key}, obj2.key = ${obj2.key}, obj3.key = ${obj3.key}`);
    logs.push('(Explanation: obj2 reassignment does not affect obj1 or obj3, obj1 and obj3 still reference the original object)');

    setSteps(logs);
  }, []);

  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left 40% Explanation */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Object References in JavaScript</h2>
        <p className="mb-3 text-gray-700">Demonstrates how JavaScript handles object references and reassignment.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Objects are assigned by reference, not by value.</li>
          <li>Reassigning a variable to a new object does not change other references.</li>
          <li>obj1 and obj3 still point to the original object; obj2 points to a new object after reassignment.</li>
        </ul>
      </div>

      {/* Center 30% Code */}
      <div className="w-3/10 flex flex-col border-r p-2 overflow-auto">
        <pre className="bg-gray-100 p-2 h-full">
{`let obj1 = { key: 'value' };
let obj2 = obj1;
let obj3 = obj2;

obj1.key = 'new value';
obj2 = { key: 'another value' };

console.log(obj1.key, obj2.key, obj3.key);`}</pre>
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