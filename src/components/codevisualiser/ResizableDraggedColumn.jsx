import React, { useEffect, useRef, useState } from "react";

export default function ResizableDragTableUIVisualizer() {
  const tableRef = useRef(null);
  const wrapperRef = useRef(null);
  const ghostLineRef = useRef(null);

  const [headers, setHeaders] = useState(["First Name", "Last Name", "Email"]);
  const [rows, setRows] = useState([
    ["Row 1 - A", "Row 1 - B", "Row 1 - C"],
    ["Row 2 - A", "Row 2 - B", "Row 2 - C"],
  ]);

  const [colWidths, setColWidths] = useState(() => {
    try {
      const saved = localStorage.getItem("colWidths");
      return saved ? JSON.parse(saved) : [200, 200, 300];
    } catch {
      return [200, 200, 300];
    }
  });

  const [rowHeights, setRowHeights] = useState([50, 50]);

  const dragging = useRef({ active: false, colIndex: -1, startX: 0, startW: 0 });
  const rowDragging = useRef({ active: false, rowIndex: -1, startY: 0, startH: 0 });
  const dragColIndex = useRef(null);

  // persist widths
  useEffect(() => {
    try {
      localStorage.setItem("colWidths", JSON.stringify(colWidths));
    } catch {}
  }, [colWidths]);

  // global mouse handlers for resizing
  useEffect(() => {
    const onMouseMove = (e) => {
      if (dragging.current.active) {
        const { startX, startW, colIndex } = dragging.current;
        const dx = e.clientX - startX;
        const snapped = Math.round((startW + dx) / 10) * 10;
        const newW = Math.max(60, snapped);

        setColWidths((prev) => {
          const copy = [...prev];
          copy[colIndex] = newW;
          return copy;
        });

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
      dragging.current.active = false;
      rowDragging.current.active = false;
      if (ghostLineRef.current) ghostLineRef.current.style.display = "none";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const handleColMouseDown = (e, index) => {
    e.preventDefault();
    const colEl = tableRef.current.querySelectorAll("col")[index];
    dragging.current = {
      active: true,
      colIndex: index,
      startX: e.clientX,
      startW: colEl.getBoundingClientRect().width,
    };

    if (ghostLineRef.current && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      ghostLineRef.current.style.left = `${e.clientX - rect.left}px`;
      ghostLineRef.current.style.display = "block";
    }
  };

  const handleRowMouseDown = (e, rowIndex) => {
    e.preventDefault();
    const tr = e.currentTarget.parentElement;
    rowDragging.current = {
      active: true,
      rowIndex,
      startY: e.clientY,
      startH: tr.getBoundingClientRect().height,
    };
  };

  // drag-to-reorder
  const handleColDragStart = (e, idx) => {
    dragColIndex.current = idx;
    // Firefox requires setData for drag to start
    try { e.dataTransfer.setData("text/plain", String(idx)); } catch {}
    e.dataTransfer.effectAllowed = "move";
  };

  const handleColDrop = (e, idx) => {
    e.preventDefault();
    const from = dragColIndex.current !== null ? dragColIndex.current : Number(e.dataTransfer.getData("text/plain"));
    const to = idx;
    if (from === null || from === to) return;

    // reorder headers
    setHeaders((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    });

    // reorder widths
    setColWidths((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    });

    // reorder every row's cells
    setRows((prev) => prev.map((r) => {
      const copy = [...r];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    }));

    dragColIndex.current = null;
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Enhanced Resizable + Reorderable Table Visualiser</h2>

      <div ref={wrapperRef} className="overflow-auto border rounded-lg shadow-md bg-white relative" style={{ padding: 8 }}>
        <div ref={ghostLineRef} className="ghost-line" style={{ display: "none" }} />

        <table ref={tableRef} className="w-full table-fixed border-collapse" style={{ tableLayout: "fixed" }}>
          <colgroup>
            {colWidths.map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>

          <thead>
            <tr className="bg-gray-100">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="relative p-3 font-semibold border-b header-cell"
                  draggable
                  onDragStart={(e) => handleColDragStart(e, i)}
                  onDrop={(e) => handleColDrop(e, i)}
                  onDragOver={handleDragOver}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ flex: 1 }}>{h}</span>
                    <span style={{ fontSize: 12, padding: "2px 6px", background: "#f0f0f0", borderRadius: 6 }}>
                      {colWidths[i]}px
                    </span>
                  </div>

                  <div className="resizer" onMouseDown={(e) => handleColMouseDown(e, i)} title={`Drag to resize ${h}`}></div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} style={{ height: rowHeights[ri], transition: "height 120ms" }}>
                {r.map((cell, ci) => (
                  <td key={ci} className="p-3 border-b relative">
                    {cell}
                    {ci === 0 && (
                      <div className="row-resizer" onMouseDown={(e) => handleRowMouseDown(e, ri)} title="Drag to resize row"></div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        th, td { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        th { position: relative; }

        .resizer {
          position: absolute; right: 0; top: 0; height: 100%; width: 12px;
          cursor: col-resize; user-select: none; display: flex; align-items: center; justify-content: center;
        }
        .resizer::after {
          content: ''; position: absolute; left: 50%; top: 18%; bottom: 18%;
          width: 2px; background: rgba(0,0,0,0.15); transform: translateX(-50%);
        }

        /* small underline indicator when hovering header */
        .header-cell:hover::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: rgba(0,122,255,0.12);
        }

        .ghost-line {
          position: absolute; top: 8px; bottom: 8px; width: 2px; background: #00aaff; z-index: 50; pointer-events: none;
        }

        .row-resizer {
          position: absolute; bottom: 0; left: 0; right: 0; height: 8px; cursor: row-resize; background: transparent;
        }
      `}</style>
    </div>
  );
}
