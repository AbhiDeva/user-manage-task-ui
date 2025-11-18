import React, { useState } from 'react';
//import { Button } from '@headlessui/react';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer } from '@codesandbox/sandpack-react';

// Tabs Component
function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b mb-3">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 -mb-px font-medium border-b-2 ${activeTab === index ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-500'}`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="p-3 flex-1 border rounded bg-gray-50 overflow-auto">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

export default function TabsVisualizer() {
  const tabs = [
    { title: 'Home', content: <p>Welcome to the Home tab!</p> },
    { title: 'Profile', content: <p>This is the Profile tab content.</p> },
    { title: 'Settings', content: <p>Adjust your preferences in the Settings tab.</p> }
  ];

  const sandpackFiles = {
    '/Tabs.js': `import React, { useState } from 'react';\nfunction Tabs({ tabs }) { /* Implementation */ }\nexport default Tabs;`
  };

  return (
    <div className="flex h-screen">
      {/* Left: Explanation Panel 30% */}
      <div className="w-1/3 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Tabs Component Explanation</h2>
        <p className="mb-3 text-gray-700">A Tabs component allows switching between different panels of content. Only one tab's content is visible at a time.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Clicking a tab makes it active.</li>
          <li>Active tab is highlighted (blue color).</li>
          <li>Only the corresponding panel content is displayed.</li>
        </ul>
      </div>

      {/* Center: Code Editor 40% */}
      <div className="w-2/5 flex flex-col border-r">
        <SandpackProvider template="react" files={sandpackFiles} options={{ showNavigator: true, showConsole: true }}>
          <SandpackFileExplorer />
          <SandpackCodeEditor />
        </SandpackProvider>
      </div>

      {/* Right: Output Panel 30% */}
      <div className="w-2/5 p-6 overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Live Output</h2>
        <div className="border p-4 rounded shadow bg-white">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}