// import React, { useState } from "react";
// import {
//   SiReact,
//   SiAngular,
//   SiJavascript,
//   SiTypescript,
// } from "react-icons/si";
// import { FaThumbsUp, FaThumbsDown, FaCode } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const techFilters = [
//   { name: "All", value: "all" },
//   { name: "React", value: "react", icon: <SiReact className="text-sky-400" /> },
//   { name: "Angular", value: "angular", icon: <SiAngular className="text-red-500" /> },
//   { name: "JavaScript", value: "javascript", icon: <SiJavascript className="text-yellow-400" /> },
//   { name: "TypeScript", value: "typescript", icon: <SiTypescript className="text-blue-400" /> },
// ];

// const sampleCards = [
//   {
//     id: 1,
//     title: "React State Management",
//     tech: "react",
//     code: `const [count, setCount] = useState(0);`,
//     likes: 25,
//     dislikes: 3,
//   },
//   {
//     id: 2,
//     title: "Angular Two-Way Binding",
//     tech: "angular",
//     code: `<input [(ngModel)]="name" />`,
//     likes: 15,
//     dislikes: 5,
//   },
//   {
//     id: 3,
//     title: "JavaScript Closure Example",
//     tech: "javascript",
//     code: `function outer() { let a = 10; return function inner() { console.log(a); }; }`,
//     likes: 42,
//     dislikes: 1,
//   },
//   {
//     id: 4,
//     title: "TypeScript Interface",
//     tech: "typescript",
//     code: `interface User { name: string; age: number; }`,
//     likes: 18,
//     dislikes: 2,
//   },
// ];

// export default function CardParentComponent() {
//   const [selectedTech, setSelectedTech] = useState("all");
//   const [sortBy, setSortBy] = useState("default");
//   const [selectedCard, setSelectedCard] = useState(null);

//   let filteredCards =
//     selectedTech === "all"
//       ? sampleCards
//       : sampleCards.filter((card) => card.tech === selectedTech);

//   if (sortBy === "likes") {
//     filteredCards = [...filteredCards].sort((a, b) => b.likes - a.likes);
//   }

//   return (
//     <div className="p-8 min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center">
//       {/* Filters */}
//       <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
//         {/* Technology Filter */}
//         <div className="w-full md:w-1/2">
//           <label className="block text-sm mb-2 text-gray-500 font-medium">
//             Filter by Technology
//           </label>
//           <div className="relative">
//             <select
//               className="w-full bg-gray-200 border border-gray-400 text-gray-800 px-4 py-2 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-600"
//               value={selectedTech}
//               onChange={(e) => setSelectedTech(e.target.value)}
//             >
//               {techFilters.map((filter) => (
//                 <option key={filter.value} value={filter.value}>
//                   {filter.name}
//                 </option>
//               ))}
//             </select>
//             <span className="absolute right-3 top-3 text-gray-500 pointer-events-none">
//               ▼
//             </span>
//           </div>
//         </div>

//         {/* Sort Filter */}
//         <div className="w-full md:w-1/2">
//           <label className="block text-sm mb-2 text-gray-500 font-medium">
//             Sort Cards
//           </label>
//           <div className="relative">
//             <select
//               className="w-full bg-gray-200 border border-gray-400 text-gray-800 px-4 py-2 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-600"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option value="default">Default</option>
//               <option value="likes">Sort by Likes</option>
//             </select>
//             <span className="absolute right-3 top-3 text-gray-500 pointer-events-none">
//               ▼
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="w-full max-w-4xl flex flex-col gap-4">
//         {filteredCards.map((card) => (
//           <motion.div
//             key={card.id}
//             layout
//             className="flex justify-between items-center bg-gray-200 p-5 rounded-xl border border-gray-400 hover:border-gray-700 transition-all"
//           >
//             <div>
//               <h2 className="text-xl font-semibold mb-1">{card.title}</h2>
//               <div className="flex items-center gap-2 text-gray-600">
//                 {techFilters.find((f) => f.value === card.tech)?.icon}
//                 <span className="capitalize">{card.tech}</span>
//               </div>
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-2 text-gray-700">
//                 <FaThumbsUp class="text-green-400" /> {card.likes}
//               </div>
//               <div className="flex items-center gap-2 text-gray-700">
//                 <FaThumbsDown class="text-red-400" /> {card.dislikes}
//               </div>
//               <button
//                 onClick={() => setSelectedCard(card)}
//                 className="p-2 rounded-full bg-blue-700 text-white hover:bg-gray-800 transition"
//               >
//                 <FaCode class="text-white-400" />
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Code Visualiser Modal */}
//       <AnimatePresence>
//         {selectedCard && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-gray-100 rounded-2xl p-6 max-w-lg w-full border border-gray-400 shadow-xl text-gray-900"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">
//                   {selectedCard.title}
//                 </h3>
//                 <button
//                   onClick={() => setSelectedCard(null)}
//                   className="text-gray-600 hover:text-gray-900"
//                 >
//                   ✕
//                 </button>
//               </div>
//               <pre className="bg-gray-200 p-4 rounded-lg text-sm text-gray-800 overflow-auto max-h-[300px]">
//                 {selectedCard.code}
//               </pre>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


