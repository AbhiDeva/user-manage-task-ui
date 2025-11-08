import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import ProblemNavbar from "./ProblemNavbar";
import { PROBLEMS } from '../../utils/problemsdata';
import { MdChevronRight, MdCode, MdSearch, MdFilterList } from 'react-icons/md';
import { getDifficultyBadgeClass } from '../../utils/index.js'


const Problem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const problems = Object.values(PROBLEMS);
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = 
      selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;

    return matchesSearch && matchesDifficulty;
  });

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

//   return (
//     <div className="min-h-screen bg-base-200">
//       <ProblemNavbar />

//       <div className="mx-auto px-4 py-12 bg-white">
//         {/* HEADER */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-700 via-black-400 to-black-700 bg-clip-text text-transparent">LeetCode Problems</h1>
//           <p className="text-base-content/70">
//             Sharpen your coding skills with these curated problems
//           </p>
//         </div>


//          {/* SEARCH AND FILTER */}
//         <div className="mb-6 flex flex-col sm:flex-row gap-4">
//           {/* Search Bar */}
//           <div className="flex-1 relative">
//             <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white-500" />
//             <input
//               type="text"
//               placeholder="Search problems..."
//               className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//            {/* Difficulty Filter */}
//           <div className="flex items-center gap-2">
//             <MdFilterList className="w-5 h-5 text-gray-400" />
//             <select
//               className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//               value={selectedDifficulty}
//               onChange={(e) => setSelectedDifficulty(e.target.value)}
//             >
//               <option value="All">All Levels</option>
//               <option value="Easy">Easy</option>
//               <option value="Medium">Medium</option>
//               <option value="Hard">Hard</option>
//             </select>
//           </div>
//         </div>

//         {/* PROBLEMS LIST */}
//         <div className="space-y-4">
//            {filteredProblems.length === 0 ? (
//             <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl p-12 text-center">
//               <MdSearch className="w-16 h-16 mx-auto text-gray-600 mb-4" />
//               <p className="text-xl text-gray-400 mb-2">No problems found</p>
//               <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
//             </div>
//           ) : (
//         //     filteredProblems.map((problem) => (
//         //     <Link
//         //       key={problem.id}
//         //       to={`/problem/${problem.id}`}
//         //       className="card bg-base-100 hover:scale-[1.01] transition-transform group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden"
//         //     >
//         //       <div className="card-body">
//         //         <div className="flex items-center justify-between gap-4">
//         //           {/* LEFT SIDE */}
//         //           <div className="flex-1">
//         //             <div className="flex items-center gap-3 mb-2">
//         //               <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
//         //                 <MdCode className="w-6 h-6 text-primary" />
//         //               </div>
//         //               <div className="flex-1">
//         //                 <div className="flex items-center gap-2 mb-1">
//         //                   <h2 className="text-xl font-bold">{problem.title}</h2>
//         //                   <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
//         //                     {problem.difficulty}
//         //                   </span>
//         //                 </div>
//         //                 <p className="text-sm text-base-content/60">{problem.category}</p>
//         //               </div>
//         //             </div>
//         //             <p className="text-base-content/80 mb-3">{problem.description.text}</p>
//         //           </div>
//         //           {/* RIGHT SIDE */}

//         //            <div className="flex items-center gap-2 text-primary">
//         //             <span className="font-medium">Solve</span>
//         //             <MdChevronRight className="w-5 h-5" />
//         //           </div>
//         //         </div>
//         //       </div>
//         //     </Link>
//         //   ))
//         filteredProblems.map((problem) => (
//               <div
//                 key={problem.id}
//                 className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden"
//               >
//                 <div className="p-6">
//                   <div className="flex items-center justify-between gap-4">
//                     {/* LEFT SIDE */}
//                     <div className="flex-1">
//                       <div className="flex items-center gap-4 mb-3">
//                         <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
//                           <MdCode className="w-6 h-6 text-blue-400" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-1 flex-wrap">
//                             <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
//                               {problem.title}
//                             </h2>
//                             <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyBadgeClass(problem.difficulty)}`}>
//                               {problem.difficulty}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-500">{problem.category}</p>
//                         </div>
//                       </div>
//                       <p className="text-gray-400 leading-relaxed">{problem.description.text}</p>
//                     </div>

//                     {/* RIGHT SIDE */}
//                     <div className="flex items-center gap-2 text-blue-400 group-hover:text-indigo-400 transition-colors">
//                       <span className="font-medium hidden sm:inline">Solve</span>
//                       <MdChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Gradient border effect on hover */}
//                 <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//               </div>
//             ))
//           )
        
          
//           }
//         </div>

//         {/* STATS FOOTER */}
//         <div className="mt-12 card bg-base-100 shadow-lg">
//           <div className="card-body">
//             <div className="stats stats-vertical lg:stats-horizontal">
//               <div className="stat">
//                 <div className="stat-title">Total Problems</div>
//                 <div className="stat-value text-primary">{problems.length}</div>
//               </div>

