import React, { useState } from 'react';
import { sampleConcepts } from '../utils/dataJsCode.js';
import { useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { FaCode, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import { FiRotateCcw } from "react-icons/fi";
import { MdSpeed, MdAnimation } from "react-icons/md";
import { JsRenderVisualization } from '../components/JsRenderVisualisation.jsx';

const JavaScriptCodeVisualizer = () => {
  const [selectedConcept, setSelectedConcept] = useState('call-bind-apply');
  const [difficulty, setDifficulty] = useState('normal');
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const currentConcept = sampleConcepts[selectedConcept][difficulty];
  const totalSteps = currentConcept.steps.length;

  useEffect(() => {
    let timer;
    if (isPlaying && step < totalSteps - 1) {
      timer = setTimeout(() => setStep(step + 1), 2500);
    } else if (step >= totalSteps - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step, totalSteps]);

  const reset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const currentStep = currentConcept.steps[step];

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
              <h2 className="text-xl font-bold mb-4 text-gray-800">Select Code</h2>
              <p className="text-md font-bold mb-4 text-gray-800">Count :
                <span className="text-sm font-bold mb-4 text-blue-800"> {Object.entries(sampleConcepts).length}</span> </p>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {Object.entries(sampleConcepts).map(([key, problem]) => (
                <button
                  key={key}
                  onClick={() => { setSelectedConcept(key); reset(); }}
                  className={`w-full text-left p-3 rounded transition-all ${selectedConcept === key
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors font-medium text-sm'
                    }`
                  }
                >
                  {problem.title}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Code</h2>
            {currentStep.code && (
              <div className="mt-6 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                {/* <pre className="whitespace-pre-wrap">{currentStep.code}</pre> */}
                <Editor
                  height="22rem"
                  language="javascript"
                  value={currentStep.code || "// Select a problem to see the code"}
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
                {currentStep.highlight && (
                  <div className="mt-2 text-yellow-400 text-xs">
                    💡 Focus: {currentStep.highlight}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              <MdAnimation className="w-7 h-7 inline text-blue-500" />Visualization
            </h2>


            <div className="flex items-center gap-4">
              {/* <div className="space-y-2"> */}

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-600">Example:</label>
                  <select
                    onChange={(e) => { setDifficulty(e.target.value); reset(); }}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium"
                  >
                    {['normal', 'medium', 'complex'].map(key => (
                      <option key={key} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

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
              {/* </div> */}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{sampleConcepts[selectedConcept].title}</h2>
              <div className="text-sm text-gray-600">Step {step + 1} of {totalSteps}</div>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-semibold text-indigo-700">{currentStep.title}</h3>
              </div>
              <p className="text-gray-600 mt-2">{currentStep.desc}</p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              />
            </div>

            <div className="mb-6 min-h-64">
              <JsRenderVisualization currentConcept={currentConcept}
                step={step}
              />
            </div>

            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={currentStep === 0}
                className="p-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <FaChevronLeft className="w-5 h-5 cursor-pointer hover:text-blue-500" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={step >= totalSteps - 1}
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                {isPlaying ? (<FaPause className="w-5 h-5" />) : (<FaPlay className="w-5 h-5" />)}
              </button>

              <button
                onClick={() => setStep(Math.min(totalSteps - 1, step + 1))}
                disabled={currentStep >= step >= totalSteps - 1}
                className="p-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <FaChevronRight className="w-5 h-5 cursor-pointer hover:text-blue-500" />
              </button>

              <button
                onClick={reset}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <FiRotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default JavaScriptCodeVisualizer;