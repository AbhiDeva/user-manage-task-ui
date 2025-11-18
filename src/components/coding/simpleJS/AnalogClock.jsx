import React, { useState, useEffect } from 'react';

export default function AnalogClockVisualizer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = (hours + minutes / 60) * 30; // 360/12
  const minuteDeg = (minutes + seconds / 60) * 6; // 360/60
  const secondDeg = seconds * 6;

  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left 40% Description */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Analog Clock Visualizer</h2>
        <p className="mb-3 text-gray-700">Displays a real-time analog clock with hour, minute, and second hands.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Clock updates every second.</li>
          <li>Hour, minute, and second hands move smoothly.</li>
          <li>Hands are calculated based on current time.</li>
          <li>Styled as a circular clock face.</li>
        </ul>
      </div>

      {/* Center 30% Code Editor placeholder */}
      {/* <div className="w-3/10 flex flex-col border-r p-2">
        <pre className="bg-gray-100 p-2 h-full overflow-auto">
          {'// Code representation goes here, replace with actual Sandpack files for live editor'}
        </pre>
      </div> */}

      {/* Right 30% Output */}
      <div className="w-3/10 flex items-center justify-center">
        <div className="relative w-64 h-64 rounded-full border-4 border-black bg-white flex items-center justify-center">
          {/* Hour Hand */}
          <div className="absolute bg-black" style={{width: '6px', height: '25%', transformOrigin: 'center bottom', transform: `rotate(${hourDeg}deg)`}} />
          {/* Minute Hand */}
          <div className="absolute bg-black" style={{width: '4px', height: '35%', transformOrigin: 'center bottom', transform: `rotate(${minuteDeg}deg)`}} />
          {/* Second Hand */}
          <div className="absolute bg-red-600" style={{width: '2px', height: '40%', transformOrigin: 'center bottom', transform: `rotate(${secondDeg}deg)`}} />
          {/* Center dot */}
          <div className="absolute w-4 h-4 bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
}