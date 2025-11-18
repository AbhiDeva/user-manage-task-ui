import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const positions = ["top", "bottom", "left", "right"];
const arrowStyles = ["triangle", "circle", "diamond"];

const PopOverVisualizer = () => {
  const [position, setPosition] = useState("top");
  const [arrowStyle, setArrowStyle] = useState("triangle");
  const [showPopover, setShowPopover] = useState(false);

  // Arrow shape styles
  const arrowClasses = {
    triangle: "border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white",
    circle: "rounded-full w-4 h-4 bg-blue-500",
    diamond: "w-4 h-4 bg-blue-500 rotate-45",
  };

  // Positioning styles
  const popoverPosition = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-20 mb-20">
      <h2 className="text-xl font-semibold">PopOver Visualizer</h2>

      {/* Controls */}
      <div className="flex gap-4">
        <div>
          <label className="font-medium">Position:</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="ml-2 border px-2 py-1 rounded"
          >
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Arrow Style:</label>
          <select
            value={arrowStyle}
            onChange={(e) => setArrowStyle(e.target.value)}
            className="ml-2 border px-2 py-1 rounded"
          >
            {arrowStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Button to trigger PopOver */}
      <div className="relative">
        <button
          onClick={() => setShowPopover(!showPopover)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Hover me
        </button>

        {/* PopOver */}
        <AnimatePresence>
          {showPopover && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`absolute ${popoverPosition[position]} bg-white text-black p-3 rounded shadow-lg z-50`}
            >
              <div className="flex flex-col items-center">
                {/* Arrow */}
                <div className={`${arrowClasses[arrowStyle]} mb-1`} />
                {/* Content */}
                <div className="text-sm">
                  <p>Angular PopOver Example</p>
                  <p>Position: {position}</p>
                  <p>Arrow: {arrowStyle}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PopOverVisualizer;
