
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Ghost } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Cleaned & JSX‑fixed Visualiser: Map/Set vs WeakMap/WeakSet
export default function MapWeakMapDemoVisualizer() {
  const [logs, setLogs] = useState([]);
  const [showGC, setShowGC] = useState(false);
  const [showWeakDelete, setShowWeakDelete] = useState(false);
  const [mapHasKey, setMapHasKey] = useState(true);
  const [weakHasKey, setWeakHasKey] = useState(true);

  const addLog = (msg) => setLogs((prev) => [...prev, msg]);

  function runDemo() {
    setLogs([]);
    setShowGC(false);
    setShowWeakDelete(false);
    setMapHasKey(true);
    setWeakHasKey(true);

    const map = new Map();
    const obj1 = { name: "User1" };
    map.set(obj1, "Active");

    const weakMap = new WeakMap();
    let obj2 = { name: "User2" };
    weakMap.set(obj2, "Online");

    addLog("Map size before delete: 1");
    addLog("WeakMap has key before delete: true");

    setTimeout(() => {
      setShowGC(true);
      addLog("Garbage collector running...");
    }, 900);

    setTimeout(() => {
      obj2 = null;
      setWeakHasKey(false);
      setShowWeakDelete(true);
      addLog("WeakMap auto-deleted key (GC) ✔");
    }, 1600);

    setTimeout(() => {
      addLog("Map key still present (must delete manually) ❌");
    }, 2300);
  }

  return (
    <div className="p-6 grid gap-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Map/Set vs WeakMap/WeakSet — Animated Visualiser</h1>

      {/* Memory Graph */}
      <Card className="bg-slate-900 p-4">
        <h2 className="text-xl font-semibold mb-3">Memory Graph</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Map Node */}
          <div className="flex flex-col items-center">
            <motion.div
              className="p-4 bg-blue-700 rounded-xl shadow-xl"
              animate={{ scale: mapHasKey ? 1 : 0.7, opacity: mapHasKey ? 1 : 0.3 }}
            >
              Map Key: {mapHasKey ? "User1" : "Deleted"}
            </motion.div>
            <motion.div className="h-1 w-24 bg-blue-500 mt-2" animate={{ width: mapHasKey ? 100 : 40 }} />
          </div>

          {/* WeakMap Node */}
          <div className="flex flex-col items-center">
            <motion.div
              className="p-4 bg-green-700 rounded-xl shadow-xl"
              animate={{ scale: weakHasKey ? 1 : 0, opacity: weakHasKey ? 1 : 0 }}
            >
              WeakMap Key: {weakHasKey ? "User2" : "Collected"}
            </motion.div>
            <motion.div className="h-1 w-24 bg-green-500 mt-2" animate={{ width: weakHasKey ? 100 : 0 }} />
          </div>
        </div>

        <AnimatePresence>
          {showGC && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mt-4 text-yellow-400"
            >
              ⚠ Garbage Collector Sweeping...
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Set / WeakSet */}
      <Card className="bg-slate-900 p-4">
        <h2 className="text-xl font-semibold mb-3">Set & WeakSet Interactive Example</h2>

        <div className="flex gap-6">
          <motion.div className="p-3 bg-purple-700 rounded-xl">Set stores values strongly</motion.div>

          <motion.div
            className="p-3 bg-pink-700 rounded-xl"
            animate={{ opacity: showWeakDelete ? 0 : 1 }}
          >
            WeakSet auto-cleans unreachable objects
          </motion.div>
        </div>
      </Card>

      {/* Examples */}
      <Card className="bg-slate-900 p-4">
        <h2 className="text-xl font-semibold mb-3">More Practical Examples</h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-3 bg-indigo-700 rounded-xl shadow-md">
            <h3 className="font-bold mb-2">Example 1: DOM Metadata (WeakMap)</h3>
            <pre className="text-xs whitespace-pre-wrap">{`const meta = new WeakMap();
const btn = document.querySelector('#btn');
meta.set(btn, { clicks: 0 });`}</pre>
          </div>

          <div className="p-3 bg-teal-700 rounded-xl shadow-md">
            <h3 className="font-bold mb-2">Example 2: User Roles (Map)</h3>
            <pre className="text-xs whitespace-pre-wrap">{`const roles = new Map();
roles.set(userObj, 'admin');`}</pre>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="p-3 bg-amber-700 rounded-xl shadow-md">
            <h3 className="font-bold mb-2">Example 3: Caching (Map)</h3>
            <pre className="text-xs whitespace-pre-wrap">{`const cache = new Map();
function heavy(x) {
  if (cache.has(x)) return cache.get(x);
  const result = expensiveCalc(x);
  cache.set(x, result);
  return result;
}`}</pre>
          </div>

          <div className="p-3 bg-rose-700 rounded-xl shadow-md">
            <h3 className="font-bold mb-2">Example 4: Active Objects (WeakSet)</h3>
            <pre className="text-xs whitespace-pre-wrap">{`const active = new WeakSet();
let obj = { id: 1 };
active.add(obj);
obj = null; // auto removed`}</pre>
          </div>
        </div>
      </Card>

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-slate-800 text-white">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Database /> Map / Set
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Keys/values can be anything</li>
              <li>Strong references → no auto cleanup</li>
              <li>Iterable with `.size`</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 text-white">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Ghost /> WeakMap / WeakSet
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Only objects allowed</li>
              <li>Weak references → automatic GC</li>
              <li>Not iterable</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Demo */}
      <div>
        <Button className="bg-blue-600" onClick={runDemo}>
          Run Animated Demo
        </Button>

        <div className="bg-black/40 mt-4 p-3 rounded h-40 overflow-auto font-mono text-sm">
          {logs.map((l, i) => (
            <div key={i}>{"> " + l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
