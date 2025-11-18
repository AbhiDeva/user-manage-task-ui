import React, { useState } from 'react';
//import { Button } from '@headlessui/react';

export default function TransferListVisualizer() {
  const initialLeft = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  const initialRight = ['Item 5', 'Item 6', 'Item 7', 'Item 8'];

  const [leftList, setLeftList] = useState(initialLeft);
  const [rightList, setRightList] = useState(initialRight);
  const [leftSelected, setLeftSelected] = useState([]);
  const [rightSelected, setRightSelected] = useState([]);

  const toggleSelect = (item, list, setList) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const moveSelected = (from, to, selected, setFrom, setTo, setSelected) => {
    const itemsToMove = from.filter(item => selected.includes(item));
    setTo(prev => [...prev, ...itemsToMove]);
    setFrom(prev => prev.filter(item => !selected.includes(item)));
    setSelected([]);
  };

  const moveAll = (from, to, setFrom, setTo, setSelected) => {
    setTo(prev => [...prev, ...from]);
    setFrom([]);
    setSelected([]);
  };

  const renderList = (items, selected, setSelected) => (
    <div className="border rounded p-2 h-48 overflow-auto w-40">
      {items.map(item => (
        <label key={item} className="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            checked={selected.includes(item)}
            onChange={() => toggleSelect(item, selected, setSelected)}
          />
          {item}
        </label>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left: Description 40% */}
      <div className="w-4/10 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Transfer List Visualizer</h2>
        <p className="mb-3 text-gray-700">Move items between two lists using buttons. Select items with checkboxes or transfer all.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Select items using checkboxes.</li>
          <li>Single arrow: moves selected items.</li>
          <li>Double arrow: moves all items.</li>
          <li>Selection state preserved after transfer.</li>
          <li>Buttons are disabled if no items to move.</li>
        </ul>
      </div>

      {/* Center: Code Editor 30% */}
      {/* <div className="w-3/10 flex flex-col border-r p-2">
        <pre className="bg-gray-100 p-2 h-full overflow-auto">
          {`// Code representation goes here, for Sandpack replace with actual files`}
        </pre>
      </div> */}

      {/* Right: Output 30% */}
      <div className="w-3/10 p-6 flex flex-col items-center justify-center gap-4">
        <div className="flex gap-4">
          {renderList(leftList, leftSelected, setLeftSelected)}
          <div className="flex flex-col justify-center gap-2">
            <button
              onClick={() => moveAll(leftList, rightList, setLeftList, setRightList, setLeftSelected)}
              disabled={leftList.length === 0}
              className="px-2 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
            >{'>>'}</button>
            <button
              onClick={() => moveSelected(leftList, rightList, leftSelected, setLeftList, setRightList, setLeftSelected)}
              disabled={leftSelected.length === 0}
              className="px-2 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
            >{'>'}</button>
            <button
              onClick={() => moveSelected(rightList, leftList, rightSelected, setRightList, setLeftList, setRightSelected)}
              disabled={rightSelected.length === 0}
              className="px-2 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
            >{'<'}</button>
            <button
              onClick={() => moveAll(rightList, leftList, setRightList, setLeftList, setRightSelected)}
              disabled={rightList.length === 0}
              className="px-2 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
            >{'<<'}</button>
          </div>
          {renderList(rightList, rightSelected, setRightSelected)}
        </div>
      </div>
    </div>
  );
}