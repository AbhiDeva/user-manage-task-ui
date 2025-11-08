// import Editor from "@monaco-editor/react";
// //import { Loader2Icon, PlayIcon } from "lucide-react";
// import { LANGUAGE_CONFIG } from "../../utils/problemsdata.js";

// function CodeEditorPanel({
//   selectedLanguage,
//   code,
//   isRunning,
//   onLanguageChange,
//   onCodeChange,
//   onRunCode,
// }) {
//   return (
//     <div className="h-full bg-base-300 flex flex-col">
//       <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300">
//         <div className="flex items-center gap-3">
//           <img
//             src={LANGUAGE_CONFIG[selectedLanguage].icon}
//             alt={LANGUAGE_CONFIG[selectedLanguage].name}
//             className="size-6 w-6"
//           />
//           <select className="select select-sm" value={selectedLanguage} onChange={onLanguageChange}>
//             {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
//               <option key={key} value={key}>
//                 {lang.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button className="btn btn-primary btn-sm gap-2" disabled={isRunning} onClick={onRunCode}>
//           {isRunning ? (
//             <>
//               {/* <Loader2Icon className="size-4 animate-spin" /> */}
//               Running...
//             </>
//           ) : (
//             <>
//               {/* <PlayIcon className="size-4" /> */}
//               Run Code
//             </>
//           )}
//         </button>
//       </div>

//       <div className="flex-1">
//         <Editor
//           height={"100%"}
//           language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
//           value={code}
//           onChange={onCodeChange}
//           theme="vs-dark"
//           options={{
//             fontSize: 16,
//             lineNumbers: "on",
//             scrollBeyondLastLine: false,
//             automaticLayout: true,
//             minimap: { enabled: false },
//           }}
//         />
//       </div>
//     </div>
//   );
// }
// export default CodeEditorPanel;

import Editor from "@monaco-editor/react";
import { MdPlayArrow, MdCode, MdSettings } from "react-icons/md";
import { LANGUAGE_CONFIG } from "../../utils/problemsdata.js";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      {/* Header / Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-900/30 via-gray-900/50 to-pink-900/30 border-b border-purple-500/20 backdrop-blur-sm">
        {/* Left side - Language selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <MdCode className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold text-gray-300">Language:</span>
          </div>
          
          <div className="relative">
            {/* Language icon */}
            {LANGUAGE_CONFIG[selectedLanguage]?.icon && (
              <img
                src={LANGUAGE_CONFIG[selectedLanguage].icon}
                alt={LANGUAGE_CONFIG[selectedLanguage].name}
                className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none"
              />
            )}
            
            <select
              className="pl-11 pr-4 py-2 text-sm bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-gray-200 
                       border border-purple-500/30 rounded-lg backdrop-blur-sm 
                       focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 
                       transition-all outline-none cursor-pointer appearance-none min-w-[150px]
                       hover:border-purple-500/50"
              value={selectedLanguage}
              onChange={onLanguageChange}
            >
              {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
                <option key={key} value={key} className="bg-gray-900 text-white">
                  {lang.name}
                </option>
              ))}
            </select>
            
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right side - Run button */}
        <button
          className={`px-5 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all duration-300 shadow-lg
            ${isRunning
              ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:scale-105 hover:shadow-green-500/50'
            }`}
          disabled={isRunning}
          onClick={onRunCode}
        >
          {isRunning ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Running...</span>
            </>
          ) : (
            <>
              <MdPlayArrow className="w-5 h-5" />
              <span>Run Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage]?.monacoLang || "javascript"}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            wordWrap: "on",
            tabSize: 2,
            insertSpaces: true,
            formatOnPaste: true,
            formatOnType: true,
            renderLineHighlight: "all",
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
            padding: {
              top: 16,
              bottom: 16,
            },
          }}
          loading={
            <div className="flex items-center justify-center h-full bg-gray-900">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-gray-700 border-t-purple-500 rounded-full animate-spin"></div>
                <p className="text-gray-400 text-sm">Loading editor...</p>
              </div>
            </div>
          }
        />
      </div>

      {/* Optional: Footer with shortcuts */}
      <div className="px-4 py-2 bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-0.5 bg-gray-800 rounded border border-gray-700">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-2 py-0.5 bg-gray-800 rounded border border-gray-700">Enter</kbd>
              <span className="ml-1">to run</span>
            </span>
          </div>
          <span className="text-gray-600">Monaco Editor</span>
        </div>
      </div>
    </div>
  );
}

export default CodeEditorPanel;