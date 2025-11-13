import React, { useState } from 'react';
import {sampleProblems} from '../utils/codedata.js'
import { generateSteps } from '../utils/generatestepsforProblems.js';
import { useEffect } from 'react';
import { RenderVisualization } from '../components/RenderVisualisation.jsx';
import Editor from "@monaco-editor/react";
import { FaCode, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import { FiRotateCcw } from "react-icons/fi"; 
import { MdSpeed, MdAnimation } from "react-icons/md";

const JavaScriptCodeVisualizer = () => {
  const [code, setCode] = useState('');
  const [problemType, setProblemType] = useState('array');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [speed, setSpeed] = useState(1000);


  const parseAndVisualize = (selectedProblem) => {
    const problem = sampleProblems[selectedProblem];
    if (!problem) return;

    setCode(problem.code);
    setProblemType(selectedProblem);
    const visualSteps = generateSteps(selectedProblem, problem.input);
    setSteps(visualSteps);
    setCurrentStep(0);
  };


  const changeExample = (exampleType) => {
    const problem = sampleProblems[problemType];
    if (!problem || !problem.examples) return;

    const newInput = { ...problem.input, type: exampleType };
    if (problem.examples[exampleType]) {
      if (problemType === 'encodeDecodeStrings') {
        newInput.strs = problem.examples[exampleType];
      } else if (['twoSumII', 'threeSum', 'bestTimeToBuyStock', 'dailyTemperatures'].includes(problemType)) {
        Object.assign(newInput, typeof problem.examples[exampleType] === 'object' ? problem.examples[exampleType] : { [Object.keys(problem.input)[1]]: problem.examples[exampleType] });
      }
    }

    const visualSteps = generateSteps(problemType, newInput);
    setSteps(visualSteps);
    setCurrentStep(0);
  };

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length, speed]);

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
             <FaCode className="w-10 h-10 text-blue-600" />
               JavaScript Code Solution Visualizer
          </h1>
          <p className="text-gray-600">Step-by-step code visualization</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
                 <h2 className="text-xl font-bold mb-4 text-gray-800">Select Problem</h2>
                 <p className="text-md font-bold mb-4 text-gray-800">Count :
                  <span className="text-sm font-bold mb-4 text-blue-800"> {Object.entries(sampleProblems).length}</span> </p>
            </div>
           
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {Object.entries(sampleProblems).map(([key, problem]) => (
                <button
                  key={key}
                  onClick={() => parseAndVisualize(key)}
                  className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors font-medium text-sm"
                >
                  {problem.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Code</h2>
          <Editor
            height="22rem"
            language="javascript"
            value={code || "// Select a problem to see the code"}
            theme="vs-dark" // Light background (can switch to 'vs-dark' for dark mode)
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 15,
              lineNumbers: "off",
              smoothScrolling: true,
              padding: { top: 16, bottom: 16 },
              lineDecorationsWidth: 8,
              renderLineHighlight: "all", // highlight the current line
              renderLineHighlightOnlyWhenFocus: false,
              roundedSelection: true,
              cursorBlinking: "smooth",
              scrollbar: {
                vertical: "visible",
                horizontal: "visible",
                verticalScrollbarSize: 12,
                horizontalScrollbarSize: 12,
                useShadows: false,
                alwaysConsumeMouseWheel: false,
              },
              overviewRulerBorder: false,
            }}
            className="min-h-[24rem] w-full rounded-xl border border-gray-300 
             bg-white text-gray-900 shadow-md 
             bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm font-mono overflow-y-auto
             hover:shadow-lg transition-all duration-300 "
          />
          </div>
        </div>

        {steps.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                 <MdAnimation className="w-7 h-7 inline text-blue-500" />Visualization
                </h2>
              <div className="flex items-center gap-4">
                {sampleProblems[problemType]?.examples && (
                  
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-600">Example:</label>
                    <select
                      onChange={(e) => changeExample(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium"
                    >
                      {Object.keys(sampleProblems[problemType].examples).map(key => (
                        <option key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-600">
                    <MdSpeed className="w-8 h-8 text-blue-500" /> 
              </label>
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="px-3 py-1 border border-gray-300 rounded-lg"
                  >
                    <option value={2000}>Slow</option>
                    <option value={1000}>Normal</option>
                    <option value={500}>Fast</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-6 min-h-64">
              <RenderVisualization steps={steps}
                currentStep={currentStep}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="font-semibold text-gray-800 mb-2">
                Step {currentStep + 1} of {steps.length}
              </div>
              <div className="text-gray-700">{steps[currentStep]?.description}</div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="p-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                 <FaChevronLeft className="w-5 h-5 cursor-pointer hover:text-blue-500" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={currentStep >= steps.length - 1}
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                {isPlaying ? ( <FaPause className="w-5 h-5" />) : (<FaPlay className="w-5 h-5" />)}
              </button> 

              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep >= steps.length - 1}
                className="p-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                 <FaChevronRight className="w-5 h-5 cursor-pointer hover:text-blue-500" />
              </button>

              <button
                onClick={() => {
                  setCurrentStep(0);
                  setIsPlaying(false);
                }}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors ml-auto"
              >
                <FiRotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition" />
              </button>

              <div className="flex-1 mx-4">
                <input
                  type="range"
                  min="0"
                  max={steps.length - 1}
                  value={currentStep}
                  onChange={(e) => setCurrentStep(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <span className="text-sm text-gray-600 font-medium min-w-20 text-right">
                {currentStep + 1} / {steps.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JavaScriptCodeVisualizer;