// CardParentComponent.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiReact, SiAngular, SiJavascript, SiTypescript } from "react-icons/si";
import { FaCode } from "react-icons/fa";
import TwoSumVisualizer from "./TwoSumVisualizer"; // <- visualiser component below
import NestedCommentsUIVisualizer from "./NestedCommentsUIVisualizer";

const techFilters = [
  { name: "All", value: "all" },
  { name: "React", value: "react", icon: <SiReact /> },
  { name: "Angular", value: "angular", icon: <SiAngular /> },
  { name: "JavaScript", value: "javascript", icon: <SiJavascript /> },
  { name: "TypeScript", value: "typescript", icon: <SiTypescript /> },
];

const sampleCards = [
  {
    id: 1,
    title: "Two Sum (HashMap) — twoSum",
    tech: "javascript",
    code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    likes: 25,
    dislikes: 3,
  },
  {
    id: 2,
    title: "React State Management",
    tech: "react",
    code: `const [count, setCount] = useState(0);`,
    likes: 12,
    dislikes: 1,
  },
   {
    id: 3,
    title: "Nested Comments UI Visualizer",
    tech: "react",
    code: `const [count, setCount] = useState(0);`,
    likes: 12,
    dislikes: 1,
  },
];

export default function CardParentComponent() {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="p-6 min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-4">
        {sampleCards.map((card) => (
          <motion.div
            key={card.id}
            layout
            className="flex justify-between items-center bg-gray-200 p-5 rounded-xl border border-gray-300"
          >
            <div>
              <h2 className="text-lg font-semibold mb-1">{card.title}</h2>
              <div className="text-sm text-gray-600">{card.tech}</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-gray-700 flex items-center gap-1">
                👍 {card.likes}
              </div>
              <div className="text-gray-700 flex items-center gap-1">
                👎 {card.dislikes}
              </div>
              <button
                onClick={() => setSelectedCard(card)}
                className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-800 transition"
                title="Open code / visualizer"
              >
                <FaCode />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal with Code + Visualizer tabs */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-4xl bg-gray-100 rounded-2xl p-6 border border-gray-300 shadow-xl text-gray-900"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{selectedCard.title}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <ModalTabs card={selectedCard} onClose={() => setSelectedCard(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ModalTabs: Code tab + Visualizer tab.
   Visualizer receives the card.code string (so the visualiser can try to auto-extract nums/target).
*/
function ModalTabs({ card }) {
  const [tab, setTab] = useState("code"); // 'code' or 'visualizer'

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded-md ${tab === "code" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setTab("code")}
        >
          Code
        </button>
        <button
          className={`px-3 py-1 rounded-md ${tab === "visualizer" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setTab("visualizer")}
        >
          Visualizer
        </button>
      </div>

      <div>
        {tab === "code" && (
          <pre className="bg-gray-200 p-4 rounded-lg text-sm text-gray-800 overflow-auto max-h-[420px]">
            <code>{card.code}</code>
          </pre>
        )}

        {tab === "visualizer" && (
          <>
          <TwoSumVisualizer initialCode={card.code} />
          <NestedCommentsUIVisualizer />
          </>
        )}
      </div>
    </div>
  );
}
