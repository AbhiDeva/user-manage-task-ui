// // import React, { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { ChevronRight, Layers, GitBranch, Sparkles, Wand2, Edit, Code2 } from "lucide-react";

// // export default function PrototypalInheritanceVisualizer() {
// //   const [lookupProp, setLookupProp] = useState("sayHello");
// //   const [animStep, setAnimStep] = useState(0);
// //   const [viewer, setViewer] = useState("chain");
// //   const [instance, setInstance] = useState({ name: "UI" });

// //   const chain = [
// //     { id: "instance", label: "Object Instance", color: "from-purple-500 to-indigo-500" },
// //     { id: "proto", label: "Person.prototype", color: "from-indigo-500 to-blue-500" },
// //     { id: "objproto", label: "Object.prototype", color: "from-blue-500 to-cyan-500" },
// //     { id: "null", label: "null", color: "from-slate-700 to-gray-900" }
// //   ];

// //   const personProto = {
// //     sayHello: "function() { return 'Hello ' + this.name }",
// //     greet: 'function() { return "Hi" }'
// //   };

// //   const objectProto = {
// //     toString: "function toString() { [native code] }"
// //   };

// //   function startLookupAnimation() {
// //     setAnimStep(0);
// //     let step = 0;
// //     const interval = setInterval(() => {
// //       step++;
// //       setAnimStep(step);
// //       if (step >= 3) clearInterval(interval);
// //     }, 900);
// //   }

// //   function updateInstance(key, val) {
// //     setInstance(prev => ({ ...prev, [key]: val }));
// //   }

// //   const protoChainInspector = {
// //     instance,
// //     __proto__: personProto,
// //     __proto2__: objectProto,
// //     __proto3__: null
// //   };

// //   return (
// //     <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-10 flex flex-col items-center gap-10">
// //       <h1 className="text-4xl font-bold flex items-center gap-3">
// //         <Sparkles className="text-yellow-400" /> Prototypal Inheritance Visualizer
// //       </h1>

// //       {/* VIEW SWITCH */}
// //       <div className="flex gap-4 mt-4">
// //         <button onClick={() => setViewer("chain")} className={`px-4 py-2 rounded-xl border ${viewer==='chain'?'border-cyan-400':'border-slate-700'}`}>Prototype Chain</button>
// //         <button onClick={() => setViewer("edit")} className={`px-4 py-2 rounded-xl border ${viewer==='edit'?'border-cyan-400':'border-slate-700'}`}>Live Editable Object</button>
// //         <button onClick={() => setViewer("inspect")} className={`px-4 py-2 rounded-xl border ${viewer==='inspect'?'border-cyan-400':'border-slate-700'}`}>__proto__ Inspector</button>
// //         <button onClick={() => setViewer("class")} className={`px-4 py-2 rounded-xl border ${viewer==='class'?'border-cyan-400':'border-slate-700'}`}>ES6 Class Version</button>
// //       </div>

// //       <AnimatePresence mode="wait">
// //         {viewer === "chain" && (
// //           <motion.div
// //             key="chainView"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="w-full flex flex-col items-center gap-6 mt-10"
// //           >
// //             <div className="flex items-center gap-6">
// //               {chain.map((c, index) => (
// //                 <React.Fragment key={c.id}>
// //                   <motion.div
// //                     animate={animStep === index ? { scale: 1.15, boxShadow: "0 0 20px rgba(255,255,255,0.4)" } : { scale: 1 }}
// //                     className={`rounded-2xl bg-gradient-to-br ${c.color} px-6 py-4 text-center shadow-xl`}
// //                   >
// //                     <div className="font-semibold text-lg">{c.label}</div>
// //                   </motion.div>
// //                   {index < chain.length - 1 && <ChevronRight size={40} className="text-gray-400" />}
// //                 </React.Fragment>
// //               ))}
// //             </div>

// //             <div className="flex gap-3 items-center mt-6">
// //               <input value={lookupProp} onChange={e => setLookupProp(e.target.value)} className="px-3 py-2 rounded bg-slate-800 border border-slate-700" placeholder="lookup property" />
// //               <button onClick={startLookupAnimation} className="px-4 py-2 bg-cyan-600 rounded-xl flex items-center gap-2"><Wand2 size={18}/>Animate Lookup</button>
// //             </div>

