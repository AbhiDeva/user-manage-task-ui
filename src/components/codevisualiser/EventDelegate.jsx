import React, { useEffect, useRef, useState } from "react";

// EventDelegationVisualizer.jsx
// Single-file React component suitable for preview. Uses Tailwind for styling.
// Features:
// - Left: Per-child listeners example (each child has its own onClick)
// - Right: Delegated listener example (one listener on the parent)
// - Controls to add many items, clear logs, and toggle highlighting
// - Visual "bubble" animation to illustrate event bubbling and target

export default function EventDelegationVisualizer() {
  const [count, setCount] = useState(10);
  const [items, setItems] = useState(() => Array.from({ length: 10 }, (_, i) => i + 1));
  const [logs, setLogs] = useState([]);
  const [highlight, setHighlight] = useState(true);
  const bubbleRef = useRef(null);
  const delegatedParentRef = useRef(null);

  useEffect(() => {
    setItems(Array.from({ length: count }, (_, i) => i + 1));
  }, [count]);

  // per-child listener handlers (declared once but bound inline)
  function handleChildClick(id, e) {
    const message = `Per-child: clicked item ${id} — target: ${describeTarget(e)}`;
    pushLog(message);
    animateBubble(e);
  }

  // delegated listener on parent
  function handleDelegatedClick(e) {
    // find closest item element (it may be a button or an inner element)
    const itemEl = e.target.closest(".ev-item");
    const id = itemEl ? itemEl.dataset.id : "(none)";
    const message = `Delegated: clicked item ${id} — target: ${describeTarget(e)}`;
    pushLog(message);
    animateBubble(e);
  }

  // helper to describe e.target vs e.currentTarget
  function describeTarget(e) {
    const t = e.target && e.target.dataset ? e.target.dataset.id || e.target.tagName : e.target.tagName;
    const c = e.currentTarget && e.currentTarget.className ? getShortClass(e.currentTarget.className) : e.currentTarget && e.currentTarget.tagName;
    return `target=${t}, currentTarget=${c}`;
  }

  function getShortClass(cn) {
    if (typeof cn === "string") return cn.split(" ")[0];
    return cn;
  }

  function pushLog(text) {
    setLogs((l) => [
      `${new Date().toLocaleTimeString()}: ${text}`,
      ...l
    ].slice(0, 100));
  }

  function animateBubble(e) {
    const bubble = bubbleRef.current;
    if (!bubble) return;
    // position the bubble at the click location relative to container
    const parentRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - parentRect.left;
    const y = e.clientY - parentRect.top;
    bubble.style.left = Math.round(x) + "px";
    bubble.style.top = Math.round(y) + "px";
    bubble.classList.remove("!opacity-0", "scale-0");
    // trigger reflow
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    bubble.offsetWidth;
    bubble.classList.add("ev-bubble-animate");
    setTimeout(() => {
      bubble.classList.add("!opacity-0", "scale-0");
      bubble.classList.remove("ev-bubble-animate");
    }, 700);
  }

  function clearLogs() {
    setLogs([]);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-3">Event Delegation — Visualiser</h1>
      <p className="text-sm text-gray-600 mb-6">
        Event delegation attaches a single listener to a common parent. Click items in either panel to see how the event travels, which element is <em>event.target</em>, and how a single listener can handle all children.
      </p>

      <div className="flex gap-6">
        {/* Left: Per-child listeners */}
        <div className="flex-1 bg-white rounded-2xl shadow p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="font-medium">Per-child listeners</div>
            <div className="text-xs text-gray-500">Each item has its own onClick</div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {items.map((id) => (
              <button
                key={`child-${id}`}
                data-id={id}
                className={`ev-item px-3 py-2 rounded-lg text-sm border hover:scale-[1.03] transition-transform ${highlight ? "bg-gradient-to-br from-slate-50 to-white" : "bg-white"}`}
                onClick={(e) => handleChildClick(id, e)}
              >
                Item {id}
              </button>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-600">Try adding many items to compare DOM wiring.</div>
        </div>

        {/* Right: Delegated listener */}
        <div className="flex-1 bg-white rounded-2xl shadow p-4 border border-gray-100 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="font-medium">Delegated listener</div>
            <div className="text-xs text-gray-500">One listener on the parent handles all children</div>
          </div>

          <div
            ref={delegatedParentRef}
            onClick={handleDelegatedClick}
            className="grid grid-cols-5 gap-2"
            style={{ minHeight: 120 }}
          >
            {items.map((id) => (
              <button
                key={`deleg-${id}`}
                data-id={id}
                className={`ev-item px-3 py-2 rounded-lg text-sm border hover:scale-[1.03] transition-transform ${highlight ? "bg-gradient-to-br from-amber-50 to-white" : "bg-white"}`}
              >
                Item {id}
              </button>
            ))}
          </div>

          {/* Bubble for animation */}
          <div
            ref={bubbleRef}
            className={`pointer-events-none absolute w-6 h-6 rounded-full border-2 border-current opacity-0 scale-0 transform -translate-x-1/2 -translate-y-1/2`}
            style={{ top: 0, left: 0 }}
          />
        </div>
      </div>

      {/* Controls and logs */}
      <div className="mt-6 flex gap-6">
        <div className="flex items-center gap-3">
          <label className="text-sm"># items</label>
          <input
            type="range"
            min={5}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-56"
          />
          <div className="w-10 text-sm">{count}</div>

          <button
            onClick={() => setCount(10)}
            className="ml-2 px-3 py-1 rounded bg-gray-100 border text-sm"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <label className="text-sm flex items-center gap-2">
            <input type="checkbox" checked={highlight} onChange={(e) => setHighlight(e.target.checked)} />
            Highlight
          </label>

          <button onClick={clearLogs} className="px-3 py-1 rounded bg-red-50 border text-sm">Clear logs</button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="font-medium mb-2">What to watch</div>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            <li>Check event.target vs event.currentTarget in logs.</li>
            <li>Delegation handles dynamic children without rebinding listeners.</li>
            <li>Delegation can reduce memory usage and improve performance when there are many children.</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="font-medium mb-2">Quick code (delegation)</div>
          <pre className="text-xs p-2 bg-gray-50 rounded overflow-auto">
{`parent.addEventListener('click', (e) => {
  const item = e.target.closest('.ev-item');
  if (!item) return;
  console.log('clicked', item.dataset.id);
});`}
          </pre>
        </div>
      </div>

      <div className="mt-6 bg-white border rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">Event log</div>
          <div className="text-xs text-gray-500">Most recent first</div>
        </div>

        <div className="h-48 overflow-auto text-sm text-gray-800">
          {logs.length === 0 ? (
            <div className="text-gray-400">No events yet — click an item to see logs.</div>
          ) : (
            <ul className="space-y-1">
              {logs.map((l, i) => (
                <li key={i} className="px-2 py-1 hover:bg-gray-50 rounded">{l}</li>
              ))}
            </ul>
          )}
        </div>

      </div>

      {/* styles for bubble animation - local tailwind-friendly classes */}
      <style>{`
        .ev-bubble-animate{
          animation: evBubble 700ms ease-out forwards;
        }
        @keyframes evBubble{
          0%{ transform: translateY(0) scale(1); opacity: 1; }
          100%{ transform: translateY(-40px) scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
