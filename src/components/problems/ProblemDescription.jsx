import { getDifficultyBadgeClass } from '../../utils/index.js';
import { MdCode, MdInfo, MdCheckCircle } from 'react-icons/md';

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
    
    if(!problem){
        return (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
                <p className="text-gray-400">Problem not found</p>
            </div>
        )
    }
    
//     return (
//         <div className="h-full overflow-y-auto bg-base-200">
//             {/* HEADER SECTION */}
//             <div className="p-6 bg-base-100 border-b border-base-300">
//                 <div className="flex items-start justify-between mb-3">
//                     <h1 className="text-3xl font-bold text-base-content">{problem.title}</h1>
//                     {/* <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
//             {problem.difficulty}
//           </span> */}
//                     <span
//                         className={`px-4 py-1.5 rounded-full text-xs font-bold ${getDifficultyBadgeClass(
//                             problem.difficulty
//                         )} transform group-hover:scale-110 transition-transform duration-300`}
//                     >
//                         {problem.difficulty}
//                     </span>
//                 </div>
//                 <p className="text-base-content/60">{problem.category}</p>

//                 {/* Problem selector */}
//                 {/* <div className="mt-4">
//           <select
//             className="select select-sm w-full"
//             value={currentProblemId}
//             onChange={(e) => onProblemChange(e.target.value)}
//           >
//             {allProblems.map((p) => (
//               <option key={p.id} value={p.id}>
//                 {p.title} - {p.difficulty}
//               </option>
//             ))}
//           </select>
//         </div> */}
//                 {/* 
//         <div className="mt-4">
//   <select
//     className="w-full px-3 py-2 text-sm bg-white/10 text-gray-200 border border-gray-500/30 rounded-lg 
//                backdrop-blur-sm focus:border-gray-300 focus:ring-2 focus:ring-gray-300/30 transition-all outline-none"
//     value={currentProblemId}
//     onChange={(e) => onProblemChange(e.target.value)}
//   >
//     {allProblems.map((p) => (
//       <option key={p.id} value={p.id} className="text-gray-900">
//         {p.title} - {p.difficulty}
//       </option>
//     ))}
//   </select>
// </div> */}

//                 <div className="mt-4 relative z-30">
//                     <select
//                         className="w-full px-3 py-2 text-sm bg-white/10 text-gray-200 border border-gray-500/30 rounded-lg 
//                backdrop-blur-sm focus:border-gray-300 focus:ring-2 focus:ring-gray-300/30 
//                transition-all outline-none cursor-pointer appearance-none"
//                         value={currentProblemId}
//                         onChange={(e) => onProblemChange(e.target.value)}
//                     >
//                         {allProblems.map((p) => (
//                             <option key={p.id} value={p.id} className="text-gray-900">
//                                 {p.title} - {p.difficulty}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             <div className="p-6 space-y-6">
//                 {/* PROBLEM DESC */}
//                 <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
//                     <h2 className="text-xl font-bold text-base-content">Description</h2>

//                     <div className="space-y-3 text-base leading-relaxed">
//                         <p className="text-base-content/90">{problem.description.text}</p>
//                         {problem.description.notes.map((note, idx) => (
//                             <p key={idx} className="text-base-content/90">
//                                 {note}
//                             </p>
//                         ))}
//                     </div>
//                 </div>

