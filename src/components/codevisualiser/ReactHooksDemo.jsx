import React, { useState, useEffect, useMemo, useRef, useReducer } from 'react';
//import { Play, Pause, RotateCcw, ChevronRight, Zap, Database, RefreshCw, Layout, Package } from 'lucide-react';
import {
  MdPlayArrow,
  MdPause,
  MdRotateLeft,
  MdChevronRight,
  MdBolt,
  MdStorage,
  MdRefresh,
  MdViewQuilt,
  MdInventory2
} from "react-icons/md";

function ReactHookDemo() {
  const [activeHook, setActiveHook] = useState('useState');

  const hooks = [
    { id: 'useState', name: 'useState', icon: MdStorage },
    { id: 'useEffect', name: 'useEffect', icon: MdRefresh },
    { id: 'useMemo', name: 'useMemo', icon:   MdBolt },
    { id: 'useRef', name: 'useRef', icon: MdViewQuilt },
    { id: 'useReducer', name: 'useReducer', icon: MdInventory2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            React Hooks Visualizer
          </h1>
          <p className="text-purple-300">Interactive step-by-step guide to React Hooks</p>
        </div>

        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          {hooks.map(hook => {
            const Icon = hook.icon;
            return (
              <button
                key={hook.id}
                onClick={() => setActiveHook(hook.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  activeHook === hook.id
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                {hook.name}
              </button>
            );
          })}
        </div>

        {activeHook === 'useState' && <UseStateVisualizer />}
        {activeHook === 'useEffect' && <UseEffectVisualizer />}
        {activeHook === 'useMemo' && <UseMemoVisualizer />}
        {activeHook === 'useRef' && <UseRefVisualizer />}
        {activeHook === 'useReducer' && <UseReducerVisualizer />}
      </div>
    </div>
  );
}

function UseStateVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [count, setCount] = useState(0);

  const steps = [
    { title: 'Initial Render', desc: 'Component renders with initial state value = 0' },
    { title: 'User Clicks Button', desc: 'setCount(count + 1) is called' },
    { title: 'State Update Queued', desc: 'React schedules a re-render with new state' },
    { title: 'Component Re-renders', desc: 'Component function runs again with count = 1' },
    { title: 'UI Updates', desc: 'DOM is updated to show new count value' }
  ];

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        if (currentStep === 1) setCount(1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setCount(0);
  };

  return (
    <div className="space-y-6">
      <Controls 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        onReset={handleReset} 
        currentStep={currentStep} 
        totalSteps={steps.length} 
      />
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Visual Flow</h3>
          
          <div className="space-y-4">
            <FlowBox title="State" highlight={currentStep >= 0} pulse={currentStep === 2}>
              <div className="text-center">
                <div className="text-sm text-purple-300 mb-2">count</div>
                <div className="text-4xl font-bold text-white">{count}</div>
              </div>
            </FlowBox>

            {currentStep >= 1 && <AnimatedArrow />}

            {currentStep >= 1 && (
              <FlowBox title="Setter Function" highlight={currentStep >= 1} pulse={currentStep === 1}>
                <code className="text-green-400 text-sm">
                  setCount({count + 1})
                </code>
              </FlowBox>
            )}

            {currentStep >= 2 && <AnimatedArrow />}

            {currentStep >= 2 && (
              <FlowBox title="React Queue" highlight={currentStep >= 2} pulse={currentStep === 2}>
                <div className="text-yellow-300 text-sm">📋 Re-render scheduled</div>
              </FlowBox>
            )}

            {currentStep >= 3 && <AnimatedArrow />}

            {currentStep >= 3 && (
              <FlowBox title="Re-render" highlight={currentStep >= 3} pulse={currentStep === 3}>
                <div className="text-blue-300 text-sm">🔄 Function runs</div>
              </FlowBox>
            )}

            {currentStep >= 4 && <AnimatedArrow />}

            {currentStep >= 4 && (
              <FlowBox title="UI Updated" highlight={currentStep >= 4} pulse={currentStep === 4}>
                <div className="text-green-300 text-sm">✅ DOM updated</div>
              </FlowBox>
            )}

            <div className="mt-6 p-4 bg-purple-500/20 border border-purple-500 rounded-lg">
              <button
                onClick={() => setCount(prev => prev + 1)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
              >
                Increment: {count}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <StepsList steps={steps} currentStep={currentStep} />
          
          <CodeBlock
            code={`function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// How it works:
// - useState returns [value, setter]
// - Calling setter triggers re-render
// - Component function runs again`}
          />
        </div>
      </div>
    </div>
  );
}

// Add these after UseStateVisualizer

function UseEffectVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [count, setCount] = useState(0);
  const [effectRuns, setEffectRuns] = useState(0);

  const steps = [
    { title: 'Mount', desc: 'Component renders first time' },
    { title: 'Effect Runs', desc: 'useEffect executes after render' },
    { title: 'State Update', desc: 'User clicks button' },
    { title: 'Re-render', desc: 'Component re-renders' },
    { title: 'Effect Again', desc: 'Effect runs again' }
  ];

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        if (currentStep === 1 || currentStep === 4) {
          setEffectRuns(prev => prev + 1);
        }
        if (currentStep === 2) {
          setCount(1);
        }
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setCount(0);
    setEffectRuns(0);
  };

  return (
    <div className="space-y-6">
      <Controls 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        onReset={handleReset} 
        currentStep={currentStep} 
        totalSteps={steps.length} 
      />
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Visual Flow</h3>
          
          <div className="space-y-4">
            <FlowBox title="Render" highlight={currentStep >= 0} pulse={currentStep === 0 || currentStep === 3}>
              <div className="text-white text-sm">count = {count}</div>
            </FlowBox>

            {currentStep >= 1 && <AnimatedArrow text="After render" />}

            {currentStep >= 1 && (
              <FlowBox title="useEffect" highlight={currentStep >= 1} pulse={currentStep === 1 || currentStep === 4}>
                <div className="space-y-2">
                  <div className="text-green-400 text-sm">🎯 Runs: {effectRuns}</div>
                  <div className="text-xs text-purple-300">Deps: [count]</div>
                </div>
              </FlowBox>
            )}

            <div className="mt-6 p-4 bg-purple-500/20 border border-purple-500 rounded-lg">
              <button
                onClick={() => {
                  setCount(prev => prev + 1);
                  setTimeout(() => setEffectRuns(prev => prev + 1), 100);
                }}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Update (Triggers Effect)
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <StepsList steps={steps} currentStep={currentStep} />
          
          <CodeBlock
            code={`function Example() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Effect ran!');
    document.title = \`Count: \${count}\`;
    
    return () => {
      console.log('Cleanup');
    };
  }, [count]);
  
  return <button onClick={() => setCount(count + 1)}>
    Click
  </button>;
}`}
          />
        </div>
      </div>
    </div>
  );
}

function UseMemoVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [number, setNumber] = useState(5);
  const [theme, setTheme] = useState('light');
  const [calcLog, setCalcLog] = useState([]);

  const steps = [
    { title: 'Initial', desc: 'useMemo calculates value' },
    { title: 'Theme Change', desc: 'Dependency stays same' },
    { title: 'No Recalc', desc: 'Returns cached value' },
    { title: 'Number Change', desc: 'Dependency changes' },
    { title: 'Recalculate', desc: 'New value calculated' }
  ];

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        if (currentStep === 1) setTheme('dark');
        if (currentStep === 3) setNumber(10);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep]);

  const expensiveValue = useMemo(() => {
    setCalcLog(prev => [...prev, Date.now()]);
    return number * 2;
  }, [number]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setNumber(5);
    setTheme('light');
    setCalcLog([]);
  };

  return (
    <div className="space-y-6">
      <Controls 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        onReset={handleReset} 
        currentStep={currentStep} 
        totalSteps={steps.length} 
      />
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Visual Flow</h3>
          
          <div className="space-y-4">
            <FlowBox title="Dependencies" highlight={currentStep >= 0} pulse={currentStep === 3}>
              <div className="space-y-2 text-sm">
                <div className="text-purple-300">number: {number}</div>
                <div className="text-gray-400">theme: {theme}</div>
              </div>
            </FlowBox>

            <AnimatedArrow />

            <FlowBox title="useMemo" highlight={currentStep >= 0} pulse={currentStep === 2 || currentStep === 4}>
              <div className="text-yellow-300 text-sm">
                {currentStep === 2 ? '✅ Cached!' : '🔄 Checking...'}
              </div>
            </FlowBox>

            <AnimatedArrow />

            <FlowBox title="Value" highlight={currentStep >= 0} pulse={currentStep === 0 || currentStep === 4}>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">{expensiveValue}</div>
                <div className="text-xs text-green-300">Calcs: {calcLog.length}</div>
              </div>
            </FlowBox>

            <div className="mt-6 p-4 bg-purple-500/20 border border-purple-500 rounded-lg space-y-2">
              <button
                onClick={() => setNumber(prev => prev + 1)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Number (Recalc)
              </button>
              <button
                onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Theme (No Recalc)
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <StepsList steps={steps} currentStep={currentStep} />
          
          <CodeBlock
            code={`function Example() {
  const [number, setNumber] = useState(5);
  const [theme, setTheme] = useState('light');
  
  const value = useMemo(() => {
    return number * 2;
  }, [number]);
  
  return <div>{value}</div>;
}`}
          />
        </div>
      </div>
    </div>
  );
}

function UseRefVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [count, setCount] = useState(0);
  const renderCountRef = useRef(0);

  const steps = [
    { title: 'Mount', desc: 'Creates ref object' },
    { title: 'Update Ref', desc: 'ref.current++ (no re-render)' },
    { title: 'State Update', desc: 'Triggers re-render' },
    { title: 'Ref Persists', desc: 'Value survives' }
  ];

  useEffect(() => {
    renderCountRef.current += 1;
  });

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        if (currentStep === 2) setCount(1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setCount(0);
  };

  return (
    <div className="space-y-6">
      <Controls 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        onReset={handleReset} 
        currentStep={currentStep} 
        totalSteps={steps.length} 
      />
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Visual Flow</h3>
          
          <div className="space-y-4">
            <FlowBox title="Ref" highlight={currentStep >= 0} pulse={currentStep === 1}>
              <div className="space-y-2">
                <code className="text-purple-300 text-sm">
                  current: {renderCountRef.current}
                </code>
                <div className="text-xs text-green-300">✅ Persists</div>
                <div className="text-xs text-yellow-300">⚠️ No re-render</div>
              </div>
            </FlowBox>

            <FlowBox title="State" highlight={currentStep >= 0} pulse={currentStep === 2}>
              <div className="text-white">count = {count}</div>
            </FlowBox>

            <FlowBox title="Renders" highlight={currentStep >= 0}>
              <div className="text-2xl font-bold text-white">{renderCountRef.current}</div>
            </FlowBox>

            <div className="mt-6 p-4 bg-purple-500/20 border border-purple-500 rounded-lg space-y-2">
              <button
                onClick={() => {
                  renderCountRef.current += 10;
                  alert(`Ref: ${renderCountRef.current}`);
                }}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Update Ref
              </button>
              <button
                onClick={() => setCount(prev => prev + 1)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Update State
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <StepsList steps={steps} currentStep={currentStep} />
          
          <CodeBlock
            code={`function Example() {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
  });
  
  return <p>Renders: {renderCount.current}</p>;
}`}
          />
        </div>
      </div>
    </div>
  );
}

function UseReducerVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const steps = [
    { title: 'Initial', desc: 'State = { count: 0 }' },
    { title: 'Dispatch', desc: 'Action sent' },
    { title: 'Reducer', desc: 'Processes action' },
    { title: 'New State', desc: 'Returns new state' },
    { title: 'Re-render', desc: 'Updates' }
  ];

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        if (currentStep === 1) dispatch({ type: 'increment' });
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      <Controls 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        onReset={handleReset} 
        currentStep={currentStep} 
        totalSteps={steps.length} 
      />
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Visual Flow</h3>
          
          <div className="space-y-4">
            <FlowBox title="State" highlight={currentStep >= 0} pulse={currentStep === 4}>
              <div className="text-2xl font-bold text-white">count: {state.count}</div>
            </FlowBox>

            {currentStep >= 1 && <AnimatedArrow text="dispatch" />}

            {currentStep >= 1 && (
              <FlowBox title="Action" highlight={currentStep >= 1} pulse={currentStep === 1}>
                <code className="text-yellow-300 text-sm">
                  type: 'increment'
                </code>
              </FlowBox>
            )}

            {currentStep >= 2 && <AnimatedArrow text="reducer" />}

            {currentStep >= 2 && (
              <FlowBox title="Reducer" highlight={currentStep >= 2} pulse={currentStep === 2}>
                <code className="text-green-300 text-xs">
                  return count + 1
                </code>
              </FlowBox>
            )}

            <div className="mt-6 p-4 bg-purple-500/20 border border-purple-500 rounded-lg space-y-2">
              <button
                onClick={() => dispatch({ type: 'increment' })}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Increment
              </button>
              <button
                onClick={() => dispatch({ type: 'decrement' })}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Decrement
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <StepsList steps={steps} currentStep={currentStep} />
          
          <CodeBlock
            code={`function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(
    reducer, 
    { count: 0 }
  );
  
  return (
    <button onClick={() => dispatch({ type: 'increment' })}>
      {state.count}
    </button>
  );
}`}
          />
        </div>
      </div>
    </div>
  );
}

