import React, { useState } from "react";
import { motion } from "framer-motion";
//import { PlusCircle, Trash2, Code } from "lucide-react";
import {
  MdAddCircle,
  MdDelete,
  MdCode
} from "react-icons/md";

// FLEXBOX VISUALISER
// Single-file React component. Uses Tailwind for styling (no imports needed) and Framer Motion for subtle animations.
// Features:
// - Interactive controls for container + item-level flex properties
// - Add / remove flex items
// - Live computed CSS snippet you can copy
// - Step-by-step explanation panel showing how each flex property works
// - Responsive preview and small animations

export default function FlexboxVisualizer() {
  // container state
  const [direction, setDirection] = useState("row");
  const [wrap, setWrap] = useState("nowrap");
  const [justify, setJustify] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [alignContent, setAlignContent] = useState("stretch");
  const [gap, setGap] = useState(12);

  // items state — array of objects
  const [items, setItems] = useState([
    { id: 1, label: "Item 1", order: 0, grow: 0, shrink: 1, basis: "auto", alignSelf: "auto" },
    { id: 2, label: "Item 2", order: 0, grow: 1, shrink: 1, basis: "100px", alignSelf: "auto" },
    { id: 3, label: "Item 3", order: 0, grow: 2, shrink: 1, basis: "80px", alignSelf: "auto" },
  ]);

  const addItem = () => {
    const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems([...items, { id: nextId, label: `Item ${nextId}`, order: 0, grow: 0, shrink: 1, basis: "auto", alignSelf: "auto" }]);
  };

  const removeItem = (id) => setItems(items.filter(i => i.id !== id));

  const updateItem = (id, field, value) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const containerStyle = {
    display: "flex",
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems: alignItems,
    alignContent: alignContent,
    gap: `${gap}px`,
    minHeight: "220px",
    borderRadius: "12px",
    padding: "16px",
  };

  const containerCssText = `display: flex;\nflex-direction: ${direction};\nflex-wrap: ${wrap};\njustify-content: ${justify};\nalign-items: ${alignItems};\nalign-content: ${alignContent};\ngap: ${gap}px;`;

  // EXPLANATION STEPS — concise friendly descriptions
  const steps = [
    {
      title: "1 — Flex Container",
      text: "Any element with `display: flex` becomes a flex container. Its direct children are flex items and will follow flexbox layout rules.",
    },
    {
      title: "2 — Main axis & Cross axis",
      text: "`flex-direction` sets the main axis (row = horizontal, column = vertical). Cross axis is perpendicular and affects `align-items`.",
    },
    {
      title: "3 — Wrapping",
      text: "`flex-wrap` controls whether items can move to the next line when they overflow the container. Values: `nowrap`, `wrap`, `wrap-reverse`.",
    },
    {
      title: "4 — Justify-content",
      text: "Controls distribution of items along the main axis (start, center, end, space-between, space-around, space-evenly).",
    },
    {
      title: "5 — Align-items and align-self",
      text: "`align-items` sets alignment for all items on the cross axis. `align-self` on an item overrides `align-items` for that item.",
    },
    {
      title: "6 — Flex grow / shrink / basis",
      text: "`flex: grow shrink basis` controls how items expand/shrink. Grow > 0 makes item absorb extra space; shrink > 0 allows it to shrink when not enough space.",
    },
    {
      title: "7 — Order",
      text: "`order` changes the visual order of items without moving DOM nodes. Lower order values come first.",
    },
  ];

  return (
    <div className="p-6 space-y-6 font-sans">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">CSS Flexbox Visualiser</h1>
          <p className="text-sm text-muted-foreground">Interactive step-by-step visual explanation of Flexbox behavior</p>
        </div>
        <div className="flex gap-3 items-center">
          <button className="btn px-3 py-1 rounded-md border bg-white shadow-sm flex items-center gap-2">
            <MdCode size={16} /> Export CSS
          </button>
        </div>
      </header>

      <main className="grid grid-cols-12 gap-6">
        {/* LEFT: Controls */}
        <section className="col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow">
            <h2 className="font-semibold mb-3">Container Controls</h2>
            <label className="block text-sm">flex-direction</label>
            <select value={direction} onChange={(e) => setDirection(e.target.value)} className="w-full rounded-md p-2 mt-1 border">
              <option value="row">row (main axis → horizontal)</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column (main axis → vertical)</option>
              <option value="column-reverse">column-reverse</option>
            </select>

            <label className="block text-sm mt-3">flex-wrap</label>
            <select value={wrap} onChange={(e) => setWrap(e.target.value)} className="w-full rounded-md p-2 mt-1 border">
              <option value="nowrap">nowrap</option>
              <option value="wrap">wrap</option>
              <option value="wrap-reverse">wrap-reverse</option>
            </select>

            <label className="block text-sm mt-3">justify-content</label>
            <select value={justify} onChange={(e) => setJustify(e.target.value)} className="w-full rounded-md p-2 mt-1 border">
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>

            <label className="block text-sm mt-3">align-items</label>
            <select value={alignItems} onChange={(e) => setAlignItems(e.target.value)} className="w-full rounded-md p-2 mt-1 border">
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="baseline">baseline</option>
            </select>

            <label className="block text-sm mt-3">align-content (multi-line)</label>
            <select value={alignContent} onChange={(e) => setAlignContent(e.target.value)} className="w-full rounded-md p-2 mt-1 border">
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
            </select>

            <label className="block text-sm mt-3">gap (px)</label>
            <input type="range" min={0} max={48} value={gap} onChange={(e) => setGap(Number(e.target.value))} />
            <div className="text-xs text-muted-foreground mt-1">{gap}px</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Flex Items</h3>
              <div className="flex items-center gap-2">
                <button onClick={addItem} className="flex items-center gap-2 px-3 py-1 rounded-md border bg-green-50">
                  <MdAddCircle size={16} /> Add
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-72 overflow-auto">
              {items.map(item => (
                <div key={item.id} className="border rounded-md p-2">
                  <div className="flex items-center justify-between">
                    <strong>{item.label}</strong>
                    <div className="flex items-center gap-2">
                      <button onClick={() => removeItem(item.id)} className="p-1 rounded hover:bg-red-50">
                        <MdDelete size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <label className="block">
                      order
                      <input type="number" value={item.order} onChange={(e) => updateItem(item.id, 'order', Number(e.target.value))} className="w-full p-1 mt-1 border rounded" />
                    </label>

                    <label className="block">
                      align-self
                      <select value={item.alignSelf} onChange={(e) => updateItem(item.id, 'alignSelf', e.target.value)} className="w-full p-1 mt-1 border rounded">
                        <option value="auto">auto</option>
                        <option value="flex-start">flex-start</option>
                        <option value="center">center</option>
                        <option value="flex-end">flex-end</option>
                        <option value="baseline">baseline</option>
                        <option value="stretch">stretch</option>
                      </select>
                    </label>

                    <label className="block">
                      grow
                      <input type="number" min={0} value={item.grow} onChange={(e) => updateItem(item.id, 'grow', Number(e.target.value))} className="w-full p-1 mt-1 border rounded" />
                    </label>

                    <label className="block">
                      basis
                      <input value={item.basis} onChange={(e) => updateItem(item.id, 'basis', e.target.value)} className="w-full p-1 mt-1 border rounded" />
                    </label>

                    <label className="block col-span-2">
                      shrink
                      <input type="number" min={0} value={item.shrink} onChange={(e) => updateItem(item.id, 'shrink', Number(e.target.value))} className="w-full p-1 mt-1 border rounded" />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold">Live CSS</h3>
            <pre className="text-xs mt-2 whitespace-pre-wrap bg-gray-50 p-3 rounded">{containerCssText}</pre>
            <small className="text-muted-foreground">Click Export CSS to copy this block into your stylesheet.</small>
          </div>
        </section>

        {/* MIDDLE: Preview */}
        <section className="col-span-5">
          <div className="bg-white rounded-2xl p-4 shadow flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Live Preview</h2>
              <div className="text-sm text-muted-foreground">Change controls to see instant updates</div>
            </div>

            <div className="bg-gray-50 rounded p-4" style={{ minHeight: 260 }}>
              <div style={containerStyle} className="w-full h-full bg-white">
                {items.map((it) => {
                  const itemStyle = {
                    order: it.order,
                    flexGrow: it.grow,
                    flexShrink: it.shrink,
                    flexBasis: it.basis,
                    alignSelf: it.alignSelf === 'auto' ? undefined : it.alignSelf,
                    minWidth: 40,
                    minHeight: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 12px',
                    borderRadius: 8,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.06)'
                  };

                  return (
                    <motion.div
                      key={it.id}
                      layout
                      initial={{ opacity: 0.6, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.18 }}
                      style={itemStyle}
                      className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200"
                    >
                      <div className="text-sm font-medium">{it.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded border text-xs">
                <div className="font-medium">Main axis</div>
                <div className="text-sm text-muted-foreground mt-1">{direction}</div>
              </div>

              <div className="p-3 rounded border text-xs">
                <div className="font-medium">Cross axis / align-items</div>
                <div className="text-sm text-muted-foreground mt-1">{alignItems}</div>
              </div>

              <div className="p-3 rounded border text-xs">
                <div className="font-medium">Wrap</div>
                <div className="text-sm text-muted-foreground mt-1">{wrap}</div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: Steps & theory */}
        <aside className="col-span-3 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow max-h-[520px] overflow-auto">
            <h3 className="font-semibold mb-3">Step-by-step Explanation</h3>
            <div className="space-y-3">
              {steps.map((s, idx) => (
                <div key={idx} className="p-3 border rounded">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center font-semibold">{idx + 1}</div>
                    <div>
                      <div className="font-medium">{s.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{s.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold mb-2">Tips & Common Patterns</h3>
            <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
              <li>Use `flex: 1` on items that should share remaining space.</li>
              <li>Set `min-width` on items when using wrap to keep items readable.</li>
              <li>Use `order` for visual rearrangement without changing DOM order (accessibility caution).</li>
              <li>Combine `align-items: center` with `justify-content: center` to perfectly center content.</li>
            </ul>
          </div>
        </aside>
      </main>

      <footer className="text-xs text-muted-foreground">Built with ❤️ for learning — tweak controls and watch how items react in real time.</footer>
    </div>
  );
}
