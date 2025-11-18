import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
//import { Play, RefreshCw, GitBranch, Zap, Layers } from "lucide-react";
import { FaPlay, FaSyncAlt, FaLayerGroup } from "react-icons/fa";
// Angular Lifecycle order (creation-focused simplified)
const lifecyclePhases = [
  { id: 1, hook: 'ngOnChanges()', desc: 'Triggered whenever @Input() values change.' },
  { id: 2, hook: 'ngOnInit()', desc: 'Runs once after first ngOnChanges. Initialization logic.' },
  { id: 3, hook: 'ngDoCheck()', desc: 'Custom change detection logic.' },
  { id: 4, hook: 'ngAfterContentInit()', desc: 'Runs when projected content is initialized.' },
  { id: 5, hook: 'ngAfterContentChecked()', desc: 'Runs every time projected content is checked.' },
  { id: 6, hook: 'ngAfterViewInit()', desc: 'Runs when component view is initialized.' },
  { id: 7, hook: 'ngAfterViewChecked()', desc: 'Runs after the view is checked.' },
  { id: 8, hook: 'ngOnDestroy()', desc: 'Cleanup before component removal.' }
];

// A reusable visual component that simulates lifecycle steps
function ComponentCard({ name, depth = 0, autoStart = false, onFinished }) {
  const [activeStep, setActiveStep] = useState(-1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (autoStart) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  useEffect(() => {
    if (activeStep === lifecyclePhases.length - 1) {
      setRunning(false);
      if (onFinished) onFinished();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  const start = () => {
    setRunning(true);
    setActiveStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveStep(step);
      if (step >= lifecyclePhases.length - 1) {
        clearInterval(interval);
      }
    }, 900 + depth * 200); // deeper components run slightly slower for clarity
  };

  const reset = () => {
    setRunning(false);
    setActiveStep(-1);
  };

  return (
    <div className={`p-4 rounded-2xl shadow-lg bg-white/90 border ${depth === 0 ? 'border-slate-300' : 'border-slate-200'}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100`}> {depth}</div>
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-sm text-slate-500">Depth: {depth}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={start} className="px-3 py-1 rounded-md border">Start</button>
          <button onClick={reset} className="px-3 py-1 rounded-md border">Reset</button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {lifecyclePhases.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0.5 }} animate={{ opacity: activeStep === i ? 1 : 0.25 }} transition={{ duration: 0.25 }} className={`p-2 rounded-md ${activeStep === i ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-700'}`}>
            <div className="text-sm font-medium">{p.hook}</div>
            <div className="text-xs text-slate-500">{p.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Child subtree that can contain nested children recursively
function ChildTree({ name, level = 1, maxDepth = 2, autoStart = false, onFinished }) {
  const [childrenStarted, setChildrenStarted] = useState(false);
  const children = [];
  if (level < maxDepth) {
    children.push(<ChildTree key={`${name}-child`} name={`${name}-child`} level={level + 1} maxDepth={maxDepth} autoStart={false} />);
  }

  return (
    <div className="flex flex-col gap-3">
      <ComponentCard name={name} depth={level} autoStart={autoStart} onFinished={() => setChildrenStarted(true)} />
      <div className={`ml-6 border-l pl-4 ${children.length ? '' : 'opacity-60'}`}>
        {children.map((c, idx) => React.cloneElement(c, { autoStart: childrenStarted }))}
      </div>
    </div>
  );
}

export default function AngularLifecycleNestedVisualizer() {
  const [runKey, setRunKey] = useState(0);
  const [maxDepth, setMaxDepth] = useState(3);

  const resetAll = () => setRunKey(k => k + 1);

  return (
    <div className="p-8 w-full bg-gray-100 min-h-screen flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">Angular Lifecycle Visualizer — Nested Components</h1>

      <div className="flex gap-3 items-center w-full max-w-4xl">
        <label className="flex items-center gap-2">
          <div className="text-sm">Nested Depth</div>
          <input type="range" min={1} max={4} value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className="ml-2" />
        </label>

        <div className="ml-auto flex gap-2">
          <button onClick={() => setRunKey(k => k + 1)} className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"><FaPlay /> Run Full</button>
          <button onClick={resetAll} className="px-4 py-2 bg-gray-700 text-white rounded-md flex items-center gap-2"><FaSyncAlt /> Reset All</button>
        </div>
      </div>

      <div key={runKey} className="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-md">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaLayerGroup />
              <div>
                <div className="font-semibold">Component Tree</div>
                <div className="text-sm text-slate-500">Parent {'>'} Children {'>'} Grandchildren (depth = {maxDepth})</div>
              </div>
            </div>

            {/* Parent with nested children */}
            <div className="space-y-4">
              <ComponentCard name={`AppComponent (parent)`} depth={0} autoStart={true} />

              {/* render immediate child subtree(s) */}
              <div className="ml-6 border-l pl-4">
                <ChildTree name={`ChildA`} level={1} maxDepth={maxDepth} autoStart={false} />
                <ChildTree name={`ChildB`} level={1} maxDepth={maxDepth} autoStart={false} />
              </div>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-2">How it works</div>
            <ol className="pl-4 list-decimal text-sm text-slate-600 space-y-2">
              <li>Parent component starts its lifecycle (auto-start on Run Full).</li>
              <li>When parent reaches <code>ngAfterContentInit()</code> it marks children to start — this simulates content projection timing.</li>
              <li>Each child runs its own lifecycle; deeper levels run slightly slower to make ordering obvious.</li>
              <li>Use the <strong>Nested Depth</strong> slider to increase how many levels of children are rendered.</li>
            </ol>

            <div className="mt-4 p-3 bg-slate-50 rounded-md text-sm text-slate-700">
              Tip: click individual component <strong>Start</strong> buttons to observe local lifecycle ordering, or click <strong>Run Full</strong> to simulate a parent-driven cascade.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