// //             <div className="w-[60%] bg-slate-800/60 border border-slate-700 rounded-xl p-6 mt-4">
// //               <h3 className="text-xl font-semibold mb-2">Lookup Progress</h3>
// //               <ul className="text-gray-300 leading-7">
// //                 <li className={animStep>=0?"text-white":"text-gray-500"}>1. Check instance.{lookupProp}</li>
// //                 <li className={animStep>=1?"text-white":"text-gray-500"}>2. Check Person.prototype.{lookupProp}</li>
// //                 <li className={animStep>=2?"text-white":"text-gray-500"}>3. Check Object.prototype.{lookupProp}</li>
// //                 <li className={animStep>=3?"text-white":"text-gray-500"}>4. End at null</li>
// //               </ul>
// //             </div>
// //           </motion.div>
// //         )}

// //         {viewer === "edit" && (
// //           <motion.div key="editView" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-[70%] p-6 rounded-xl bg-slate-800/50 border border-slate-700 mt-10">
// //             <h2 className="text-2xl font-bold flex items-center gap-2 mb-4"><Edit/> Live Editable Object</h2>

// //             <div className="flex flex-col gap-3">
// //               {Object.entries(instance).map(([k,v]) => (
// //                 <div key={k} className="flex gap-3">
// //                   <input value={k} disabled className="px-3 py-2 bg-slate-900 rounded border border-slate-700 w-40" />
// //                   <input value={v} onChange={e=>updateInstance(k,e.target.value)} className="px-3 py-2 bg-slate-900 rounded border border-slate-700 flex-1" />
// //                 </div>
// //               ))}
// //             </div>
// //           </motion.div>
// //         )}

// //         {viewer === "inspect" && (
// //           <motion.div key="inspectView" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-[70%] p-6 rounded-xl bg-slate-800/50 border border-slate-700 mt-10">
// //             <h2 className="text-2xl font-bold flex items-center gap-2 mb-4"><Layers/> __proto__ Chain Inspector</h2>
// //             <pre className="text-gray-300 text-md whitespace-pre-wrap leading-7 bg-slate-900 p-4 rounded-xl border border-slate-700">{JSON.stringify(protoChainInspector, null, 2)}</pre>
// //           </motion.div>
// //         )}

// //         {viewer === "class" && (
// //           <motion.div key="classView" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-[80%] p-6 rounded-xl bg-slate-800/50 border border-slate-700 mt-10">
// //             <h2 className="text-2xl font-bold flex items-center gap-2 mb-4"><Code2/> ES6 Class Version</h2>
// //             <pre className="text-gray-300 text-md whitespace-pre-wrap leading-7 bg-slate-900 p-4 rounded-xl border border-slate-700">{`
// // class Person {
// //   constructor(name) {
// //     this.name = name;
// //   }

// //   sayHello() {
// //     return "Hello " + this.name;
// //   }
// // }

// // const user = new Person("UI");
// // user.sayHello();
// // // Lookup order (same as before)
// // // instance → Person.prototype → Object.prototype → null
// //             `}</pre>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }

// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronRight, ChevronLeft, Layers, Sparkles, Wand2, Edit, Code2, Move } from "lucide-react";

// // Prototypal Inheritance Visualizer — enhanced
// // Features added:
// // - Glow animation for active prototype node
// // - Bidirectional arrows between chain nodes
// // - Drag-and-drop for prototype nodes (simple pointer-based)
// // - Lightweight JS execution sandbox (iframe srcDoc) to run illustrative code safely

// export default function PrototypalInheritanceVisualizer() {
//   const [lookupProp, setLookupProp] = useState("sayHello");
//   const [animStep, setAnimStep] = useState(-1);
//   const [viewer, setViewer] = useState("chain");
//   const [instance, setInstance] = useState({ name: "UI" });
//   const [order, setOrder] = useState(["instance", "proto", "objproto", "null"]);
//   const dragRef = useRef(null);
//   const dragState = useRef({ dragging: null, startX: 0, startY: 0 });
//   const iframeRef = useRef(null);
//   const [sandboxCode, setSandboxCode] = useState(`function Person(name){this.name=name}
// Person.prototype.sayHello = function(){ return 'Hello '+this.name }
// const u=new Person('UI');
// console.log(u.sayHello());`);
//   const personProto = {
//     sayHello: "function() { return 'Hello ' + this.name }",
//     greet: 'function() { return "Hi" }'
//   };
//   const objectProto = {
//     toString: "function toString() { [native code] }"
//   };

