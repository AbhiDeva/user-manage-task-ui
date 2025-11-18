import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer } from '@codesandbox/sandpack-react';

function StarRating({ maxStars = 5, initialRating = 0 }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => (
        <FaStar
          key={star}
          size={24}
          className={`cursor-pointer transition-colors ${
            (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-400'
          }`}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
}

export default function StarRatingVisualizer() {
  const sandpackFiles = {
    '/StarRating.js': `import React from 'react';\nfunction StarRating(props) { /* implementation */ }\nexport default StarRating;`
  };

  return (
    <div className="flex h-screen">
      {/* Left: Description 40% */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Star Rating Visualizer</h2>
        <p className="mb-3 text-gray-700">Interactive star rating widget with hover and click states.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Maximum number of stars configurable.</li>
          <li>Click a star to set the rating.</li>
          <li>Hovering shows temporary highlight.</li>
          <li>Multiple instances can coexist.</li>
        </ul>
      </div>

      {/* Center: Code Editor 30% */}
      <div className="w-3/10 flex flex-col border-r">
        <SandpackProvider template="react" files={sandpackFiles} options={{ showNavigator: true, showConsole: true }}>
          <SandpackFileExplorer />
          <SandpackCodeEditor />
        </SandpackProvider>
      </div>

      {/* Right: Output 30% */}
      <div className="w-3/10 p-6 overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Live Output</h2>
        <div className="mb-4">
          <p className="mb-2">Rating 1:</p>
          <StarRating maxStars={5} initialRating={2} />
        </div>
        <div>
          <p className="mb-2">Rating 2:</p>
          <StarRating maxStars={10} initialRating={2.5} />
        </div>
      </div>
    </div>
  );
}