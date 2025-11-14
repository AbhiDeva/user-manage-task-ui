export const JsRenderVisualization = ({ currentConcept, step}) => () => {
    const currentStep = currentConcept.steps[step];

    if (currentStep.demo) {
      const { original, shallow, affected } = currentStep.demo;
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

    if (currentStep.visual) {
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

      if (type === 'closure-concept') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-8">
            <div className="text-lg font-bold text-gray-700">Real World Analogy</div>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-6xl mb-3">🏠</div>
                <div className="font-semibold">Outer Function</div>
                <div className="text-sm text-gray-600">(Parent's house)</div>
              </div>
              <div className="text-4xl">→</div>
              <div className="text-center">
                <div className="text-6xl mb-3">👤</div>
                <div className="font-semibold">Inner Function</div>
                <div className="text-sm text-gray-600">(Child)</div>
              </div>
            </div>
            <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6 max-w-md text-center">
              <div className="text-blue-700 font-bold text-lg mb-2">Closure = Memory</div>
              <div className="text-blue-600">Child remembers parent's house even after leaving!</div>
            </div>
          </div>
        );
      }

      if (type === 'closure-scope') {
        const { outerVar, innerAccess } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="relative">
              <div className="bg-purple-100 border-4 border-purple-500 rounded-lg p-8">
                <div className="font-bold text-purple-700 mb-4">outer() - Outer Scope</div>
                <div className="bg-white rounded p-3 mb-4">
                  <div className="font-mono text-sm text-purple-600">const {outerVar} = 'Alice'</div>
                </div>
                
                <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6 ml-4">
                  <div className="font-bold text-blue-700 mb-4">inner() - Inner Scope</div>
                  <div className="bg-white rounded p-3">
                    <div className="font-mono text-sm text-blue-600">console.log({outerVar})</div>
                  </div>
                  {innerAccess && (
                    <div className="mt-3 text-green-600 text-sm font-bold">✓ Can access outer variable!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'closure-memory') {
        const { variable, kept } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="text-lg font-bold text-gray-700">After outer() returns</div>
            <div className="flex items-center space-x-8">
              <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-6 text-center opacity-50">
                <div className="font-bold mb-2">outer()</div>
                <div className="text-sm text-gray-600">Function finished</div>
              </div>
              <div className="text-4xl">BUT</div>
              <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center animate-pulse">
                <div className="text-2xl mb-2">📦</div>
                <div className="font-bold text-green-700">{variable}</div>
                <div className="text-sm text-green-600 mt-2">{kept && 'Still in memory!'}</div>
              </div>
            </div>
            <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 max-w-md text-center">
              <div className="text-blue-700 font-bold">Closure keeps it alive!</div>
            </div>
          </div>
        );
      }

      if (type === 'closure-explanation') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="text-lg font-bold text-gray-700">How Closures Work</div>
            <div className="space-y-4 max-w-2xl">
              <div className="bg-purple-100 border-l-4 border-purple-500 p-4">
                <div className="font-bold text-purple-700">1. Function created inside another</div>
              </div>
              <div className="text-3xl text-center">↓</div>
              <div className="bg-blue-100 border-l-4 border-blue-500 p-4">
                <div className="font-bold text-blue-700">2. Inner function references outer variables</div>
              </div>
              <div className="text-3xl text-center">↓</div>
              <div className="bg-green-100 border-l-4 border-green-500 p-4">
                <div className="font-bold text-green-700">3. Inner function returned/used elsewhere</div>
              </div>
              <div className="text-3xl text-center">↓</div>
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
                <div className="font-bold text-yellow-700">4. Variables stay in memory = CLOSURE!</div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'counter-closure') {
        const { count, action } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-gray-900 text-gray-100 rounded-lg p-8 text-center min-w-[300px]">
              <div className="text-sm text-gray-400 mb-4">Private Variable</div>
              <div className="text-6xl font-bold mb-4">{count}</div>
              <div className="text-sm text-gray-400">count (hidden)</div>
            </div>
            
            <div className="flex space-x-4">
              <div className={`border-2 rounded-lg p-4 ${action === 'increment' ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}>
                <div className="font-mono text-sm">increment()</div>
              </div>
              <div className="border-2 rounded-lg p-4 bg-gray-100 border-gray-300">
                <div className="font-mono text-sm">decrement()</div>
              </div>
              <div className="border-2 rounded-lg p-4 bg-gray-100 border-gray-300">
                <div className="font-mono text-sm">getCount()</div>
              </div>
            </div>
            
            <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 max-w-md text-center">
              <div className="text-blue-700 font-bold">✓ count is private!</div>
              <div className="text-blue-600 text-sm mt-1">Can only be changed through methods</div>
            </div>
          </div>
        );
      }

      if (type === 'multiple-closures') {
        const { counters } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-12 min-h-[300px]">
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-lg p-6 mb-3">
                <div className="text-sm mb-2">counter1</div>
                <div className="text-4xl font-bold">{counters[0]}</div>
              </div>
              <div className="text-sm text-gray-600">Independent scope</div>
            </div>
            
            <div className="text-4xl">≠</div>
            
            <div className="text-center">
              <div className="bg-purple-500 text-white rounded-lg p-6 mb-3">
                <div className="text-sm mb-2">counter2</div>
                <div className="text-4xl font-bold">{counters[1]}</div>
              </div>
              <div className="text-sm text-gray-600">Independent scope</div>
            </div>
          </div>
        );
      }

      if (type === 'closure-loop-problem') {
        const { outputs } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="text-lg font-bold text-red-700">Problem: All closures see final value</div>
            <div className="flex space-x-4">
              {outputs.map((val, idx) => (
                <div key={idx} className="bg-red-100 border-4 border-red-500 rounded-lg p-6 text-center">
                  <div className="text-sm text-red-600 mb-2">Timeout {idx + 1}</div>
                  <div className="text-4xl font-bold text-red-700">{val}</div>
                </div>
              ))}
            </div>
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 max-w-md">
              <div className="text-red-700 font-bold">❌ Expected: 0, 1, 2</div>
              <div className="text-red-600 text-sm mt-1">Got: 3, 3, 3 (all see final i value)</div>
            </div>
          </div>
        );
      }

      if (type === 'closure-shared-var') {
        const { variable, finalValue, closures } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-yellow-100 border-4 border-yellow-500 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-yellow-700 mb-2">{variable} = {finalValue}</div>
              <div className="text-yellow-600">All closures share this one variable!</div>
            </div>
            
            <div className="flex space-x-4">
              {Array.from({length: closures}).map((_, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-red-100 border-2 border-red-400 rounded-lg p-4 text-center">
                    <div className="text-sm text-red-600">Closure {idx + 1}</div>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-red-500">↓</div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (type === 'closure-loop-solution') {
        const { outputs } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="text-lg font-bold text-green-700">Solution: Each closure gets own scope</div>
            <div className="flex space-x-4">
              {outputs.map((val, idx) => (
                <div key={idx} className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center">
                  <div className="text-sm text-green-600 mb-2">Timeout {idx + 1}</div>
                  <div className="text-4xl font-bold text-green-700">{val}</div>
                </div>
              ))}
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 max-w-md">
              <div className="text-green-700 font-bold">✓ Works correctly!</div>
              <div className="text-green-600 text-sm mt-1">Each closure has its own copy of the variable</div>
            </div>
          </div>
        );
      }

      if (type === 'memory-leak-concept') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-8">
            <div className="text-lg font-bold text-gray-700">Memory Leak Explained</div>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 mb-3">
                  <div className="text-3xl mb-2">✓</div>
                  <div className="font-bold text-green-700">Normal Memory</div>
                </div>
                <div className="text-sm text-gray-600">Data used → freed ✓</div>
              </div>
              
              <div className="text-center">
                <div className="bg-red-100 border-4 border-red-500 rounded-lg p-6 mb-3">
                  <div className="text-3xl mb-2">⚠️</div>
                  <div className="font-bold text-red-700">Memory Leak</div>
                </div>
                <div className="text-sm text-gray-600">Data not used → still kept ✗</div>
              </div>
            </div>
            
            <div className="bg-orange-100 border-2 border-orange-500 rounded-lg p-4 max-w-md">
              <div className="text-orange-700 font-bold">Result: App slows down over time</div>
            </div>
          </div>
        );
      }

      if (type === 'normal-closure-memory') {
        const { used } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-8 min-h-[300px]">
            <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6 text-center">
              <div className="text-2xl mb-2">📦</div>
              <div className="font-bold text-blue-700">name: "Alice"</div>
              <div className="text-sm text-blue-600 mt-2">Size: ~10 bytes</div>
            </div>
            <div className="text-4xl">→</div>
            <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">✓</div>
              <div className="font-bold text-green-700">Used by closure</div>
              <div className="text-sm text-green-600 mt-2">This is fine!</div>
            </div>
          </div>
        );
      }

      if (type === 'memory-leak-visual') {
        const { size, leaked } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-red-100 border-4 border-red-500 rounded-lg p-8 text-center">
              <div className="text-4xl mb-3">🗄️</div>
              <div className="font-bold text-red-700 text-xl">hugeArray</div>
              <div className="text-red-600 mt-2">1,000,000 items</div>
              <div className="text-red-500 text-sm">~8 MB in memory</div>
            </div>
            
            {leaked && (
              <>
                <div className="text-3xl text-red-500">↓</div>
                <div className="bg-orange-100 border-4 border-orange-500 rounded-lg p-6 text-center max-w-md">
                  <div className="text-orange-700 font-bold text-lg">⚠️ Leak Detected!</div>
                  <div className="text-orange-600 text-sm mt-2">
                    Closure keeps huge array even though it's never used
                  </div>
                </div>
              </>
            )}
          </div>
        );
      }

      if (type === 'leak-explanation') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="text-lg font-bold text-gray-700">Why This Happens</div>
            <div className="space-y-4 max-w-2xl">
              <div className="bg-blue-100 border-l-4 border-blue-500 p-4">
                <div className="font-bold text-blue-700">1. Closure formed</div>
                <div className="text-blue-600 text-sm">Inner function references outer scope</div>
              </div>
              <div className="bg-purple-100 border-l-4 border-purple-500 p-4">
                <div className="font-bold text-purple-700">2. Entire scope kept</div>
                <div className="text-purple-600 text-sm">ALL variables in outer scope, even unused ones!</div>
              </div>
              <div className="bg-red-100 border-l-4 border-red-500 p-4">
                <div className="font-bold text-red-700">3. Memory not freed</div>
                <div className="text-red-600 text-sm">Even if you only need one small variable</div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'event-listener-leak') {
        const { data, retained } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="flex items-center space-x-8">
              <div className="bg-red-100 border-4 border-red-500 rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">🗄️</div>
                <div className="font-bold text-red-700">{data}</div>
                <div className="text-red-600 text-sm mt-2">Large dataset</div>
              </div>
              
              <div className="text-4xl text-red-500">→</div>
              
              <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4">
                <div className="font-mono text-sm">addEventListener()</div>
              </div>
            </div>
            
            {retained && (
              <div className="bg-orange-100 border-4 border-orange-500 rounded-lg p-6 max-w-md text-center">
                <div className="text-orange-700 font-bold">⚠️ Entire {data} kept in memory!</div>
                <div className="text-orange-600 text-sm mt-2">Event handler doesn't even use it</div>
              </div>
            )}
          </div>
        );
      }

      if (type === 'event-listener-fixed') {
        const { kept } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="flex items-center space-x-8">
              <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-4 text-center opacity-50">
                <div className="text-2xl mb-2">🗄️</div>
                <div className="font-bold text-gray-600">bigData</div>
                <div className="text-gray-500 text-sm">Can be freed</div>
              </div>
              
              <div className="text-4xl text-green-500">✓</div>
              
              <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center">
                <div className="text-2xl mb-2">📦</div>
                <div className="font-bold text-green-700">Only: {kept}</div>
                <div className="text-green-600 text-sm mt-2">Tiny memory footprint</div>
              </div>
            </div>
            
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 max-w-md text-center">
              <div className="text-green-700 font-bold">✓ Memory Efficient!</div>
              <div className="text-green-600 text-sm mt-1">Only keep what you need</div>
            </div>
          </div>
        );
      }

      if (type === 'timer-leak') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-red-100 border-4 border-red-500 rounded-lg p-8 text-center">
              <div className="text-4xl mb-3">⏰</div>
              <div className="font-bold text-red-700 text-xl">setInterval()</div>
              <div className="text-red-600 mt-2">Running forever...</div>
            </div>
            
            <div className="text-3xl text-red-500">+</div>
            
            <div className="bg-orange-100 border-4 border-orange-500 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">🗄️</div>
              <div className="font-bold text-orange-700">Large data</div>
              <div className="text-orange-600 text-sm mt-2">Kept alive forever!</div>
            </div>
            
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 max-w-md text-center">
              <div className="text-red-700 font-bold">⚠️ Never garbage collected</div>
            </div>
          </div>
        );
      }

      if (type === 'circular-reference') {
        const { objects } = currentStep.visual;
        return (
          <div className="flex items-center justify-center min-h-[300px] space-x-8">
            <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6 text-center">
              <div className="text-2xl mb-2">obj1</div>
              <div className="text-sm">ref → obj2</div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="text-2xl">→</div>
              <div className="text-2xl">←</div>
            </div>
            
            <div className="bg-purple-100 border-4 border-purple-500 rounded-lg p-6 text-center">
              <div className="text-2xl mb-2">obj2</div>
              <div className="text-sm">ref → obj1</div>
            </div>
            
            <div className="absolute bottom-20 bg-red-100 border-2 border-red-500 rounded-lg p-4">
              <div className="text-red-700 font-bold">⚠️ Circular reference!</div>
              <div className="text-red-600 text-sm">Both kept alive</div>
            </div>
          </div>
        );
      }

      if (type === 'dom-leak') {
        const { element, inDom, inMemory } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-12 min-h-[300px]">
            <div className="text-center">
              <div className={`border-4 rounded-lg p-6 ${inDom ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-gray-400 opacity-50'}`}>
                <div className="text-3xl mb-2">🌐</div>
                <div className="font-bold">DOM</div>
                <div className="text-sm mt-2">{element}: {inDom ? 'Present' : 'Removed'}</div>
              </div>
            </div>
            
            <div className="text-4xl">BUT</div>
            
            <div className="text-center">
              <div className={`border-4 rounded-lg p-6 ${inMemory ? 'bg-red-100 border-red-500' : 'bg-green-100 border-green-500'}`}>
                <div className="text-3xl mb-2">🧠</div>
                <div className="font-bold">Memory</div>
                <div className="text-sm mt-2">{element}: {inMemory ? 'Still there!' : 'Freed'}</div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'best-practices-table') {
        return (
          <div className="flex justify-center min-h-[300px] items-center">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl">
              <div className="bg-gray-800 text-white p-4">
                <div className="font-bold text-lg">Prevent Memory Leaks</div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">✓</div>
                  <div>
                    <div className="font-bold text-green-700">Remove event listeners</div>
                    <div className="text-sm text-gray-600">Use removeEventListener() when done</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">✓</div>
                  <div>
                    <div className="font-bold text-green-700">Clear timers</div>
                    <div className="text-sm text-gray-600">clearInterval(), clearTimeout()</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">✓</div>
                  <div>
                    <div className="font-bold text-green-700">Limit closure scope</div>
                    <div className="text-sm text-gray-600">Only capture needed variables</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">✓</div>
                  <div>
                    <div className="font-bold text-green-700">Use WeakMap/WeakSet</div>
                    <div className="text-sm text-gray-600">For objects that should be garbage collected</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">✓</div>
                  <div>
                    <div className="font-bold text-green-700">Null references</div>
                    <div className="text-sm text-gray-600">Set to null when no longer needed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'debounce-problem') {
        const { inputs, apiCalls } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-700 mb-4">User Types: "hello"</div>
              <div className="flex space-x-2">
                {inputs.map((char, idx) => (
                  <div key={idx} className="bg-blue-500 text-white px-4 py-2 rounded font-mono text-xl">
                    {char}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-3xl">↓</div>
            <div className="bg-red-100 border-4 border-red-500 rounded-lg p-6 text-center animate-pulse">
              <div className="text-4xl font-bold text-red-700">{apiCalls}</div>
              <div className="text-red-600 font-semibold mt-2">API Calls!</div>
              <div className="text-red-500 text-sm mt-1">Way too many! 😱</div>
            </div>
          </div>
        );
      }

      if (type === 'debounce-concept') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-8">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-700 mb-4">With Debouncing</div>
              <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-2xl font-mono">
                hello
              </div>
              <div className="mt-4 text-sm text-gray-600">User finished typing...</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg px-4 py-2">
                <div className="text-yellow-700 font-semibold">Wait 500ms</div>
              </div>
              <div className="text-2xl">→</div>
              <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-700">1</div>
                <div className="text-green-600 font-semibold mt-2">API Call</div>
                <div className="text-green-500 text-sm mt-1">Perfect! ✓</div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'debounce-timer-visual') {
        const { keystrokes, timer } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="text-lg font-bold text-gray-700">Timer Resets on Each Keystroke</div>
            <div className="relative w-full max-w-2xl">
              {keystrokes.map((time, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 text-sm font-semibold">{time}ms:</div>
                    <div className="bg-blue-500 text-white px-3 py-1 rounded">Key {idx + 1}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                      <div 
                        className={`bg-yellow-500 h-3 rounded-full transition-all ${idx === keystrokes.length - 1 ? 'animate-pulse' : ''}`}
                        style={{ width: idx === keystrokes.length - 1 ? '0%' : '30%' }}
                      ></div>
                      {idx === keystrokes.length - 1 && (
                        <div className="absolute -right-2 -top-1 text-xs text-yellow-600 font-bold">Timer starts</div>
                      )}
                    </div>
                  </div>
                  {idx < keystrokes.length - 1 && (
                    <div className="ml-28 text-xs text-red-600 mt-1">❌ Timer cancelled</div>
                  )}
                </div>
              ))}
              <div className="ml-28 mt-6 bg-green-100 border-2 border-green-500 rounded-lg p-3">
                <div className="text-green-700 font-bold">✓ After {timer}ms of silence → Execute!</div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'debounce-step-by-step') {
        const { step } = currentStep.visual;
        const steps = [
          { char: 'h', timer: 0, cancelled: false },
          { char: 'e', timer: 100, cancelled: true },
          { char: 'l', timer: 200, cancelled: true },
          { char: 'l', timer: 300, cancelled: true },
          { char: 'o', timer: 400, cancelled: false }
        ];
        
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="text-lg font-bold text-gray-700">Typing "hello" with 500ms debounce</div>
            <div className="flex space-x-2">
              {steps.slice(0, step).map((s, idx) => (
                <div key={idx} className="bg-blue-500 text-white px-4 py-3 rounded-lg font-mono text-xl">
                  {s.char}
                </div>
              ))}
            </div>
            
            {step <= 4 && (
              <div className="bg-yellow-100 border-4 border-yellow-500 rounded-lg p-6 text-center min-w-[300px]">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="text-yellow-700 font-bold">Timer: {steps[step - 1]?.timer}ms</div>
                <div className="text-yellow-600 text-sm mt-2">
                  {step < 4 ? 'Waiting for next keystroke...' : 'User stopped typing!'}
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center animate-pulse">
                <div className="text-3xl mb-2">✓</div>
                <div className="text-green-700 font-bold text-xl">API Call Executed!</div>
                <div className="text-green-600 text-sm mt-2">After 500ms of silence</div>
              </div>
            )}
          </div>
        );
      }

      if (type === 'promise-analogy') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="text-lg font-bold text-gray-700">Real Life Analogy</div>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-6xl mb-3">👤</div>
                <div className="font-semibold">You order food</div>
              </div>
              <div className="text-4xl">→</div>
              <div className="text-center bg-yellow-100 border-4 border-yellow-500 rounded-lg p-6">
                <div className="text-4xl mb-3">🧾</div>
                <div className="font-bold text-yellow-700">Receipt (Promise)</div>
                <div className="text-sm text-yellow-600 mt-2">Food is being prepared...</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🍔</div>
                <div className="font-bold text-green-700">Fulfilled</div>
                <div className="text-sm text-green-600">You get your food!</div>
              </div>
              <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">❌</div>
                <div className="font-bold text-red-700">Rejected</div>
                <div className="text-sm text-red-600">Kitchen ran out!</div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'promise-states-visual') {
        const { currentState, value, error } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-8">
            <div className="flex items-center space-x-12">
              <div className={`border-4 rounded-lg p-8 text-center transition-all ${
                currentState === 'pending' ? 'border-yellow-500 bg-yellow-100 scale-110' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="text-4xl mb-3">⏳</div>
                <div className="font-bold text-xl">Pending</div>
                <div className="text-sm mt-2">Waiting...</div>
              </div>
              
              <div className={`border-4 rounded-lg p-8 text-center transition-all ${
                currentState === 'fulfilled' ? 'border-green-500 bg-green-100 scale-110' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="text-4xl mb-3">✅</div>
                <div className="font-bold text-xl">Fulfilled</div>
                <div className="text-sm mt-2">Success!</div>
                {value && <div className="mt-3 bg-white px-3 py-1 rounded text-green-700 font-mono text-sm">{value}</div>}
              </div>
              
              <div className={`border-4 rounded-lg p-8 text-center transition-all ${
                currentState === 'rejected' ? 'border-red-500 bg-red-100 scale-110' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="text-4xl mb-3">❌</div>
                <div className="font-bold text-xl">Rejected</div>
                <div className="text-sm mt-2">Failed!</div>
                {error && <div className="mt-3 bg-white px-3 py-1 rounded text-red-700 font-mono text-sm">{error}</div>}
              </div>
            </div>
          </div>
        );
      }

      if (type === 'promise-creation') {
        const { stage, data, result } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            {stage === 'start' && (
              <>
                <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-6">
                  <div className="font-mono text-sm">fetch('/api/user')</div>
                </div>
                <div className="text-gray-600">Creating promise...</div>
              </>
            )}
            
            {stage === 'pending' && (
              <>
                <div className="bg-yellow-100 border-4 border-yellow-500 rounded-lg p-8 text-center animate-pulse">
                  <div className="text-4xl mb-3">⏳</div>
                  <div className="font-bold text-xl text-yellow-700">Promise Pending</div>
                  <div className="text-yellow-600 mt-2">Waiting for server...</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </>
            )}
            
            {stage === 'resolve' && (
              <>
                <div className="bg-green-100 border-4 border-green-500 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <div className="font-bold text-xl text-green-700">Promise Resolved!</div>
                </div>
                <div className="bg-white border-2 border-green-500 rounded-lg p-4 font-mono text-sm">
                  {data}
                </div>
              </>
            )}
            
            {stage === 'then' && (
              <>
                <div className="bg-purple-100 border-4 border-purple-500 rounded-lg p-6 text-center">
                  <div className="font-mono text-sm mb-2">.then(data =&gt; ...)</div>
                  <div className="text-purple-700 font-bold">{result}</div>
                </div>
              </>
            )}
          </div>
        );
      }

      if (type === 'promise-chain-messy') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="bg-gray-100 rounded-lg p-6 font-mono text-sm">
              <div className="text-red-600">fetchUser()</div>
              <div className="ml-4 text-red-600">.then(user =&gt; fetchPosts(user))</div>
              <div className="ml-8 text-red-600">.then(posts =&gt; fetchComments(posts))</div>
              <div className="ml-12 text-red-600">.then(comments =&gt; ...)</div>
            </div>
            <div className="mt-4 text-red-600 font-semibold">😵 Hard to read!</div>
          </div>
        );
      }

      if (type === 'async-await-clean') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="bg-green-50 rounded-lg p-6 font-mono text-sm border-2 border-green-500">
              <div className="text-green-700">const user = await fetchUser();</div>
              <div className="text-green-700">const posts = await fetchPosts(user);</div>
              <div className="text-green-700">const comments = await fetchComments(posts);</div>
            </div>
            <div className="mt-4 text-green-600 font-semibold">😊 Easy to read!</div>
          </div>
        );
      }

      if (type === 'await-execution') {
        const { stage, data } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 font-mono text-sm">
              <div>async function getData() {'{'}</div>
              <div className={`ml-4 ${stage === 'waiting' ? 'bg-yellow-200' : ''}`}>
                const data = await fetch('/api'); {stage === 'waiting' && '⏸️'}
              </div>
              <div className="ml-4">return data;</div>
              <div>{'}'}</div>
            </div>
            
            {stage === 'waiting' && (
              <div className="bg-yellow-100 border-4 border-yellow-500 rounded-lg p-6 text-center">
                <div className="text-2xl mb-2">⏸️</div>
                <div className="font-bold text-yellow-700">Function Paused</div>
                <div className="text-yellow-600 text-sm mt-2">Waiting for fetch() to complete...</div>
              </div>
            )}
            
            {stage === 'received' && (
              <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center">
                <div className="text-2xl mb-2">▶️</div>
                <div className="font-bold text-green-700">Function Resumed</div>
                <div className="text-green-600 text-sm mt-2">Got: {data}</div>
              </div>
            )}
          </div>
        );
      }

      if (type === 'async-flow') {
        const { step, line, status, data } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="text-lg font-bold text-gray-700">Step {step} of 4</div>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-6 font-mono text-sm min-w-[400px]">
              <div className="mb-2 text-blue-400">async function getData() {'{'}</div>
              <div className={`ml-4 mb-2 ${status ? 'bg-yellow-900' : ''}`}>
                {line}
                {status === 'paused' && <span className="ml-2 text-yellow-400">⏸️ PAUSED</span>}
                {status === 'waiting' && <span className="ml-2 text-yellow-400 animate-pulse">⏳ WAITING...</span>}
                {status === 'resumed' && <span className="ml-2 text-green-400">▶️ RESUMED</span>}
              </div>
              {data && (
                <div className="ml-4 text-green-400">// {data}</div>
              )}
              <div className="text-blue-400">{'}'}</div>
            </div>
            
            {status && (
              <div className={`border-4 rounded-lg p-4 text-center ${
                status === 'waiting' ? 'bg-yellow-100 border-yellow-500' :
                status === 'resumed' ? 'bg-green-100 border-green-500' :
                'bg-blue-100 border-blue-500'
              }`}>
                <div className={`font-bold ${
                  status === 'waiting' ? 'text-yellow-700' :
                  status === 'resumed' ? 'text-green-700' :
                  'text-blue-700'
                }`}>
                  {status === 'paused' && 'Function execution paused'}
                  {status === 'waiting' && 'Waiting for promise to resolve'}
                  {status === 'resumed' && 'Execution continues with data'}
                </div>
              </div>
            )}
          </div>
        );
      }

      if (type === 'code-crash') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-gray-900 text-red-400 rounded-lg p-6 font-mono text-sm">
              <div>function processData() {'{'}</div>
              <div className="ml-4">const data = JSON.parse(input);</div>
              <div className="ml-4 bg-red-900">// ❌ Error here</div>
              <div className="ml-4 opacity-50">console.log(data); // Never runs</div>
              <div className="opacity-50">{'}'}</div>
            </div>
            <div className="bg-red-100 border-4 border-red-500 rounded-lg p-6 text-center">
              <div className="text-4xl mb-2">💥</div>
              <div className="font-bold text-red-700 text-xl">App Crashed!</div>
              <div className="text-red-600 text-sm mt-2">No error handling</div>
            </div>
          </div>
        );
      }

      if (type === 'try-catch-flow') {
        const { block, status, error, message } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="flex items-center space-x-8">
              <div className={`border-4 rounded-lg p-6 text-center transition-all ${
                block === 'try' ? 'border-blue-500 bg-blue-100 scale-110' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="font-bold text-xl mb-2">TRY</div>
                <div className="text-sm">Run code</div>
                {status === 'error' && <div className="mt-2 text-red-600">❌ {error}</div>}
              </div>
              
              <div className="text-3xl">→</div>
              
              <div className={`border-4 rounded-lg p-6 text-center transition-all ${
                block === 'catch' ? 'border-red-500 bg-red-100 scale-110' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="font-bold text-xl mb-2">CATCH</div>
                <div className="text-sm">Handle error</div>
                {status === 'handled' && <div className="mt-2 text-green-600">✓ {message}</div>}
              </div>
            </div>
            
            {status === 'handled' && (
              <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center">
                <div className="text-2xl mb-2">✅</div>
                <div className="font-bold text-green-700">App Still Running!</div>
                <div className="text-green-600 text-sm mt-2">Error was caught and handled</div>
              </div>
            )}
          </div>
        );
      }

      if (type === 'try-catch-execution') {
        const { step, currentLine, success, jump, catching, cleanup } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="text-lg font-bold text-gray-700">Execution Flow - Step {step}</div>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-6 font-mono text-sm min-w-[400px]">
              <div className={`mb-2 ${currentLine.includes('try') ? 'bg-blue-900' : ''}`}>
                try {'{'}
              </div>
              <div className={`ml-4 mb-2 ${currentLine.includes('parseData') ? 'bg-yellow-900' : ''}`}>
                let data = parseData();
                {success === false && <span className="ml-2 text-red-400">❌ Error!</span>}
                {jump && <span className="ml-2 text-red-400">⤵️ Jump to catch</span>}
              </div>
              <div className="ml-4 mb-2 opacity-50">
                console.log(data); // Skipped
              </div>
              <div>{'}'}</div>
              <div className={`mt-2 ${catching ? 'bg-red-900' : ''}`}>
                catch (error) {'{'}
              </div>
              <div className="ml-4">
                handleError(error);
                {catching && <span className="ml-2 text-green-400">✓ Handling...</span>}
              </div>
              <div>{'}'}</div>
              <div className={`mt-2 ${cleanup ? 'bg-green-900' : ''}`}>
                finally {'{'}
              </div>
              <div className="ml-4">
                cleanup();
                {cleanup && <span className="ml-2 text-blue-400">✓ Always runs</span>}
              </div>
              <div>{'}'}</div>
            </div>
          </div>
        );
      }
      
      if (type === 'deep') {
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

      if (type === 'throttle-timeline' || type === 'debounce-timeline') {
        const { interval, delay, calls, executed } = currentStep.visual;
        const maxTime = Math.max(...calls) + (delay || interval);
        
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="text-lg font-bold text-gray-700">
              {type === 'throttle-timeline' ? `Throttle: ${interval}ms` : `Debounce: ${delay}ms`}
            </div>
            <div className="relative w-full max-w-3xl h-32 bg-gray-100 rounded-lg">
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300"></div>
              {calls.map((time, idx) => (
                <div key={idx} className="absolute" style={{ left: `${(time / maxTime) * 100}%` }}>
                  <div className="w-2 h-16 bg-blue-500 -ml-1"></div>
                  <div className="text-xs text-gray-600 -ml-4 mt-1">{time}ms</div>
                </div>
              ))}
              {executed.map((time, idx) => (
                <div key={idx} className="absolute" style={{ left: `${(time / maxTime) * 100}%` }}>
                  <div className="w-4 h-4 bg-green-500 rounded-full -ml-2 -mt-2 animate-pulse"></div>
                  <div className="text-xs font-bold text-green-600 -ml-6 mt-4">Execute</div>
                </div>
              ))}
            </div>
            <div className="flex space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-12 bg-blue-500"></div>
                <span>Function Call</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Actually Executed</span>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'promise-states') {
        return (
          <div className="flex items-center justify-center space-x-8 min-h-[300px]">
            <div className="bg-yellow-100 border-4 border-yellow-500 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-yellow-700">⏳</div>
              <div className="font-bold text-yellow-700 mt-2">Pending</div>
              <div className="text-sm text-yellow-600">Waiting...</div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="text-2xl">→</div>
                <div className="bg-green-100 border-4 border-green-500 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-green-700">✓</div>
                  <div className="font-bold text-green-700">Fulfilled</div>
                  <div className="text-sm text-green-600">Success</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-2xl">→</div>
                <div className="bg-red-100 border-4 border-red-500 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-red-700">✗</div>
                  <div className="font-bold text-red-700">Rejected</div>
                  <div className="text-sm text-red-600">Error</div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'promise-all-fail') {
        const { promises, result } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="flex space-x-4">
              {promises.map((success, idx) => (
                <div key={idx} className={`${success ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} border-2 rounded-lg p-4 text-center`}>
                  <div className="text-2xl">{success ? '✓' : '✗'}</div>
                  <div className="text-sm mt-2">Promise {idx + 1}</div>
                </div>
              ))}
            </div>
            <div className="text-4xl">↓</div>
            <div className="bg-red-200 border-4 border-red-600 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-red-700">Promise.all {result}</div>
              <div className="text-sm text-red-600 mt-2">One failure stops everything</div>
            </div>
          </div>
        );
      }

      if (type === 'use-case-table' || type === 'full-comparison-table') {
        const isFull = type === 'full-comparison-table';
        return (
          <div className="flex justify-center min-h-[300px] items-center">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="min-w-[600px]">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Method</th>
                    <th className="px-6 py-3 text-left">Resolves When</th>
                    <th className="px-6 py-3 text-left">Rejects When</th>
                    <th className="px-6 py-3 text-left">Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-gray-50">
                    <td className="px-6 py-3 font-mono text-sm font-bold">Promise.all</td>
                    <td className="px-6 py-3 text-sm">ALL succeed</td>
                    <td className="px-6 py-3 text-sm">ANY fails</td>
                    <td className="px-6 py-3 text-sm">Need all data</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-3 font-mono text-sm font-bold">Promise.allSettled</td>
                    <td className="px-6 py-3 text-sm">ALL complete</td>
                    <td className="px-6 py-3 text-sm">Never</td>
                    <td className="px-6 py-3 text-sm">Partial data OK</td>
                  </tr>
                  {isFull && (
                    <>
                      <tr className="border-b bg-gray-50">
                        <td className="px-6 py-3 font-mono text-sm font-bold">Promise.race</td>
                        <td className="px-6 py-3 text-sm">First completes</td>
                        <td className="px-6 py-3 text-sm">First rejects</td>
                        <td className="px-6 py-3 text-sm">Timeout, fastest</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3 font-mono text-sm font-bold">Promise.any</td>
                        <td className="px-6 py-3 text-sm">First succeeds</td>
                        <td className="px-6 py-3 text-sm">ALL fail</td>
                        <td className="px-6 py-3 text-sm">Fallback servers</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (type === 'performance') {
        const { before, after } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-12 min-h-[300px]">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-700 mb-2">Without Throttle</div>
              <div className="bg-red-100 border-2 border-red-400 rounded-lg p-6">
                <div className="text-4xl font-bold text-red-700">{before}</div>
                <div className="text-sm text-red-600 mt-2">function calls/sec</div>
              </div>
            </div>
            <div className="text-4xl text-green-600">→</div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-700 mb-2">With Throttle</div>
              <div className="bg-green-100 border-2 border-green-400 rounded-lg p-6">
                <div className="text-4xl font-bold text-green-700">{after}</div>
                <div className="text-sm text-green-600 mt-2">function calls/sec</div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'comparison') {
        const { debounce, throttle } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-12 min-h-[300px]">
            <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-8 text-center max-w-xs">
              <div className="text-2xl font-bold text-blue-700 mb-3">Debounce</div>
              <div className="text-blue-600">{debounce}</div>
              <div className="mt-4 text-sm text-blue-500">→ Waits for silence</div>
            </div>
            <div className="text-4xl">VS</div>
            <div className="bg-purple-100 border-4 border-purple-500 rounded-lg p-8 text-center max-w-xs">
              <div className="text-2xl font-bold text-purple-700 mb-3">Throttle</div>
              <div className="text-purple-600">{throttle}</div>
              <div className="mt-4 text-sm text-purple-500">→ Fixed rate execution</div>
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

      if (type === 'closure-use-cases') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
            <div className="text-lg font-bold text-gray-700 mb-2">Common Closure Use Cases</div>
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🔒</div>
                <div className="font-bold text-blue-700">Data Privacy</div>
                <div className="text-sm text-blue-600">Hide implementation details</div>
              </div>
              <div className="bg-purple-100 border-2 border-purple-500 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🏭</div>
                <div className="font-bold text-purple-700">Factory Functions</div>
                <div className="text-sm text-purple-600">Create objects with state</div>
              </div>
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">👆</div>
                <div className="font-bold text-green-700">Event Handlers</div>
                <div className="text-sm text-green-600">Remember context on click</div>
              </div>
              <div className="bg-orange-100 border-2 border-orange-500 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🔄</div>
                <div className="font-bold text-orange-700">Callbacks</div>
                <div className="text-sm text-orange-600">Async operations with data</div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'public-data-problem') {
        const { value } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-6 font-mono text-sm">
              <div>const user = {'{'}</div>
              <div className="ml-4">balance: 1000</div>
              <div>{'}'}</div>
            </div>
            
            <div className="text-3xl text-red-500">⚠️</div>
            
            <div className="bg-red-100 border-4 border-red-500 rounded-lg p-6 text-center animate-pulse">
              <div className="font-mono text-sm mb-2">user.balance = {value}</div>
              <div className="font-bold text-red-700 text-xl">Anyone can change it!</div>
              <div className="text-red-600 text-sm mt-2">No protection 😱</div>
            </div>
          </div>
        );
      }

      if (type === 'private-data-visual') {
        const { balance, locked } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-8 min-h-[300px]">
            <div className="bg-green-100 border-4 border-green-500 rounded-lg p-8 text-center">
              <div className="text-4xl mb-3">🔒</div>
              <div className="font-bold text-green-700 text-xl">balance</div>
              <div className="text-3xl font-mono mt-2">${balance}</div>
              {locked && <div className="text-green-600 text-sm mt-3">Private & Protected</div>}
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="bg-blue-100 border-2 border-blue-500 rounded-lg px-4 py-2 text-center">
                <div className="font-mono text-sm">deposit()</div>
              </div>
              <div className="bg-blue-100 border-2 border-blue-500 rounded-lg px-4 py-2 text-center">
                <div className="font-mono text-sm">withdraw()</div>
              </div>
              <div className="bg-blue-100 border-2 border-blue-500 rounded-lg px-4 py-2 text-center">
                <div className="font-mono text-sm">getBalance()</div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'access-denied') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-6 font-mono text-sm">
              <div>account.balance</div>
            </div>
            
            <div className="text-5xl text-red-600">🚫</div>
            
            <div className="bg-red-100 border-4 border-red-500 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-700">undefined</div>
              <div className="text-red-600 mt-2">Cannot access private variable!</div>
            </div>
            
            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 max-w-md text-center">
              <div className="text-green-700 font-bold">✓ Data is truly private</div>
            </div>
          </div>
        );
      }

      if (type === 'module-pattern') {
        const { private: privateVars, public: publicMethods } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-12 min-h-[300px]">
            <div className="bg-red-100 border-4 border-red-500 rounded-lg p-6">
              <div className="font-bold text-red-700 mb-3 text-center">🔒 Private</div>
              {privateVars.map((v, idx) => (
                <div key={idx} className="bg-white rounded px-3 py-2 mb-2 font-mono text-sm">
                  {v}
                </div>
              ))}
              <div className="text-red-600 text-xs mt-2 text-center">Hidden inside</div>
            </div>
            
            <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6">
              <div className="font-bold text-green-700 mb-3 text-center">🌐 Public</div>
              {publicMethods.map((m, idx) => (
                <div key={idx} className="bg-white rounded px-3 py-2 mb-2 font-mono text-sm">
                  {m}()
                </div>
              ))}
              <div className="text-green-600 text-xs mt-2 text-center">Accessible API</div>
            </div>
          </div>
        );
      }

      if (type === 'state-encapsulation') {
        const { items, total, canAccess } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-purple-900 text-white rounded-lg p-8 text-center">
              <div className="text-sm text-purple-300 mb-4">Internal State (Hidden)</div>
              <div className="space-y-3">
                <div className="bg-purple-800 rounded p-3">
                  <div className="text-xs text-purple-300">items</div>
                  <div className="text-2xl font-bold">{items}</div>
                </div>
                <div className="bg-purple-800 rounded p-3">
                  <div className="text-xs text-purple-300">total</div>
                  <div className="text-2xl font-bold">${total}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4">
              <div className="text-red-700 font-bold">
                {canAccess ? '✓ Accessible' : '✗ Cannot access directly'}
              </div>
            </div>
          </div>
        );
      }

      if (type === 'validation-visual') {
        return (
          <div className="flex items-center justify-center space-x-8 min-h-[300px]">
            <div className="text-center">
              <div className="bg-red-100 border-4 border-red-500 rounded-lg p-6 mb-3">
                <div className="text-4xl mb-2">❌</div>
                <div className="font-mono text-sm">setAge(-5)</div>
              </div>
              <div className="text-red-600 text-sm">Rejected!</div>
            </div>
            
            <div className="bg-gray-200 rounded-lg p-6">
              <div className="text-3xl">🛡️</div>
              <div className="font-bold mt-2">Validation</div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 mb-3">
                <div className="text-4xl mb-2">✓</div>
                <div className="font-mono text-sm">setAge(25)</div>
              </div>
              <div className="text-green-600 text-sm">Accepted!</div>
            </div>
          </div>
        );
      }

      if (type === 'privacy-benefits') {
        return (
          <div className="flex justify-center min-h-[300px] items-center">
            <div className="max-w-2xl space-y-3">
              <div className="bg-green-100 border-l-4 border-green-500 p-4">
                <div className="font-bold text-green-700">✓ Data Integrity</div>
                <div className="text-green-600 text-sm">Only change through controlled methods</div>
              </div>
              <div className="bg-blue-100 border-l-4 border-blue-500 p-4">
                <div className="font-bold text-blue-700">✓ Encapsulation</div>
                <div className="text-blue-600 text-sm">Hide implementation details</div>
              </div>
              <div className="bg-purple-100 border-l-4 border-purple-500 p-4">
                <div className="font-bold text-purple-700">✓ Security</div>
                <div className="text-purple-600 text-sm">Prevent unauthorized access</div>
              </div>
              <div className="bg-orange-100 border-l-4 border-orange-500 p-4">
                <div className="font-bold text-orange-700">✓ Maintainability</div>
                <div className="text-orange-600 text-sm">Change internals without breaking code</div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'factory-concept') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-8">
            <div className="text-lg font-bold text-gray-700">Factory Function Concept</div>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-6xl mb-3">⚙️</div>
                <div className="font-bold text-lg">Function</div>
                <div className="text-sm text-gray-600">(Factory)</div>
              </div>
              
              <div className="text-4xl">→</div>
              
              <div className="text-center">
                <div className="text-6xl mb-3">📦</div>
                <div className="font-bold text-lg">Objects</div>
                <div className="text-sm text-gray-600">(Products)</div>
              </div>
            </div>
            
            <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 max-w-md text-center">
              <div className="text-blue-700 font-bold">Call function → Get new object</div>
              <div className="text-blue-600 text-sm mt-1">No "new" keyword needed!</div>
            </div>
          </div>
        );
      }

      if (type === 'simple-factory') {
        const { output } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-8 min-h-[300px]">
            <div className="bg-purple-100 border-4 border-purple-500 rounded-lg p-6 text-center">
              <div className="font-mono text-sm mb-2">createDog('Max', 'Beagle')</div>
              <div className="text-3xl my-3">🏭</div>
              <div className="text-purple-700 font-bold">Factory Function</div>
            </div>
            
            <div className="text-4xl">→</div>
            
            <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">🐕</div>
              <div className="font-bold text-green-700">{output}</div>
              <div className="text-green-600 text-sm mt-2">{'{ name, breed, bark() }'}</div>
            </div>
          </div>
        );
      }

      if (type === 'multiple-objects') {
        const { objects } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-8 min-h-[300px]">
            {Array.from({ length: objects }).map((_, idx) => (
              <div key={idx} className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">📦</div>
                <div className="font-bold text-blue-700">Object {idx + 1}</div>
                <div className="text-blue-600 text-sm mt-2">Independent</div>
              </div>
            ))}
            <div className="absolute bottom-20 bg-green-100 border-2 border-green-500 rounded-lg p-3">
              <div className="text-green-700 font-bold">✓ Each has own closure!</div>
            </div>
          </div>
        );
      }

      if (type === 'factory-closure-magic') {
        const { name, remembered } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-purple-100 border-4 border-purple-500 rounded-lg p-6 text-center">
              <div className="text-sm text-purple-600 mb-2">Method:</div>
              <div className="font-mono text-sm">bark()</div>
            </div>
            
            <div className="text-3xl">↓</div>
            
            <div className="bg-green-100 border-4 border-green-500 rounded-lg p-8 text-center">
              <div className="text-3xl mb-3">🧠</div>
              <div className="font-bold text-green-700 text-lg">Remembers: {name}</div>
              {remembered && <div className="text-green-600 text-sm mt-2">Via closure!</div>}
            </div>
          </div>
        );
      }

      if (type === 'factory-private-state') {
        const { player, private: privateVars } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-12 min-h-[300px]">
            <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">👤</div>
              <div className="font-bold text-blue-700 text-xl">{player}</div>
              <div className="text-blue-600 text-sm">Player Object</div>
            </div>
            
            <div className="bg-red-100 border-4 border-red-500 rounded-lg p-6">
              <div className="font-bold text-red-700 mb-3 text-center">🔒 Private State</div>
              {privateVars.map((v, idx) => (
                <div key={idx} className="bg-white rounded px-4 py-2 mb-2 font-mono text-sm">
                  {v}
                </div>
              ))}
              <div className="text-red-600 text-xs mt-3 text-center">Hidden from outside</div>
            </div>
          </div>
        );
      }

      if (type === 'factory-multiple-players') {
        const { players } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-8 min-h-[300px]">
            {players.map((player, idx) => (
              <div key={idx} className="bg-purple-100 border-4 border-purple-500 rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">👤</div>
                <div className="font-bold text-purple-700">{player.name}</div>
                <div className="text-sm text-purple-600 mt-2">Score: {player.score}</div>
                <div className="text-xs text-purple-500 mt-2">Independent state</div>
              </div>
            ))}
          </div>
        );
      }

      if (type === 'config-factory') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6 text-center">
              <div className="font-mono text-sm mb-2">createMultiplier(2)</div>
              <div className="text-3xl my-2">→</div>
              <div className="font-mono text-sm">double = (num) =&gt; num * 2</div>
            </div>
            
            <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center">
              <div className="font-mono text-sm mb-2">createMultiplier(3)</div>
              <div className="text-3xl my-2">→</div>
              <div className="font-mono text-sm">triple = (num) =&gt; num * 3</div>
            </div>
            
            <div className="bg-purple-100 border-2 border-purple-500 rounded-lg p-4 max-w-md text-center">
              <div className="text-purple-700 font-bold">Pre-configured functions!</div>
              <div className="text-purple-600 text-sm mt-1">Each remembers its factor</div>
            </div>
          </div>
        );
      }

      if (type === 'factory-vs-constructor') {
        return (
          <div className="flex justify-center min-h-[300px] items-center">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl">
              <table className="w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Feature</th>
                    <th className="px-6 py-3 text-center">Factory</th>
                    <th className="px-6 py-3 text-center">Constructor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-3">Syntax</td>
                    <td className="px-6 py-3 text-center font-mono text-sm">createObj()</td>
                    <td className="px-6 py-3 text-center font-mono text-sm">new Obj()</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="px-6 py-3">Privacy</td>
                    <td className="px-6 py-3 text-center text-green-600">✓ Easy</td>
                    <td className="px-6 py-3 text-center text-red-600">✗ Harder</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-3">"new" keyword</td>
                    <td className="px-6 py-3 text-center text-green-600">Not needed</td>
                    <td className="px-6 py-3 text-center text-orange-600">Required</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-3">Flexibility</td>
                    <td className="px-6 py-3 text-center text-green-600">High</td>
                    <td className="px-6 py-3 text-center text-blue-600">Medium</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (type === 'event-handler-closure') {
        const { message, captured } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-8 min-h-[300px]">
            <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">📝</div>
              <div className="font-mono text-sm">{message}</div>
              <div className="text-blue-600 text-xs mt-2">Variable in scope</div>
            </div>
            
            <div className="text-4xl">→</div>
            
            <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">👆</div>
              <div className="font-bold text-green-700">Event Handler</div>
              {captured && <div className="text-green-600 text-sm mt-2">✓ Message captured!</div>}
            </div>
          </div>
        );
      }

      if (type === 'multiple-handlers') {
        const { handlers } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-8 min-h-[300px]">
            {Array.from({ length: handlers }).map((_, idx) => (
              <div key={idx} className="bg-purple-100 border-4 border-purple-500 rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">👆</div>
                <div className="font-bold text-purple-700">Handler {idx + 1}</div>
                <div className="text-purple-600 text-sm mt-2">Own message</div>
              </div>
            ))}
            <div className="absolute bottom-20 bg-green-100 border-2 border-green-500 rounded-lg p-3">
              <div className="text-green-700 font-bold">✓ Independent closures!</div>
            </div>
          </div>
        );
      }

      if (type === 'event-handler-flow') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="space-y-4">
              <div className="bg-blue-100 border-l-4 border-blue-500 p-4">
                <div className="font-bold text-blue-700">1. Button clicked</div>
              </div>
              <div className="text-3xl text-center">↓</div>
              <div className="bg-purple-100 border-l-4 border-purple-500 p-4">
                <div className="font-bold text-purple-700">2. Handler function runs</div>
              </div>
              <div className="text-3xl text-center">↓</div>
              <div className="bg-green-100 border-l-4 border-green-500 p-4">
                <div className="font-bold text-green-700">3. Accesses captured variable</div>
              </div>
              <div className="text-3xl text-center">↓</div>
              <div className="bg-orange-100 border-l-4 border-orange-500 p-4">
                <div className="font-bold text-orange-700">4. Uses closure data!</div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'debounce-handler') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-yellow-100 border-4 border-yellow-500 rounded-lg p-6 text-center">
              <div className="text-2xl mb-2">⏱️</div>
              <div className="font-bold text-yellow-700">timeoutId</div>
              <div className="text-yellow-600 text-sm mt-2">Captured in closure</div>
            </div>
            
            <div className="text-3xl">↓</div>
            
            <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6 text-center max-w-md">
              <div className="font-bold text-blue-700 mb-2">Each input event</div>
              <div className="text-blue-600 text-sm">Clears old timer, sets new one</div>
              <div className="text-blue-500 text-xs mt-2">Same timeoutId variable shared!</div>
            </div>
          </div>
        );
      }

      if (type === 'callback-concept') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-8">
            <div className="text-lg font-bold text-gray-700">Callback = Function as Argument</div>
            <div className="flex items-center space-x-8">
              <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">📦</div>
                <div className="font-bold text-blue-700">Function A</div>
                <div className="text-blue-600 text-sm mt-2">Receives callback</div>
              </div>
              
              <div className="text-4xl">←</div>
              
              <div className="bg-purple-100 border-4 border-purple-500 rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">⚙️</div>
                <div className="font-bold text-purple-700">Function B</div>
                <div className="text-purple-600 text-sm mt-2">Passed as argument</div>
              </div>
            </div>
            
            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 max-w-md text-center">
              <div className="text-green-700 font-bold">A calls B when ready!</div>
            </div>
          </div>
        );
      }

      if (type === 'simple-callback') {
        const { variable, captured } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6 text-center">
              <div className="font-mono text-sm mb-2">Outer Scope:</div>
              <div className="text-xl font-bold text-blue-700">{variable} = 'Alice'</div>
            </div>
            
            <div className="text-3xl">↓</div>
            
            <div className="bg-purple-100 border-4 border-purple-500 rounded-lg p-6 text-center">
              <div className="font-mono text-sm mb-2">{'setTimeout(() => {'}</div>
              <div className="text-lg text-purple-700">console.log({variable})</div>
              <div className="font-mono text-sm mt-2">{'}}, 1000)'}</div>
            </div>
            
            {captured && (
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4">
                <div className="text-green-700 font-bold">✓ {variable} captured by callback!</div>
              </div>
            )}
          </div>
        );
      }

      if (type === 'array-callback') {
        const { factor } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-orange-100 border-4 border-orange-500 rounded-lg p-6 text-center">
              <div className="text-sm text-orange-600 mb-2">Captured:</div>
              <div className="text-3xl font-bold text-orange-700">factor = {factor}</div>
            </div>
            
            <div className="text-3xl">↓</div>
            
            <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6">
              <div className="font-mono text-sm text-blue-700">
                [1, 2, 3].map(num =&gt; num * {factor})
              </div>
            </div>
            
            <div className="text-3xl">↓</div>
            
            <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center">
              <div className="font-mono text-sm text-green-700">[{factor * 1}, {factor * 2}, {factor * 3}]</div>
              <div className="text-green-600 text-xs mt-2">Each callback uses factor</div>
            </div>
          </div>
        );
      }

      if (type === 'callback-scope-access') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="space-y-4 max-w-2xl">
              <div className="bg-purple-100 border-l-4 border-purple-500 p-4">
                <div className="font-bold text-purple-700">Outer function creates variable</div>
              </div>
              <div className="text-3xl text-center">↓</div>
              <div className="bg-blue-100 border-l-4 border-blue-500 p-4">
                <div className="font-bold text-blue-700">Callback references that variable</div>
              </div>
              <div className="text-3xl text-center">↓</div>
              <div className="bg-green-100 border-l-4 border-green-500 p-4">
                <div className="font-bold text-green-700">Closure keeps it alive!</div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'async-callback') {
        const { captured } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-8 min-h-[300px]">
            <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6 text-center">
              <div className="text-2xl mb-2">📅</div>
              <div className="font-bold text-blue-700">{captured}</div>
              <div className="text-blue-600 text-sm mt-2">Captured at call time</div>
            </div>
            
            <div className="text-4xl">→</div>
            
            <div className="bg-purple-100 border-4 border-purple-500 rounded-lg p-6 text-center">
              <div className="text-2xl mb-2">⏳</div>
              <div className="font-bold text-purple-700">Async Operation</div>
              <div className="text-purple-600 text-sm mt-2">Takes time...</div>
            </div>
            
            <div className="text-4xl">→</div>
            
            <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center">
              <div className="text-2xl mb-2">✓</div>
              <div className="font-bold text-green-700">Callback Runs</div>
              <div className="text-green-600 text-sm mt-2">Still has {captured}!</div>
            </div>
          </div>
        );
      }

      if (type === 'callback-factory') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
            <div className="bg-purple-100 border-4 border-purple-500 rounded-lg p-8 text-center">
              <div className="text-3xl mb-3">🏭</div>
              <div className="font-bold text-purple-700 text-lg">createValidator()</div>
              <div className="text-purple-600 text-sm mt-2">Factory creates specialized callbacks</div>
            </div>
            
            <div className="flex space-x-4">
              <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 text-center">
                <div className="font-mono text-xs mb-2">emailValidator</div>
                <div className="text-sm text-blue-700">Checks emails</div>
              </div>
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center">
                <div className="font-mono text-xs mb-2">phoneValidator</div>
                <div className="text-sm text-green-700">Checks phones</div>
              </div>
              <div className="bg-orange-100 border-2 border-orange-500 rounded-lg p-4 text-center">
                <div className="font-mono text-xs mb-2">ageValidator</div>
                <div className="text-sm text-orange-700">Checks age</div>
              </div>
            </div>
          </div>
        );
      }

      if (type === 'callback-hell') {
        const { depth } = currentStep.visual;
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
            <div className="text-lg font-bold text-red-700">Callback Hell / Pyramid of Doom</div>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-6 font-mono text-xs">
              <div>getData(id, (data) =&gt; {'{'}</div>
              <div className="ml-4">getMore(data.id, (more) =&gt; {'{'}</div>
              <div className="ml-8">getEvenMore(more.id, (evenMore) =&gt; {'{'}</div>
              <div className="ml-12 text-red-400">// Hard to read! 😱</div>
              <div className="ml-8">{'}'})</div>
              <div className="ml-4">{'}'})</div>
              <div>{'}'})</div>
            </div>
            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4">
              <div className="text-red-700 font-bold">❌ Difficult to maintain</div>
            </div>
          </div>
        );
      }

      if (type === 'memoization-visual') {
        const { cache } = currentStep.visual;
        return (
          <div className="flex items-center justify-center space-x-8 min-h-[300px]">
            <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🔍</div>
              <div className="font-bold text-blue-700">Check Cache</div>
            </div>
            
            <div className="bg-purple-100 border-4 border-purple-500 rounded-lg p-6">
              <div className="font-bold text-purple-700 mb-3 text-center">💾 Cache</div>
              {Object.entries(cache).map(([key, val]) => (
                <div key={key} className="bg-white rounded px-4 py-2 mb-2 font-mono text-sm">
                  {key}: {val}
                </div>
              ))}
            </div>
            
            <div className="bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">⚡</div>
              <div className="font-bold text-green-700">Instant Return!</div>
              <div className="text-green-600 text-sm mt-2">No calculation needed</div>
            </div>
          </div>
        );
      }
    }

    if (currentStep.dom) {
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

    if (currentStep.stack !== undefined) {
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