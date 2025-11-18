import React, { useState } from 'react';

export default function MultiSelectDropdown() {
  const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter(o => o !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  const clearAll = () => setSelected([]);

  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left 40% Explanation */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Multi-Select Dropdown with Clear</h2>
        <p className="mb-3 text-gray-700">Allows users to select multiple options from a dropdown and provides buttons to clear selections.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Click on the dropdown to see options</li>
          <li>Click on an option to toggle selection</li>
          <li>Selected items are displayed in the input area</li>
          <li>Multiple selections are possible</li>
          <li>Clear button clears all selected options</li>
        </ul>
      </div>

      {/* Center 30% Code Editor */}
      <div className="w-3/10 flex flex-col border-r p-2 overflow-auto">
        <pre className="bg-gray-100 p-2 h-full">
{`const options = ['Apple','Banana','Cherry'];
const [selected, setSelected] = useState([]);
const [open, setOpen] = useState(false);

const toggleOption = (option) => {
  if (selected.includes(option)) {
    setSelected(selected.filter(o => o !== option));
  } else {
    setSelected([...selected, option]);
  }
};

const clearAll = () => setSelected([]);`}</pre>
      </div>

      {/* Right 30% Output */}
      <div className="w-3/10 p-6">
        <h3 className="font-bold mb-2">Dropdown</h3>
        <div className="relative">
          <div
            className="border rounded p-2 cursor-pointer bg-white"
            onClick={() => setOpen(!open)}
          >
            {selected.length ? selected.join(', ') : 'Select options'}
          </div>
          {open && (
            <div className="absolute mt-1 border rounded bg-white w-full z-10">
              {options.map((option, idx) => (
                <div
                  key={idx}
                  className={`p-2 cursor-pointer hover:bg-gray-200 ${selected.includes(option) ? 'bg-gray-300' : ''}`}
                  onClick={() => toggleOption(option)}
                >
                  {option}
                </div>
              ))}
              <div className="flex justify-between p-2 border-t">
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={clearAll}>Clear All</button>
                <button className="bg-gray-300 text-black px-2 py-1 rounded" onClick={() => setOpen(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}