//   // START lookup animation (glowing nodes)
//   function startLookupAnimation() {
//     setAnimStep(-1);
//     let step = -1;
//     const interval = setInterval(() => {
//       step++;
//       setAnimStep(step);
//       if (step >= order.length - 1) {
//         clearInterval(interval);
//         setTimeout(() => setAnimStep(-1), 700);
//       }
//     }, 700);
//   }

//   // Simple pointer drag handling for nodes (no external lib)
//   function onPointerDown(e, id) {
//     dragState.current.dragging = id;
//     dragState.current.startX = e.clientX;
//     dragState.current.startY = e.clientY;
//     window.addEventListener("pointermove", onPointerMove);
//     window.addEventListener("pointerup", onPointerUp);
//   }
//   function onPointerMove(e) {
//     // find closest node under pointer and swap positions if moved horizontally enough
//     const dx = e.clientX - dragState.current.startX;
//     if (Math.abs(dx) > 60 && dragState.current.dragging) {
//       const from = order.indexOf(dragState.current.dragging);
//       const to = dx > 0 ? Math.min(order.length - 1, from + 1) : Math.max(0, from - 1);
//       if (to !== from) {
//         const newOrder = [...order];
//         newOrder.splice(from, 1);
//         newOrder.splice(to, 0, dragState.current.dragging);
//         setOrder(newOrder);
//         dragState.current.startX = e.clientX; // reset start to allow chaining swaps
//       }
//     }
//   }
//   function onPointerUp() {
//     dragState.current.dragging = null;
//     window.removeEventListener("pointermove", onPointerMove);
//     window.removeEventListener("pointerup", onPointerUp);
//   }

//   // Run code in sandboxed iframe (console logs forwarded to DOM)
//   function runSandbox() {
//     const html = `<!doctype html><html><body><pre id=out></pre><script>console.log = function(){ var out=document.getElementById('out'); for(var i=0;i<arguments.length;i++){ out.textContent += arguments[i] + ' '; } out.textContent += '
// '; }
// try{${sandboxCode}}catch(e){console.log('Error:', e.message)}</script></body></html>`;
//     if (iframeRef.current) iframeRef.current.srcdoc = html;
//   }

//   useEffect(() => { runSandbox(); }, []);

//   const labelFor = id => ({
//     instance: "Object Instance",
//     proto: "Person.prototype",
//     objproto: "Object.prototype",
//     null: "null"
//   }[id]);

//   const protoChainInspector = {
//     instance,
//     __proto__: personProto,
//     __proto2__: objectProto,
//     __proto3__: null
//   };

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-8 flex flex-col items-center gap-8">
//       <header className="w-full max-w-6xl flex items-center justify-between">
//         <h1 className="text-3xl font-bold flex items-center gap-3"><Sparkles className="text-yellow-400"/> Prototypal Inheritance Visualizer</h1>
//         <div className="flex gap-3">
//           <button onClick={() => setViewer('chain')} className={`px-3 py-1 rounded-md border ${viewer==='chain'?'border-cyan-400':'border-slate-700'}`}>Chain</button>
//           <button onClick={() => setViewer('edit')} className={`px-3 py-1 rounded-md border ${viewer==='edit'?'border-cyan-400':'border-slate-700'}`}>Edit</button>
//           <button onClick={() => setViewer('inspect')} className={`px-3 py-1 rounded-md border ${viewer==='inspect'?'border-cyan-400':'border-slate-700'}`}>Inspector</button>
//           <button onClick={() => setViewer('class')} className={`px-3 py-1 rounded-md border ${viewer==='class'?'border-cyan-400':'border-slate-700'}`}>Class</button>
//         </div>
//       </header>

//       <main className="w-full max-w-6xl">
//         <AnimatePresence mode="wait">
//           {viewer === 'chain' && (
//             <motion.section key="chain" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col items-center gap-6">
//               <div className="flex items-center gap-6">
//                 {order.map((id, idx) => (
//                   <div key={id} className="flex items-center gap-3">
//                     {/* bidirectional arrow left */}
//                     {idx>0 && <ChevronLeft size={28} className={`text-gray-400 ${animStep===idx-1?'animate-pulse':''}`}/>} 