// Helper Components
function Controls({ isPlaying, setIsPlaying, onReset, currentStep, totalSteps }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 ${
              isPlaying ? 'bg-yellow-500' : 'bg-green-500'
            } text-white`}
          >
            {isPlaying ? <MdPause className="w-4 h-4" /> : <MdPlayArrow className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg font-bold flex items-center gap-2 bg-red-500 text-white"
          >
            <MdRotateLeft className="w-4 h-4" />
            Reset
          </button>
        </div>
        <div className="text-white">
          Step {currentStep + 1} / {totalSteps}
        </div>
      </div>
      <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}

function FlowBox({ title, children, highlight, pulse }) {
  return (
    <div
      className={`border-2 rounded-lg p-4 transition-all duration-300 ${
        highlight ? 'border-purple-500 bg-purple-500/20' : 'border-white/20 bg-white/5'
      } ${pulse ? 'animate-pulse scale-105' : ''}`}
    >
      <div className="text-sm font-bold text-purple-300 mb-2">{title}</div>
      {children}
    </div>
  );
}

function AnimatedArrow({ text }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <MdChevronRight className="w-5 h-5 text-purple-400 animate-pulse" />
      {text && <span className="text-xs text-purple-300">{text}</span>}
    </div>
  );
}

function StepsList({ steps, currentStep }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <h3 className="text-lg font-bold text-white mb-4">Steps</h3>
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg border-2 transition-all ${
              idx === currentStep
                ? 'border-purple-500 bg-purple-500/20 scale-105'
                : idx < currentStep
                ? 'border-green-500/50 bg-green-500/10'
                : 'border-white/10 bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                idx === currentStep ? 'bg-purple-500 text-white' :
                idx < currentStep ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'
              }`}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="font-bold text-white text-sm">{step.title}</div>
                <div className="text-xs text-purple-300">{step.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
      <div className="bg-purple-500/30 px-4 py-3 flex items-center justify-between">
        <h3 className="font-bold text-white">Code Example</h3>
        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Code
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-xs text-green-400 font-mono leading-relaxed">
          {code}
        </pre>
      </div>
    </div>
  );
}

export default ReactHookDemo;