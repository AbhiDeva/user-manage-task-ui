import React, { useState } from "react";

const object1 = {
  name: "John",
  age: 30,
  address: { city: "New York", zip: "10001" },
};

const object2 = {
  name: "John",
  age: 30,
  address: { city: "New York", zip: "10001" },
};

const DeepEqualVisualizer = () => {
  const [allSteps, setAllSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [result, setResult] = useState(null);

  // Generate all steps first
  const generateSteps = () => {
    const stepsArr = [];

    function deepEqual(obj1, obj2, path = "root") {
      if (obj1 === obj2) {
        stepsArr.push(`✅ ${path}: Both values are strictly equal`);
        return true;
      }

      if (
        obj1 == null ||
        typeof obj1 !== "object" ||
        obj2 == null ||
        typeof obj2 !== "object"
      ) {
        stepsArr.push(`❌ ${path}: One is object, other is not`);
        return false;
      }

      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) {
        stepsArr.push(
          `❌ ${path}: Different number of keys (${keys1.length} vs ${keys2.length})`
        );
        return false;
      }

      for (let key of keys1) {
        if (!keys2.includes(key)) {
          stepsArr.push(`❌ ${path}.${key}: Key not found in second object`);
          return false;
        }

        stepsArr.push(`🔹 Checking key "${key}" at path ${path}`);
        if (!deepEqual(obj1[key], obj2[key], `${path}.${key}`)) return false;
      }

      stepsArr.push(`✅ ${path}: All keys match`);
      return true;
    }

    const res = deepEqual(object1, object2);
    stepsArr.push(`🎯 Final Result: ${res}`);
    return { stepsArr, res };
  };

  const startVisualization = () => {
    const { stepsArr, res } = generateSteps();
    setAllSteps(stepsArr);
    setResult(res);
    setCurrentStepIndex(-1);

    // Animate steps with delay
    stepsArr.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStepIndex(index);
      }, index * 800); // 800ms delay between steps
    });
  };

  return (
    <div className="flex gap-6 p-6">
      {/* Left: Code */}
      <pre className="bg-gray-900 text-green-400 p-4 rounded w-1/2 overflow-x-auto text-sm">
{`function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (obj1 == null || typeof obj1 !== 'object' ||
      obj2 == null || typeof obj2 !== 'object') return false;

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}`}
      </pre>

      {/* Right: Steps */}
      <div className="w-1/2 flex flex-col gap-4">
        <button
          onClick={startVisualization}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Start Visualization
        </button>

        <div className="bg-gray-100 p-4 rounded h-[500px] overflow-y-auto flex flex-col gap-2">
          <h3 className="font-bold mb-2">Step by Step Evaluation:</h3>
          {allSteps.map((step, idx) => (
            <pre
              key={idx}
              className={`bg-gray-200 p-2 rounded text-sm whitespace-pre-wrap transition-colors ${
                idx === currentStepIndex ? "bg-yellow-300 font-bold" : ""
              }`}
            >
              {step}
            </pre>
          ))}
        </div>

        {result !== null && currentStepIndex === allSteps.length - 1 && (
          <div
            className={`mt-2 p-3 rounded text-white font-bold ${
              result ? "bg-green-600" : "bg-red-600"
            }`}
          >
            Final Result: {result.toString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeepEqualVisualizer;

