 export const JsRenderVisualization = ({currentConcept, step}) => {
    const currentStep = currentConcept.steps[step];
    console.log("Rendering Step:", currentStep);

    if (currentStep?.demo) {
      const { original, shallow, affected } = currentStep?.demo;
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-700 mb-2">Original</div>
              <div className="bg-blue-500 text-white p-4 rounded-lg font-mono text-sm whitespace-pre">
                {JSON.stringify(original, null, 2)}
              </div>
            </div>
            <div className={`text-3xl ${affected ? 'text-red-500' : 'text-green-500'}`}>
              {affected ? '✗' : '✓'}
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-700 mb-2">Shallow Clone</div>
              <div className={`${affected ? 'bg-red-500' : 'bg-green-500'} text-white p-4 rounded-lg font-mono text-sm whitespace-pre`}>
                {JSON.stringify(shallow, null, 2)}
              </div>
            </div>
          </div>
          <div className={`${affected ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'} border-2 p-3 rounded-lg max-w-md text-center`}>
            <div className={`${affected ? 'text-red-700' : 'text-green-700'} font-bold`}>
              {affected ? '✗ Both Changed!' : '✓ Independent!'}
            </div>
            <div className={`text-sm ${affected ? 'text-red-600' : 'text-green-600'}`}>
              {affected ? 'Nested references are shared' : 'Primitives copied by value'}
            </div>
          </div>
        </div>
      );
    }

    if (currentStep?.visual) {
      const { type, original, copy, clone, independent, nested, levels, cloned, shared } = currentStep.visual;
      
      if (type === 'reference') {
        return (
          <div className="flex items-center justify-center space-x-8 min-h-[300px]">
            <div className="text-center">
              <div className="bg-blue-500 text-white p-6 rounded-lg font-mono text-sm mb-2">
                original<br/>{JSON.stringify(original, null, 2)}
              </div>
              <div className="text-gray-600">Memory: 0x001</div>
            </div>
            <div className="text-4xl text-red-500 animate-pulse">→</div>
            <div className="text-center">
              <div className="bg-red-500 text-white p-6 rounded-lg font-mono text-sm mb-2">
                copy<br/>(same reference)
              </div>
              <div className="text-gray-600">Memory: 0x001</div>
            </div>
          </div>
        );
      }

      if (type === 'object-memory') {
        return (
          <div className="flex flex-col items-center space-y-8 min-h-[300px] justify-center">
            <div className="text-xl font-bold text-gray-700">Memory Visualization</div>
            <div className="flex space-x-12">
              <div className="text-center">
                <div className="text-sm font-bold text-red-600 mb-2">Shallow Clone</div>
                <div className="bg-red-100 border-2 border-red-400 p-4 rounded-lg">
                  <div className="text-xs mb-2">Top Level: 0x002</div>
                  <div className="text-xs text-red-600">Nested → 0x001 (shared!)</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-green-600 mb-2">Deep Clone</div>
                <div className="bg-green-100 border-2 border-green-400 p-4 rounded-lg">
                  <div className="text-xs mb-2">Top Level: 0x003</div>
                  <div className="text-xs text-green-600">Nested → 0x004 (new!)</div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'array-memory') {
        return (
          <div className="flex flex-col items-center space-y-6 min-h-[300px] justify-center">
            <div className="text-xl font-bold text-gray-700">Array Memory References</div>
            <div className="flex space-x-8">
              <div className="bg-blue-100 border-2 border-blue-400 p-4 rounded-lg">
                <div className="font-bold text-blue-700 mb-2">Original</div>
                <div className="space-y-1 text-sm font-mono">
                  <div>Array: 0x100</div>
                  <div className="ml-3">→ [0]: 0x101</div>
                  <div className="ml-3">→ [1]: 0x102</div>
                </div>
              </div>
              <div className="bg-red-100 border-2 border-red-400 p-4 rounded-lg">
                <div className="font-bold text-red-700 mb-2">Shallow</div>
                <div className="space-y-1 text-sm font-mono">
                  <div>Array: 0x200</div>
                  <div className="ml-3 text-red-600">→ [0]: 0x101 ✗</div>
                  <div className="ml-3 text-red-600">→ [1]: 0x102 ✗</div>
                </div>
              </div>
              <div className="bg-green-100 border-2 border-green-400 p-4 rounded-lg">
                <div className="font-bold text-green-700 mb-2">Deep</div>
                <div className="space-y-1 text-sm font-mono">
                  <div>Array: 0x300</div>
                  <div className="ml-3 text-green-600">→ [0]: 0x301 ✓</div>
                  <div className="ml-3 text-green-600">→ [1]: 0x302 ✓</div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'array-obj-ref') {
        return (
          <div className="flex items-center justify-center min-h-[300px] space-x-6">
            <div className="text-center">
              <div className="bg-blue-500 text-white p-4 rounded-lg mb-2">
                <div className="font-bold mb-2">Array (new)</div>
                <div className="text-xs">0x200</div>
              </div>
              <div className="flex space-x-2 mt-4">
                <div className="bg-red-400 text-white p-3 rounded text-xs">
                  obj 1<br/>0x101
                </div>
                <div className="bg-red-400 text-white p-3 rounded text-xs">
                  obj 2<br/>0x102
                </div>
              </div>
              <div className="text-red-600 text-sm mt-2 font-bold">Objects still shared!</div>
            </div>
          </div>
        );
      }

      if (type === 'triple-ref') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
            <div className="text-lg font-bold text-gray-700">Three Levels of References</div>
            {levels.map((level, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <div className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold min-w-[150px] text-center">
                  Level {idx + 1}: {level}
                </div>
                <div className="text-red-500 text-xl">→ Reference</div>
              </div>
            ))}
            <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg mt-4 max-w-md">
              <div className="text-red-700 font-bold">⚠️ All levels must be cloned!</div>
            </div>
          </div>
        );
      }

      if (type === 'complexity-meter') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="text-lg font-bold mb-4">Cloning Complexity</div>
            <div className="w-full max-w-md">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-32 text-sm">Primitives</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-green-500 h-4 rounded-full" style={{width: '20%'}}></div>
                  </div>
                  <div className="w-16 text-right text-sm text-green-600">Easy</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm">Objects</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-yellow-500 h-4 rounded-full" style={{width: '50%'}}></div>
                  </div>
                  <div className="w-16 text-right text-sm text-yellow-600">Medium</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm">Arrays</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-orange-500 h-4 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <div className="w-16 text-right text-sm text-orange-600">Medium+</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm">Array of Obj</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-red-500 h-4 rounded-full" style={{width: '80%'}}></div>
                  </div>
                  <div className="w-16 text-right text-sm text-red-600">Hard</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm font-bold">Nested Arrays</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-purple-600 h-4 rounded-full animate-pulse" style={{width: '100%'}}></div>
                  </div>
                  <div className="w-16 text-right text-sm text-purple-600 font-bold">Hardest</div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'partial-clone') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="text-lg font-bold">Levels Cloned vs Shared</div>
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-sm font-bold text-green-600 mb-2">Cloned: {cloned}</div>
                <div className="space-y-2">
                  {Array.from({length: cloned}).map((_, i) => (
                    <div key={i} className="bg-green-500 text-white px-6 py-3 rounded-lg">
                      Level {i + 1} ✓
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-red-600 mb-2">Shared: {shared}</div>
                <div className="space-y-2">
                  {Array.from({length: shared}).map((_, i) => (
                    <div key={i} className="bg-red-500 text-white px-6 py-3 rounded-lg">
                      Level {cloned + i + 1} ✗
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'method-table') {
        return (
          <div className="flex justify-center min-h-[300px] items-center">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="min-w-[500px]">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Method</th>
                    <th className="px-6 py-3 text-center">Array of Objects</th>
                    <th className="px-6 py-3 text-center">Speed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-3 font-mono text-sm">[...arr]</td>
                    <td className="px-6 py-3 text-center text-red-600">✗ Shallow</td>
                    <td className="px-6 py-3 text-center text-green-600">Fast</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="px-6 py-3 font-mono text-sm">arr.map(o =&gt; ({...o}))</td>
                    <td className="px-6 py-3 text-center text-yellow-600">⚠ 1 Level</td>
                    <td className="px-6 py-3 text-center text-green-600">Fast</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-3 font-mono text-sm">JSON method</td>
                    <td className="px-6 py-3 text-center text-green-600">✓ Deep</td>
                    <td className="px-6 py-3 text-center text-yellow-600">Medium</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-3 font-mono text-sm">structuredClone</td>
                    <td className="px-6 py-3 text-center text-green-600">✓ Deep</td>
                    <td className="px-6 py-3 text-center text-green-600">Fast</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      }
      
      if (type === 'deep') {
        return (
          <div className="flex items-center justify-center space-x-8 min-h-[300px]">
            <div className="text-center">
              <div className="bg-blue-500 text-white p-6 rounded-lg font-mono text-sm mb-2 whitespace-pre">
                {JSON.stringify(original, null, 2)}
              </div>
              <div className="text-gray-600">Memory: 0x001</div>
            </div>
            <div className="text-4xl text-green-500">✓</div>
            <div className="text-center">
              <div className="bg-green-500 text-white p-6 rounded-lg font-mono text-sm mb-2 whitespace-pre">
                {JSON.stringify(original, null, 2)}
              </div>
              <div className="text-gray-600">Memory: 0x002</div>
            </div>
          </div>
        );
      }
      
      if (type === 'independent') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-sm font-bold text-gray-700 mb-2">Original</div>
                <div className="bg-blue-500 text-white p-6 rounded-lg font-mono text-sm whitespace-pre">
                  {JSON.stringify(original, null, 2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-700 mb-2">Deep Clone</div>
                <div className="bg-green-500 text-white p-6 rounded-lg font-mono text-sm whitespace-pre">
                  {JSON.stringify(clone, null, 2)}
                </div>
              </div>
            </div>
            {independent && (
              <div className="bg-green-50 border-2 border-green-300 p-4 rounded-lg max-w-md text-center">
                <div className="text-green-700 font-bold">✓ Completely Independent</div>
                <div className="text-sm text-green-600">Changes to one don't affect the other</div>
              </div>
            )}
          </div>
        );
      }
    }

    if (currentStep?.dom) {
      return (
        <div className="flex flex-col items-center justify-center space-y-6 min-h-[300px]">
          {currentStep.dom.map((item, idx) => {
            const isActive = currentStep.active === item;
            const isPrev = currentStep.prev === item;
            const hasListener = currentStep.listeners;
            const isStopped = currentStep.stopped && item !== 'child';
            
            return (
              <div key={idx} className="relative">
                <div className={`border-4 transition-all duration-500 ${
                  isActive ? 'border-blue-500 bg-blue-100 scale-110' :
                  isPrev ? 'border-green-400 bg-green-50' :
                  isStopped ? 'border-gray-300 bg-gray-100' :
                  'border-gray-400 bg-white'
                } rounded-lg p-6 min-w-[200px] text-center font-semibold`}>
                  {item}
                  {hasListener && hasListener !== 'parent-only' && (
                    <div className="text-xs text-purple-600 mt-1">📡 listener</div>
                  )}
                  {hasListener === 'parent-only' && item === 'parent' && (
                    <div className="text-xs text-purple-600 mt-1">📡 delegated</div>
                  )}
                </div>
                {currentStep.direction === 'down' && idx < currentStep.dom.length - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 text-blue-500 text-2xl animate-bounce">↓</div>
                )}
              </div>
            );
          })}
          {currentStep.log && (
            <div className="mt-4 bg-gray-900 text-green-400 p-4 rounded font-mono text-sm w-full max-w-md">
              {currentStep.log.map((line, i) => (
                <div key={i} className="animate-pulse">→ {line}</div>
              ))}
            </div>
          )}
          {currentStep.order && (
            <div className="mt-4 flex space-x-2">
              {currentStep.order.map((item, i) => (
                <div key={i} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {i + 1}. {item}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (currentStep?.stack !== undefined) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="text-lg font-bold mb-4 text-gray-700">Call Stack</div>
          <div className="border-4 border-gray-400 bg-gray-50 p-4 min-w-[250px] min-h-[300px] flex flex-col-reverse">
            {currentStep.stack.length === 0 ? (
              <div className="text-center text-gray-400 italic">Empty</div>
            ) : (
              currentStep.stack.map((item, idx) => (
                <div key={idx} className="bg-blue-500 text-white p-3 mb-2 rounded font-mono text-sm transform transition-all duration-300 animate-in">
                  {item}
                </div>
              ))
            )}
          </div>
          {currentStep.then && (
            <div className="mt-4 text-gray-500">→ Then: {currentStep.then.join(', ') || 'Empty'}</div>
          )}
          {currentStep.error && (
            <div className="mt-4 bg-red-100 text-red-800 p-3 rounded font-semibold">
              ⚠️ {currentStep.error}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-full">
          {currentStep.zone && (
            <div className="bg-red-50 border-2 border-red-300 p-4 rounded mb-4">
              <div className="text-red-700 font-bold">⚠️ Temporal Dead Zone</div>
              <div className="text-sm text-red-600">Variables exist but cannot be accessed</div>
            </div>
          )}
          {currentStep.output && (
            <div className="bg-green-50 border-2 border-green-300 p-4 rounded mb-4">
              <div className="text-green-700 font-bold">Output:</div>
              <div className="text-sm">{currentStep.output}</div>
            </div>
          )}
          {currentStep.example && (
            <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded mb-4">
              <div className="text-blue-700 font-bold">Use Case:</div>
              <div className="text-sm">{currentStep.example}</div>
            </div>
          )}
          {currentStep.advice && (
            <div className="bg-purple-50 border-2 border-purple-300 p-4 rounded">
              <div className="text-purple-700 font-bold">💡 Best Practice:</div>
              <div className="text-sm">{currentStep.advice}</div>
            </div>
          )}
          {currentStep.phase && (
            <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded mb-4">
              <div className="text-yellow-700 font-bold">Phase: {currentStep.phase}</div>
            </div>
          )}
        </div>
      </div>
    );
  };
