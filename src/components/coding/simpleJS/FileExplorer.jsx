import React, { useState } from 'react';

// Sample file structure
const fileData = [
  { id: 1, name: 'src', type: 'directory', children: [
    { id: 2, name: 'components', type: 'directory', children: [
      { id: 3, name: 'App.js', type: 'file' },
      { id: 4, name: 'Header.js', type: 'file' }
    ]},
    { id: 5, name: 'index.js', type: 'file' }
  ]},
  { id: 6, name: 'package.json', type: 'file' }
];

function FileNode({ node, level = 0 }) {
  const [expanded, setExpanded] = useState(false);

  const isDirectory = node.type === 'directory';
  const hasChildren = node.children && node.children.length > 0;

  const sortedChildren = hasChildren ? [...node.children].sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'directory' ? -1 : 1;
  }) : [];

  return (
    <div style={{ marginLeft: level * 16 }}>
      {isDirectory ? (
        <div onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          {expanded ? '📂' : '📁'} {node.name}
        </div>
      ) : (
        <div>📄 {node.name}</div>
      )}
      {isDirectory && expanded && sortedChildren.map(child => (
        <FileNode key={child.id} node={child} level={level + 1} />
      ))}
    </div>
  );
}

export default function FileTreeVisualizer() {
  return (
    <div className="p-6 border rounded-lg w-96 bg-white shadow-lg overflow-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">File Tree Visualizer</h2>
      <p className="mb-4 text-gray-700">Displays hierarchical files and directories with expandable directories.</p>
      {fileData.map(node => (
        <FileNode key={node.id} node={node} />
      ))}
    </div>
  );
}