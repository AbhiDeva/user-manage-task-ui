import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, Ghost, Key, Unlock, ShieldCheck, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Visualiser: Map/Set vs WeakMap/WeakSet
export default function MapWeakMapVisualizer() {
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => setLogs((prev) => [...prev, msg]);

  function runDemo() {
    setLogs([]);

    // Regular Map
    const map = new Map();
    const obj1 = { name: "User1" };
    map.set(obj1, "Active");

    // WeakMap
    const weakMap = new WeakMap();
    const obj2 = { name: "User2" };
    weakMap.set(obj2, "Online");

    addLog("Map size before delete: " + map.size);
    addLog("WeakMap has key before delete: " + weakMap.has(obj2));

    // Delete references
    // eslint-disable-next-line
    obj1; // kept
    // eslint-disable-next-line
    obj2; // lost reference automatically

    addLog("Map keeps obj1 even if no references (manual delete needed)");
    addLog("WeakMap auto-removes obj2 when reference disappears");
  }

  return (
    <div className="p-6 grid gap-6 text-white">
      <h1 className="text-3xl font-bold mb-2">Map/Set vs WeakMap/WeakSet Visualiser</h1>

      {/* Comparison Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-slate-800 text-white">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><Database /> Map / Set</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Keys can be *anything* (objects, numbers, strings)</li>
              <li>Keeps strong references → prevents automatic cleanup</li>
              <li>Supports `.size`, `.keys()`, `.values()`, iteration</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 text-white">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><Ghost /> WeakMap / WeakSet</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Only *objects* can be keys</li>
              <li>Keys are weakly referenced → auto garbage collection</li>
              <li>No `.size`, no iteration (hidden)</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Advantages / Disadvantages */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-slate-900">
          <CardContent>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><ShieldCheck /> Advantages</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>WeakMap prevents memory leaks</li>
              <li>Map is fully iterable with size tracking</li>
              <li>WeakSet useful for tracking object presence anonymously</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-900">
          <CardContent>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><AlertTriangle /> Disadvantages</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>WeakMap cannot be iterated</li>
              <li>Only objects allowed as keys in WeakMap</li>
              <li>Map may cause memory leaks if keys not cleared</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Use Cases */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-slate-800 text-white">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Map / Set Use Cases</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Lookup tables</li>
              <li>Caching API responses</li>
              <li>Counting, storing metadata</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 text-white">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">WeakMap / WeakSet Use Cases</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Private class fields simulation</li>
              <li>Tracking DOM elements without memory leaks</li>
              <li>Ephemeral caching that auto-cleans</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Demo */}
      <div>
        <Button className="bg-blue-600" onClick={runDemo}>Run Comparison</Button>

        <div className="bg-black/40 mt-4 p-3 rounded h-40 overflow-auto font-mono text-sm">
          {logs.map((l, i) => (
            <div key={i}>{"> " + l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
