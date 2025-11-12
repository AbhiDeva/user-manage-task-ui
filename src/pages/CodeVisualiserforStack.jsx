// CodeVisualizer.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { FaPlay, FaRedo, FaTree, FaCodeBranch } from "react-icons/fa";
import { SiJavascript, SiReact, SiAngular } from "react-icons/si";
import * as acorn from "acorn"; // npm i acorn

// ---------- SAMPLE CODES (Normal / Medium / Complex) ----------
const SAMPLES = {
  javascript: {
    normal: `// Normal: create and append a div
const el = document.createElement('div');
el.id = 'greeting';
el.textContent = 'Hello DOM! (Normal)';
document.body.appendChild(el);
console.log('Appended greeting');`,

    medium: `// Medium: build a list and attach event listeners
const container = document.createElement('div');
container.id = 'listWrap';
const ul = document.createElement('ul');
for (let i = 1; i <= 5; i++) {
  const li = document.createElement('li');
  li.textContent = 'Item ' + i;
  li.addEventListener('click', () => {
    li.style.fontWeight = 'bold';
    console.log('Clicked', li.textContent);
  });
  ul.appendChild(li);
}
container.appendChild(ul);
document.body.appendChild(container);
console.log('List created');`,

    complex: `// Complex: nested structure + dynamic updates and timer
const root = document.createElement('div');
root.id = 'complexRoot';
const header = document.createElement('h2');
header.textContent = 'Complex Demo';
root.appendChild(header);

const data = ['alpha', 'beta', 'gamma'];
const list = document.createElement('ol');
data.forEach((d) => {
  const li = document.createElement('li');
  li.textContent = d;
  list.appendChild(li);
});
root.appendChild(list);

const btn = document.createElement('button');
btn.textContent = 'Shuffle & update';
btn.onclick = () => {
  data.sort(() => Math.random() - 0.5);
  list.innerHTML = '';
  data.forEach((d) => {
    const li = document.createElement('li');
    li.textContent = d;
    list.appendChild(li);
  });
  console.log('Shuffled:', data);
};
root.appendChild(btn);

document.body.appendChild(root);

// Update a counter every second
let i = 0;
const counter = document.createElement('div');
counter.id = 'counter';
counter.textContent = 'Counter: 0';
root.appendChild(counter);
const timer = setInterval(() => {
  i++;
  counter.textContent = 'Counter: ' + i;
  if (i === 5) {
    clearInterval(timer);
  }
}, 800);

console.log('Complex DOM built');`,
  },

  react: {
    normal: `// React (static preview) - App component
function App() {
  return React.createElement('div', null,
    React.createElement('h1', null, 'Hello React (Normal)'),
    React.createElement('p', null, 'This is a simple React element tree.')
  );
}
export default App;`,

    medium: `// React (static preview) - nested tree with props
function List({ items }) {
  return React.createElement('ul', null,
    items.map((it, i) => React.createElement('li', { key: i }, it))
  );
}
function App() {
  return React.createElement('div', null,
    React.createElement('h1', null, 'React (Medium)'),
    React.createElement(List, { items: ['one','two','three'] })
  );
}
export default App;`,

    complex: `// React (static preview) - stateful pseudo-code
function Counter() {
  const [n, setN] = React.useState(0);
  return React.createElement('div', null,
    React.createElement('h1', null, 'Counter: ' + n),
    React.createElement('button', { onClick: () => setN(n+1) }, 'Inc')
  );
}
function App() {
  return React.createElement('div', null,
    React.createElement('h2', null, 'React (Complex)'),
    React.createElement(Counter, null)
  );
}
export default App;`,
  },

  angular: {
    normal: `// Angular (static preview) - component template
@Component({ selector: 'app-root', template: '<h1>Hello Angular (Normal)</h1>' })
export class AppComponent { }`,

    medium: `// Angular (static preview) - component with list
@Component({
  selector: 'app-root',
  template: '<div><h2>Angular (Medium)</h2><ul><li *ngFor="let i of [1,2,3]">Item {{i}}</li></ul></div>'
})
export class AppComponent { }`,

    complex: `// Angular (static preview) - component with bindings
@Component({
  selector: 'app-root',
  template: \`
    <div>
      <h2>Angular (Complex)</h2>
      <button (click)="inc()">Inc</button>
      <span>{{count}}</span>
    </div>\`
})
export class AppComponent { count = 0; inc(){ this.count++ } }`,
  },
};

