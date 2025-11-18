// import React, { useState } from "react";
// import { ChevronDown } from "lucide-react";
// //import SplitPane from "react-split-pane"; // resizable panels
// import { PanelResizeHandle } from "react-resizable-panels";
// import Prism from "prismjs";
// import "prismjs/themes/prism-tomorrow.css";

// // Accordion Component
// function Accordion({ sections }) {
//   const [open, setOpen] = useState([]);

//   const fileContents = {
//     "Accordion.js": `// Accordion Component Code
// function Accordion() {
//   return <div>Accordion</div>; }`,
//     "Accordion.css": `/* Accordion Styles */
// .accordion { padding: 10px; }`,
//     "Example.html": `<div>Example HTML</div>`,
//     "index.js": `import React from 'react';
// import ReactDOM from 'react-dom';`
//   };

//   const [selectedFile, setSelectedFile] = useState("Accordion.js");

//   const toggle = (index) => {
//     setOpen((prev) => {
//       const isOpen = prev.includes(index);
//       if (isOpen) return prev.filter((i) => i !== index);
//       return [...prev, index];
//     });
//   };

//   return (
//     <div className="h-screen">
//      {/* // <PanelResizeHandle split="vertical" minSize={200} defaultSize="30%"> */}
//         <PanelGroup direction="horizontal">
//                   {/* left panel- problem desc */}
//                   <Panel defaultSize={40} minSize={30}></Panel>
//         {/* Left Explanation Panel */}
//         <div className="p-6 border-r overflow-auto bg-gray-50 h-full">
//           <h1 className="text-2xl font-bold mb-4">Accordion Component Explanation</h1>
//           <p className="mb-3 text-gray-700">
//             This visualizer demonstrates how a simple accordion works. Each section is independent.
//           </p>
//           <ul className="list-disc ml-6 text-gray-700">
//             <li>All sections are collapsed by default.</li>
//             <li>Each click toggles expand/collapse.</li>
//             <li>State is stored as an array of open indexes.</li>
//             <li>Chevron rotates when open.</li>
//           </ul>
//         </div>

//         {/* Middle Section (React Code Editor) */}
//         {/* <PanelResizeHandle split="vertical" minSize={200} defaultSize="40%">
//           Code Section */}
//           <div className="flex flex-col h-full border-r">
//             {/* Syntax Highlighted Code */}
//             <div className="flex-1 bg-[#1e1e1e] text-gray-200 p-5 text-sm overflow-auto">
//               <h2 className="text-xl mb-4">{selectedFile}</h2>
//               <pre>
//                 <code
//                   className="language-js"
//                   dangerouslySetInnerHTML={{
//                     __html: Prism.highlight(fileContents[selectedFile], Prism.languages.javascript, "javascript")
//                   }}
//                 />
//               </pre>
//             </div>

//             {/* File Explorer */}
//             <div className="bg-gray-900 text-white p-4 border-t border-gray-700 h-[30%] overflow-auto">
//               <h2 className="text-lg font-bold mb-4">Files</h2>
//               <ul className="space-y-2 text-sm">
//                 {Object.keys(fileContents).map((file) => (
//                   <li
//                     key={file}
//                     onClick={() => setSelectedFile(file)}
//                     className={`cursor-pointer flex items-center gap-2 p-1 rounded hover:bg-gray-700 ${
//                       selectedFile === file ? "bg-gray-700" : ""
//                     }`}
//                   >
//                     <span>
//                       {file.endsWith(".js") && "📄"}
//                       {file.endsWith(".css") && "🎨"}
//                       {file.endsWith(".html") && "🌐"}
//                     </span>
//                     {file}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Output Panel */}
//           <div className="bg-white p-5 overflow-auto h-full">
//             <h2 className="text-xl font-bold mb-4">Accordion Output</h2>
//             {sections.map((sec, i) => (
//               <div key={i} className="border-b pb-2 mb-2">
//                 <button
//                   onClick={() => toggle(i)}
//                   className="flex justify-between items-center w-full text-left py-2 font-semibold"
//                 >
//                   {sec.title}
//                   <ChevronDown
//                     className={`transition-transform duration-300 ${open.includes(i) ? "rotate-180" : "rotate-0"}`}
//                   />
//                 </button>
//                 {open.includes(i) && <div className="pl-2 pt-1 text-gray-700">{sec.content}</div>}
//               </div>
//             ))}
//           </div>
//           </PanelGroup>
//           </Panel>
//           </PanelGroup>
//           </Panel>
//         // {/* </PanelResizeHandle>
//       </PanelResizeHandle> */}
//     </div>
//   );
// }

