import React, { useState } from 'react';
//import { Play, RotateCcw, ChevronRight, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import {
  MdPlayArrow,
  MdRotateLeft,
  MdChevronRight,
  MdWarningAmber,
  MdCheckCircle,
  MdLightbulbOutline
} from "react-icons/md";

const CallbackHellVisualizer = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedExample, setSelectedExample] = useState('basic');
  const [selectedSolution, setSelectedSolution] = useState('promises');
  const [showSolutionAnimation, setShowSolutionAnimation] = useState(false);
  const [solutionStep, setSolutionStep] = useState(0);

  const examples = {
    basic: {
      title: 'Basic Callback Hell',
      description: 'Simple nested callbacks showing the pyramid of doom',
      levels: 4,
      code: `// Callback Hell Example
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        getMoreData(d, function(e) {
          console.log('Finally got:', e);
        });
      });
    });
  });
});`,
      steps: [
        { name: 'getData()', desc: 'First async call', level: 0, data: 'a' },
        { name: 'getMoreData(a)', desc: 'Uses result from step 1', level: 1, data: 'b' },
        { name: 'getMoreData(b)', desc: 'Uses result from step 2', level: 2, data: 'c' },
        { name: 'getMoreData(c)', desc: 'Uses result from step 3', level: 3, data: 'd' },
        { name: 'getMoreData(d)', desc: 'Final callback', level: 4, data: 'e' }
      ]
    },
    api: {
      title: 'API Request Hell',
      description: 'Real-world API calls nested within each other',
      levels: 5,
      code: `// API Request Hell
fetch('/api/user', function(user) {
  fetch('/api/profile/' + user.id, function(profile) {
    fetch('/api/posts/' + profile.id, function(posts) {
      fetch('/api/comments/' + posts[0].id, function(comments) {
        fetch('/api/likes/' + comments[0].id, function(likes) {
          console.log('All data loaded:', likes);
        });
      });
    });
  });
});`,
      steps: [
        { name: 'fetch(/api/user)', desc: 'Get user data', level: 0, data: 'user' },
        { name: 'fetch(/api/profile)', desc: 'Get user profile', level: 1, data: 'profile' },
        { name: 'fetch(/api/posts)', desc: 'Get user posts', level: 2, data: 'posts' },
        { name: 'fetch(/api/comments)', desc: 'Get post comments', level: 3, data: 'comments' },
        { name: 'fetch(/api/likes)', desc: 'Get comment likes', level: 4, data: 'likes' }
      ]
    },
    fileSystem: {
      title: 'File System Hell',
      description: 'Reading files with nested callbacks',
      levels: 4,
      code: `// File System Hell
fs.readFile('file1.txt', function(err, data1) {
  if (err) throw err;
  fs.readFile('file2.txt', function(err, data2) {
    if (err) throw err;
    fs.readFile('file3.txt', function(err, data3) {
      if (err) throw err;
      fs.writeFile('output.txt', data1 + data2 + data3, function(err) {
        if (err) throw err;
        console.log('Files combined!');
      });
    });
  });
});`,
      steps: [
        { name: 'readFile(file1)', desc: 'Read first file', level: 0, data: 'data1' },
        { name: 'readFile(file2)', desc: 'Read second file', level: 1, data: 'data2' },
        { name: 'readFile(file3)', desc: 'Read third file', level: 2, data: 'data3' },
        { name: 'writeFile(output)', desc: 'Write combined data', level: 3, data: 'success' }
      ]
    }
  };

  const solutions = {
    promises: {
      title: 'Solution: Promises',
      description: 'Flatten the pyramid using promise chains',
      code: `// Solution 1: Promises
getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .then(c => getMoreData(c))
  .then(d => getMoreData(d))
  .then(e => console.log('Got:', e))
  .catch(err => console.error(err));`,
      steps: [
        { line: 'getData()', desc: 'Start promise chain', status: 'pending' },
        { line: '.then(a => getMoreData(a))', desc: 'Handle result, return new promise', status: 'pending' },
        { line: '.then(b => getMoreData(b))', desc: 'Chain continues flat', status: 'pending' },
        { line: '.then(c => getMoreData(c))', desc: 'No nesting needed', status: 'pending' },
        { line: '.then(d => getMoreData(d))', desc: 'Still flat!', status: 'pending' },
        { line: '.catch(err => ...)', desc: 'Single error handler', status: 'success' }
      ],
      fixes: [
        { problem: 'Deep nesting', solution: 'Flat chain with .then()' },
        { problem: 'Hard to read', solution: 'Linear, top-to-bottom flow' },
        { problem: 'Scattered errors', solution: 'Single .catch() at end' },
        { problem: 'Horizontal growth', solution: 'Vertical, clean structure' }
      ]
    },
    asyncAwait: {
      title: 'Solution: Async/Await',
      description: 'Write async code that looks synchronous',
      code: `// Solution 2: Async/Await
async function fetchData() {
  try {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getMoreData(b);
    const d = await getMoreData(c);
    const e = await getMoreData(d);
    console.log('Got:', e);
  } catch (err) {
    console.error(err);
  }
}`,
      steps: [
        { line: 'async function fetchData()', desc: 'Declare async function', status: 'pending' },
        { line: 'try {', desc: 'Start error handling block', status: 'pending' },
        { line: 'const a = await getData()', desc: 'Wait for result (looks sync!)', status: 'pending' },
        { line: 'const b = await getMoreData(a)', desc: 'Use previous result easily', status: 'pending' },
        { line: 'const c = await getMoreData(b)', desc: 'Sequential, readable', status: 'pending' },
        { line: 'catch (err) {...}', desc: 'Handle all errors in one place', status: 'success' }
      ],
      fixes: [
        { problem: 'Callback nesting', solution: 'Sequential await statements' },
        { problem: 'Readability', solution: 'Looks like synchronous code' },
        { problem: 'Error handling', solution: 'try/catch blocks' },
        { problem: 'Debugging', solution: 'Standard breakpoints work' }
      ]
    },
    promiseAll: {
      title: 'Solution: Promise.all',
      description: 'Run independent operations in parallel',
      code: `// Solution 3: Promise.all (parallel)
async function fetchData() {
  try {
    const [user, profile, posts] = await Promise.all([
      fetch('/api/user'),
      fetch('/api/profile'),
      fetch('/api/posts')
    ]);
    console.log('All loaded:', {user, profile, posts});
  } catch (err) {
    console.error(err);
  }
}`,
      steps: [
        { line: 'async function fetchData()', desc: 'Declare async function', status: 'pending' },
        { line: 'Promise.all([', desc: 'Start parallel execution', status: 'pending' },
        { line: 'fetch(/api/user),', desc: 'Request 1 starts', status: 'running' },
        { line: 'fetch(/api/profile),', desc: 'Request 2 starts (parallel!)', status: 'running' },
        { line: 'fetch(/api/posts)', desc: 'Request 3 starts (parallel!)', status: 'running' },
        { line: 'await Promise.all(...)', desc: 'Wait for ALL to complete', status: 'success' }
      ],
      fixes: [
        { problem: 'Sequential waiting', solution: 'Parallel execution' },
        { problem: 'Slow performance', solution: 'Faster - all run together' },
        { problem: 'Complex coordination', solution: 'Promise.all handles it' },
        { problem: 'Timeout issues', solution: 'Completes when slowest finishes' }
      ]
    },
    modular: {
      title: 'Solution: Modular Functions',
      description: 'Break into smaller, reusable functions',
      code: `// Solution 4: Modular Approach
async function getUserData(userId) {
  return await fetch(\`/api/user/\${userId}\`);
}

async function getProfileData(user) {
  return await fetch(\`/api/profile/\${user.id}\`);
}

async function getAllUserInfo(userId) {
  try {
    const user = await getUserData(userId);
    const profile = await getProfileData(user);
    return { user, profile };
  } catch (err) {
    console.error('Error:', err);
  }
}`,
      steps: [
        { line: 'function getUserData()', desc: 'Single responsibility function', status: 'pending' },
        { line: 'function getProfileData()', desc: 'Another focused function', status: 'pending' },
        { line: 'function getAllUserInfo()', desc: 'Orchestrator function', status: 'pending' },
        { line: 'const user = await getUserData()', desc: 'Call modular function', status: 'pending' },
        { line: 'const profile = await getProfileData(user)', desc: 'Compose functions', status: 'pending' },
        { line: 'return { user, profile }', desc: 'Clean, testable result', status: 'success' }
      ],
      fixes: [
        { problem: 'Monolithic code', solution: 'Small, focused functions' },
        { problem: 'Hard to test', solution: 'Each function testable alone' },
        { problem: 'Code reuse', solution: 'Functions can be reused' },
        { problem: 'Maintainability', solution: 'Easy to update individual parts' }
      ]
    }
  };

  const currentExample = examples[selectedExample];
  const currentSolution = solutions[selectedSolution];

  const playAnimation = () => {
    setIsAnimating(true);
    setActiveStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= currentExample.steps.length) {
        clearInterval(interval);
        setIsAnimating(false);
      } else {
        setActiveStep(step);
      }
    }, 1000);
  };

  const playSolutionAnimation = () => {
    setShowSolutionAnimation(true);
    setSolutionStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= currentSolution.steps.length) {
        clearInterval(interval);
        setTimeout(() => setShowSolutionAnimation(false), 2000);
      } else {
        setSolutionStep(step);
      }
    }, 800);
  };

  const reset = () => {
    setActiveStep(0);
    setIsAnimating(false);
    setSolutionStep(0);
    setShowSolutionAnimation(false);
  };

  const getIndentation = (level) => {
    return level * 40;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            ⚠️ Callback Hell Visualizer
          </h1>
          <p className="text-white text-lg opacity-90">Understanding the Pyramid of Doom</p>
        </div>

        {/* Example Selection */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <MdLightbulbOutline className="mr-2 text-yellow-500" size={28} />
            Select Example
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(examples).map(key => (
              <button
                key={key}
                onClick={() => {
                  setSelectedExample(key);
                  reset();
                }}
                className={`p-4 rounded-xl transition-all transform hover:scale-105 ${
                  selectedExample === key
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="font-bold text-lg mb-1">{examples[key].title}</div>
                <div className="text-sm opacity-80">{examples[key].description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={playAnimation}
              disabled={isAnimating}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              <MdPlayArrow size={20} />
              <span>Play Animation</span>
            </button>
            <button
              onClick={reset}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              <MdRotateLeft size={20} />
              <span>Reset</span>
            </button>
            <div className="flex items-center space-x-2 bg-blue-100 px-6 py-3 rounded-xl">
              <span className="font-bold text-blue-700">Step: {activeStep + 1} / {currentExample.steps.length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Visual Pyramid */}
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <MdWarningAmber className="mr-2 text-red-600" size={24} />
              Callback Hell (Pyramid of Doom)
            </h3>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              {currentExample.steps.map((step, index) => (
                <div
                  key={index}
                  style={{ marginLeft: `${getIndentation(step.level)}px` }}
                  className={`mb-2 transition-all duration-500 ${
                    index <= activeStep
                      ? 'opacity-100 transform translate-y-0'
                      : 'opacity-30 transform translate-y-4'
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg font-mono text-sm ${
                      index === activeStep
                        ? 'bg-yellow-500 text-gray-900 animate-pulse'
                        : index < activeStep
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {step.name}
                  </div>
                  {index <= activeStep && (
                    <div
                      className="ml-4 mt-1 text-xs text-gray-400 font-mono"
                      style={{ marginLeft: `${getIndentation(step.level) + 16}px` }}
                    >
                      → returns: {step.data}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <MdWarningAmber className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-bold text-red-700 mb-1">Problems with Callback Hell:</div>
                  <ul className="text-sm text-red-600 space-y-1">
                    <li>• Hard to read and understand</li>
                    <li>• Difficult to maintain</li>
                    <li>• Error handling becomes complex</li>
                    <li>• Code grows horizontally (pyramid shape)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Code Example</h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-gray-100 text-sm font-mono whitespace-pre">
                {currentExample.code}
              </pre>
            </div>
            <div className="mt-4 bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
              <div className="font-bold text-orange-700 mb-2">Current Step:</div>
              <div className="text-sm text-orange-600">
                <div className="font-semibold">{currentExample.steps[activeStep].name}</div>
                <div className="mt-1">{currentExample.steps[activeStep].desc}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Solutions */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <MdCheckCircle className="mr-2 text-green-600" size={28} />
            Solutions to Callback Hell
          </h3>
          
          {/* Solution Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {Object.keys(solutions).map(key => (
              <button
                key={key}
                onClick={() => {
                  setSelectedSolution(key);
                  setSolutionStep(0);
                  setShowSolutionAnimation(false);
                }}
                className={`p-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                  selectedSolution === key
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {solutions[key].title.replace('Solution: ', '')}
              </button>
            ))}
          </div>

          {/* Selected Solution Detail */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-green-700">{currentSolution.title}</h4>
                <p className="text-green-600 text-sm mt-1">{currentSolution.description}</p>
              </div>
              <button
                onClick={playSolutionAnimation}
                disabled={showSolutionAnimation}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-bold transition-all"
              >
                <MdPlayArrow size={16} />
                <span>Show Fix</span>
              </button>
            </div>

            {/* Solution Code */}
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <pre className="text-gray-100 text-sm font-mono whitespace-pre overflow-x-auto">
                {currentSolution.code}
              </pre>
            </div>

            {/* Solution Steps Animation */}
            {showSolutionAnimation && (
              <div className="bg-white rounded-lg p-4 mb-4 border-2 border-green-400">
                <h5 className="font-bold text-green-700 mb-3">Execution Flow:</h5>
                <div className="space-y-2">
                  {currentSolution.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg transition-all duration-500 ${
                        index <= solutionStep
                          ? index === solutionStep
                            ? 'bg-yellow-200 border-2 border-yellow-500 animate-pulse'
                            : 'bg-green-100 border-2 border-green-400'
                          : 'bg-gray-100 opacity-50'
                      }`}
                    >
                      <div className="font-mono text-sm font-bold text-gray-800">{step.line}</div>
                      <div className="text-xs text-gray-600 mt-1">{step.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problem → Solution Mapping */}
            <div className="bg-white rounded-lg p-4 border-2 border-green-300">
              <h5 className="font-bold text-green-700 mb-3">How This Fixes The Problems:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentSolution.fixes.map((fix, index) => (
                  <div key={index} className="bg-gradient-to-r from-red-50 to-green-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-start space-x-2 mb-2">
                      <MdWarningAmber className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                      <div className="text-sm font-semibold text-red-700">{fix.problem}</div>
                    </div>
                    <div className="flex items-start space-x-2 ml-6">
                      <MdChevronRight className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                      <div className="text-sm text-green-700 font-medium">{fix.solution}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
            <div className="font-bold text-green-700 mb-2">✓ Benefits of Modern Solutions:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-600">
              <div>• Flat, readable code structure</div>
              <div>• Easy error handling with try/catch</div>
              <div>• Better debugging experience</div>
              <div>• Can run operations in parallel</div>
              <div>• More maintainable code</div>
              <div>• Follows modern JavaScript standards</div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mt-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Before vs After</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="bg-red-100 border-2 border-red-400 rounded-lg p-3 mb-2">
                <div className="font-bold text-red-700 flex items-center">
                  <MdWarningAmber className="mr-2" size={16} />
                  Before (Callback Hell)
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Deep nesting (pyramid shape)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Hard to follow code flow</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Error handling scattered everywhere</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Difficult to refactor or test</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-green-100 border-2 border-green-400 rounded-lg p-3 mb-2">
                <div className="font-bold text-green-700 flex items-center">
                  <MdCheckCircle className="mr-2" size={16} />
                  After (Modern Approach)
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Flat, linear code structure</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Clear, easy to read flow</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Centralized error handling</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Easy to maintain and test</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallbackHellVisualizer;