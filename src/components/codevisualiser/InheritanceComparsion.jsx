import React from 'react';

export default function InheritanceComparisonVisualizer() {
  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left 40% Explanation */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Classical vs Prototypal Inheritance</h2>
        <p className="mb-3 text-gray-700">This visualizer compares classical (class-based) inheritance with prototypal inheritance side by side, highlighting their differences and examples.</p>
        <h3 className="font-semibold text-gray-800 mt-2">Key Differences:</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li><strong>Classical Inheritance:</strong> Uses <code>class</code> and <code>extends</code> keywords. Objects inherit from classes.</li>
          <li><strong>Prototypal Inheritance:</strong> Objects inherit directly from other objects using <code>Object.create()</code> or prototype chains.</li>
          <li>Classical inheritance is more rigid; prototypal inheritance is more flexible and dynamic.</li>
          <li>Prototypal can easily share methods across objects without creating classes.</li>
        </ul>
        <h3 className="font-semibold text-gray-800 mt-3">Use Cases / Examples:</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Classical: Suitable for structured applications needing familiar OOP patterns, e.g., UI components with inheritance.</li>
          <li>Prototypal: Ideal for dynamic objects, object cloning, and behavior sharing without rigid class hierarchies.</li>
          <li>Prototypal is often used in JavaScript libraries for mixins and object composition.</li>
        </ul>
      </div>

      {/* Center 30% Code Editor placeholder */}
      <div className="w-3/10 flex flex-col border-r p-2 overflow-auto">
        <pre className="bg-gray-100 p-2 h-full">
{`// Classical Inheritance Example
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}

const d = new Dog('Rex');
d.speak(); // Rex barks.

// Prototypal Inheritance Example
const animal = {
  speak() {
    console.log(this.name + ' makes a noise.');
  }
};

const dog = Object.create(animal);
dog.name = 'Rex';
dog.speak = function() {
  console.log(this.name + ' barks.');
};
dog.speak(); // Rex barks.`}</pre>
      </div>

      {/* Right 30% Output */}
      <div className="w-3/10 p-6 flex flex-col gap-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="font-bold mb-2">Classical Inheritance Output</h3>
          <pre>Rex barks.</pre>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="font-bold mb-2">Prototypal Inheritance Output</h3>
          <pre>Rex barks.</pre>
        </div>
      </div>
    </div>
  );
}