//               <div className="stat">
//                 <div className="stat-title">Easy</div>
//                 <div className="stat-value text-success">{easyProblemsCount}</div>
//               </div>
//               <div className="stat">
//                 <div className="stat-title">Medium</div>
//                 <div className="stat-value text-warning">{mediumProblemsCount}</div>
//               </div>
//               <div className="stat">
//                 <div className="stat-title">Hard</div>
//                 <div className="stat-value text-error">{hardProblemsCount}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

return (
    <div className="min-h-screen">
        <ProblemNavbar  />
      {/* Navbar placeholder */}
      {/* <nav className="bg-gradient-to-r from-blue-900/50 via-black to-indigo-900/50 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-50 shadow-lg shadow-blue-500/10">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
              <MdCode className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Talent IQ
              </span>
              <span className="text-xs text-gray-400 -mt-1">Code Together</span>
            </div>
          </div>
        </div>
      </nav> */}

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
            Practice Problems
          </h1>
          <p className="text-gray-400 text-lg">
            Sharpen your coding skills with these curated problems
          </p>
        </div>

        {/* SEARCH AND FILTER */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full pl-12 pr-4 py-3.5 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <MdFilterList className="w-5 h-5 text-blue-400" />
            <select
              className="px-5 py-3.5 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-lg cursor-pointer"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="All">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* PROBLEMS LIST */}
        <div className="space-y-5">
          {filteredProblems.length === 0 ? (
            <div className="bg-gradient-to-br from-blue-900/20 via-gray-900/50 to-indigo-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 shadow-2xl p-12 text-center">
              <MdSearch className="w-16 h-16 mx-auto text-blue-400/50 mb-4" />
              <p className="text-xl text-gray-300 mb-2">No problems found</p>
              <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredProblems.map((problem, index) => (
              <div
                key={problem.id}
                className="group relative bg-gradient-to-br from-blue-900/30 via-gray-900/50 to-indigo-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 hover:border-indigo-500/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] cursor-pointer overflow-hidden"
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-indigo-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-indigo-600/10 group-hover:to-blue-600/10 transition-all duration-500"></div>
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-700 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>

                <div className="relative p-7">
                  <div className="flex items-center justify-between gap-6">
                    {/* LEFT SIDE */}
                    <div className="flex-1">
                      <div className="flex items-center gap-5 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-700 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-blue-500/50">
                          <MdCode className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-blue-400 transition-all duration-300">
                              {problem.title}
                            </h2>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getDifficultyBadgeClass(problem.difficulty)} transform group-hover:scale-110 transition-transform duration-300`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          <p className="text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            {problem.category}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-base">
                        {problem.description.text}
                      </p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col items-center gap-2 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 px-5 py-4 rounded-xl border border-blue-500/30 group-hover:border-indigo-500/50 transition-all duration-300 shadow-lg">
                      <span className="font-bold text-sm bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        Solve
                      </span>
                      <MdChevronRight className="w-6 h-6 text-blue-400 group-hover:text-indigo-400 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </div>

                {/* Bottom gradient bar */}
                <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
            ))
          )}
        </div>

        {/* STATS FOOTER */}
        <div className="mt-16 relative bg-gradient-to-br from-blue-900/30 via-gray-900/50 to-indigo-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 shadow-2xl overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-2xl opacity-20 blur-2xl"></div>
          
          <div className="relative p-8">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              Statistics Overview
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group text-center p-6 bg-gradient-to-br from-blue-600/20 via-blue-50rder border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30">
                <div className="text-sm font-semibold text-blue-300 mb-2">Total Problems</div>
                <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  {problems.length}
                </div>
              </div>

              <div className="group text-center p-6 bg-gradient-to-br from-green-600/20 via-green-500/10 to-emerald-600/20 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/30">
                <div className="text-sm font-semibold text-green-300 mb-2">Easy</div>
                <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {easyProblemsCount}
                </div>
              </div>

              <div className="group text-center p-6 bg-gradient-to-br from-yellow-600/20 via-yellow-500/10 to-orange-600/20 rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/30">
                <div className="text-sm font-semibold text-yellow-300 mb-2">Medium</div>
                <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {mediumProblemsCount}
                </div>
              </div>

              <div className="group text-center p-6 bg-gradient-to-br from-red-600/20 via-red-500/10 to-indigo-600/20 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/30">
                <div className="text-sm font-semibold text-red-300 mb-2">Hard</div>
                <div className="text-4xl font-black bg-gradient-to-r from-red-400 to-indigo-400 bg-clip-text text-transparent">
                  {hardProblemsCount}
                </div>
              </div>
            </div>0/10 to-indigo-600/20 rounded-xl bo
          </div>
        </div>
      </div>
    </div>
  );
}

export default Problem