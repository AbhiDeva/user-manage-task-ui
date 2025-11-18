import React, { useState } from 'react';

export default function FactoryPatternVisualizer() {
  const [createdObjects, setCreatedObjects] = useState([]);

  // Factory function
  const vehicleFactory = (type, color) => {
    switch(type) {
      case 'Car':
        return { type: 'Car', wheels: 4, color };
      case 'Bike':
        return { type: 'Bike', wheels: 2, color };
      case 'Truck':
        return { type: 'Truck', wheels: 6, color };
      default:
        return { type: 'Unknown', wheels: 0, color };
    }
  };

  const createObject = (type) => {
    const color = prompt(`Enter color for the ${type}:`);
    const obj = vehicleFactory(type, color);
    setCreatedObjects([...createdObjects, obj]);
  };

  return (
    <div className="flex h-screen p-6 gap-6">
      {/* Left 40% Explanation */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Factory Pattern Visualizer</h2>
        <p className="mb-3 text-gray-700">Demonstrates how the Factory Pattern allows creation of objects without exposing the instantiation logic.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Factory function decides which type of object to create.</li>
          <li>Client code calls the factory, not the constructors.</li>
          <li>Easy to extend: add new types without changing client code.</li>
        </ul>
      </div>

      {/* Center 30% Code Editor */}
      <div className="w-3/10 flex flex-col border-r p-2 overflow-auto">
        <pre className="bg-gray-100 p-2 h-full">
{`// Factory function
function vehicleFactory(type, color) {
  switch(type) {
    case 'Car': return { type: 'Car', wheels: 4, color };
    case 'Bike': return { type: 'Bike', wheels: 2, color };
    case 'Truck': return { type: 'Truck', wheels: 6, color };
    default: return { type: 'Unknown', wheels: 0, color };
  }
}

const car = vehicleFactory('Car', 'Red');
console.log(car);`}</pre>
      </div>

      {/* Right 30% Output */}
      <div className="w-3/10 p-6 flex flex-col gap-4">
        <h3 className="font-bold mb-2">Created Objects</h3>
        <div className="flex gap-2 mb-2">
          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => createObject('Car')}>Create Car</button>
          <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => createObject('Bike')}>Create Bike</button>
          <button className="bg-yellow-500 text-black px-2 py-1 rounded" onClick={() => createObject('Truck')}>Create Truck</button>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow h-full overflow-auto">
          {createdObjects.length === 0 ? (
            <p>No objects created yet.</p>
          ) : (
            <ul className="list-disc ml-6">
              {createdObjects.map((obj, idx) => (
                <li key={idx}>{obj.type} - Wheels: {obj.wheels}, Color: {obj.color}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}