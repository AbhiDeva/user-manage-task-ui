import React, { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

// --- Files ---
const FILES = {
  "useClickAnywhere.js": `import { useEffect } from 'react';

export default function useClickAnywhere(handler) {
  useEffect(() => {
    function onClick(e) {
      handler(e);
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [handler]);
}`,

  "ExampleUsage.jsx": `import React, { useState } from 'react';
import useClickAnywhere from './useClickAnywhere';

export default function ExampleUsage() {
  const [count, setCount] = useState(0);

  useClickAnywhere(() => setCount((c) => c + 1));

  return (
    <div className=\"p-4 bg-white rounded shadow\"> 
      <h3 className=\"text-lg font-bold mb-2\">useClickAnywhere demo</h3>
      <p>Clicks detected anywhere on the document:</p>
      <div className=\"text-2xl font-bold mt-2\">{count}</div>
    </div>
  );
}`,

  "README.md": `# useClickAnywhere Hook\n\nA tiny React hook that lets you run a function whenever the user clicks *anywhere* on the document.`
};

export default function UseClickAnywhereVisualizer() {
  const [selectedFile, setSelectedFile] = useState("useClickAnywhere.js");

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-100">
      <PanelGroup direction="horizontal">
        {/* LEFT — Explanation */}
        <Panel defaultSize={30} minSize={18}>
          <div className="h-full p-6 overflow-auto bg-white border-r">
            <h1 className="text-2xl font-bold mb-3">useClickAnywhere Hook — Explanation</h1>
            <p className="text-gray-700 mb-3">This hook attaches a global click listener to the document and calls your handler function on every click.</p>

            <h3 className="font-semibold mt-3">Why it's useful</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1 mt-2">
              <li>Close modals when clicking outside</li>
              <li>Dismiss dropdowns / tooltips when clicking elsewhere</li>
              <li>Track clicks for analytics</li>
            </ul>
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-gray-300 hover:bg-blue-400 transition-all" />

        {/* MIDDLE — Code viewer */}
        <Panel defaultSize={40} minSize={25}>
          <div className="h-full overflow-auto bg-[#1e1e1e] p-5 font-mono text-sm">
            <h2 className="text-xl text-white font-bold mb-4">{selectedFile}</h2>

            <Highlight {...defaultProps} code={FILES[selectedFile]} language="jsx" theme={theme}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} p-4 rounded-lg`} style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-gray-300 hover:bg-blue-400 transition-all" />

        {/* RIGHT — Output */}
        <Panel defaultSize={30} minSize={18}>
          <div className="h-full flex flex-col">
            {/* File Explorer */}
            <div className="bg-gray-900 text-white p-4 border-b overflow-auto" style={{ flexBasis: '40%' }}>
              <h3 className="font-bold mb-3">Files</h3>
              <ul className="space-y-2 text-sm">
                {Object.keys(FILES).map((f) => (
                  <li key={f} onClick={() => setSelectedFile(f)} className={`cursor-pointer flex items-center gap-2 p-1 rounded ${selectedFile === f ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>
                    <span>{f.endsWith('.js') || f.endsWith('.jsx') ? '📄' : '📁'}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Live Output */}
            <div className="p-6 overflow-auto bg-white" style={{ flexBasis: '60%' }}>
              <h3 className="text-xl font-bold mb-4">Live Demo</h3>
              <DemoClickAnywhere />
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

function DemoClickAnywhere() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handler = () => setCount((c) => c + 1);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div>
      <p className="mb-2">Click anywhere on the document:</p>
      <div className="text-2xl font-bold">{count}</div>
    </div>
  );
}
