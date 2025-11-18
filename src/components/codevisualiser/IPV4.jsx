import React, { useState } from 'react';

export default function IPv4Visualizer() {
  const [input, setInput] = useState('192.168.0.1');
  const [result, setResult] = useState(null);

  const isValidIPv4 = (str) => {
    const octets = str.split('.');
    if (octets.length !== 4) return false;
    for (let i = 0; i < octets.length; i++) {
      const octet = octets[i];
      if (isNaN(octet) || octet < 0 || octet > 255) return false;
      if (octet.length > 1 && octet[0] === '0') return false;
    }
    return true;
  };

  const handleCheck = () => {
    setResult(isValidIPv4(input));
  };

  return (
    <div className="flex h-screen p-6 gap-6 bg-gray-50">
      {/* Left 40% Explanation */}
      <div className="w-2/5 p-6 border-r overflow-auto bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-blue-700">IPv4 Address Validator</h2>
        <p className="mb-3 text-gray-700">
          The <code>isValidIPv4</code> function checks whether a given string is a valid IPv4 address.
        </p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>An IPv4 address has four octets separated by periods.</li>
          <li>Each octet must be a number between 0 and 255.</li>
          <li>Leading zeros are invalid except for single-digit octets.</li>
          <li>Returns true if all conditions are met; false otherwise.</li>
          <li>Use cases: validating user input, network configuration, and IP filtering.</li>
        </ul>
      </div>

      {/* Center 40% Code Editor */}
      <div className="w-3/10 p-4 bg-gray-100 rounded shadow overflow-auto">
        <h3 className="font-bold mb-2">Code</h3>
        <pre className="whitespace-pre-wrap text-sm font-mono">
{`function isValidIPv4(str) {
  const octets = str.split(".");
  if (octets.length !== 4) return false;
  for (let i = 0; i < octets.length; i++) {
    const octet = octets[i];
    if (isNaN(octet) || octet < 0 || octet > 255) return false;
    if (octet.length > 1 && octet[0] === "0") return false;
  }
  return true;
}

console.log(isValidIPv4("192.168.0.1")); // true
console.log(isValidIPv4("256.0.0.0")); // false`}</pre>
      </div>

      {/* Right 30% Output */}
      <div className="w-3/10 p-6 bg-white rounded shadow flex flex-col">
        <h3 className="font-bold mb-4">Try it Yourself</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded mb-4"
          placeholder="Enter IPv4 address"
        />
        <button
          onClick={handleCheck}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Check
        </button>
        {result !== null && (
          <div className={`p-2 rounded ${result ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {result ? 'Valid IPv4 address ✅' : 'Invalid IPv4 address ❌'}
          </div>
        )}
      </div>
    </div>
  );
}