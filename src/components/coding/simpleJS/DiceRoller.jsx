import React, { useState } from 'react';
//import { Button } from '@headlessui/react';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer } from '@codesandbox/sandpack-react';

function DiceRoller() {
  const [numDice, setNumDice] = useState(1);
  const [results, setResults] = useState([]);

  const rollDice = () => {
    const rolls = Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1);
    setResults(rolls);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <input 
          type="number" 
          min="1" 
          max="12" 
          value={numDice} 
          onChange={(e) => setNumDice(Math.min(Math.max(1, +e.target.value), 12))} 
          className="border p-1 w-16 rounded"
        />
        <button onClick={rollDice} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Roll</button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {results.map((val, i) => (
          <div key={i} className="p-4 bg-gray-200 text-center rounded shadow">{val}</div>
        ))}
      </div>
    </div>
  );
}

export default function DiceRollerVisualizer() {
  const sandpackFiles = {
    '/DiceRoller.js': `import React, { useState } from 'react';\nfunction DiceRoller() { /* implementation */ }\nexport default DiceRoller;`
  };

  return (
    <div className="flex h-screen">
      {/* Left: Explanation 30% */}
      <div className="w-1/3 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Dice Roller Visualizer</h2>
        <p className="mb-3 text-gray-700">Simulates rolling a specified number of 6-sided dice.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>User specifies number of dice (1-12).</li>
          <li>Click 'Roll' to simulate dice roll.</li>
          <li>Results displayed in rows of three dice.</li>
        </ul>
      </div>

      {/* Center: Code Editor 40% */}
      <div className="w-2/5 flex flex-col border-r">
        <SandpackProvider template="react" files={sandpackFiles} options={{ showNavigator: true, showConsole: true }}>
          <SandpackFileExplorer />
          <SandpackCodeEditor />
        </SandpackProvider>
      </div>

      {/* Right: Output 30% */}
      <div className="w-2/5 p-6 overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Live Output</h2>
        <div className="border p-4 rounded shadow bg-white">
          <DiceRoller />
        </div>
      </div>
    </div>
  );
}