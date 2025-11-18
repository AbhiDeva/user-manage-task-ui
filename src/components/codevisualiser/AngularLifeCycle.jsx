import React, { useState } from "react";
import { motion } from "framer-motion";
//import { Play, RefreshCw, GitBranch, Zap } from "lucide-react";
import { FaPlay, FaCodeBranch, FaBolt, FaSync } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

// Angular Lifecycle order
const lifecyclePhases = [
  {
    id: 1,
    hook: 'ngOnChanges()',
    desc: 'Triggered whenever @Input() values change.',
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 2,
    hook: 'ngOnInit()',
    desc: 'Runs once after first ngOnChanges. Initialization logic.',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 3,
    hook: 'ngDoCheck()',
    desc: 'Custom change detection logic.',
    color: 'from-green-500 to-green-700'
  },
  {
    id: 4,
    hook: 'ngAfterContentInit()',
    desc: 'Runs when projected content is initialized.',
    color: 'from-emerald-500 to-emerald-700'
  },
  {
    id: 5,
    hook: 'ngAfterContentChecked()',
    desc: 'Runs every time projected content is checked.',
    color: 'from-yellow-500 to-yellow-700'
  },
  {
    id: 6,
    hook: 'ngAfterViewInit()',
    desc: 'Runs when component view is initialized.',
    color: 'from-orange-500 to-orange-700'
  },
  {
    id: 7,
    hook: 'ngAfterViewChecked()',
    desc: 'Runs after the view is checked.',
    color: 'from-red-500 to-red-700'
  },
  {
    id: 8,
    hook: 'ngOnDestroy()',
    desc: 'Cleanup before component removal.',
    color: 'from-gray-500 to-gray-700'
  }
];

export default function AngularLifecycleVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  const startLifecycle = () => {
    setActiveStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < lifecyclePhases.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
      }
    }, 1200);
  };

  return (
    <div className="p-8 w-full bg-gray-100 min-h-screen flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold">Angular Lifecycle Visualizer</h1>

      {/* Controls */}
      <div className="flex gap-4 mt-4">
        <button onClick={startLifecycle} className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 flex items-center gap-2">
          <FaPlay /> Run Lifecycle
        </button>

        <button onClick={() => setActiveStep(0)} className="px-6 py-3 bg-gray-700 text-white rounded-2xl shadow hover:bg-gray-800 flex items-center gap-2">
          <FaSync /> Reset
        </button>
      </div>

      {/* Timeline Visual */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {lifecyclePhases.map((phase, index) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: activeStep === index ? 1 : 0.3,
              scale: activeStep === index ? 1 : 0.9
            }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl shadow-xl bg-gradient-to-br ${phase.color} text-white`}
          >
            <div className="text-xl font-bold flex items-center gap-2">
              < FaCodeBranch/> {phase.hook}
            </div>
            <p className="mt-2 text-white/90">{phase.desc}</p>
            {activeStep === index && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-2 rounded-xl bg-white/30 backdrop-blur-md flex items-center gap-2"
              >
                <FaBolt /> Executing...
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
