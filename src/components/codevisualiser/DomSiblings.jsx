import React, { useState } from 'react';

export default function DomSiblingsVisualizer() {
  const examples = [
    { id: 1, html: '<div><p>First</p><p>Second</p><p>Third</p></div>', description: 'Example 1: Basic div with 3 paragraphs' },
    { id: 2, html: '<ul><li>Item A</li><li>Item B</li><li>Item C</li></ul>', description: 'Example 2: List items' },
    { id: 3, html: '<div><span>Alpha</span><span>Beta</span></div>', description: 'Example 3: Inline spans' },
    { id: 4, html: '<section><h1>Heading</h1><p>Content</p></section>', description: 'Example 4: Section with heading and paragraph' },
    { id: 5, html: '<div><img src="#" alt="1"/><img src="#" alt="2"/></div>', description: 'Example 5: Images inside div' },
    { id: 6, html: '<nav><a href="#">Link1</a><a href="#">Link2</a></nav>', description: 'Example 6: Navigation links' },
    { id: 7, html: '<ol><li>One</li><li>Two</li><li>Three</li></ol>', description: 'Example 7: Ordered list' }
  ];

  const [selectedExample, setSelectedExample] = useState(examples[0]);

  const getSiblings = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return [];
    return Array.from(container.children).map(child => ({
      tag: child.tagName,
      text: child.textContent
    }));
  };

  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left 40% Explanation */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">DOM Siblings Visualizer</h2>
        <p className="mb-3 text-gray-700">Shows <code>previousSibling</code> and <code>nextSibling</code> relationships for DOM elements.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li><strong>previousSibling</strong>: Returns the node immediately before the given node.</li>
          <li><strong>nextSibling</strong>: Returns the node immediately after the given node.</li>
          <li>Advantages: Easy navigation of DOM nodes, helpful in dynamic UI manipulations.</li>
          <li>Disadvantages: May return text nodes, careful type checking needed.</li>
          <li>Use cases: Sliders, tab navigation, DOM traversals, tree-like structures.</li>
        </ul>
      </div>

      {/* Center 30% Code Editor */}
      <div className="w-3/10 flex flex-col border-r p-2 overflow-auto">
        <h3 className="font-bold mb-2">Examples</h3>
        <ul className="list-decimal ml-6">
          {examples.map(ex => (
            <li key={ex.id} className={`cursor-pointer ${selectedExample.id === ex.id ? 'text-blue-700 font-bold' : ''}`} onClick={() => setSelectedExample(ex)}>
              {ex.description}
            </li>
          ))}
        </ul>
        <pre className="bg-gray-100 p-2 mt-4">
{`// Access DOM container:
// const container = document.getElementById('container');
// container.children for siblings
// node.previousSibling, node.nextSibling`}</pre>
      </div>

      {/* Right 30% Output */}
      <div className="w-3/10 p-6 overflow-auto">
        <h3 className="font-bold mb-2">Selected Example Output</h3>
        <div className="border p-2 rounded mb-4" id="example-container" dangerouslySetInnerHTML={{ __html: selectedExample.html }}></div>
        <div className="bg-gray-100 p-2 rounded">
          <h4 className="font-semibold mb-2">Siblings Info</h4>
          <ul className="list-disc ml-6">
            {getSiblings('example-container').map((sib, idx) => (
              <li key={idx}>{sib.tag} - {sib.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}