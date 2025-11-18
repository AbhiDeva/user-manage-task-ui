import React, { useState, useEffect } from 'react';
import { SandpackProvider, SandpackFileExplorer, SandpackCodeEditor } from '@codesandbox/sandpack-react';

// Simple 7-segment representation for digits
const digitSegments = {
  '0': [1,1,1,1,1,1,0],
  '1': [0,1,1,0,0,0,0],
  '2': [1,1,0,1,1,0,1],
  '3': [1,1,1,1,0,0,1],
  '4': [0,1,1,0,0,1,1],
  '5': [1,0,1,1,0,1,1],
  '6': [1,0,1,1,1,1,1],
  '7': [1,1,1,0,0,0,0],
  '8': [1,1,1,1,1,1,1],
  '9': [1,1,1,1,0,1,1],
  ':': [0,0,0,0,0,0,0] // Could be rendered differently
};

function SevenSegmentDigit({ digit }) {
  const segments = digitSegments[digit] || digitSegments[':'];
  const segmentStyle = 'w-2 h-6 bg-red-500 m-0.5';

  return (
    <div className="flex flex-col justify-center items-center">
      <div className={`flex ${segments[0] ? segmentStyle : 'w-2 h-6 m-0.5 bg-gray-200'}`} />
      <div className="flex">
        <div className={`${segments[5] ? segmentStyle : 'w-2 h-6 m-0.5 bg-gray-200'}`} />
        <div className={`${segments[6] ? segmentStyle : 'w-2 h-6 m-0.5 bg-gray-200'}`} />
        <div className={`${segments[1] ? segmentStyle : 'w-2 h-6 m-0.5 bg-gray-200'}`} />
      </div>
      <div className={`flex ${segments[4] ? segmentStyle : 'w-2 h-6 m-0.5 bg-gray-200'}`} />
      <div className="flex">
        <div className={`${segments[3] ? segmentStyle : 'w-2 h-6 m-0.5 bg-gray-200'}`} />
        <div className={`${segments[2] ? segmentStyle : 'w-2 h-6 m-0.5 bg-gray-200'}`} />
      </div>
    </div>
  );
}

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('en-US', { hour12: false });
  const timeDigits = timeString.split('');

  return (
    <div className="flex space-x-1">
      {timeDigits.map((d, i) => (
        <SevenSegmentDigit key={i} digit={d} />
      ))}
    </div>
  );
}

export default function DigitalClockVisualizer() {
  const sandpackFiles = {
    '/DigitalClock.js': `import React from 'react';\nfunction DigitalClock() { /* implementation */ }\nexport default DigitalClock;`
  };

  return (
    <div className="flex h-screen">
      {/* Left: Description 40% */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Digital Clock Visualizer</h2>
        <p className="mb-3 text-gray-700">Displays current time using 7-segment styled digits.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Updates every second.</li>
          <li>HH:MM:SS format (24-hour).</li>
          <li>Each digit rendered using 7 segments.</li>
        </ul>
      </div>

      {/* Center: Code Editor 30% */}
      <div className="w-3/10 flex flex-col border-r">
        <SandpackProvider template="react" files={sandpackFiles} options={{ showNavigator: true, showConsole: true }}>
          <SandpackFileExplorer />
          <SandpackCodeEditor />
        </SandpackProvider>
      </div>

      {/* Right: Output 30% */}
      <div className="w-3/10 p-6 overflow-auto flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Live Output</h2>
        <DigitalClock />
      </div>
    </div>
  );
}