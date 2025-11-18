import React, { useState, useEffect, useRef } from 'react';

const treeData = [
  {
    id: '1',
    label: 'Fruits',
    children: [
      { id: '1-1', label: 'Apple' },
      { id: '1-2', label: 'Orange' },
      { id: '1-3', label: 'Banana' },
    ]
  },
  {
    id: '2',
    label: 'Vegetables',
    children: [
      { id: '2-1', label: 'Carrot' },
      { id: '2-2', label: 'Broccoli' }
    ]
  }
];

function CheckboxNode({ node, checkedMap, setCheckedMap }) {
  const ref = useRef();

  const isChecked = checkedMap[node.id] === true;
  const isIndeterminate = checkedMap[node.id] === 'indeterminate';

  useEffect(() => {
    if(ref.current) {
      ref.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const handleChange = (e) => {
    const value = e.target.checked;
    const updateDescendants = (n, val) => {
      setCheckedMap(prev => ({ ...prev, [n.id]: val }));
      if (n.children) n.children.forEach(child => updateDescendants(child, val));
    };
    updateDescendants(node, value);
  };

  return (
    <div className="ml-4 mt-1">
      <label className="flex items-center gap-2">
        <input type="checkbox" ref={ref} checked={isChecked} onChange={handleChange} />
        {node.label}
      </label>
      {node.children && node.children.map(child => (
        <CheckboxNode key={child.id} node={child} checkedMap={checkedMap} setCheckedMap={setCheckedMap} />
      ))}
    </div>
  );
}

export default function HierarchicalCheckboxVisualizer() {
  const [checkedMap, setCheckedMap] = useState({});

  const updateParentStates = () => {
    const traverse = (nodes) => {
      nodes.forEach(node => {
        if(node.children) {
          traverse(node.children);
          const allChecked = node.children.every(c => checkedMap[c.id] === true);
          const noneChecked = node.children.every(c => !checkedMap[c.id] || checkedMap[c.id] === false);
          setCheckedMap(prev => ({
            ...prev,
            [node.id]: allChecked ? true : noneChecked ? false : 'indeterminate'
          }));
        }
      });
    };
    traverse(treeData);
  };

  useEffect(() => {
    updateParentStates();
  }, [checkedMap]);

  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left 40% Description */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Hierarchical Checkbox Visualizer</h2>
        <p className="mb-3 text-gray-700">Checkboxes reflect parent-child relationships with indeterminate states.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Checking/unchecking a parent affects all descendants.</li>
          <li>Parents show indeterminate state if some but not all children are checked.</li>
          <li>States update automatically when children change.</li>
        </ul>
      </div>

      {/* Center 30% Code Editor placeholder */}
      {/* <div className="w-3/10 flex flex-col border-r p-2">
        <pre className="bg-gray-100 p-2 h-full overflow-auto">
          {'// Code representation goes here, replace with actual Sandpack files for live editor'}
        </pre>
      </div> */}

      {/* Right 30% Output */}
      <div className="w-3/10 p-6 overflow-auto">
        {treeData.map(node => (
          <CheckboxNode key={node.id} node={node} checkedMap={checkedMap} setCheckedMap={setCheckedMap} />
        ))}
      </div>
    </div>
  );
}