import React, { useState, useEffect } from 'react';
//import { Play, RotateCcw, Zap, AlertCircle } from 'lucide-react';
import { FaPlay, FaBolt, FaSyncAlt } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';


const PipeVisualizer = () => {
  const [activeExample, setActiveExample] = useState(0);
  const [pureCallCount, setPureCallCount] = useState(0);
  const [impureCallCount, setImpureCallCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [arrayItems, setArrayItems] = useState(['Apple', 'Banana', 'Cherry']);
  const [objectData, setObjectData] = useState({ name: 'John', age: 25 });
  const [isAnimating, setIsAnimating] = useState(false);

  const examples = [
    {
      title: 'Text Transformation',
      description: 'Pure pipes transform primitive values efficiently',
      pureCode: `@Pipe({ name: 'uppercase', pure: true })
export class UppercasePipe {
  transform(value: string): string {
    console.log('Pure pipe called');
    return value.toUpperCase();
  }
}`,
      impureCode: `@Pipe({ name: 'uppercase', pure: false })
export class UppercasePipe {
  transform(value: string): string {
    console.log('Impure pipe called');
    return value.toUpperCase();
  }
}`,
      usage: `<p>{{ text | uppercase }}</p>`,
      scenario: 'Type to see the difference in execution'
    },
    {
      title: 'Array Filtering',
      description: 'Pure pipes miss array mutations, impure pipes catch them',
      pureCode: `@Pipe({ name: 'filterItems', pure: true })
export class FilterPipe {
  transform(items: any[], search: string) {
    console.log('Pure filter called');
    return items.filter(item => 
      item.toLowerCase().includes(search)
    );
  }
}`,
      impureCode: `@Pipe({ name: 'filterItems', pure: false })
export class FilterPipe {
  transform(items: any[], search: string) {
    console.log('Impure filter called');
    return items.filter(item => 
      item.toLowerCase().includes(search)
    );
  }
}`,
      usage: `<li *ngFor="let item of items | filterItems:search">
  {{ item }}
</li>`,
      scenario: 'Add/remove items to see pipe behavior'
    },
    {
      title: 'Object Properties',
      description: 'Pure pipes don\'t detect internal object changes',
      pureCode: `@Pipe({ name: 'formatUser', pure: true })
export class FormatUserPipe {
  transform(user: any): string {
    console.log('Pure pipe called');
    return \`\${user.name} (\${user.age})\`;
  }
}`,
      impureCode: `@Pipe({ name: 'formatUser', pure: false })
export class FormatUserPipe {
  transform(user: any): string {
    console.log('Impure pipe called');
    return \`\${user.name} (\${user.age})\`;
  }
}`,
      usage: `<p>{{ user | formatUser }}</p>`,
      scenario: 'Modify object properties to see the difference'
    },
    {
      title: 'Date/Time Display',
      description: 'Impure pipes update with time changes, pure pipes don\'t',
      pureCode: `@Pipe({ name: 'timeAgo', pure: true })
export class TimeAgoPipe {
  transform(date: Date): string {
    const seconds = Math.floor(
      (Date.now() - date.getTime()) / 1000
    );
    return \`\${seconds} seconds ago\`;
  }
}`,
      impureCode: `@Pipe({ name: 'timeAgo', pure: false })
export class TimeAgoPipe {
  transform(date: Date): string {
    const seconds = Math.floor(
      (Date.now() - date.getTime()) / 1000
    );
    return \`\${seconds} seconds ago\`;
  }
}`,
      usage: `<p>Updated: {{ timestamp | timeAgo }}</p>`,
      scenario: 'Watch how time updates are handled'
    },
    {
      title: 'Async Data Fetching',
      description: 'Impure pipes can handle frequently changing async data',
      pureCode: `@Pipe({ name: 'fetchData', pure: true })
export class FetchDataPipe {
  transform(url: string): Observable<any> {
    console.log('Pure async pipe called');
    return this.http.get(url);
  }
}`,
      impureCode: `@Pipe({ name: 'fetchData', pure: false })
export class FetchDataPipe {
  transform(url: string): Observable<any> {
    console.log('Impure async pipe called');
    return this.http.get(url);
  }
}`,
      usage: `<div>{{ apiUrl | fetchData | async }}</div>`,
      scenario: 'Impure pipes check on every change detection cycle'
    }
  ];

  const simulatePureCall = () => {
    setPureCallCount(prev => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const simulateImpureCall = () => {
    setImpureCallCount(prev => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    simulatePureCall();
    simulateImpureCall();
  };

  const addArrayItem = () => {
    setArrayItems([...arrayItems, `Item ${arrayItems.length + 1}`]);
    // Pure pipe won't be called (reference unchanged if we mutate)
    // Impure pipe will be called
    simulateImpureCall();
  };

  const mutateArray = () => {
    arrayItems.push(`Mutated ${arrayItems.length + 1}`);
    // Pure pipe won't detect this
    simulateImpureCall();
  };

  const updateObject = () => {
    objectData.age += 1;
    // Pure pipe won't detect this mutation
    simulateImpureCall();
  };

  const replaceObject = () => {
    setObjectData({ ...objectData, age: objectData.age + 1 });
    // Both pipes will be called
    simulatePureCall();
    simulateImpureCall();
  };

  const resetCounters = () => {
    setPureCallCount(0);
    setImpureCallCount(0);
    setInputValue('');
    setArrayItems(['Apple', 'Banana', 'Cherry']);
    setObjectData({ name: 'John', age: 25 });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeExample === 3) {
        simulateImpureCall();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [activeExample]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3">
            Angular Pipes: Pure vs Impure
          </h1>
          <p className="text-gray-300 text-lg">
            Understanding change detection and performance implications
          </p>
        </div>

        {/* Key Differences Card */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-emerald-900/30 border-2 border-emerald-500 rounded-xl p-6 backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              <FaSyncAlt className="text-emerald-400" size={32} />
              <h2 className="text-2xl font-bold text-white">Pure Pipes</h2>
            </div>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Only called when input <strong>reference</strong> changes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Better performance (less frequent execution)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Default behavior (<code className="bg-slate-800 px-2 py-1 rounded">pure: true</code>)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Misses mutations to objects/arrays</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Recommended for most use cases</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-900/30 border-2 border-orange-500 rounded-xl p-6 backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              <FiAlertCircle className="text-orange-400" size={32} />
              <h2 className="text-2xl font-bold text-white">Impure Pipes</h2>
            </div>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">⚠</span>
                <span>Called on <strong>every</strong> change detection cycle</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">⚠</span>
                <span>Performance impact (frequent execution)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">⚠</span>
                <span>Requires explicit <code className="bg-slate-800 px-2 py-1 rounded">pure: false</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">⚠</span>
                <span>Detects mutations to objects/arrays</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">⚠</span>
                <span>Use sparingly and with caution</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call Counter */}
        <div className="bg-slate-800/50 border-2 border-slate-600 rounded-xl p-6 mb-8 backdrop-blur">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-white">Execution Counter</h3>
            <button
              onClick={resetCounters}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <FaBolt size={18} />
              Reset
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className={`bg-emerald-900/30 border-2 border-emerald-500 rounded-lg p-6 text-center transition-transform ${isAnimating ? 'scale-105' : ''}`}>
              <p className="text-emerald-400 text-sm font-semibold mb-2">PURE PIPE CALLS</p>
              <p className="text-5xl font-bold text-white">{pureCallCount}</p>
            </div>
            <div className={`bg-orange-900/30 border-2 border-orange-500 rounded-lg p-6 text-center transition-transform ${isAnimating ? 'scale-105' : ''}`}>
              <p className="text-orange-400 text-sm font-semibold mb-2">IMPURE PIPE CALLS</p>
              <p className="text-5xl font-bold text-white">{impureCallCount}</p>
            </div>
          </div>
        </div>

        {/* Example Selector */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setActiveExample(index)}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeExample === index
                  ? 'bg-blue-600 text-white scale-105 shadow-lg'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {index + 1}. {example.title}
            </button>
          ))}
        </div>

        {/* Active Example */}
        <div className="bg-slate-800/80 border-2 border-slate-600 rounded-xl p-8 backdrop-blur mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">
            {examples[activeExample].title}
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            {examples[activeExample].description}
          </p>

          {/* Interactive Demo */}
          <div className="bg-slate-900/50 rounded-lg p-6 mb-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">
              Interactive Demo
            </h3>
            <p className="text-gray-400 mb-4">{examples[activeExample].scenario}</p>

            {activeExample === 0 && (
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Type something..."
                  className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div className="bg-emerald-900/20 border border-emerald-500 rounded-lg p-4">
                    <p className="text-emerald-400 text-sm font-semibold mb-2">Pure Output:</p>
                    <p className="text-white text-xl">{inputValue.toUpperCase()}</p>
                  </div>
                  <div className="bg-orange-900/20 border border-orange-500 rounded-lg p-4">
                    <p className="text-orange-400 text-sm font-semibold mb-2">Impure Output:</p>
                    <p className="text-white text-xl">{inputValue.toUpperCase()}</p>
                  </div>
                </div>
              </div>
            )}

            {activeExample === 1 && (
              <div>
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={addArrayItem}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Add Item (New Reference)
                  </button>
                  <button
                    onClick={mutateArray}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Mutate Array (Same Reference)
                  </button>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-gray-400 mb-2">Array Items:</p>
                  <div className="flex flex-wrap gap-2">
                    {arrayItems.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeExample === 2 && (
              <div>
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={updateObject}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Mutate Object Property
                  </button>
                  <button
                    onClick={replaceObject}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Replace Object Reference
                  </button>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-white text-xl">
                    {objectData.name} ({objectData.age} years old)
                  </p>
                </div>
              </div>
            )}

            {activeExample === 3 && (
              <div className="bg-slate-800 rounded-lg p-6">
                <p className="text-gray-400 mb-2">Watch the counters update:</p>
                <p className="text-white text-2xl">
                  Pure pipe: Static timestamp
                </p>
                <p className="text-white text-2xl">
                  Impure pipe: Updates every second
                </p>
                <p className="text-gray-500 text-sm mt-4">
                  (Impure counter increases automatically)
                </p>
              </div>
            )}

            {activeExample === 4 && (
              <div className="bg-slate-800 rounded-lg p-6">
                <p className="text-gray-300 mb-3">
                  Pure pipes cache results based on input reference
                </p>
                <p className="text-gray-300">
                  Impure pipes execute on every change detection, even without input changes
                </p>
                <div className="mt-4 p-4 bg-orange-900/20 border border-orange-500 rounded">
                  <p className="text-orange-300 text-sm">
                    ⚠️ Using impure pipes with HTTP requests can cause performance issues!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Code Comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">Pure Pipe Implementation</h3>
              <pre className="bg-slate-900 border border-emerald-500 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-emerald-300">{examples[activeExample].pureCode}</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-bold text-orange-400 mb-3">Impure Pipe Implementation</h3>
              <pre className="bg-slate-900 border border-orange-500 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-orange-300">{examples[activeExample].impureCode}</code>
              </pre>
            </div>
          </div>

          {/* Usage */}
          <div className="mt-4">
            <h3 className="text-lg font-bold text-blue-400 mb-3">Template Usage</h3>
            <pre className="bg-slate-900 border border-blue-500 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-blue-300">{examples[activeExample].usage}</code>
            </pre>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-slate-800/50 border-2 border-slate-600 rounded-xl p-8 backdrop-blur">
          <h2 className="text-2xl font-bold text-white mb-4">Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">✓ Use Pure Pipes When:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Transforming primitive values (strings, numbers)</li>
                <li>• Working with immutable data patterns</li>
                <li>• Performance is critical</li>
                <li>• You control object/array references</li>
                <li>• Default choice for most scenarios</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-orange-400 mb-3">⚠ Use Impure Pipes When:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Detecting mutations in objects/arrays</li>
                <li>• Working with time-dependent data</li>
                <li>• You understand the performance trade-offs</li>
                <li>• Pure pipes don't meet your requirements</li>
                <li>• Use sparingly and optimize carefully</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipeVisualizer;