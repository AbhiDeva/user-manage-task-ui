import React, { useEffect, useRef, useState } from "react";

// EventDelegationVisualizer.jsx
// Enhanced with combined animations (bubble + arrows + propagation map)
// Uses Tailwind classes but includes a small amount of inline CSS for animations.

export default function EventDelegationAnimateVisualizer() {
  const [count, setCount] = useState(10);
  const [items, setItems] = useState(() => Array.from({ length: 10 }, (_, i) => i + 1));
  const [logs, setLogs] = useState([]);
  const [highlight, setHighlight] = useState(true);

  const bubbleRef = useRef(null);
  const delegatedParentRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    setItems(Array.from({ length: count }, (_, i) => i + 1));
  }, [count]);

  function pushLog(text) {
    setLogs((l) => [
      `${new Date().toLocaleTimeString()}: ${text}`,
      ...l
    ].slice(0, 200));
  }

  function describeTarget(e) {
    const t = e.target && e.target.dataset ? e.target.dataset.id || e.target.tagName : e.target.tagName;
    const c = e.currentTarget && e.currentTarget.className ? (typeof e.currentTarget.className === 'string' ? e.currentTarget.className.split(' ')[0] : e.currentTarget.tagName) : (e.currentTarget && e.currentTarget.tagName);
    return `target=${t}, currentTarget=${c}`;
  }

  // animate a small traveling dot (bubble) from click point to parent center, plus draw an SVG curved arrow
  function animatePropagation(e, label = 'Delegated') {
    const parent = delegatedParentRef.current;
    if (!parent) return;

    // determine source element (closest item) and destination (parent)
    const sourceEl = e.target.closest('.ev-item') || e.target;
    const destEl = parent;

    const sourceRect = sourceEl.getBoundingClientRect();
    const destRect = destEl.getBoundingClientRect();

    // compute start (click point) and end (parent center)
    const startX = e.clientX - destRect.left; // relative to parent container
    const startY = e.clientY - destRect.top;

    const endX = destRect.width / 2;
    const endY = destRect.height / 2;

    // position and show bubble
    const bubble = bubbleRef.current;
    bubble.style.left = `${startX}px`;
    bubble.style.top = `${startY}px`;
    bubble.classList.remove('ev-hidden');
    bubble.classList.add('ev-travel');

    // prepare svg arrow (a simple quadratic bezier from start -> control -> end)
    const svg = svgRef.current;
    const path = svg.querySelector('path');
    const controlX = (startX + endX) / 2;
    const controlY = Math.min(startY, endY) - 60; // arc above
    const d = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
    path.setAttribute('d', d);
    // trigger draw animation by toggling class
    path.classList.remove('ev-path-animate');
    // force reflow
    // eslint-disable-next-line no-unused-expressions
    path.getTotalLength();
    void path.offsetWidth;
    path.classList.add('ev-path-animate');

    // flash target -> parent -> document -> window in sequence
    flashPropagationChain(sourceEl, parent);

    // cleanup after animation
    setTimeout(() => {
      bubble.classList.remove('ev-travel');
      bubble.classList.add('ev-hidden');
      path.classList.remove('ev-path-animate');
    }, 900);
  }

  // flash elements in order to show propagation (target -> parent -> document -> window)
  function flashPropagationChain(targetEl, parentEl) {
    const chain = [];
    if (targetEl) chain.push(targetEl);
    if (parentEl) chain.push(parentEl);
    // document and window are conceptual; we'll flash small legend nodes instead

    chain.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add('ev-flash');
        setTimeout(() => el.classList.remove('ev-flash'), 300);
      }, idx * 200);
    });

    // flash the overlay legend nodes
    const legendTarget = document.querySelector('.ev-legend-target');
    const legendParent = document.querySelector('.ev-legend-parent');
    const legendDoc = document.querySelector('.ev-legend-doc');
    const legendWin = document.querySelector('.ev-legend-win');

    const legends = [legendTarget, legendParent, legendDoc, legendWin].filter(Boolean);
    legends.forEach((n, i) => {
      setTimeout(() => {
        n.classList.add('ev-legend-flash');
        setTimeout(() => n.classList.remove('ev-legend-flash'), 300);
      }, i * 200 + 50);
    });
  }

  // per-child click handler (illustrates dedicated listeners)
  function handleChildClick(id, e) {
    const message = `Per-child: clicked item ${id} — ${describeTarget(e)}`;
    pushLog(message);

    // animate a short local bubble from click point upwards
    const bubble = bubbleRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = delegatedParentRef.current ? delegatedParentRef.current.getBoundingClientRect() : { left: 0, top: 0 };
    const x = rect.left + rect.width / 2 - parentRect.left;
    const y = rect.top + rect.height / 2 - parentRect.top;
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    bubble.classList.remove('ev-hidden');
    bubble.classList.add('ev-local');
    setTimeout(() => {
      bubble.classList.remove('ev-local');
      bubble.classList.add('ev-hidden');
    }, 700);

    // flash only the clicked element briefly
    e.currentTarget.classList.add('ev-flash');
    setTimeout(() => e.currentTarget.classList.remove('ev-flash'), 300);
  }

  // delegated listener on parent
  function handleDelegatedClick(e) {
    const itemEl = e.target.closest('.ev-item');
    const id = itemEl ? itemEl.dataset.id : '(none)';
    const message = `Delegated: clicked item ${id} — ${describeTarget(e)}`;
    pushLog(message);

    animatePropagation(e, 'Delegated');
  }

  function clearLogs() {
    setLogs([]);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-3">Event Delegation — Visualiser (Animated)</h1>
      <p className="text-sm text-gray-600 mb-6">
        Combined animations: traveling bubble + animated arrow + propagation map. Click items in either panel.
      </p>

      <div className="flex gap-6 relative">
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
            className={`relative grid grid-cols-5 gap-2 transition-all duration-300`}
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

            {/* absolute SVG overlay for arrows */}
            <svg ref={svgRef} className="pointer-events-none absolute inset-0 w-full h-full" viewBox={`0 0 600 300`} preserveAspectRatio="none">
              <path d="" strokeWidth="2" fill="none" strokeLinecap="round" className="ev-path" />
            </svg>

          </div>

          {/* Bubble for animation (positioned relative to delegated parent) */}
          <div
            ref={bubbleRef}
            className={`pointer-events-none absolute w-5 h-5 rounded-full border-2 border-current ev-hidden transform -translate-x-1/2 -translate-y-1/2`}
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
          <div className="font-medium mb-2">Propagation map</div>
          <div className="flex items-center gap-3 text-sm">
            <div className="ev-legend ev-legend-target px-2 py-1 rounded">target</div>
            <div className="ev-legend ev-legend-parent px-2 py-1 rounded">parent</div>
            <div className="ev-legend ev-legend-doc px-2 py-1 rounded">document</div>
            <div className="ev-legend ev-legend-win px-2 py-1 rounded">window</div>
          </div>
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

      {/* styles for bubble + path + flashes */}
      <style>{`
        .ev-hidden{ opacity:0; transform: scale(0); }
        .ev-travel{ animation: bubbleTravel 850ms ease-out forwards; }
        .ev-local{ animation: bubbleLocal 700ms ease-out forwards; }
        @keyframes bubbleTravel{
          0%{ transform: translate(-50%, -50%) scale(1); opacity:1; }
          100%{ transform: translate(-50%, -80%) scale(1.6); opacity:0; }
        }
        @keyframes bubbleLocal{
          0%{ transform: translate(-50%, -50%) scale(1); opacity:1; }
          100%{ transform: translate(-50%, -140%) scale(2); opacity:0; }
        }
        .ev-path{ stroke: rgba(59,130,246,0.9); stroke-width: 2; stroke-linecap: round; }
        .ev-path-animate{ stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: drawPath 800ms linear forwards; }
        @keyframes drawPath{ to { stroke-dashoffset: 0; } }
        .ev-flash{ box-shadow: 0 0 0 6px rgba(250,204,21,0.12); transition: box-shadow 200ms; }
        .ev-legend{ background: #f8fafc; border: 1px solid #e6edf3; }
        .ev-legend-flash{ box-shadow: 0 0 0 6px rgba(99,102,241,0.12); }
      `}</style>
    </div>
  );
}