//                     <motion.div
//                       ref={dragRef}
//                       onPointerDown={(e)=>onPointerDown(e,id)}
//                       animate={animStep===idx ? { scale:1.08, boxShadow: '0 0 30px rgba(34,197,94,0.6)' } : { scale:1 }}
//                       transition={{ type:'spring', stiffness: 300 }}
//                       className={`relative cursor-grab select-none rounded-2xl px-6 py-5 text-center min-w-[160px] shadow-2xl bg-gradient-to-br ${id==='instance'?'from-purple-500 to-indigo-500':id==='proto'?'from-indigo-500 to-blue-500':id==='objproto'?'from-blue-500 to-cyan-500':'from-slate-700 to-gray-900'}`}
//                       style={{border: animStep===idx ? '2px solid rgba(255,255,255,0.9)' : '2px solid transparent'}}
//                     >
//                       <div className="flex items-center justify-center gap-2">
//                         <Move size={16}/>
//                         <div className="font-semibold text-lg">{labelFor(id)}</div>
//                       </div>
//                       {/* glow ring */}
//                       <motion.span
//                         aria-hidden
//                         animate={animStep===idx?{opacity:[0,1,0.6,1]}:{opacity:0}}
//                         transition={{ duration: 0.9, repeat: animStep===idx?Infinity:0 }}
//                         className="absolute -inset-1 rounded-2xl pointer-events-none" style={{boxShadow: animStep===idx? '0 0 40px rgba(34,197,94,0.25)' : 'none'}}
//                       />
//                     </motion.div>

//                     {/* bidirectional arrow right */}
//                     {idx < order.length -1 && <ChevronRight size={28} className={`text-gray-400 ${animStep===idx?'animate-pulse':''}`}/>} 
//                   </div>
//                 ))}
//               </div>

//               <div className="flex gap-3 items-center mt-6">
//                 <input value={lookupProp} onChange={e=>setLookupProp(e.target.value)} className="px-3 py-2 rounded bg-slate-800 border border-slate-700" placeholder="property to lookup" />
//                 <button onClick={startLookupAnimation} className="px-4 py-2 bg-emerald-600 rounded-md flex items-center gap-2"><Wand2/>Animate Lookup</button>
//               </div>

//               <div className="w-full mt-6 grid grid-cols-2 gap-4">
//                 <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
//                   <h4 className="font-semibold mb-2">Lookup Steps</h4>
//                   <ol className="text-gray-300 list-decimal list-inside">
//                     {order.map((id, i) => (
//                       <li key={id} className={animStep>=i? 'text-white': 'text-gray-500'}>{labelFor(id)}.{lookupProp}</li>
//                     ))}
//                   </ol>
//                 </div>

//                 <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
//                   <h4 className="font-semibold mb-2">Instructions</h4>
//                   <p className="text-gray-300">Drag any node left or right to reorder the prototype chain. Click "Animate Lookup" to see which node is active (glow + pulse).</p>
//                 </div>
//               </div>
//             </motion.section>
//           )}

//           {viewer==='edit' && (
//             <motion.section key="edit" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="grid grid-cols-2 gap-6">
//               <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
//                 <h3 className="font-semibold mb-3 flex items-center gap-2"><Edit/> Live Editable Object</h3>
//                 <div className="flex flex-col gap-3">
//                   {Object.entries(instance).map(([k,v])=> (
//                     <div key={k} className="flex gap-3">
//                       <input value={k} disabled className="px-3 py-2 bg-slate-900 rounded border border-slate-700 w-32"/>
//                       <input value={v} onChange={e=>setInstance(prev=>({...prev,[k]:e.target.value}))} className="px-3 py-2 bg-slate-900 rounded border border-slate-700 flex-1"/>
//                     </div>
//                   ))}
//                   <div className="mt-3">
//                     <button onClick={()=>{ setInstance(prev=>({...prev, age: '30'})) }} className="px-3 py-2 rounded bg-cyan-600">Add sample prop</button>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 flex flex-col gap-3">
//                 <h3 className="font-semibold mb-2">JS Execution Sandbox</h3>
//                 <textarea value={sandboxCode} onChange={e=>setSandboxCode(e.target.value)} className="h-40 bg-slate-900 rounded p-3 text-sm font-mono border border-slate-700" />
//                 <div className="flex gap-2">
//                   <button onClick={runSandbox} className="px-3 py-2 rounded bg-emerald-600">Run</button>
//                   <button onClick={()=>{ setSandboxCode(`function Person(name){this.name=name}\nPerson.prototype.sayHello=function(){return 'Hello '+this.name}\nconst u=new Person('UI')\nconsole.log(u.sayHello())`); }} className="px-3 py-2 rounded border">Reset</button>
//                 </div>
//                 <iframe ref={iframeRef} title="sandbox" className="mt-2 bg-white h-40 w-full rounded" sandbox="allow-scripts" />
//               </div>
//             </motion.section>
//           )}

