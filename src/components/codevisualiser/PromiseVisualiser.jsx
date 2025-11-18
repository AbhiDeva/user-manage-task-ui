import React, { useState, useEffect } from 'react';

export default function PromiseVisualizer() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const p1 = new Promise((resolve) => setTimeout(() => resolve('P1 resolved'), 1000));
    const p2 = new Promise((resolve, reject) => setTimeout(() => resolve('P2 resolved'), 1500));
    const p3 = new Promise((resolve, reject) => setTimeout(() => reject('P3 rejected'), 1200));

    // Demonstrate Promise.all
    Promise.all([p1, p2])
      .then(results => setLogs(prev => [...prev, 'Promise.all success: ' + results.join(', ')]))
      .catch(err => setLogs(prev => [...prev, 'Promise.all failed: ' + err]));

    // Demonstrate Promise.allSettled
    Promise.allSettled([p1, p2, p3]).then(results => {
      setLogs(prev => [...prev, 'Promise.allSettled results:']);
      results.forEach((r, idx) => {
        setLogs(prev => [...prev, `Promise ${idx + 1}: ${r.status} ${r.status === 'fulfilled' ? '- ' + r.value : '- ' + r.reason}`]);
      });
    });
  }, []);

  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left 40% Explanation */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Promises Visualizer</h2>
        <p className="mb-3 text-gray-700">
          Promises represent the eventual completion or failure of an asynchronous operation.
        </p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>States: Pending → Fulfilled / Rejected</li>
          <li>Promise.all: Resolves when all promises succeed, rejects on first failure</li>
          <li>Promise.allSettled: Waits for all promises to settle, regardless of outcome</li>
          <li>Use <code>.then()</code> for success and <code>.catch()</code> for errors</li>
        </ul>
      </div>

      {/* Center 30% Code Editor */}
      <div className="w-3/10 flex flex-col border-r p-2 overflow-auto">
        <pre className="bg-gray-100 p-2 h-full">
{`const p1 = new Promise(resolve => setTimeout(() => resolve('P1 resolved'), 1000));
const p2 = new Promise(resolve => setTimeout(() => resolve('P2 resolved'), 1500));
const p3 = new Promise((resolve, reject) => setTimeout(() => reject('P3 rejected'), 1200));

Promise.all([p1, p2])
  .then(results => console.log('Promise.all success', results))
  .catch(err => console.log('Promise.all failed', err));

Promise.allSettled([p1, p2, p3]).then(results => console.log('Promise.allSettled', results));`}</pre>
      </div>

      {/* Right 30% Output */}
      <div className="w-3/10 p-6 bg-black text-white rounded-lg overflow-auto">
        <h3 className="font-bold mb-2">Console Output</h3>
        {logs.map((log, idx) => (
          <div key={idx} className="mb-1 font-mono text-sm">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}