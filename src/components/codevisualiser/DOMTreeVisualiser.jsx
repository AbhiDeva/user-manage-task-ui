import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// DOM Tree Visualizer
// Single-file React component. TailwindCSS required for styling.
// Features:
// - Left: 5 example DOM snippets
// - Center: interactive DOM tree (expand/collapse, hover highlight, select)
// - Right: HTML source + behavior help & node details

export default function DomTreeVisualizer() {
  const examples = useMemo(() => [
    {
      id: "simple",
      title: "Simple Page",
      html: `
<div class="page">
  <header>
    <h1>My Site</h1>
    <nav><a href="#">Home</a><a href="#">About</a></nav>
  </header>
  <main>
    <p>Welcome to my site.</p>
  </main>
  <footer>© 2025</footer>
</div>`
    },
    {
      id: "nested-list",
      title: "Nested Lists",
      html: `
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </li>
  <li>Vegetables
    <ul>
      <li>Carrot</li>
      <li>Broccoli</li>
    </ul>
  </li>
</ul>`
    },
    {
      id: "form",
      title: "Form + Inputs",
      html: `
<section>
  <h2>Sign up</h2>
  <form>
    <label>Email<input type="email" /></label>
    <label>Password<input type="password" /></label>
    <button type="submit">Join</button>
  </form>
</section>`
    },
    {
      id: "article",
      title: "Article with Image",
      html: `
<article>
  <h2>The Mountains</h2>
  <figure>
    <img src="/mountain.jpg" alt="mountain" />
    <figcaption>Sunset over peaks</figcaption>
  </figure>
  <p>Good hiking tips...</p>
</article>`
    },
    {
      id: "complex",
      title: "Complex Layout",
      html: `
<div class="grid">
  <aside class="sidebar">Menu<ul><li>A</li><li>B</li></ul></aside>
  <section class="content">
    <header><h1>Dashboard</h1></header>
    <div class="cards">
      <div class="card">1</div>
      <div class="card">2</div>
    </div>
  </section>
</div>`
    }
  ], []);

  const [activeExample, setActiveExample] = useState(examples[0]);
  const [tree, setTree] = useState(() => htmlToTree(examples[0].html));
  const [selectedNode, setSelectedNode] = useState(null);
  const [expanded, setExpanded] = useState(new Set());

  // update tree when example changes
  React.useEffect(() => {
    const t = htmlToTree(activeExample.html);
    setTree(t);
    setSelectedNode(null);
    setExpanded(new Set());
  }, [activeExample]);

  function toggleExpand(id) {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="h-screen p-4 bg-gray-50 text-slate-900">
      <div className="max-w-full mx-auto h-full grid grid-cols-12 gap-4">
        {/* Left: Examples */}
        <aside className="col-span-3 bg-white rounded-xl shadow p-3 overflow-auto">
          <h3 className="font-semibold mb-3">Examples</h3>
          <ul className="space-y-2">
            {examples.map(ex => (
              <li key={ex.id}>
                <button
                  className={`w-full text-left p-2 rounded-md transition-all hover:bg-slate-50 ${
                    ex.id === activeExample.id ? 'bg-sky-50 border border-sky-200' : ''
                  }`}
                  onClick={() => setActiveExample(ex)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{ex.title}</span>
                    <small className="text-xs text-slate-500">Preview</small>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 text-xs text-slate-500 space-y-2">
            <p className="font-medium">How the visualiser behaves in the window</p>
            <ul className="list-disc ml-4">
              <li>Hover a node to highlight its box in the tree.</li>
              <li>Click a node to select it and show details on the right.</li>
              <li>Click the chevron to expand/collapse children.</li>
              <li>Double-click a node's label to edit its text (in-place).</li>
              <li>Right-click (or long-press) a node for a small context menu (copy path, remove node).</li>
            </ul>
          </div>
        </aside>

        {/* Center: Tree */}
        <main className="col-span-6 bg-white rounded-xl shadow p-4 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">DOM Tree — {activeExample.title}</h3>
            <div className="text-sm text-slate-500">Nodes: {countNodes(tree)}</div>
          </div>

          <div>
            <TreeNode
              node={tree}
              depth={0}
              expanded={expanded}
              toggleExpand={toggleExpand}
              onSelect={setSelectedNode}
              selected={selectedNode}
            />
          </div>

          <div className="mt-4 text-sm text-slate-400">Tip: use keyboard arrows to navigate (not implemented in this demo).</div>
        </main>

        {/* Right: HTML + Details */}
        <aside className="col-span-3 bg-white rounded-xl shadow p-3 overflow-auto">
          <h3 className="font-semibold mb-2">HTML Source</h3>
          <pre className="text-xs bg-slate-50 p-3 rounded-md overflow-auto">{activeExample.html.trim()}</pre>

          <div className="mt-4">
            <h4 className="font-medium">Selected Node</h4>
            {selectedNode ? (
              <div className="mt-2 text-sm">
                <div><strong>Tag:</strong> {selectedNode.tag}</div>
                <div><strong>Id:</strong> {selectedNode.attrs.id || '—'}</div>
                <div><strong>Classes:</strong> {selectedNode.attrs.class || '—'}</div>
                <div className="mt-2"><strong>Text:</strong>
                  <div className="mt-1 p-2 bg-slate-50 rounded text-xs">{selectedNode.text || '—'}</div>
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="px-2 py-1 rounded bg-sky-500 text-white text-sm" onClick={() => alert('Copy path: ' + selectedNode.path)}>Copy path</button>
                  <button className="px-2 py-1 rounded border text-sm" onClick={() => alert('Remove node (demo)')}>Remove</button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-500 mt-2">No node selected — click any node in the tree.</div>
            )}
          </div>

          <div className="mt-6 text-xs text-slate-500">
            <p className="font-medium">Behavior details (window)</p>
            <p className="mt-2">The visualiser keeps the tree scroll-synced inside its panel. When the window is narrow, the layout stacks vertically (examples &gt; tree &gt; details). Node hover and selection are purely client-side and do not modify your real DOM—this is a preview tool. Double-click editing only changes the in-memory node label for quick experimentation.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ---------- Helper components & functions ----------

function TreeNode({ node, depth, expanded, toggleExpand, onSelect, selected }) {
  const isExpanded = expanded.has(node.id);
  const hasChildren = node.children && node.children.length > 0;
  const selectedId = selected ? selected.id : null;

  return (
    <div className={`pl-${Math.min(depth * 4, 24)} mb-1`}> {/* tailwind padding trick: not dynamic at runtime; purely illustrative */}
      <div className={`flex items-center gap-2 p-2 rounded-md transition-colors cursor-pointer ${selectedId === node.id ? 'bg-sky-50 border border-sky-200' : 'hover:bg-slate-50'}`}
        onMouseEnter={() => { /* highlight logic could go here */ }}
        onClick={(e) => { e.stopPropagation(); onSelect(node); }}
        onDoubleClick={(e) => { e.stopPropagation(); const newText = prompt('Edit node text', node.text || node.tag); if (newText !== null) node.text = newText; }}
        onContextMenu={(e) => { e.preventDefault(); alert('Context menu — copy path / remove (demo)'); }}
      >
        <button onClick={(e) => { e.stopPropagation(); if (hasChildren) toggleExpand(node.id); }} className="w-6 h-6 rounded flex items-center justify-center text-sm">
          {hasChildren ? (isExpanded ? '▾' : '▸') : '•'}
        </button>

        <div className="flex-1">
          <div className="text-sm font-medium">&lt;{node.tag}&gt; <span className="text-xs text-slate-500">{node.attrs.class ? `.${String(node.attrs.class).split(' ').join('.')}` : ''}</span></div>
          {node.text ? <div className="text-xs text-slate-400">{truncate(node.text, 60)}</div> : null}
        </div>

        <div className="text-xs text-slate-400">{node.children.length}</div>
      </div>

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="ml-4 border-l border-slate-100 pl-2 mt-1">
            {node.children.map(child => (
              <TreeNode key={child.id} node={child} depth={depth + 1} expanded={expanded} toggleExpand={toggleExpand} onSelect={onSelect} selected={selected} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- Utilities to convert HTML string -> simple tree ----------

let idCounter = 1;
function htmlToTree(html) {
  // Very small, forgiving parser: create a temporary DOM in memory and walk it.
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.body;
    const root = elementToNode(body.firstElementChild || body);
    return root;
  } catch (e) {
    return elementToNode(document.createElement('div'));
  }
}

function elementToNode(el, path = '') {
  const myId = 'n' + (idCounter++);
  const node = {
    id: myId,
    tag: el.tagName ? el.tagName.toLowerCase() : 'text',
    attrs: {},
    text: el.childNodes && Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE).map(t => t.textContent.trim()).join(' ').trim(),
    children: [],
    path: path || myId
  };
  if (el.attributes) {
    for (let i = 0; i < el.attributes.length; i++) {
      const a = el.attributes[i];
      node.attrs[a.name] = a.value;
    }
  }
  // process element children
  const children = Array.from(el.children || []);
  node.children = children.map((c, idx) => elementToNode(c, (node.path || '') + '/' + (c.tagName ? c.tagName.toLowerCase() : '')));
  return node;
}

function truncate(str, n) {
  if (!str) return '';
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}

function countNodes(node) {
  if (!node) return 0;
  return 1 + node.children.reduce((s, c) => s + countNodes(c), 0);
}
