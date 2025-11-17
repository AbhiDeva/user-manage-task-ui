import React, { useEffect, useRef, useState } from "react";

const HEADERS = ["First Name", "Last Name", "Email"];

export default function ResizableTableUIVisualizer() {
  const tableRef = useRef(null);
  const wrapperRef = useRef(null);
  const ghostLineRef = useRef(null);

  // widths persisted to localStorage
  const [colWidths, setColWidths] = useState(() => {
    try {
      const saved = localStorage.getItem("colWidths");
      return saved ? JSON.parse(saved) : [200, 200, 300];
    } catch {
      return [200, 200, 300];
    }
  });

  // row heights
  const [rowHeights, setRowHeights] = useState([50, 50]);

  // dragging refs (so event handlers always read latest without re-binding)
  const dragging = useRef({ active: false, colIndex: -1, startX: 0, startW: 0 });
  const rowDragging = useRef({ active: false, rowIndex: -1, startY: 0, startH: 0 });

  // persist widths
  useEffect(() => {
    try {
      localStorage.setItem("colWidths", JSON.stringify(colWidths));
    } catch {}
  }, [colWidths]);

  // mouse move/up handlers attached once
  useEffect(() => {
    const onMouseMove = (e) => {
      if (dragging.current.active) {
        const { startX, startW, colIndex } = dragging.current;
        const dx = e.clientX - startX;
        // snap to 10px grid
        const snapped = Math.round((startW + dx) / 10) * 10;
        const newW = Math.max(60, snapped);
        setColWidths((prev) => {
          const copy = [...prev];
          copy[colIndex] = newW;
          return copy;
        });

        // show ghost line
        if (ghostLineRef.current && wrapperRef.current) {
          const rect = wrapperRef.current.getBoundingClientRect();
          ghostLineRef.current.style.left = `${e.clientX - rect.left}px`;
          ghostLineRef.current.style.display = "block";
        }
      }

      if (rowDragging.current.active) {
        const { startY, startH, rowIndex } = rowDragging.current;
        const dy = e.clientY - startY;
        const newH = Math.max(24, startH + dy);
        setRowHeights((prev) => {
          const copy = [...prev];
          copy[rowIndex] = newH;
          return copy;
        });
      }
    };

    const onMouseUp = () => {
      if (dragging.current.active) {
        dragging.current.active = false;
        if (ghostLineRef.current) ghostLineRef.current.style.display = "none";
      }
      if (rowDragging.current.active) {
        rowDragging.current.active = false;
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // start column drag
  const handleColMouseDown = (e, index) => {
    e.preventDefault();
    const colEl = tableRef.current.querySelectorAll("col")[index];
    const startW = colEl.getBoundingClientRect().width;
    const startX = e.clientX;
    dragging.current = { active: true, colIndex: index, startX, startW };

    // position ghost relative to wrapper
    if (ghostLineRef.current && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      ghostLineRef.current.style.left = `${e.clientX - rect.left}px`;
      ghostLineRef.current.style.display = "block";
    }
  };

  // start row drag
  const handleRowMouseDown = (e, rowIndex) => {
    e.preventDefault();
    const tr = e.currentTarget.parentElement;
    const startH = tr.getBoundingClientRect().height;
    rowDragging.current = { active: true, rowIndex, startY: e.clientY, startH };
  };

  // drag-to-reorder columns (simple visual swap on drop)
  const dragColIndex = useRef(null);
  const handleColDragStart = (e, idx) => {
    dragColIndex.current = idx;
    e.dataTransfer.effectAllowed = "move";
  };
  const handleColDrop = (e, idx) => {
    e.preventDefault();
    const from = dragColIndex.current;
    const to = idx;
    if (from === null || from === to) return;
    // swap widths and header order
    setColWidths((prev) => {
      const copy = [...prev];
      const tmp = copy[from];
      copy.splice(from, 1);
      copy.splice(to, 0, tmp);
      return copy;
    });
    dragColIndex.current = null;
  };
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Enhanced Resizable Table UI Visualiser</h2>

      <div ref={wrapperRef} className="overflow-auto border rounded-lg shadow-md bg-white relative" style={{ padding: 8 }}>
        <div ref={ghostLineRef} className="ghost-line" style={{ display: "none" }} />

        <table ref={tableRef} className="w-full table-fixed border-collapse" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            {colWidths.map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>

          <thead>
            <tr className="bg-gray-100">
              {HEADERS.map((h, i) => (
                <th
                  key={i}
                  className="relative p-3 font-semibold border-b"
                  draggable
                  onDragStart={(e) => handleColDragStart(e, i)}
                  onDrop={(e) => handleColDrop(e, i)}
                  onDragOver={handleDragOver}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ flex: 1 }}>{h}</span>
                    <span style={{ fontSize: 12, padding: '2px 6px', background: '#f0f0f0', borderRadius: 6 }}>
                      {colWidths[i]}px
                    </span>
                  </div>

                  {/* resizer handle (visible) */}
                  <div
                    className="resizer"
                    onMouseDown={(e) => handleColMouseDown(e, i)}
                    title={`Drag to resize ${h}`}
                    style={{ zIndex: 5 }}
                  ></div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[0, 1].map((row, ri) => (
              <tr key={ri} style={{ height: rowHeights[ri], transition: 'height 120ms' }}>
                <td className="p-3 border-b relative">
                  Row {ri + 1} - A
                  <div
                    className="row-resizer"
                    onMouseDown={(e) => handleRowMouseDown(e, ri)}
                    title="Drag to resize row"
                  ></div>
                </td>
                <td className="p-3 border-b">Row {ri + 1} - B</td>
                <td className="p-3 border-b">Row {ri + 1} - C</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>
        {`
        th, td {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        th { position: relative; }
        .resizer {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 12px;
          cursor: col-resize;
          user-select: none;
        }
        .resizer::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 18%;
          bottom: 18%;
          width: 2px;
          background: rgba(0,0,0,0.15);
          transform: translateX(-50%);
        }
        .ghost-line {
          position: absolute;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: #00aaff;
          z-index: 50;
          pointer-events: none;
        }
        .row-resizer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 8px;
          cursor: row-resize;
        }
        `}
      </style>
    </div>
  );
}