//           {viewer==='inspect' && (
//             <motion.section key="inspect" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
//               <h3 className="font-semibold mb-3 flex items-center gap-2"><Layers/> __proto__ Inspector</h3>
//               <pre className="text-sm text-gray-200 p-3 rounded bg-slate-900 border border-slate-700">{JSON.stringify(protoChainInspector, null, 2)}</pre>
//             </motion.section>
//           )}

//           {viewer==='class' && (
//             <motion.section key="class" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
//               <h3 className="font-semibold mb-3 flex items-center gap-2"><Code2/> ES6 Class Version</h3>
//               <pre className="text-sm text-gray-200 p-3 rounded bg-slate-900 border border-slate-700">{`class Person {
//   constructor(name){ this.name=name }
//   sayHello(){ return 'Hello '+this.name }
// }
// const u = new Person('UI')
// console.log(u.sayHello())`}</pre>
//             </motion.section>
//           )}
//         </AnimatePresence>
//       </main>

//       <footer className="w-full max-w-6xl text-sm text-gray-400">Tip: Node order represents the lookup priority. Reordering simulates changing the prototype linkage.</footer>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Layers, Sparkles, Wand2, Edit, Code2, Move } from "lucide-react";

// Prototypal Inheritance Visualizer — fixed and cleaned
export default function PrototypalInheritanceVisualizer() {
  // Tabs
  const [activeTab, setActiveTab] = useState("Visualizer");

  // Visualizer state
  const [lookupProp, setLookupProp] = useState("sayHello");
  const [animStep, setAnimStep] = useState(-1);
  const [viewer, setViewer] = useState("chain");
  const [instance, setInstance] = useState({ name: "UI" });
  const [order, setOrder] = useState(["instance", "proto", "objproto", "null"]);
  const dragRef = useRef(null);
  const dragState = useRef({ dragging: null, startX: 0, startY: 0 });
  const iframeRef = useRef(null);
  const [sandboxCode, setSandboxCode] = useState(`function Person(name){this.name=name}
Person.prototype.sayHello = function(){ return 'Hello '+this.name }
const u=new Person('UI');
console.log(u.sayHello());`);

  const personProto = {
    sayHello: "function() { return 'Hello ' + this.name }",
    greet: 'function() { return "Hi" }'
  };
  const objectProto = {
    toString: "function toString() { [native code] }"
  };

  // Examples used by the Examples & Timeline tabs
  const examples = [
    {
      title: 'Browser DOM Elements',
      description: 'DOM elements inherit common methods via a deep prototype chain.',
      code: `// Example (conceptual)
const el = document.createElement('div');
console.log(typeof el.addEventListener); // 'function' (from Element.prototype)`,
      timeline: ['Element instance', 'Element.prototype', 'Node.prototype', 'EventTarget.prototype', 'Object.prototype']
    },
    {
      title: 'Arrays',
      description: 'Array instances inherit methods like map/filter from Array.prototype.',
      code: `const a = [1,2,3];
console.log(a.map(x=>x*2)); // [2,4,6]`,
      timeline: ['Array instance', 'Array.prototype', 'Object.prototype']
    },
    {
      title: 'Express req/res',
      description: 'Request/response objects layer behaviour through prototypes for middleware support.',
      code: `// Simplified idea
app.use((req,res,next)=>{
  // req inherits from IncomingMessage prototype
  next();
});`,
      timeline: ['req instance', 'http.IncomingMessage.prototype', 'Object.prototype']
    },
    {
      title: 'React internals',
      description: 'React uses prototype-like patterns for pooled objects and internals (conceptual).',
      code: `// internal pools (conceptual)
// pooledEvent.__proto__ -> SyntheticEvent.prototype`,
      timeline: ['object', 'SyntheticEvent.prototype', 'Object.prototype']
    },
    {
      title: 'Game entities',
      description: 'Entities share behavior through prototypes for performance and memory efficiency.',
      code: `function Entity(){}
Entity.prototype.move = function(){ /* ... */ }
function Player(){ Entity.call(this) }
Player.prototype = Object.create(Entity.prototype)`,
      timeline: ['Player instance', 'Player.prototype', 'Entity.prototype', 'Object.prototype']
    }
  ];

  // Comparison table rows
  const comparisonRows = [
    { feature: 'Inheritance model', proto: 'Object → prototype chain', class: 'Class-based (syntactic sugar in JS)' },
    { feature: 'Dynamic updates', proto: 'Yes — modify prototype at runtime', class: 'Possible but less idiomatic' },
    { feature: 'Memory', proto: 'Methods shared on prototype', class: 'Methods often on prototype too (ES6 classes)' },
    { feature: 'Clarity', proto: 'Can be less intuitive', class: 'Often clearer for OOP users' }
  ];

  // Helper: label for node id
  const labelFor = id => ({
    instance: "Object Instance",
    proto: "Person.prototype",
    objproto: "Object.prototype",
    null: "null"
  }[id]);

  const protoChainInspector = {
    instance,
    __proto__: personProto,
    __proto2__: objectProto,
    __proto3__: null
  };

  // Lookup animation
  function startLookupAnimation() {
    setAnimStep(-1);
    let step = -1;
    const interval = setInterval(() => {
      step++;
      setAnimStep(step);
      if (step >= order.length - 1) {
        clearInterval(interval);
        setTimeout(() => setAnimStep(-1), 700);
      }
    }, 700);
  }

  // Simple drag swapping
  function onPointerDown(e, id) {
    dragState.current.dragging = id;
    dragState.current.startX = e.clientX;
    dragState.current.startY = e.clientY;
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }
  function onPointerMove(e) {
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 60 && dragState.current.dragging) {
      const from = order.indexOf(dragState.current.dragging);
      const to = dx > 0 ? Math.min(order.length - 1, from + 1) : Math.max(0, from - 1);
      if (to !== from) {
        const newOrder = [...order];
        newOrder.splice(from, 1);
        newOrder.splice(to, 0, dragState.current.dragging);
        setOrder(newOrder);
        dragState.current.startX = e.clientX;
      }
    }
  }
  function onPointerUp() {
    dragState.current.dragging = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }

  // Run code in sandboxed iframe (escape newlines correctly)
  function runSandbox(code = sandboxCode) {
    // sanitize code simple wrapper
    const html = `<!doctype html><html><body><pre id="out"></pre><script>console.log = function(){ var out=document.getElementById('out'); for(var i=0;i<arguments.length;i++){ out.textContent += arguments[i] + ' '; } out.textContent += "\n"; }
try{
${code}
}catch(e){console.log('Error:', e && e.message)}<\/script></body></html>`;
    if (iframeRef.current) iframeRef.current.srcdoc = html;
  }

  // Helper used by "Try it now" buttons
  function runInSandbox(code) {
    setSandboxCode(code);
    // small timeout to ensure state update if needed, then run
    setTimeout(() => runSandbox(code), 40);
  }

  useEffect(() => { runSandbox(); /* initial run */ }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-8 flex gap-6">
      {/* Left sidebar tabs */}
      <aside className="w-56 flex-shrink-0">
        <div className="flex flex-col gap-3">
          {[{label:'Visualizer',icon:<Sparkles/>},{label:'Examples',icon:<Layers/>},{label:'Comparison',icon:<ChevronRight/>},{label:'Timeline',icon:<Wand2/>}].map(t => (
            <button
              key={t.label}
              onClick={() => setActiveTab(t.label)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all text-left ${activeTab===t.label?'bg-blue-600 text-white':'bg-white/10 text-white/80'}`}
            >
              <span className="w-6">{t.icon}</span>
              <span className="font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main content area (slides between tabs) */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'Visualizer' && (
            <motion.div key="viz" initial={{x:50,opacity:0}} animate={{x:0,opacity:1}} exit={{x:-50,opacity:0}}>
              {/* Visualizer header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-3"><Sparkles className="text-yellow-400"/> Prototypal Inheritance Visualizer</h1>
                <div className="flex gap-2">
                  <button onClick={()=>setViewer('chain')} className={`px-3 py-1 rounded border ${viewer==='chain'?'border-cyan-400':''}`}>Chain</button>
                  <button onClick={()=>setViewer('edit')} className={`px-3 py-1 rounded border ${viewer==='edit'?'border-cyan-400':''}`}>Edit</button>
                  <button onClick={()=>setViewer('inspect')} className={`px-3 py-1 rounded border ${viewer==='inspect'?'border-cyan-400':''}`}>Inspector</button>
                  <button onClick={()=>setViewer('class')} className={`px-3 py-1 rounded border ${viewer==='class'?'border-cyan-400':''}`}>Class</button>
                </div>
              </div>

              <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
                <AnimatePresence mode="wait">
                  {viewer === 'chain' && (
                    <motion.section key="chain" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col gap-6">
                      <div className="flex items-center gap-6">
                        {order.map((id, idx) => (
                          <div key={id} className="flex items-center gap-3">
                            {idx>0 && <ChevronLeft size={28} className={`text-gray-400 ${animStep===idx-1?'animate-pulse':''}`}/>} 

                            <motion.div
                              ref={dragRef}
                              onPointerDown={(e)=>onPointerDown(e,id)}
                              animate={animStep===idx ? { scale:1.08, boxShadow: '0 0 30px rgba(34,197,94,0.6)' } : { scale:1 }}
                              transition={{ type:'spring', stiffness: 300 }}
                              className={`relative cursor-grab select-none rounded-2xl px-6 py-5 text-center min-w-[160px] shadow-2xl bg-gradient-to-br ${id==='instance'?'from-purple-500 to-indigo-500':id==='proto'?'from-indigo-500 to-blue-500':id==='objproto'?'from-blue-500 to-cyan-500':'from-slate-700 to-gray-900'}`}
                              style={{border: animStep===idx ? '2px solid rgba(255,255,255,0.9)' : '2px solid transparent'}}
                            >
                              <div className="flex items-center justify-center gap-2">
                                <Move size={16}/>
                                <div className="font-semibold text-lg">{labelFor(id)}</div>
                              </div>

                              <motion.span
                                aria-hidden
                                animate={animStep===idx?{opacity:[0,1,0.6,1]}:{opacity:0}}
                                transition={{ duration: 0.9, repeat: animStep===idx?Infinity:0 }}
                                className="absolute -inset-1 rounded-2xl pointer-events-none"
                                style={{boxShadow: animStep===idx? '0 0 40px rgba(34,197,94,0.25)' : 'none'}}
                              />
                            </motion.div>

                            {idx < order.length -1 && <ChevronRight size={28} className={`text-gray-400 ${animStep===idx?'animate-pulse':''}`}/>} 
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3 items-center mt-6">
                        <input value={lookupProp} onChange={e=>setLookupProp(e.target.value)} className="px-3 py-2 rounded bg-slate-800 border border-slate-700" placeholder="property to lookup" />
                        <button onClick={startLookupAnimation} className="px-4 py-2 bg-emerald-600 rounded-md flex items-center gap-2"><Wand2/>Animate Lookup</button>
                      </div>

                      <div className="w-full mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                          <h4 className="font-semibold mb-2">Lookup Steps</h4>
                          <ol className="text-gray-300 list-decimal list-inside">
                            {order.map((id, i) => (
                              <li key={id} className={animStep>=i? 'text-white': 'text-gray-500'}>{labelFor(id)}.{lookupProp}</li>
                            ))}
                          </ol>
                        </div>

                        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                          <h4 className="font-semibold mb-2">Instructions</h4>
                          <p className="text-gray-300">Drag any node left or right to reorder the prototype chain. Click "Animate Lookup" to see which node is active (glow + pulse).</p>
                        </div>
                      </div>
                    </motion.section>
                  )}

                  {viewer==='edit' && (
                    <motion.section key="edit" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="grid grid-cols-2 gap-6">
                      <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
                        <h3 className="font-semibold mb-3 flex items-center gap-2"><Edit/> Live Editable Object</h3>
                        <div className="flex flex-col gap-3">
                          {Object.entries(instance).map(([k,v])=> (
                            <div key={k} className="flex gap-3">
                              <input value={k} disabled className="px-3 py-2 bg-slate-900 rounded border border-slate-700 w-32"/>
                              <input value={v} onChange={e=>setInstance(prev=>({...prev,[k]:e.target.value}))} className="px-3 py-2 bg-slate-900 rounded border border-slate-700 flex-1"/>
                            </div>
                          ))}
                          <div className="mt-3">
                            <button onClick={()=>{ setInstance(prev=>({...prev, age: '30'})) }} className="px-3 py-2 rounded bg-cyan-600">Add sample prop</button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 flex flex-col gap-3">
                        <h3 className="font-semibold mb-2">JS Execution Sandbox</h3>
                        <textarea value={sandboxCode} onChange={e=>setSandboxCode(e.target.value)} className="h-40 bg-slate-900 rounded p-3 text-sm font-mono border border-slate-700" />
                        <div className="flex gap-2">
                          <button onClick={()=>runSandbox()} className="px-3 py-2 rounded bg-emerald-600">Run</button>
                          <button onClick={()=>{ setSandboxCode(`function Person(name){this.name=name}
Person.prototype.sayHello=function(){return 'Hello '+this.name}
const u=new Person('UI')
console.log(u.sayHello())`); }} className="px-3 py-2 rounded border">Reset</button>
                        </div>
                        <iframe ref={iframeRef} title="sandbox" className="mt-2 bg-white h-40 w-full rounded" sandbox="allow-scripts" />
                      </div>
                    </motion.section>
                  )}

                  {viewer==='inspect' && (
                    <motion.section key="inspect" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
                      <h3 className="font-semibold mb-3 flex items-center gap-2"><Layers/> __proto__ Inspector</h3>
                      <pre className="text-sm text-gray-200 p-3 rounded bg-slate-900 border border-slate-700">{JSON.stringify(protoChainInspector, null, 2)}</pre>
                    </motion.section>
                  )}

                  {viewer==='class' && (
                    <motion.section key="class" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
                      <h3 className="font-semibold mb-3 flex items-center gap-2"><Code2/> ES6 Class Version</h3>
                      <pre className="text-sm text-gray-200 p-3 rounded bg-slate-900 border border-slate-700">{`class Person {
  constructor(name){ this.name=name }
  sayHello(){ return 'Hello '+this.name }
}
const u = new Person('UI')
console.log(u.sayHello())`}</pre>
                    </motion.section>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {activeTab === 'Examples' && (
            <motion.div key="examples" initial={{x:50,opacity:0}} animate={{x:0,opacity:1}} exit={{x:-50,opacity:0}}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {examples.map((ex, idx) => (
                  <motion.div whileHover={{scale:1.03}} key={idx} className="p-6 bg-white/5 rounded-2xl shadow-lg">
                    <h3 className="font-bold text-xl mb-2">{ex.title}</h3>
                    <p className="mb-4 opacity-80 text-sm">{ex.description}</p>
                    <pre className="bg-black/40 text-white p-4 rounded-lg text-xs whitespace-pre-wrap">{ex.code}</pre>
                    <div className="flex gap-2 mt-3">
                      <button onClick={()=>runInSandbox(ex.code)} className="px-3 py-2 rounded bg-emerald-600">Try it now</button>
                      <button onClick={()=>{ setSandboxCode(ex.code); setActiveTab('Visualizer'); setViewer('edit'); setTimeout(()=>runSandbox(),40); }} className="px-3 py-2 rounded border">Open in Visualizer</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'Comparison' && (
            <motion.div key="compare" initial={{x:50,opacity:0}} animate={{x:0,opacity:1}} exit={{x:-50,opacity:0}}>
              <div className="overflow-x-auto bg-white/5 p-6 rounded-2xl shadow-xl">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="p-3 bg-blue-500/30 rounded-l-xl">Feature</th>
                      <th className="p-3 bg-blue-500/30">Prototypal</th>
                      <th className="p-3 bg-blue-500/30 rounded-r-xl">Class-based</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, idx) => (
                      <tr key={idx} className="border-b border-white/10">
                        <td className="p-3 font-semibold">{row.feature}</td>
                        <td className="p-3">{row.proto}</td>
                        <td className="p-3">{row.class}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'Timeline' && (
            <motion.div key="timeline" initial={{x:50,opacity:0}} animate={{x:0,opacity:1}} exit={{x:-50,opacity:0}}>
              <div className="flex flex-col gap-4">
                {examples.map((ex, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-2xl shadow-md">
                    <h3 className="text-lg font-bold mb-2">{ex.title}</h3>
                    <motion.div className="flex items-center gap-3" initial={{opacity:0}} animate={{opacity:1}}>
                      {ex.timeline.map((step, stepIdx) => (
                        <motion.div key={stepIdx} className="px-3 py-2 bg-blue-600/30 rounded-xl text-white text-sm" animate={{scale: [1, 1.05, 1]}} transition={{duration: 0.9, repeat: Infinity, delay: stepIdx * 0.15}}>
                          {step}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
