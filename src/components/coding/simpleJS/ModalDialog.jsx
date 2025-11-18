import React, { useState } from 'react';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer } from '@codesandbox/sandpack-react';

// Reusable Modal Component
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 font-bold">X</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

// Main Visualizer Component
export default function ModalVisualizer() {
  const [isOpen, setIsOpen] = useState(false);

  const sandpackFiles = {
    '/Modal.js': `import React from 'react';\nfunction Modal(props) { /* implementation */ }\nexport default Modal;`
  };

  return (
    <div className="flex h-screen">
      {/* Left: Description 40% */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Modal Dialog Visualizer</h2>
        <p className="mb-3 text-gray-700">Reusable modal overlay component that can display custom titles and content, with a close button.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Click the button to open the modal.</li>
          <li>Modal is centered with a semi-transparent background overlay.</li>
          <li>Close button hides the modal.</li>
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
      <div className="w-3/10 p-6 overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Live Output</h2>
        <button onClick={() => setIsOpen(true)} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 mb-4">Open Modal</button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Sample Modal">
          <p>This is a reusable modal component. You can put any content here!</p>
        </Modal>
      </div>
    </div>
  );
}