// ---------- SANDBOX IFRAME CONTENT ----------
const SANDBOX_HTML = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>code-sandbox</title>
    <style>
      body{ font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding:8px; }
      pre { font-size: 13px; white-space: pre-wrap; word-break: break-word; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      // Capture console logs
      (function() {
        const send = (data) => parent.postMessage({ __sandbox: true, payload: data }, "*");
        const origLog = console.log;
        console.log = function(...args) {
          origLog.apply(this, args);
          send({ type: 'log', data: args.map(a => {
            try { return JSON.stringify(a) } catch(e){ return String(a) }
          })});
        };
        // Listen for incoming code to execute
        window.addEventListener('message', async (ev) => {
          try {
            if (!ev.data || !ev.data.execCode) return;
            // Reset body
            document.body.innerHTML = '<div id="root"></div>';
            const code = ev.data.execCode;
            let result = { success: true, output: '', dom: '', logs: [] };
            try {
              // We use Function constructor instead of eval to reduce scope leakage
              const fn = new Function(code);
              await fn();
            } catch (err) {
              result.success = false;
              result.error = (err && err.message) ? err.message : String(err);
            }
            // Serialize DOM snapshot
            try {
              // compact innerText for readability and collect structure
              const dom = document.body.innerHTML;
              result.dom = dom;
            } catch (e) {
              result.domError = String(e);
            }
            parent.postMessage({ __sandbox: true, payload: result }, "*");
          } catch (e) {
            parent.postMessage({ __sandbox: true, payload: { success: false, error: String(e) } }, "*");
          }
        }, false);
      })();
    </script>
  </body>
</html>`;

// ---------- Helper: build a simple DOM-tree from HTML string (very lightweight) ----------
function parseHtmlToTree(html) {
  // Very small parser using DOMParser (browser environment) to produce a lightweight tree
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const body = doc.body;
    function walk(node) {
      if (!node) return null;
      const children = [];
      node.childNodes.forEach((cn) => {
        if (cn.nodeType === Node.TEXT_NODE) {
          const t = cn.textContent.trim();
          if (t) children.push({ type: "text", text: t });
        } else if (cn.nodeType === Node.ELEMENT_NODE) {
          children.push({
            type: "element",
            tag: cn.tagName.toLowerCase(),
            id: cn.id || null,
            className: cn.className || null,
            children: walk(cn),
          });
        }
      });
      return children;
    }
    return walk(body);
  } catch (e) {
    return [{ type: "error", message: String(e) }];
  }
}

// ---------- UI Subcomponents ----------
function IconButton({ children, onClick, title }) {
  return (
    <button onClick={onClick} title={title}
      className="flex items-center gap-2 px-3 py-2 rounded-md border bg-white/6 hover:bg-white/10 transition text-sm">
      {children}
    </button>
  );
}

function TreeNode({ node }) {
  if (!node) return null;
  if (node.type === "text") {
    return <div className="text-xs text-yellow-300 px-2">{JSON.stringify(node.text)}</div>;
  }
  if (node.type === "error") {
    return <div className="text-xs text-red-400">Error: {node.message}</div>;
  }
  return (
    <div className="pl-3">
      <div className="flex items-center gap-2 text-sm">
        <span className="font-mono text-green-300">&lt;{node.tag}&gt;</span>
        {node.id && <span className="text-xs px-2 rounded bg-white/6">{node.id}</span>}
        {node.className && <span className="text-xs px-2 rounded bg-white/6">{node.className}</span>}
      </div>
      <div className="pl-4">
        {node.children && node.children.length ? node.children.map((c, i) => <TreeNode key={i} node={c} />) : <div className="text-xs text-gray-400">• empty</div>}
      </div>
      <div className="text-xs font-mono text-green-300">&lt;/{node.tag}&gt;</div>
    </div>
  );
}

// ---------- MAIN COMPONENT ----------
export default function CodeVisualizerForStack() {
  const iframeRef = useRef(null);
  const [lang, setLang] = useState("javascript");
  const [complexity, setComplexity] = useState("normal");
  const [code, setCode] = useState(SAMPLES.javascript.normal);
  const [ast, setAst] = useState(null);
  const [logs, setLogs] = useState([]);
  const [domTree, setDomTree] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Create iframe blob and set srcdoc once
  useEffect(() => {
    const blob = new Blob([SANDBOX_HTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
    return () => {
      URL.revokeObjectURL(url);
    };
  }, []);

  // Update code sample when lang/complexity changes
  useEffect(() => {
    setCode(SAMPLES[lang][complexity]);
    setAst(null);
    setLogs([]);
    setDomTree([]);
    setLastResult(null);
  }, [lang, complexity]);

  // Listen for sandbox messages
  useEffect(() => {
    const onMessage = (ev) => {
      if (!ev.data || !ev.data.__sandbox) return;
      const payload = ev.data.payload;
      // payload could be log messages or final result
      if (payload.type === "log") {
        setLogs((s) => s.concat(payload.data.map((d) => d)));
      } else {
        setLastResult(payload);
        if (payload.dom) {
          const tree = parseHtmlToTree(payload.dom);
          setDomTree(tree || []);
        }
        if (payload.error) {
          setLogs((s) => s.concat([`Error: ${payload.error}`]));
        }
      }
      setIsRunning(false);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Execute code in sandbox
  const runCode = useCallback(async () => {
    setIsRunning(true);
    setLogs([]);
    setDomTree([]);
    setLastResult(null);

    if (!iframeRef.current) {
      setLogs(["Sandbox not ready"]);
      setIsRunning(false);
      return;
    }

    // ensure we only execute plain JS in the sandbox
    if (lang !== "javascript") {
      // For React/Angular we will not execute - only show AST + static preview
      setLogs([`Execution for ${lang} is unsupported in the simple iframe sandbox. Showing AST & static preview only.`]);
      setIsRunning(false);
      return;
    }

    // Post message to iframe to execute
    iframeRef.current.contentWindow.postMessage({ execCode: code }, "*");
  }, [code, iframeRef, lang]);

  // Generate AST using acorn
  const generateAst = useCallback(() => {
    try {
      const parsed = acorn.parse(code, { ecmaVersion: 2022, sourceType: "module" });
      setAst(parsed);
      setLogs((s) => s.concat(["AST generated"]));
    } catch (err) {
      setAst(null);
      setLogs((s) => s.concat([`AST error: ${err.message}`]));
    }
  }, [code]);

  // UI: quick select buttons for language
  const langButtons = [
    { key: "javascript", label: "JavaScript", icon: <SiJavascript /> },
    { key: "react", label: "React", icon: <SiReact /> },
    { key: "angular", label: "Angular", icon: <SiAngular /> },
  ];

  return (
    <div className="min-h-[680px] w-full p-6 space-y-6 bg-gradient-to-br from-slate-900 to-gray-900 text-gray-200">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <FaCodeBranch /> Code Visualizer — NodeElement & DocumentElement
        </h2>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md p-1 bg-white/6">
            {langButtons.map((b) => (
              <button
                key={b.key}
                onClick={() => setLang(b.key)}
                className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm ${lang === b.key ? "bg-blue-600 text-white" : "text-gray-200 hover:bg-white/6"}`}
              >
                {b.icon} <span className="hidden md:inline">{b.label}</span>
              </button>
            ))}
          </div>

          <select className="rounded-md bg-white/5 px-2 py-1 text-sm" value={complexity} onChange={(e) => setComplexity(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="complex">Complex</option>
          </select>

          <IconButton onClick={runCode} title="Run (Sandbox)" >
            <FaPlay /> Run
          </IconButton>

          <IconButton onClick={generateAst} title="Generate AST">
            <FaTree /> AST
          </IconButton>

          <IconButton onClick={() => { setCode(SAMPLES[lang].normal); setComplexity("normal"); }} title="Reset sample">
            <FaRedo /> Reset
          </IconButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="rounded-2xl border border-gray-700 overflow-hidden">
          <Editor
            height="420px"
            defaultLanguage="javascript"
            language={lang === "react" ? "javascript" : lang}
            value={code}
            onChange={(v) => setCode(v || "")}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: "on",
              renderLineHighlight: "all",
              padding: { top: 12, bottom: 12 },
            }}
          />
        </div>

        {/* Right Column: sandbox iframe + AST + DOM tree */}
        <div className="space-y-4">
          {/* Sandbox iframe */}
          <div className="rounded-2xl border border-gray-700 p-3 bg-black/40">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">Sandbox Output</div>
              <div className="text-xs text-gray-400">{isRunning ? "Running..." : "Ready"}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white/5 p-2 rounded">
                <div className="text-xs font-semibold mb-1">Console logs</div>
                <div className="max-h-40 overflow-auto text-xs p-1 bg-black/60 rounded">
                  {logs.length === 0 ? <div className="text-gray-400">No logs yet</div> : logs.map((l, i) => <div key={i} className="text-sm text-gray-100">{typeof l === "string" ? l : l}</div>)}
                </div>
              </div>

              <div className="bg-white/5 p-2 rounded">
                <div className="text-xs font-semibold mb-1">DOM Snapshot</div>
                <div className="max-h-40 overflow-auto text-xs p-1 bg-black/60 rounded">
                  {lastResult && lastResult.dom ? <pre className="text-xs text-gray-100 whitespace-pre-wrap">{lastResult.dom}</pre> : <div className="text-gray-400">No DOM yet</div>}
                </div>
              </div>
            </div>

            <iframe
              ref={iframeRef}
              title="code-sandbox"
              sandbox="allow-scripts"
              style={{ width: "100%", height: 140, border: "1px solid rgba(255,255,255,0.04)", marginTop: 8, borderRadius: 6 }}
            />
          </div>

          {/* AST Viewer */}
          <div className="rounded-2xl border border-gray-700 p-3 bg-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">AST (acorn)</div>
            </div>
            <div className="max-h-48 overflow-auto text-xs p-2 bg-black/60 rounded">
              {ast ? <pre className="text-xs text-gray-100">{JSON.stringify(ast, null, 2)}</pre> : <div className="text-gray-400">AST is not generated. Click "AST"</div>}
            </div>
          </div>

          {/* DOM Tree visualizer */}
          <div className="rounded-2xl border border-gray-700 p-3 bg-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">DOM Tree</div>
            </div>
            <div className="max-h-56 overflow-auto p-2 bg-black/60 rounded">
              {domTree && domTree.length ? domTree.map((n, i) => <TreeNode key={i} node={n} />) : <div className="text-gray-400 text-sm">DOM tree empty — run JS sample to populate</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
