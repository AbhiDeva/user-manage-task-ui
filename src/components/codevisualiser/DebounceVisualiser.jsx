// import React, { useState, useRef } from "react";
// import { debounce } from "lodash";

// const DebounceVisualizer = () => {
//   const [logs, setLogs] = useState([]);
//   const [step, setStep] = useState(0);
//   const inputRef = useRef(null);

//   // Simulated steps for visualizer
//   const steps = [
//     "1️. User types a character in the search input.",
//     "2️. Input event triggers the debounced function.",
//     "3️. debounce delays execution by 300ms.",
//     "4️. If the user types again within 300ms, timer resets.",
//     "5️. After 300ms of no new input, the search function executes.",
//     "6️. Console logs the current input value."
//   ];

//   // Actual debounced function
//   const debouncedSearch = useRef(
//     debounce(() => {
//       const value = inputRef.current.value;
//       setLogs((prev) => [...prev, `Searching for: "${value}"`]);
//     }, 300)
//   ).current;

//   const handleInput = () => {
//     setStep((prev) => Math.min(prev + 1, steps.length));
//     debouncedSearch();
//   };

//   const reset = () => {
//     setStep(0);
//     setLogs([]);
//     if (inputRef.current) inputRef.current.value = "";
//   };

//   return (
//     <div className="flex gap-6 p-6">
//       {/* Left: Code */}
//       <pre className="bg-gray-900 text-green-400 p-4 rounded w-1/2 overflow-x-auto">
// {`import { debounce } from 'lodash';

// const searchInput = document.getElementById('search-input');

// const debouncedSearch = debounce(() => {
//   console.log('Searching for:', searchInput.value);
// }, 300);

// searchInput.addEventListener('input', debouncedSearch);`}
//       </pre>

//       {/* Right: Steps and simulation */}
//       <div className="w-1/2 flex flex-col gap-4">
//         <input
//           ref={inputRef}
//           id="search-input"
//           type="text"
//           placeholder="Type to search..."
//           className="border p-2 rounded"
//           onChange={handleInput}
//         />

//         <div className="bg-gray-100 p-4 rounded flex flex-col gap-2">
//           <h3 className="font-bold">Step by Step:</h3>
//           {steps.map((s, idx) => (
//             <p
//               key={idx}
//               className={idx < step ? "text-green-600 font-semibold" : ""}
//             >
//               {s}
//             </p>
//           ))}
//         </div>

//         <div className="bg-gray-50 p-4 rounded h-32 overflow-y-auto">
//           <h3 className="font-bold mb-2">Console Logs:</h3>
//           {logs.map((log, idx) => (
//             <p key={idx}>{log}</p>
//           ))}
//         </div>

//         <button
//           onClick={reset}
//           className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DebounceVisualizer;
import React, { useState, useRef } from "react";
import { debounce } from "lodash";

const DebounceVisualizer = () => {
  const [logs, setLogs] = useState([]);
  const [step, setStep] = useState(0);
  const inputRef = useRef(null);

  const steps = [
    "1️⃣ User types a character in the search input.",
    "2️⃣ Input event triggers the debounced function.",
    "3️⃣ debounce delays execution by 300ms.",
    "4️⃣ If the user types again within 300ms, timer resets.",
    "5️⃣ After 300ms of no new input, the search function executes.",
    "6️⃣ Console logs the current input value."
  ];

  const explanations = [
    {
      title: "Delay-based execution",
      description:
        "Runs the function after user activity has stopped."
    },
    {
      title: "Improves performance",
      description:
        "Prevents excessive computations or network calls during rapid events."
    },
    {
      title: "Flexible configurations",
      description:
        "Supports leading (immediate) and trailing (delayed) execution, and even a maximum wait time."
    }
  ];

  const debouncedSearch = useRef(
    debounce(() => {
      const value = inputRef.current.value;
      setLogs((prev) => [...prev, `Searching for: "${value}"`]);
    }, 300)
  ).current;

  const handleInput = () => {
    setStep((prev) => Math.min(prev + 1, steps.length));
    debouncedSearch();
  };

  const reset = () => {
    setStep(0);
    setLogs([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex gap-6 p-6">
      {/* Left: Code */}
      <pre className="bg-gray-900 text-green-400 p-4 rounded w-1/2 overflow-x-auto">
{`import { debounce } from 'lodash';

const searchInput = document.getElementById('search-input');

const debouncedSearch = debounce(() => {
  console.log('Searching for:', searchInput.value);
}, 300);

searchInput.addEventListener('input', debouncedSearch);`}
      </pre>

      {/* Right: Steps, explanations, and simulation */}
      <div className="w-1/2 flex flex-col gap-4">
        <input
          ref={inputRef}
          id="search-input"
          type="text"
          placeholder="Type to search..."
          className="border p-2 rounded"
          onChange={handleInput}
        />

        {/* Step by Step */}
        <div className="bg-gray-100 p-4 rounded flex flex-col gap-2">
          <h3 className="font-bold">Step by Step:</h3>
          {steps.map((s, idx) => (
            <p
              key={idx}
              className={idx < step ? "text-green-600 font-semibold" : ""}
            >
              {s}
            </p>
          ))}
        </div>

        {/* Explanations */}
        <div className="bg-yellow-50 p-4 rounded flex flex-col gap-2">
          <h3 className="font-bold">Key Concepts:</h3>
          {explanations.map((exp, idx) => (
            <div key={idx} className="border-l-4 border-yellow-400 pl-2">
              <p className="font-semibold">{exp.title}</p>
              <p className="text-gray-700 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>

        {/* Console logs */}
        <div className="bg-gray-50 p-4 rounded h-32 overflow-y-auto">
          <h3 className="font-bold mb-2">Console Logs:</h3>
          {logs.map((log, idx) => (
            <p key={idx}>{log}</p>
          ))}
        </div>

        <button
          onClick={reset}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default DebounceVisualizer;