// export default function AccordionApp() {
//   const sections = [
//     { title: "Introduction", content: "This is the introduction content snippet." },
//     { title: "How It Works", content: "Accordion uses state to track which sections are open." },
//     { title: "Conclusion", content: "Each section is independent and toggles on click." }
//   ];

//   return <Accordion sections={sections} />;
// }
import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Highlight, { defaultProps } from "prism-react-renderer";
//import { Highlight, defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
//import theme from "prism-react-renderer/themes/nightOwl";

//import theme from "prism-react-renderer/themes/vsDark";
import { ChevronDown } from "lucide-react";

export default function AccordionApp() {
  const [open, setOpen] = useState([]);

  const sections = [
    { title: "Introduction", content: "This is the introduction content snippet." },
    { title: "How It Works", content: "Accordion uses state to track open sections." },
    { title: "Conclusion", content: "Each section is independent and toggles on click." }
  ];

  const toggle = (index) => {
    setOpen((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const codeString = `
function Accordion({ sections }) {
  const [open, setOpen] = useState([]);

  const toggle = (index) => {
    setOpen(prev => {
      const isOpen = prev.includes(index);
      return isOpen ? prev.filter(i => i !== index) : [...prev, index];
    });
  };

  return (
    <div>
      {sections.map((sec, i) => (
        <div key={i}>
          <button onClick={() => toggle(i)}>{sec.title}</button>
          {open.includes(i) && <p>{sec.content}</p>}
        </div>
      ))}
    </div>
  );
}
`;

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-100">

      <PanelGroup direction="horizontal">
        
        {/* LEFT — EXPLANATION (30%) */}
        <Panel defaultSize={30} minSize={20}>
          <div className="h-full p-6 overflow-auto bg-white border-r">
            <h1 className="text-2xl font-bold mb-3">Accordion Component Explanation</h1>
            <p className="text-gray-700 mb-2">
              This visualizer shows how an accordion works. Each section toggles independently.
            </p>

            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>All sections start collapsed.</li>
              <li>Click toggles open/close.</li>
              <li>State stored as an array of open indexes.</li>
              <li>Chevron rotates when a section is open.</li>
            </ul>
          </div>
        </Panel>

        {/* Divider */}
        <PanelResizeHandle className="w-1 bg-gray-300 hover:bg-blue-400 transition-all" />

        {/* MIDDLE — CODE (40%) */}
        <Panel defaultSize={40} minSize={25}>
          <div className="h-full overflow-auto bg-[#1e1e1e] p-5 font-mono text-sm">
            <h2 className="text-xl mb-4 text-white font-bold">Accordion.js</h2>

            <Highlight {...defaultProps} code={codeString} language="jsx"  theme={theme}>
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

        {/* Divider */}
        <PanelResizeHandle className="w-1 bg-gray-300 hover:bg-blue-400 transition-all" />

        {/* RIGHT — LIVE OUTPUT (30%) */}
        <Panel defaultSize={30} minSize={20}>
          <div className="h-full p-6 overflow-auto bg-white">
            <h2 className="text-xl font-bold mb-4">Live Output</h2>

            <div className="border rounded-lg p-4 shadow bg-gray-50">
              {sections.map((sec, i) => (
                <div key={i} className="border-b pb-2 mb-2">
                  <button
                    onClick={() => toggle(i)}
                    className="flex justify-between w-full items-center py-2 font-semibold"
                  >
                    {sec.title}
                    <ChevronDown
                      className={`transition-transform ${
                        open.includes(i) ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {open.includes(i) && (
                    <div className="pl-2 text-gray-600">{sec.content}</div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </Panel>
      </PanelGroup>

    </div>
  );
}

