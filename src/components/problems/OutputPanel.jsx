// function OutputPanel({ output }) {
//   return (
//     <div className="h-full bg-base-100 flex flex-col">
//       <div className="px-4 py-2 bg-base-200 border-b border-base-300 font-semibold text-sm">
//         Output
//       </div>
//       <div className="flex-1 overflow-auto p-4">
//         {output === null ? (
//           <p className="text-base-content/50 text-sm">Click "Run Code" to see the output here...</p>
//         ) : output.success ? (
//           <pre className="text-sm font-mono text-success whitespace-pre-wrap">{output.output}</pre>
//         ) : (
//           <div>
//             {output.output && (
//               <pre className="text-sm font-mono text-base-content whitespace-pre-wrap mb-2">
//                 {output.output}
//               </pre>
//             )}
//             <pre className="text-sm font-mono text-error whitespace-pre-wrap">{output.error}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// export default OutputPanel;

import { MdCheckCircle, MdError, MdPlayArrow, MdTerminal } from 'react-icons/md';

function OutputPanel({ output, isRunning }) {
  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-purple-900/30 via-gray-900/50 to-pink-900/30 border-b border-purple-500/20 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <MdTerminal className="w-4 h-4 text-purple-400" />
          <span className="font-semibold text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Output
          </span>
        </div>
      </div>

      {/* Output Content */}
      <div className="flex-1 overflow-auto p-4">
        {isRunning ? (
          // Loading state
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-purple-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <MdPlayArrow className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm font-medium">Executing code...</p>
          </div>
        ) : output === null ? (
          // Initial state - no output yet
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
              <MdTerminal className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-gray-400 text-sm">
              Click <span className="text-purple-400 font-semibold">"Run Code"</span> to see the output here
            </p>
            <p className="text-gray-500 text-xs">
              Your program's output will appear in this panel
            </p>
          </div>
        ) : output.success ? (
          // Success state
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg">
              <MdCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-green-400 text-sm font-semibold">
                Execution Successful
              </span>
            </div>
            
            {output.output ? (
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap break-words">
                  {output.output}
                </pre>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <p className="text-sm text-gray-400 italic">
                  Program executed successfully with no output
                </p>
              </div>
            )}
          </div>
        ) : (
          // Error state
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-red-900/20 to-pink-900/20 border border-red-500/30 rounded-lg">
              <MdError className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-400 text-sm font-semibold">
                Execution Failed
              </span>
            </div>

            {/* Standard Output (if any) */}
            {output.output && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Standard Output:
                </p>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                  <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-words">
                    {output.output}
                  </pre>
                </div>
              </div>
            )}

            {/* Error Output */}
            {output.error && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wide">
                  Error Details:
                </p>
                <div className="bg-gradient-to-br from-red-900/10 to-pink-900/10 rounded-lg p-4 border border-red-500/30">
                  <pre className="text-sm font-mono text-red-400 whitespace-pre-wrap break-words">
                    {output.error}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer with stats (optional) */}
      {output && !isRunning && (
        <div className="px-4 py-2 bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-t border-gray-700/50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${output.success ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {output.success ? 'Success' : 'Failed'}
            </span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default OutputPanel;