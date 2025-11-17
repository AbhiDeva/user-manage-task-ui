import React, { useState, useEffect, useRef } from 'react';
//import { Play, Pause, RotateCcw, Activity, RefreshCw, Trash2, CheckCircle } from 'lucide-react';

import {
  MdPlayArrow,
  MdPause,
  MdRotateLeft,
  MdShowChart,
  MdRefresh,
  MdDelete,
  MdCheckCircle
} from "react-icons/md";

function ReactLifeCycle() {
  const [activeExample, setActiveExample] = useState('timer');

  const examples = [
    { id: 'timer', name: 'Timer Component', icon: MdShowChart },
    { id: 'fetch', name: 'Data Fetching', icon: MdRefresh },
    { id: 'cleanup', name: 'Cleanup Demo', icon: MdDelete }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            React Lifecycle Visualizer
          </h1>
          <p className="text-blue-300">See component lifecycle in action with real examples</p>
        </div>

        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          {examples.map(ex => {
            const Icon = ex.icon;
            return (
              <button
                key={ex.id}
                onClick={() => setActiveExample(ex.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  activeExample === ex.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                {ex.name}
              </button>
            );
          })}
        </div>

        {activeExample === 'timer' && <TimerExample />}
        {activeExample === 'fetch' && <FetchExample />}
        {activeExample === 'cleanup' && <CleanupExample />}
      </div>
    </div>
  );
}

// Example 1: Timer Component
function TimerExample() {
  const [showTimer, setShowTimer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [lifecycleLog, setLifecycleLog] = useState([]);

  const phases = [
    { name: 'Mount', desc: 'Component is being created and inserted into DOM', color: 'green' },
    { name: 'Update', desc: 'Component is re-rendering due to state/prop changes', color: 'blue' },
    { name: 'Unmount', desc: 'Component is being removed from DOM', color: 'red' }
  ];

  useEffect(() => {
    if (isPlaying) {
      const sequence = [
        { delay: 1000, action: () => { setShowTimer(true); setCurrentPhase(0); } },
        { delay: 3000, action: () => { setCurrentPhase(1); } },
        { delay: 5000, action: () => { setShowTimer(false); setCurrentPhase(2); } },
        { delay: 6000, action: () => { setIsPlaying(false); setCurrentPhase(0); } }
      ];

      const timers = sequence.map(({ delay, action }) => 
        setTimeout(action, delay)
      );

      return () => timers.forEach(clearTimeout);
    }
  }, [isPlaying]);

  const handleReset = () => {
    setShowTimer(false);
    setIsPlaying(false);
    setCurrentPhase(0);
    setLifecycleLog([]);
  };

  return (
    <div className="space-y-6">
      <Controls 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onReset={handleReset}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Live Demo</h3>

          <div className="space-y-4 mb-6">
            {phases.map((phase, idx) => (
              <PhaseBox
                key={idx}
                phase={phase}
                active={currentPhase === idx}
                completed={currentPhase > idx}
              />
            ))}
          </div>

          <div className="min-h-[200px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-dashed border-gray-600 relative">
            <div className="text-gray-400 text-sm mb-4">Component Container</div>
            
            {showTimer && (
              <TimerComponent 
                onLifecycle={(msg) => setLifecycleLog(prev => [...prev, { msg, time: Date.now() }])}
              />
            )}

            {!showTimer && lifecycleLog.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                Click Play to see lifecycle in action
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={() => setShowTimer(!showTimer)}
              className={`w-full px-4 py-2 rounded-lg font-medium ${
                showTimer ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {showTimer ? 'Unmount Component' : 'Mount Component'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <LifecycleLog logs={lifecycleLog} />
          
          <CodeBlock
            code={`function TimerComponent() {
  const [seconds, setSeconds] = useState(0);
  
  // MOUNT: Runs once after first render
  useEffect(() => {
    console.log('🟢 MOUNTED');
    
    // Start timer
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // UNMOUNT: Cleanup function
    return () => {
      console.log('🔴 UNMOUNTED');
      clearInterval(interval);
    };
  }, []); // Empty deps = mount/unmount only
  
  // UPDATE: Runs on every render
  useEffect(() => {
    console.log('🔵 UPDATED: seconds =', seconds);
  });
  
  return <div>Timer: {seconds}s</div>;
}`}
          />
        </div>
      </div>
    </div>
  );
}

function TimerComponent({ onLifecycle }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    onLifecycle('🟢 Component MOUNTED');
    
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => {
      onLifecycle('🔴 Component UNMOUNTING');
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      onLifecycle(`🔵 Component UPDATED - seconds: ${seconds}`);
    }
  }, [seconds]);

  return (
    <div className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-6 animate-fade-in">
      <div className="text-center">
        <div className="text-4xl font-bold text-white mb-2">{seconds}s</div>
        <div className="text-blue-300 text-sm">Timer Running...</div>
      </div>
    </div>
  );
}

// Example 2: Data Fetching
function FetchExample() {
  const [showComponent, setShowComponent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [lifecycleLog, setLifecycleLog] = useState([]);

  const phases = [
    { name: 'Mount', desc: 'Component mounts, starts fetching', color: 'green' },
    { name: 'Loading', desc: 'Waiting for API response', color: 'yellow' },
    { name: 'Success', desc: 'Data received and displayed', color: 'blue' },
    { name: 'Unmount', desc: 'Cleanup: Cancel pending requests', color: 'red' }
  ];

  useEffect(() => {
    if (isPlaying) {
      const sequence = [
        { delay: 1000, action: () => { setShowComponent(true); setCurrentPhase(0); } },
        { delay: 2000, action: () => { setCurrentPhase(1); } },
        { delay: 4000, action: () => { setCurrentPhase(2); } },
        { delay: 6000, action: () => { setShowComponent(false); setCurrentPhase(3); } },
        { delay: 7000, action: () => { setIsPlaying(false); setCurrentPhase(0); } }
      ];

      const timers = sequence.map(({ delay, action }) => 
        setTimeout(action, delay)
      );

      return () => timers.forEach(clearTimeout);
    }
  }, [isPlaying]);

  const handleReset = () => {
    setShowComponent(false);
    setIsPlaying(false);
    setCurrentPhase(0);
    setLifecycleLog([]);
  };

  return (
    <div className="space-y-6">
      <Controls 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onReset={handleReset}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Live Demo</h3>

          <div className="space-y-4 mb-6">
            {phases.map((phase, idx) => (
              <PhaseBox
                key={idx}
                phase={phase}
                active={currentPhase === idx}
                completed={currentPhase > idx}
              />
            ))}
          </div>

          <div className="min-h-[200px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-dashed border-gray-600">
            <div className="text-gray-400 text-sm mb-4">Component Container</div>
            
            {showComponent && (
              <DataFetchComponent 
                onLifecycle={(msg) => setLifecycleLog(prev => [...prev, { msg, time: Date.now() }])}
              />
            )}

            {!showComponent && lifecycleLog.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                Click Play to see data fetching lifecycle
              </div>
            )}
          </div>

          <div className="mt-4">
            <button
              onClick={() => setShowComponent(!showComponent)}
              className={`w-full px-4 py-2 rounded-lg font-medium ${
                showComponent ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {showComponent ? 'Unmount' : 'Mount & Fetch Data'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <LifecycleLog logs={lifecycleLog} />
          
          <CodeBlock
            code={`function DataFetchComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log('🟢 MOUNTED - Starting fetch');
    let cancelled = false;
    
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          console.log('🔵 Data received');
          setData(data);
          setLoading(false);
        }
      });
    
    return () => {
      console.log('🔴 UNMOUNTING - Cancel fetch');
      cancelled = true;
    };
  }, []);
  
  if (loading) return <div>Loading...</div>;
  return <div>{data.title}</div>;
}`}
          />
        </div>
      </div>
    </div>
  );
}

function DataFetchComponent({ onLifecycle }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onLifecycle('🟢 Component MOUNTED - Starting fetch');
    let cancelled = false;

    setTimeout(() => {
      if (!cancelled) {
        onLifecycle('📦 Data received from API');
        setData({ title: 'React Lifecycle Demo', users: 42 });
        setLoading(false);
      }
    }, 2000);

    return () => {
      onLifecycle('🔴 Component UNMOUNTING - Canceling fetch');
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-6 animate-fade-in">
      {loading ? (
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
          <div className="text-blue-300">Loading data...</div>
        </div>
      ) : (
        <div>
          <div className="text-xl font-bold text-white mb-2">{data.title}</div>
          <div className="text-blue-300">Total Users: {data.users}</div>
          <MdCheckCircle className="w-6 h-6 text-green-400 mt-2" />
        </div>
      )}
    </div>
  );
}

// Example 3: Cleanup Demo
function CleanupExample() {
  const [showComponent, setShowComponent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [lifecycleLog, setLifecycleLog] = useState([]);

  const phases = [
    { name: 'Mount', desc: 'Setup event listeners and subscriptions', color: 'green' },
    { name: 'Active', desc: 'Component is active with listeners', color: 'blue' },
    { name: 'Unmount', desc: 'Cleanup: Remove listeners, clear timers', color: 'red' }
  ];

  useEffect(() => {
    if (isPlaying) {
      const sequence = [
        { delay: 1000, action: () => { setShowComponent(true); setCurrentPhase(0); } },
        { delay: 3000, action: () => { setCurrentPhase(1); } },
        { delay: 5000, action: () => { setShowComponent(false); setCurrentPhase(2); } },
        { delay: 6000, action: () => { setIsPlaying(false); setCurrentPhase(0); } }
      ];

      const timers = sequence.map(({ delay, action }) => 
        setTimeout(action, delay)
      );

      return () => timers.forEach(clearTimeout);
    }
  }, [isPlaying]);

  const handleReset = () => {
    setShowComponent(false);
    setIsPlaying(false);
    setCurrentPhase(0);
    setLifecycleLog([]);
  };

  return (
    <div className="space-y-6">
      <Controls 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onReset={handleReset}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Live Demo</h3>

          <div className="space-y-4 mb-6">
            {phases.map((phase, idx) => (
              <PhaseBox
                key={idx}
                phase={phase}
                active={currentPhase === idx}
                completed={currentPhase > idx}
              />
            ))}
          </div>

          <div className="min-h-[200px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-dashed border-gray-600">
            <div className="text-gray-400 text-sm mb-4">Component Container</div>
            
            {showComponent && (
              <CleanupComponent 
                onLifecycle={(msg) => setLifecycleLog(prev => [...prev, { msg, time: Date.now() }])}
              />
            )}

            {!showComponent && lifecycleLog.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                Click Play to see cleanup in action
              </div>
            )}
          </div>

          <div className="mt-4">
            <button
              onClick={() => setShowComponent(!showComponent)}
              className={`w-full px-4 py-2 rounded-lg font-medium ${
                showComponent ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {showComponent ? 'Unmount (Trigger Cleanup)' : 'Mount Component'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <LifecycleLog logs={lifecycleLog} />
          
          <CodeBlock
            code={`function CleanupComponent() {
  const [mousePos, setMousePos] = useState({x:0, y:0});
  
  useEffect(() => {
    console.log('🟢 MOUNTED - Setup listeners');
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const interval = setInterval(() => {
      console.log('⏰ Interval tick');
    }, 1000);
    
    // CLEANUP: Critical to prevent memory leaks!
    return () => {
      console.log('🔴 UNMOUNTING - Cleanup');
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);
  
  return <div>Mouse: {mousePos.x}, {mousePos.y}</div>;
}`}
          />
        </div>
      </div>
    </div>
  );
}

function CleanupComponent({ onLifecycle }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    onLifecycle('🟢 Component MOUNTED - Setting up listeners');

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    onLifecycle('👂 Event listener added: mousemove');

    const interval = setInterval(() => {
      setTicks(t => t + 1);
      onLifecycle('⏰ Interval tick');
    }, 1000);

    return () => {
      onLifecycle('🔴 Component UNMOUNTING - Starting cleanup');
      window.removeEventListener('mousemove', handleMouseMove);
      onLifecycle('🗑️ Event listener removed');
      clearInterval(interval);
      onLifecycle('🗑️ Interval cleared');
    };
  }, []);

  return (
    <div className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-6 animate-fade-in">
      <div className="space-y-3">
        <div>
          <div className="text-sm text-blue-300">Mouse Position:</div>
          <div className="text-white font-bold">X: {mousePos.x}, Y: {mousePos.y}</div>
        </div>
        <div>
          <div className="text-sm text-blue-300">Interval Ticks:</div>
          <div className="text-white font-bold">{ticks}</div>
        </div>
        <div className="text-xs text-yellow-300 mt-2">
          ⚠️ Move your mouse to see event listener in action
        </div>
      </div>
    </div>
  );
}

// Helper Components
function Controls({ isPlaying, setIsPlaying, onReset }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={isPlaying}
          className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 ${
            isPlaying ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          <MdPlayArrow className="w-4 h-4" />
          Play Animation
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-lg font-bold flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white"
        >
          <MdRotateLeft className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}

function PhaseBox({ phase, active, completed }) {
  const colors = {
    green: 'border-green-500 bg-green-500/20',
    blue: 'border-blue-500 bg-blue-500/20',
    yellow: 'border-yellow-500 bg-yellow-500/20',
    red: 'border-red-500 bg-red-500/20'
  };

  return (
    <div
      className={`border-2 rounded-lg p-4 transition-all duration-300 ${
        active ? `${colors[phase.color]} scale-105 shadow-lg` :
        completed ? 'border-gray-600 bg-gray-700/30' :
        'border-gray-700 bg-gray-800/30'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          active ? `bg-${phase.color}-500 text-white` :
          completed ? 'bg-gray-600 text-white' :
          'bg-gray-700 text-gray-400'
        }`}>
          {completed ? '✓' : active ? '●' : '○'}
        </div>
        <div className="flex-1">
          <div className={`font-bold ${active ? 'text-white' : 'text-gray-400'}`}>
            {phase.name}
          </div>
          <div className="text-xs text-gray-400">{phase.desc}</div>
        </div>
      </div>
    </div>
  );
}

function LifecycleLog({ logs }) {
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
      <div className="bg-blue-500/30 px-4 py-3 border-b border-white/20">
        <h3 className="font-bold text-white">Lifecycle Log</h3>
      </div>
      <div 
        ref={logContainerRef}
        className="p-4 max-h-64 overflow-y-auto space-y-2"
      >
        {logs.length === 0 ? (
          <div className="text-gray-400 text-sm text-center py-4">
            No lifecycle events yet...
          </div>
        ) : (
          logs.map((log, idx) => (
            <div
              key={idx}
              className="bg-gray-800/50 rounded px-3 py-2 text-sm font-mono text-green-400 animate-fade-in"
            >
              {log.msg}
            </div>
          ))
        )}
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
      <div className="bg-blue-500/30 px-4 py-3 flex items-center justify-between border-b border-white/20">
        <h3 className="font-bold text-white">Code Example</h3>
        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-4 overflow-x-auto max-h-96">
        <pre className="text-xs text-green-400 font-mono leading-relaxed">
          {code}
        </pre>
      </div>
    </div>
  );
}

export default ReactLifeCycle;