import React, { useState, useEffect } from 'react';

const lightDurations = {
  red: 4000,
  yellow: 500,
  green: 3000
};

const lightOrder = ['green', 'yellow', 'red'];

export default function TrafficLightVisualizer() {
  const [currentLight, setCurrentLight] = useState('red');

  useEffect(() => {
    let idx = lightOrder.indexOf(currentLight);
    const timer = setTimeout(() => {
      idx = (idx + 1) % lightOrder.length;
      setCurrentLight(lightOrder[idx]);
    }, lightDurations[currentLight]);

    return () => clearTimeout(timer);
  }, [currentLight]);

  const lightColor = (light) => {
    return currentLight === light ? light : 'gray';
  };

  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left 40% Description */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Traffic Light Visualizer</h2>
        <p className="mb-3 text-gray-700">Simulates a traffic light cycling through green, yellow, and red lights.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Green: 3000ms</li>
          <li>Yellow: 500ms</li>
          <li>Red: 4000ms</li>
          <li>Lights loop indefinitely in order: Green → Yellow → Red.</li>
        </ul>
      </div>

      {/* Center 30% Code Editor placeholder */}
      {/* <div className="w-3/10 flex flex-col border-r p-2">
        <pre className="bg-gray-100 p-2 h-full overflow-auto">
          {'// Code representation goes here, replace with actual Sandpack files for live editor'}
        </pre>
      </div> */}

      {/* Right 30% Output */}
      <div className="w-3/10 flex flex-col items-center justify-center gap-6">
        <div className="bg-black p-4 rounded-lg flex flex-col items-center gap-4">
          <div className={`w-16 h-16 rounded-full bg-${lightColor('red')}-500`} />
          <div className={`w-16 h-16 rounded-full bg-${lightColor('yellow')}-500`} />
          <div className={`w-16 h-16 rounded-full bg-${lightColor('green')}-500`} />
        </div>
        <div className="text-gray-700">Current Light: <strong>{currentLight.toUpperCase()}</strong></div>
      </div>
    </div>
  );
}