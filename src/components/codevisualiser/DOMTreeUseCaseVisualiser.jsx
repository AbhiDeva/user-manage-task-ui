import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSitemap,
  FaBolt,
  FaExclamationTriangle,
  FaSpinner,
  FaThermometerHalf,
  FaTree
} from "react-icons/fa";

export default function DomTreeUseCasesVisualizer() {
  const [activeCase, setActiveCase] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [fps, setFps] = useState(0);
  const framesRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafRef = useRef(null);
  const [layoutAlert, setLayoutAlert] = useState(false);
  const [observerCount, setObserverCount] = useState(0);
  const observerRef = useRef(null);
  const stormRef = useRef(false);

  // FPS meter
  useEffect(() => {
    function loop(now) {
      framesRef.current++;
      const delta = now - lastTimeRef.current;
      if (delta >= 500) {
        const currentFps = Math.round((framesRef.current / delta) * 1000);
        setFps(currentFps);
        framesRef.current = 0;
        lastTimeRef.current = now;
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Node creation animation
  const addNode = (label) => {
    const newNode = {
      id: Date.now() + Math.random(),
      label: label || `Node ${nodes.length + 1}`
    };
    setNodes((prev) => [...prev, newNode]);
  };

  // Node removal animation
  const removeNode = () => {
    setNodes((prev) => prev.slice(0, -1));
  };

  // Artificial JS blocking (keeps short to avoid crashing dev env)
  const freezeUI = (ms = 2000) => {
    const start = Date.now();
    while (Date.now() - start < ms) {} // freeze
  };

  // Forced reflow simulation
  const triggerReflow = () => {
    // do several read/write cycles to simulate thrash
    for (let i = 0; i < 5; i++) {
      // read
      void document.body.offsetHeight;
      // write
      document.body.style.setProperty("--tmp-padding", `${Math.random() * 20}px`);
    }
    // show a brief layout-thrash alert
    setLayoutAlert(true);
    setTimeout(() => setLayoutAlert(false), 900);
  };

  // Nested tree generator for deep DOM simulation
  const generateNestedTree = (depth = 50) => {
    const container = document.getElementById("dom-box");
    if (!container) return;
    container.innerHTML = "";
    let parent = container;
    for (let i = 0; i < depth; i++) {
      const el = document.createElement("div");
      el.className = "p-1 border-l ml-2 text-xs";
      el.textContent = `level-${i}`;
      parent.appendChild(el);
      parent = el;
    }
  };

  // MutationObserver storm simulation
  const startMutationStorm = () => {
    const container = document.getElementById("dom-box");
    if (!container) return;
    setObserverCount(0);
    if (observerRef.current) observerRef.current.disconnect();

    const obs = new MutationObserver((mutations) => {
      setObserverCount((c) => c + mutations.length);
    });
    obs.observe(container, { childList: true, subtree: true, attributes: true });
    observerRef.current = obs;
    stormRef.current = true;

    // create rapid mutations for a short burst
    let i = 0;
    const interval = setInterval(() => {
      if (i++ > 200 || !stormRef.current) {
        clearInterval(interval);
        return;
      }
      const el = document.createElement("div");
      el.textContent = `m${i}`;
      el.style.opacity = "0.9";
      container.appendChild(el);
      if (container.firstChild) container.removeChild(container.firstChild);
    }, 8);
  };

  const stopMutationStorm = () => {
    stormRef.current = false;
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  };

  const CASES = [
    {
      id: "dom-large-size",
      title: "Huge DOM Size (200 nodes burst)",
      icon: <FaSitemap className="w-5 h-5 inline-block mr-2" />,
      action: () => {
        setExplanation(
          "Creating a large number of DOM nodes leads to slow rendering, sluggish UI, and unresponsive behavior. (Simulated 200 nodes)"
        );
        // burst-create many nodes with small delay to avoid blocking init
        let c = 0;
        const interval = setInterval(() => {
          addNode(`Node ${c + 1}`);
          c++;
          if (c >= 200) clearInterval(interval);
        }, 6);
      }
    },
    {
      id: "dom-deep-nesting",
      title: "Deeply Nested DOM",
      icon: <FaTree className="w-5 h-5 inline-block mr-2" />,
      action: () => {
        setExplanation(
          "Deep DOM trees cause layout recalculations and performance degradation. Generating a nested tree into the panel."
        );
        generateNestedTree(150); // generate 150 levels (adjustable)
      }
    },
    {
      id: "forced-reflows",
      title: "Forced Reflows (Layout Thrash)",
      icon: <FaBolt className="w-5 h-5 inline-block mr-2" />,
      action: () => {
        setExplanation(
          "Changing layout while reading layout forces the browser to recalculate everything (Layout Thrashing)."
        );
        triggerReflow();
      }
    },
    {
      id: "js-blocking",
      title: "JS Blocking Main Thread",
      icon: <FaSpinner className="w-5 h-5 inline-block mr-2 animate-spin" />,
      action: () => {
        setExplanation(
          "A long synchronous JavaScript task blocks all DOM updates. The UI will freeze for a short period."
        );
        freezeUI(1800);
      }
    },
    {
      id: "many-event-listeners",
      title: "Too Many Event Listeners",
      icon: <FaThermometerHalf className="w-5 h-5 inline-block mr-2" />,
      action: () => {
        setExplanation(
          "Attaching thousands of listeners slows interactions. We simulate by adding many invisible handlers."
        );
        const buttons = [];
        for (let i = 0; i < 2000; i++) {
          const fn = () => {};
          buttons.push(fn);
          // not actually attaching to DOM to avoid real overload
        }
        setTimeout(() => setExplanation((s) => s + " — simulated 2000 handlers."), 200);
      }
    },
    {
      id: "expensive-css",
      title: "Heavy CSS Rendering",
      icon: <FaExclamationTriangle className="w-5 h-5 inline-block mr-2" />,
      action: () => {
        setExplanation(
          "Applying expensive CSS (filters, shadows) slows paint & composite cycles. We toggle a heavy class on the panel."
        );
        const box = document.getElementById("dom-box");
        if (!box) return;
        box.classList.toggle("heavy-css");
        setTimeout(() => box.classList.toggle("heavy-css"), 1200);
      }
    },
    {
      id: "innerhtml-overuse",
      title: "innerHTML Overuse",
      icon: <FaBolt className="w-5 h-5 inline-block mr-2" />,
      action: () => {
        setExplanation(
          "Repeatedly rewriting innerHTML destroys and recreates DOM nodes, causing freezes."
        );
        const box = document.getElementById("dom-box");
        if (!box) return;
        for (let i = 0; i < 50; i++) {
          box.innerHTML = `<div class='p-2'>Rebuild ${i}</div>`;
        }
      }
    },
    {
      id: "mutation-observer",
      title: "MutationObserver Overload",
      icon: <FaSpinner className="w-5 h-5 inline-block mr-2" />,
      action: () => {
        setExplanation(
          "Watching the entire DOM causes callback storms, slowing the UI. Starting a short mutation storm."
        );
        startMutationStorm();
        // stop after a while to avoid infinite churn
        setTimeout(() => stopMutationStorm(), 2500);
      }
    }
  ];

  useEffect(() => {
    // cleanup on unmount
    return () => {
      stopMutationStorm();
    };
  }, []);

  return (
    <div className="flex h-full min-h-[650px] w-full bg-gray-50 rounded-xl overflow-hidden border border-gray-300 shadow-md">

      {/* LEFT SIDEBAR */}
      <div className="w-1/3 bg-white border-r border-gray-200 p-4 overflow-y-scroll">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaSitemap /> DOM Stress Cases
        </h2>

        {CASES.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setActiveCase(c.id);
              c.action();
            }}
            className={`w-full text-left px-4 py-3 mb-2 rounded-xl shadow-sm hover:shadow-md transition ${
              activeCase === c.id
                ? "bg-green-100 border-green-400"
                : "bg-gray-100 border-gray-300"
            } border`}
          >
            <div className="flex items-center">
              <div className="mr-2">{c.icon}</div>
              <div className="flex-1 text-left">
                <div className="font-semibold">{c.title}</div>
                <div className="text-xs text-slate-500">Click to simulate</div>
              </div>
            </div>
          </button>
        ))}

        <div className="mt-4 text-xs text-slate-500">
          <p className="font-medium">Performance Indicators</p>
          <div className="mt-2">FPS: <strong>{fps}</strong></div>
          <div className="mt-1">Mutation callbacks: <strong>{observerCount}</strong></div>
          {layoutAlert && <div className="mt-2 text-sm text-orange-600">⚠️ Layout thrash detected</div>}
        </div>
      </div>

      {/* VISUAL PANEL */}
      <div className="w-2/3 p-4 relative">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <FaTree /> DOM Visual Panel
        </h2>

        {/* DOM Box */}
        <div
          id="dom-box"
          className="h-[420px] bg-white border border-gray-300 overflow-auto rounded-xl p-4 relative"
          style={{ fontFamily: 'ui-sans-serif, system-ui' }}
        >
          <div className="grid grid-cols-3 gap-2">
            <AnimatePresence>
              {nodes.map((node) => (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ duration: 0.18 }}
                  className="p-3 text-center bg-green-200 rounded shadow-inner text-sm"
                >
                  {node.label}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-4 flex gap-3 items-center">
          <button
            onClick={() => addNode()}
            className="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:scale-105 transition"
          >
            Add Node
          </button>

          <button
            onClick={removeNode}
            className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:scale-105 transition"
          >
            Remove Node
          </button>

          <button
            onClick={() => document.getElementById('dom-box')?.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3 py-2 bg-slate-200 rounded-xl shadow"
          >
            Scroll Top
          </button>

          <div className="ml-auto text-sm text-slate-500">FPS: <strong>{fps}</strong></div>
        </div>

        {/* EXPLANATION BOX */}
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-xl">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FaExclamationTriangle /> Explanation
          </h3>
          <p className="text-gray-700 mt-2">{explanation || "Select a case from the left panel to see details and simulations."}</p>
        </div>

        {/* small styles used by heavy-css */}
        <style>{`
          .heavy-css { filter: blur(2px) saturate(0.9); box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
        `}</style>
      </div>
    </div>
  );
}
