import React, { useState } from 'react';

const images = [
  'https://via.placeholder.com/600x400/ff7f7f/333333?text=1',
  'https://via.placeholder.com/600x400/7fbfff/333333?text=2',
  'https://via.placeholder.com/600x400/7fff7f/333333?text=3',
  'https://via.placeholder.com/600x400/ffff7f/333333?text=4',
];

export default function ImageCarouselVisualizer() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  const nextImage = () => setCurrentIndex((currentIndex + 1) % images.length);
  const jumpTo = (index) => setCurrentIndex(index);

  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left 40% Description */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Image Carousel Visualizer</h2>
        <p className="mb-3 text-gray-700">Displays a sequence of images with navigation buttons and page indicators.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Only one image in the DOM at any time.</li>
          <li>Left/right buttons cycle through images.</li>
          <li>Page buttons allow jumping to a specific image.</li>
          <li>Carousel resizes responsively to fit screen.</li>
          <li>Max size: 600px by 400px; black background fills empty space.</li>
        </ul>
      </div>

      {/* Center 30% Code Editor placeholder */}
      {/* <div className="w-3/10 flex flex-col border-r p-2">
        <pre className="bg-gray-100 p-2 h-full overflow-auto">
          {'// Code representation goes here, replace with actual Sandpack files for live editor'}
        </pre>
      </div> */}

      {/* Right 30% Output */}
      <div className="w-3/10 p-6 flex flex-col items-center justify-center gap-4 bg-black rounded-lg">
        <div className="relative w-full h-50 flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >{'<'}</button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >{'>'}</button>
        </div>
        <div className="flex gap-2 mt-4 mb-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpTo(idx)}
              className={`px-2 py-1 rounded ${idx === currentIndex ? 'bg-blue-600 text-white' : 'bg-gray-400 text-black'}`}
            >{idx + 1}</button>
          ))}
        </div>
      </div>
    </div>
  );
}