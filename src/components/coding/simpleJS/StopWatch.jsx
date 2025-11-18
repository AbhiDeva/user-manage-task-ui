import React, { useState, useEffect, useRef } from 'react';


function formatTime(ms) {
  const milliseconds = ms % 1000;
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}:${String(milliseconds).padStart(3,'0')}`;
}

export default function StopwatchVisualizer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setTime(prev => prev + 10), 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const toggle = () => setRunning(r => !r);
  const reset = () => { setTime(0); setRunning(false); };

  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left 40% Description */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Stopwatch Visualizer</h2>
        <p className="mb-3 text-gray-700">Measures elapsed time with start/stop and reset functionality.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Click timer or button to start/stop.</li>
          <li>Reset stops timer and clears time.</li>
          <li>Time displayed in hh:mm:ss:ms format.</li>
          <li>Updates every 10 milliseconds for smooth display.</li>
        </ul>
      </div>

      {/* Center 30% Code Editor placeholder */}
      {/* <div className="w-3/10 flex flex-col border-r p-2">
        <pre className="bg-gray-100 p-2 h-full overflow-auto">
          {'// Code representation goes here, replace with actual Sandpack files for live editor'}
        </pre>
      </div> */}

      {/* Right 30% Output */}
      <div className="w-3/10 p-6 flex flex-col items-center justify-center gap-4">
        <div
          className="cursor-pointer text-3xl font-mono p-4 bg-gray-200 rounded shadow-md"
          onClick={toggle}
        >
          {formatTime(time)}
        </div>
        <div className="flex gap-4">
          <button onClick={toggle} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {running ? 'Stop' : 'Start'}
          </button>
          <button onClick={reset} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}