//                 {/* EXAMPLES SECTION */}
//                 <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
//                     <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>
//                     <div className="space-y-4">
//                         {problem.examples.map((example, idx) => (
//                             <div key={idx}>
//                                 <div className="flex items-center gap-2 mb-2">
//                                     <span className="badge badge-sm">{idx + 1}</span>
//                                     <p className="font-semibold text-base-content">Example {idx + 1}</p>
//                                 </div>
//                                 <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
//                                     <div className="flex gap-2">
//                                         <span className="text-primary font-bold min-w-[70px]">Input:</span>
//                                         <span>{example.input}</span>
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <span className="text-secondary font-bold min-w-[70px]">Output:</span>
//                                         <span>{example.output}</span>
//                                     </div>
//                                     {example.explanation && (
//                                         <div className="pt-2 border-t border-base-300 mt-2">
//                                             <span className="text-base-content/60 font-sans text-xs">
//                                                 <span className="font-semibold">Explanation:</span> {example.explanation}
//                                             </span>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* CONSTRAINTS */}
//                 <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
//                     <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>
//                     <ul className="space-y-2 text-base-content/90">
//                         {problem.constraints.map((constraint, idx) => (
//                             <li key={idx} className="flex gap-2">
//                                 <span className="text-primary">•</span>
//                                 <code className="text-sm">{constraint}</code>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ProblemDescription;

 return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* HEADER SECTION */}
      <div className="p-6 bg-gradient-to-r from-purple-900/30 via-gray-900/50 to-pink-900/30 border-b border-purple-500/20 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-start justify-between mb-3 gap-3">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {problem.title}
          </h1>
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${getDifficultyBadgeClass(
              problem.difficulty
            )} shadow-lg`}
          >
            {problem.difficulty}
          </span>
        </div>
        <p className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {problem.category}
        </p>

        {/* Problem Selector */}
        <div className="mt-4 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <MdCode className="w-4 h-4 text-purple-400" />
          </div>
          <select
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-gray-200 
                     border border-purple-500/30 rounded-lg backdrop-blur-sm 
                     focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 
                     transition-all outline-none cursor-pointer appearance-none
                     hover:border-purple-500/50"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems && allProblems.length > 0 ? (
              allProblems.map((p) => (
                <option key={p.id} value={p.id} className="bg-gray-900 text-white">
                  {p.title} - {p.difficulty}
                </option>
              ))
            ) : (
              <option value={currentProblemId} className="bg-gray-900 text-white">
                {problem.title}
              </option>
            )}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* PROBLEM DESCRIPTION */}
        <div className="bg-gradient-to-br from-purple-900/20 via-gray-900/50 to-pink-900/20 rounded-xl shadow-lg p-6 border border-purple-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <MdInfo className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Description
            </h2>
          </div>

          <div className="space-y-3 text-base leading-relaxed">
            <p className="text-gray-300">{problem.description?.text || 'No description available'}</p>
            {problem.description?.notes && problem.description.notes.length > 0 && (
              problem.description.notes.map((note, idx) => (
                <p key={idx} className="text-gray-300">
                  {note}
                </p>
              ))
            )}
          </div>
        </div>

        {/* EXAMPLES SECTION */}
        <div className="bg-gradient-to-br from-purple-900/20 via-gray-900/50 to-pink-900/20 rounded-xl shadow-lg p-6 border border-purple-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <MdCheckCircle className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Examples
            </h2>
          </div>
          
          <div className="space-y-4">
            {problem.examples && problem.examples.length > 0 ? (
              problem.examples.map((example, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded">
                      {idx + 1}
                    </span>
                    <p className="font-semibold text-gray-200">Example {idx + 1}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-lg p-4 font-mono text-sm space-y-2">
                    <div className="flex gap-2">
                      <span className="text-purple-400 font-bold min-w-[70px]">Input:</span>
                      <span className="text-gray-300">{example.input}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-pink-400 font-bold min-w-[70px]">Output:</span>
                      <span className="text-gray-300">{example.output}</span>
                    </div>
                    {example.explanation && (
                      <div className="pt-2 border-t border-gray-700 mt-2">
                        <span className="text-gray-400 font-sans text-xs">
                          <span className="font-semibold text-blue-400">Explanation:</span> {example.explanation}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No examples available</p>
            )}
          </div>
        </div>

        {/* CONSTRAINTS */}
        {problem.constraints && problem.constraints.length > 0 && (
          <div className="bg-gradient-to-br from-purple-900/20 via-gray-900/50 to-pink-900/20 rounded-xl shadow-lg p-6 border border-purple-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Constraints
              </h2>
            </div>
            
            <ul className="space-y-2.5">
              {problem.constraints.map((constraint, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-purple-400 mt-1">•</span>
                  <code className="text-sm text-gray-300 bg-gray-800/50 px-2 py-1 rounded">
                    {constraint}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemDescription;