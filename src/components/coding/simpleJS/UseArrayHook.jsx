import React, { useState } from 'react';
//import { Button } from '@headlessui/react';

// useArray Hook
function useArray(initialArray = []) {
  const [array, setArray] = useState(initialArray);

  return {
    array,
    set: setArray,
    push: (item) => setArray(a => [...a, item]),
    remove: (index) => setArray(a => a.filter((_, i) => i !== index)),
    update: (index, value) => setArray(a => a.map((item, i) => i === index ? value : item)),
    filter: (callback) => setArray(a => a.filter(callback)),
    clear: () => setArray([]),
    pop: () => setArray(a => a.slice(0, -1))
  };
}

export default function UseArrayVisualizer() {
  const defaultValue = ['apple', 'banana', 'cherry'];
  const arr = useArray(defaultValue);

  return (
    <div className="p-6 border rounded-lg w-96 bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">useArray Hook Visualizer</h2>
      <p className="mb-4 text-gray-700">Manages an array state with convenience methods like push, remove, update, clear, pop, and filter.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => arr.push('orange')} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Add orange</button>
        <button onClick={() => arr.update(1, 'grape')} className="px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700">Change second item to grape</button>
        <button onClick={() => arr.remove(0)} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">Remove first</button>
        <button onClick={() => arr.filter(fruit => fruit.includes('a'))} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">Keep fruits containing 'a'</button>
        <button onClick={() => arr.set(defaultValue)} className="px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700">Reset</button>
        <button onClick={arr.clear} className="px-3 py-1 rounded bg-black text-white hover:bg-gray-800">Clear list</button>
      </div>

      <div className="mb-4 p-3 bg-gray-100 rounded">
        <strong>Array:</strong> {JSON.stringify(arr.array)}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Advantages:</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Simplifies array state management in React.</li>
          <li>Provides reusable methods for common array operations.</li>
          <li>Reduces boilerplate code.</li>
        </ul>

        <h3 className="font-semibold text-gray-800 mt-3">Disadvantages:</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Abstraction may hide internal state updates, causing less transparency.</li>
          <li>May not cover every custom array manipulation edge case.</li>
        </ul>

        <h3 className="font-semibold text-gray-800 mt-3">Use Cases:</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Dynamic list management (to-do lists, shopping carts).</li>
          <li>Handling arrays in forms or multi-step wizards.</li>
          <li>Real-time updates in dashboards or data visualization components.</li>
        </ul>

        <h3 className="font-semibold text-gray-800 mt-3">Real-time Scenarios:</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Chat applications where messages are pushed and removed dynamically.</li>
          <li>Live updating stock or crypto price lists.</li>
          <li>Interactive polls where options can be added or removed on-the-fly.</li>
        </ul>
      </div>
    </div>
  );
}