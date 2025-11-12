export const RenderVisualization = ({ steps, currentStep }) => {
    if (steps.length === 0 || currentStep >= steps.length) return null;
    
    const step = steps[currentStep];
    const { data } = step;

    // N-Queens Visualization
    if (data.board && data.n && data.hasOwnProperty('queens')) {
      return (
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-1">
            {data.board.map((row, i) => (
              <div key={i} className="flex gap-1">
                {row.map((cell, j) => (
                  <div
                    key={j}
                    className={`w-12 h-12 flex items-center justify-center border-2 font-bold text-2xl transition-all ${
                      data.solution && cell === 'Q'
                        ? 'bg-green-500 text-white border-green-600'
                        : i === data.row && j === data.col && data.placed
                        ? 'bg-blue-500 text-white border-blue-600 scale-110'
                        : i === data.row && j === data.col && data.unsafe
                        ? 'bg-red-500 text-white border-red-600 scale-110'
                        : i === data.row && j === data.col
                        ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                        : cell === 'Q'
                        ? 'bg-purple-500 text-white border-purple-600'
                        : (i + j) % 2 === 0
                        ? 'bg-gray-100 border-gray-300'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {cell === 'Q' ? '♛' : ''}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="text-center text-sm font-semibold">
            {data.complete ? `Found ${data.solutionCount} solution(s)` : `Queens placed: ${data.queens.filter(q => q[1] >= 0).length}`}
          </div>
        </div>
      );
    }

    // Word Search Visualization
    if (data.board && data.word && data.path !== undefined) {
      return (
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-1">
            {data.board.map((row, i) => (
              <div key={i} className="flex gap-1">
                {row.map((cell, j) => {
                  const inPath = data.path.some(([r, c]) => r === i && c === j);
                  const isCurrent = data.current && data.current[0] === i && data.current[1] === j;
                  return (
                    <div
                      key={j}
                      className={`w-12 h-12 flex items-center justify-center border-2 font-bold text-lg transition-all ${
                        data.found && inPath
                          ? 'bg-green-500 text-white border-green-600'
                          : isCurrent && data.matching
                          ? 'bg-blue-500 text-white border-blue-600 scale-110'
                          : isCurrent
                          ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                          : inPath
                          ? 'bg-blue-300 text-white border-blue-400'
                          : cell === '#'
                          ? 'bg-gray-300 border-gray-400'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {cell}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold">Target: <span className="text-blue-600">{data.word}</span></div>
            <div className="text-sm text-gray-600">
              Progress: <span className="text-purple-600">{data.path.length} / {data.word.length}</span>
            </div>
          </div>
        </div>
      );
    }

    // Binary Tree Visualizations
    if (data.tree && data.hasOwnProperty('result') && Array.isArray(data.result)) {
      const renderTree = () => {
        const levels = [];
        let level = 0;
        let idx = 0;
        while (idx < data.tree.length) {
          const levelSize = Math.pow(2, level);
          levels.push(data.tree.slice(idx, idx + levelSize));
          idx += levelSize;
          level++;
        }

        return (
          <div className="flex flex-col items-center gap-2">
            {levels.map((level, i) => (
              <div key={i} className="flex gap-2 justify-center" style={{ minWidth: `${Math.pow(2, levels.length - i) * 60}px` }}>
                {level.map((val, j) => {
                  const nodeIdx = Math.pow(2, i) - 1 + j;
                  return val === null ? (
                    <div key={j} className="w-12 h-12" />
                  ) : (
                    <div
                      key={j}
                      className={`w-12 h-12 flex items-center justify-center border-2 rounded-full font-bold transition-all ${
                        data.complete && data.result.includes(val)
                          ? 'bg-green-500 text-white border-green-600'
                          : nodeIdx === data.current
                          ? data.phase === 'root'
                            ? 'bg-blue-500 text-white border-blue-600 scale-125'
                            : 'bg-yellow-400 text-white border-yellow-500 scale-110'
                          : data.result.includes(val)
                          ? 'bg-blue-200 border-blue-400'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );
      };

      return (
        <div className="space-y-4">
          {renderTree()}
          <div className="text-center">
            <div className="text-sm font-semibold">Result: <span className="text-blue-600">[{data.result.join(', ')}]</span></div>
            {data.phase && <div className="text-xs text-gray-600">Phase: {data.phase}</div>}
          </div>
        </div>
      );
    }

    // BST Validation Visualization
    if (data.tree && data.hasOwnProperty('valid') && data.hasOwnProperty('min')) {
      const renderBST = () => {
        const levels = [];
        let level = 0;
        let idx = 0;
        while (idx < data.tree.length) {
          const levelSize = Math.pow(2, level);
          levels.push(data.tree.slice(idx, idx + levelSize));
          idx += levelSize;
          level++;
        }

        return (
          <div className="flex flex-col items-center gap-2">
            {levels.map((level, i) => (
              <div key={i} className="flex gap-2 justify-center" style={{ minWidth: `${Math.pow(2, levels.length - i) * 60}px` }}>
                {level.map((val, j) => {
                  const nodeIdx = Math.pow(2, i) - 1 + j;
                  return val === null ? (
                    <div key={j} className="w-12 h-12" />
                  ) : (
                    <div
                      key={j}
                      className={`w-12 h-12 flex items-center justify-center border-2 rounded-full font-bold transition-all ${
                        data.complete
                          ? data.valid
                            ? 'bg-green-500 text-white border-green-600'
                            : 'bg-gray-300 border-gray-400'
                          : data.invalid && nodeIdx === data.current
                          ? 'bg-red-500 text-white border-red-600 scale-125'
                          : nodeIdx === data.current
                          ? 'bg-blue-500 text-white border-blue-600 scale-125'
                          : data.validated && nodeIdx < data.current
                          ? 'bg-green-200 border-green-400'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );
      };

      return (
        <div className="space-y-4">
          {renderBST()}
          <div className="text-center text-sm">
            {data.current !== null && !data.complete && (
              <div className="text-gray-600">
                Range: ({data.min === -Infinity ? '-∞' : data.min}, {data.max === Infinity ? '∞' : data.max})
              </div>
            )}
            {data.complete && (
              <div className={`font-bold text-lg ${data.valid ? 'text-green-600' : 'text-red-600'}`}>
                {data.valid ? '✓ Valid BST' : '✗ Not a Valid BST'}
              </div>
            )}
          </div>
        </div>
      );
    }

    // LCA Visualization
    if (data.tree && data.p !== undefined && data.q !== undefined) {
      const renderLCATree = () => {
        const levels = [];
        let level = 0;
        let idx = 0;
        while (idx < data.tree.length) {
          const levelSize = Math.pow(2, level);
          levels.push(data.tree.slice(idx, idx + levelSize));
          idx += levelSize;
          level++;
        }

        return (
          <div className="flex flex-col items-center gap-2">
            {levels.map((level, i) => (
              <div key={i} className="flex gap-2 justify-center" style={{ minWidth: `${Math.pow(2, levels.length - i) * 60}px` }}>
                {level.map((val, j) => {
                  const nodeIdx = Math.pow(2, i) - 1 + j;
                  return val === null ? (
                    <div key={j} className="w-12 h-12" />
                  ) : (
                    <div
                      key={j}
                      className={`w-12 h-12 flex items-center justify-center border-2 rounded-full font-bold transition-all ${
                        data.lca === val
                          ? 'bg-purple-500 text-white border-purple-600 scale-125'
                          : val === data.p || val === data.q
                          ? 'bg-blue-500 text-white border-blue-600 scale-110'
                          : nodeIdx === data.current
                          ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );
      };

      return (
        <div className="space-y-4">
          {renderLCATree()}
          <div className="text-center text-sm">
            <div>Targets: <span className="text-blue-600">p={data.p}, q={data.q}</span></div>
            {data.lca !== null && (
              <div className="text-purple-600 font-bold text-lg mt-2">LCA: {data.lca}</div>
            )}
          </div>
        </div>
      );
    }

    // Backtracking Results Visualization (Permutations, Combinations, Subsets)
    if (data.hasOwnProperty('result') && Array.isArray(data.result) && data.result.length > 0 && data.result[0] && Array.isArray(data.result[0])) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-blue-50 px-4 py-3 rounded-lg border-2 border-blue-300">
              <div className="text-sm font-semibold text-gray-600 mb-1">Current:</div>
              <div className="font-bold text-blue-600">
                {data.current.length > 0 ? `[${data.current.join(', ')}]` : '[]'}
              </div>
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-semibold mb-2">Generated ({data.result.length}):</div>
            <div className="flex flex-wrap gap-2">
              {data.result.map((arr, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1 rounded border font-bold text-sm ${
                    data.found && idx === data.result.length - 1
                      ? 'bg-green-100 border-green-300 text-green-700'
                      : 'bg-blue-100 border-blue-300'
                  }`}
                >
                  [{arr.join(', ')}]
                </div>
              ))}
            </div>
          </div>
          <div className="text-center text-sm">
            <span className="text-gray-600">Depth: </span>
            <span className="text-purple-600 font-semibold">{data.depth}</span>
          </div>
        </div>
      );
    }

    // 2D DP Table Visualization (Knapsack, Edit Distance)
    if (data.dp && Array.isArray(data.dp) && data.dp[0] && Array.isArray(data.dp[0]) && data.dp[0].length > 1) {
      const isKnapsack = data.weights !== undefined;
      return (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="mx-auto border-collapse text-xs">
              <tbody>
                {data.dp.slice(0, Math.min(data.i + 1, data.dp.length)).map((row, i) => (
                  <tr key={i}>
                    {row.slice(0, Math.min(data.w + 2, row.length)).map((val, j) => (
                      <td
                        key={j}
                        className={`border-2 w-10 h-10 text-center font-bold transition-all ${
                          i === data.i && j === data.w
                            ? 'bg-blue-500 text-white border-blue-600 scale-110'
                            : val > 0
                            ? 'bg-green-100 border-green-300'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center text-sm font-semibold">
            {data.complete && (
              <div className="text-green-600 text-lg">
                {isKnapsack ? `Max Value: ${data.dp[data.i][data.w]}` : `Min Distance: ${data.dp[data.i][data.j]}`}
              </div>
            )}
          </div>
        </div>
      );
    }

    // 1D DP Array Visualization (LIS)
    if (data.nums && data.dp && !Array.isArray(data.dp[0]) && data.hasOwnProperty('maxLen')) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            {data.nums.map((num, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold transition-all ${
                    idx === data.i
                      ? 'bg-blue-500 text-white border-blue-600 scale-110'
                      : idx === data.j
                      ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {num}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  dp: {data.dp[idx]}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center text-lg font-bold text-green-600">
            Max LIS Length: {data.maxLen}
          </div>
        </div>
      );
    }

    // Dijkstra's Algorithm Visualization
    if (data.graph && data.distances && data.pq !== undefined) {
      const nodes = Object.keys(data.graph);
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {nodes.map((node) => (
              <div key={node} className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 flex items-center justify-center border-2 rounded-full font-bold transition-all ${
                    data.complete
                      ? 'bg-green-500 text-white border-green-600'
                      : node === data.current
                      ? 'bg-blue-500 text-white border-blue-600 scale-125'
                      : data.visited.includes(node)
                      ? 'bg-green-200 border-green-400'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {node}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  d: {data.distances[node] === Infinity ? '∞' : data.distances[node]}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm font-semibold mb-2">Priority Queue:</div>
            <div className="flex gap-2 flex-wrap">
              {data.pq.length === 0 ? (
                <span className="text-gray-400">Empty</span>
              ) : (
                data.pq.map(([dist, node], i) => (
                  <div key={i} className="bg-yellow-100 px-3 py-1 rounded border border-yellow-300 text-sm font-bold">
                    {node}({dist})
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      );
    }

    // Trie Visualization
    if (data.trie && data.words) {
      const renderTrieLevel = (node, depth = 0) => {
        const entries = Object.entries(node.children || {});
        if (entries.length === 0) return null;
        
        return (
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-3 justify-center flex-wrap">
              {entries.map(([char, child]) => (
                <div key={char} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 flex items-center justify-center border-2 rounded-full font-bold text-lg transition-all ${
                      data.path && data.path.includes(char)
                        ? 'bg-blue-500 text-white border-blue-600 scale-110'
                        : child.isEnd
                        ? 'bg-green-400 text-white border-green-500'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {char}
                  </div>
                  {child.isEnd && <span className="text-xs text-green-600 font-bold">✓ END</span>}
                  {renderTrieLevel(child, depth + 1)}
                </div>
              ))}
            </div>
          </div>
        );
      };

      return (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-3">
              {data.phase === 'insert' && `Inserting: "${data.current}" → Path: "${data.path}"`}
              {data.phase === 'search' && `Searching: "${data.search}" → Current: "${data.path || ''}"`}
              {data.phase === 'init' && 'Initialize Trie'}
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 flex items-center justify-center border-2 rounded-full font-bold bg-purple-500 text-white border-purple-600">
                ROOT
              </div>
              {renderTrieLevel(data.trie)}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-sm">
            <div className="font-semibold mb-1">Words in Trie:</div>
            <div className="flex gap-2 flex-wrap">
              {data.words.map((word, i) => (
                <span key={i} className="bg-green-100 px-2 py-1 rounded border border-green-300 font-semibold">
                  {word}
                </span>
              ))}
            </div>
          </div>
          {data.found !== undefined && (
            <div className={`text-center font-bold text-lg ${data.found ? 'text-green-600' : 'text-red-600'}`}>
              {data.found ? `✓ "${data.search}" found in Trie!` : `✗ "${data.search}" not found`}
            </div>
          )}
        </div>
      );
    }

    // Segment Tree Visualization
    if (data.arr && data.tree && data.phase) {
      const maxDepth = Math.ceil(Math.log2(data.tree.length));
      const levels = [];
      
      for (let d = 0; d <= maxDepth && Math.pow(2, d) - 1 < data.tree.length; d++) {
        const start = Math.pow(2, d) - 1;
        const end = Math.min(Math.pow(2, d + 1) - 1, data.tree.length);
        levels.push(data.tree.slice(start, end));
      }

      return (
        <div className="space-y-4">
          <div className="text-center text-sm font-semibold text-gray-600 mb-2">
            {data.phase === 'build' && 'Building Segment Tree'}
            {data.phase === 'query' && `Query Range: [${data.queryRange[0]}, ${data.queryRange[1]}]`}
            {data.phase === 'complete' && `Query Result: ${data.result}`}
          </div>
          
          <div>
            <div className="text-xs text-gray-600 mb-2">Original Array:</div>
            <div className="flex gap-1 justify-center">
              {data.arr.map((val, i) => (
                <div key={i} className="w-10 h-10 flex items-center justify-center border-2 rounded bg-blue-100 border-blue-300 text-sm font-bold">
                  {val}
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex flex-col items-center gap-2 min-w-max">
              {levels.map((level, d) => (
                <div key={d} className="flex gap-2 justify-center">
                  {level.map((val, i) => {
                    const nodeIdx = Math.pow(2, d) - 1 + i;
                    return (
                      <div
                        key={i}
                        className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold text-sm transition-all ${
                          nodeIdx === data.node && data.phase === 'query' && data.covered
                            ? 'bg-green-500 text-white border-green-600 scale-110'
                            : nodeIdx === data.node
                            ? 'bg-blue-500 text-white border-blue-600 scale-110'
                            : val > 0
                            ? 'bg-purple-100 border-purple-300'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {val}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {data.result !== undefined && (
            <div className="text-center text-lg font-bold text-green-600">
              Sum = {data.result}
            </div>
          )}
        </div>
      );
    }
    if (data.n !== undefined && data.parent && data.rank && data.edges) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: data.n }, (_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 flex items-center justify-center border-2 rounded-full font-bold transition-all ${
                    data.current && data.current.includes(i)
                      ? 'bg-blue-500 text-white border-blue-600 scale-110'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {i}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  p:{data.parent[i]} r:{data.rank[i]}
                </div>
              </div>
            ))}
          </div>
          {data.current && (
            <div className="text-center text-sm font-semibold text-blue-600">
              Processing edge: ({data.current[0]}, {data.current[1]})
            </div>
          )}
        </div>
      );
    }

    // Kruskal's MST Visualization
    if (data.edges && data.mst && Array.isArray(data.edges[0]) && data.edges[0].length === 3) {
      return (
        <div className="space-y-4">
          <div className="max-h-48 overflow-y-auto bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-semibold mb-2">Edges (sorted by weight):</div>
            <div className="space-y-1">
              {data.edges.map(([u, v, w], idx) => {
                const inMST = data.mst.some(([mu, mv]) => (mu === u && mv === v) || (mu === v && mv === u));
                const isCurrent = data.current && data.current[0] === u && data.current[1] === v;
                return (
                  <div
                    key={idx}
                    className={`px-3 py-1 rounded border text-sm font-bold ${
                      isCurrent && data.added
                        ? 'bg-green-100 border-green-300 text-green-700'
                        : isCurrent && data.cycle
                        ? 'bg-red-100 border-red-300 text-red-700'
                        : isCurrent
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : inMST
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    ({u} - {v}) : {w}
                  </div>
                );
              })}
            </div>
          </div>
          {data.complete && (
            <div className="text-center text-lg font-bold text-green-600">
              Total MST Weight: {data.totalWeight}
            </div>
          )}
        </div>
      );
    }

    // Topological Sort Visualization
    if (data.graph && data.stack && data.hasOwnProperty('visited')) {
      const nodes = Object.keys(data.graph).map(Number);
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {nodes.map((node) => (
              <div key={node} className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 flex items-center justify-center border-2 rounded-full font-bold transition-all ${
                    node === data.current
                      ? 'bg-blue-500 text-white border-blue-600 scale-125'
                      : data.visited.includes(node)
                      ? 'bg-green-200 border-green-400'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {node}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-semibold mb-2">Topological Order:</div>
            <div className="flex gap-2 justify-center flex-wrap">
              {data.stack.map((node, i) => (
                <div key={i} className="bg-purple-100 px-3 py-2 rounded border border-purple-300 font-bold">
                  {node}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Bellman-Ford Visualization
    if (data.n && data.distances && data.iteration !== undefined && data.start !== undefined) {
      return (
        <div className="space-y-4">
          <div className="text-center text-sm font-semibold text-gray-600 mb-2">
            Iteration: {data.iteration} / {data.n - 1}
          </div>
          <div className="flex items-center justify-center gap-2">
            {data.distances.map((dist, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 flex items-center justify-center border-2 rounded-full font-bold transition-all ${
                    idx === data.start
                      ? 'bg-purple-500 text-white border-purple-600'
                      : data.updated === idx
                      ? 'bg-blue-500 text-white border-blue-600 scale-110'
                      : dist !== Infinity
                      ? 'bg-green-200 border-green-400'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {idx}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {dist === Infinity ? '∞' : dist}
                </div>
              </div>
            ))}
          </div>
          {data.negativeCycle && (
            <div className="text-center text-lg font-bold text-red-600">
              ⚠️ Negative Cycle Detected!
            </div>
          )}
        </div>
      );
    }

    // Huffman Coding Visualization
    if (data.codes && data.heap) {
      return (
        <div className="space-y-4">
          <div className="text-center text-sm font-semibold text-gray-600 mb-2">
            {data.phase === 'build' && 'Building Huffman Tree'}
            {data.phase === 'codes' && 'Generating Codes'}
            {data.phase === 'complete' && 'Huffman Coding Complete'}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
            <div className="text-sm font-semibold mb-2">Huffman Codes:</div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(data.codes).map(([char, code]) => (
                <div
                  key={char}
                  className={`px-3 py-2 rounded border font-bold text-sm ${
                    char === data.current
                      ? 'bg-blue-100 border-blue-300'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  '{char}' → {code}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // A* Pathfinding Visualization
    if (data.grid && data.start && data.goal) {
      return (
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-1">
            {data.grid.map((row, i) => (
              <div key={i} className="flex gap-1">
                {row.map((cell, j) => {
                  const pos = `${i},${j}`;
                  const inPath = data.path && data.path.includes(pos);
                  const inOpen = data.openSet && data.openSet.includes(pos);
                  const inClosed = data.closedSet && data.closedSet.includes(pos);
                  return (
                    <div
                      key={j}
                      className={`w-12 h-12 flex items-center justify-center border-2 font-bold text-xs transition-all ${
                        pos === data.start
                          ? 'bg-green-500 text-white border-green-600'
                          : pos === data.goal
                          ? 'bg-red-500 text-white border-red-600'
                          : inPath
                          ? 'bg-blue-400 text-white border-blue-500'
                          : pos === data.current
                          ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                          : inOpen
                          ? 'bg-green-100 border-green-300'
                          : inClosed
                          ? 'bg-gray-200 border-gray-300'
                          : cell === 1
                          ? 'bg-gray-800 border-gray-900'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {pos === data.start && 'S'}
                      {pos === data.goal && 'G'}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {data.complete && (
            <div className="text-center text-lg font-bold text-green-600">
              Path Length: {data.path.length}
            </div>
          )}
        </div>
      );
    }

    // Max Flow Visualization
    if (data.source && data.sink && data.residual) {
      const nodes = Object.keys(data.graph);
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {nodes.map((node) => (
              <div
                key={node}
                className={`w-16 h-16 flex items-center justify-center border-2 rounded-full font-bold ${
                  node === data.source
                    ? 'bg-green-500 text-white border-green-600'
                    : node === data.sink
                    ? 'bg-red-500 text-white border-red-600'
                    : 'bg-white border-gray-300'
                }`}
              >
                {node}
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              Total Flow: {data.flow}
            </div>
            {data.pathFlow && (
              <div className="text-sm text-gray-600">
                Current path flow: +{data.pathFlow}
              </div>
            )}
          </div>
        </div>
      );
    }

    // KMP Pattern Matching Visualization
    if (data.text && data.pattern && data.lps) {
      return (
        <div className="space-y-4">
          <div>
            <div className="text-sm font-semibold text-gray-600 mb-2">Text:</div>
            <div className="flex gap-1 justify-center flex-wrap">
              {data.text.split('').map((char, idx) => (
                <div
                  key={idx}
                  className={`w-10 h-10 flex items-center justify-center border-2 rounded font-bold ${
                    data.matches.some(m => idx >= m && idx < m + data.pattern.length)
                      ? 'bg-green-500 text-white border-green-600'
                      : idx === data.i
                      ? 'bg-blue-500 text-white border-blue-600 scale-110'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {char}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-600 mb-2">Pattern:</div>
            <div className="flex gap-1 justify-center">
              {data.pattern.split('').map((char, idx) => (
                <div
                  key={idx}
                  className={`w-10 h-10 flex items-center justify-center border-2 rounded font-bold ${
                    idx === data.j
                      ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                      : 'bg-purple-100 border-purple-300'
                  }`}
                >
                  {char}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm font-semibold mb-1">LPS Array:</div>
            <div className="flex gap-2 justify-center">
              {data.lps.map((val, i) => (
                <div key={i} className="bg-blue-100 px-2 py-1 rounded border border-blue-300 text-sm font-bold">
                  {val}
                </div>
              ))}
            </div>
          </div>
          {data.matches.length > 0 && (
            <div className="text-center text-sm font-semibold text-green-600">
              Matches at indices: {data.matches.join(', ')}
            </div>
          )}
        </div>
      );
    }

    // Contains Duplicate Visualization
    if (data.nums && data.seen !== undefined && data.hasOwnProperty('duplicate') && !data.hasOwnProperty('duplicateValue')) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {data.nums.map((num, idx) => (
              <div
                key={idx}
                className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                  data.complete && !data.duplicate
                    ? 'bg-green-500 text-white border-green-600'
                    : idx === data.current && data.duplicate
                    ? 'bg-red-500 text-white border-red-600 scale-125 animate-pulse'
                    : idx === data.current
                    ? 'bg-blue-500 text-white border-blue-600 scale-110'
                    : idx < data.current
                    ? 'bg-gray-100 border-gray-300'
                    : 'bg-white border-gray-300'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-semibold mb-2">Set (Seen Elements):</div>
            <div className="flex gap-2 flex-wrap justify-center min-h-12 items-center">
              {data.seen.length === 0 ? (
                <span className="text-gray-400">Empty</span>
              ) : (
                data.seen.map((num, i) => (
                  <div key={i} className="bg-blue-100 px-3 py-2 rounded border border-blue-300 font-bold">
                    {num}
                  </div>
                ))
              )}
            </div>
          </div>
          {data.duplicate !== null && (
            <div className={`text-center text-lg font-bold ${data.duplicate ? 'text-red-600' : 'text-green-600'}`}>
              {data.duplicate ? `✗ Duplicate Found: ${data.duplicateValue}` : '✓ No Duplicates'}
            </div>
          )}
        </div>
      );
    }

    // Valid Anagram Visualization
    if (data.s && data.t && data.count !== undefined && data.phase) {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-2">String 1: "{data.s.join('')}"</div>
              <div className="flex gap-1 justify-center flex-wrap">
                {data.s.map((char, idx) => (
                  <div
                    key={idx}
                    className={`w-10 h-10 flex items-center justify-center border-2 rounded-lg font-bold ${
                      data.phase === 'counting' && idx === data.current
                        ? 'bg-blue-500 text-white border-blue-600 scale-110'
                        : data.phase === 'counting' && idx < data.current
                        ? 'bg-blue-200 border-blue-400'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {char}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-2">String 2: "{data.t.join('')}"</div>
              <div className="flex gap-1 justify-center flex-wrap">
                {data.t.map((char, idx) => (
                  <div
                    key={idx}
                    className={`w-10 h-10 flex items-center justify-center border-2 rounded-lg font-bold ${
                      data.phase === 'verifying' && idx === data.current
                        ? 'bg-purple-500 text-white border-purple-600 scale-110'
                        : data.phase === 'verifying' && idx < data.current
                        ? 'bg-purple-200 border-purple-400'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {char}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-semibold mb-2">Character Count:</div>
            <div className="flex gap-2 flex-wrap justify-center">
              {Object.keys(data.count).length === 0 ? (
                <span className="text-gray-400">Empty</span>
              ) : (
                Object.entries(data.count).map(([char, count]) => (
                  <div
                    key={char}
                    className={`px-3 py-2 rounded border font-bold ${
                      count === 0
                        ? 'bg-gray-200 border-gray-300 text-gray-500'
                        : 'bg-green-100 border-green-300 text-green-700'
                    }`}
                  >
                    '{char}': {count}
                  </div>
                ))
              )}
            </div>
          </div>
          {data.isAnagram !== null && (
            <div className={`text-center text-lg font-bold ${data.isAnagram ? 'text-green-600' : 'text-red-600'}`}>
              {data.isAnagram ? '✓ Valid Anagrams!' : '✗ Not Anagrams'}
            </div>
          )}
        </div>
      );
    }

    // Group Anagrams Visualization
    if (data.strs && data.groups !== undefined && Array.isArray(data.groups)) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {data.strs.map((str, idx) => (
              <div
                key={idx}
                className={`px-4 py-2 rounded-lg border-2 font-bold transition-all ${
                  idx === data.current && data.newGroup
                    ? 'bg-green-400 text-white border-green-500 scale-110'
                    : idx === data.current
                    ? 'bg-blue-500 text-white border-blue-600 scale-110'
                    : idx < data.current
                    ? 'bg-gray-100 border-gray-300'
                    : 'bg-white border-gray-300'
                }`}
              >
                {str}
              </div>
            ))}
          </div>
          {data.sortedKey && (
            <div className="text-center text-sm">
              <span className="text-gray-600">Sorted Key: </span>
              <span className="text-blue-600 font-semibold">"{data.sortedKey}"</span>
            </div>
          )}
          <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
            <div className="text-sm font-semibold mb-3">Anagram Groups ({data.groups.length}):</div>
            <div className="space-y-3">
              {data.groups.map((group, i) => (
                <div key={i} className="bg-white p-3 rounded-lg border border-gray-300">
                  <div className="text-xs text-gray-500 mb-1">Group {i + 1}:</div>
                  <div className="flex gap-2 flex-wrap">
                    {group.map((word, j) => (
                      <div
                        key={j}
                        className={`px-3 py-1 rounded border font-bold ${
                          word === data.added
                            ? 'bg-blue-100 border-blue-300 text-blue-700'
                            : 'bg-purple-100 border-purple-300 text-purple-700'
                        }`}
                      >
                        {word}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Container With Most Water Visualization
    if (data.height && data.hasOwnProperty('maxArea') && data.hasOwnProperty('left') && data.hasOwnProperty('right')) {
      return (
        <div className="space-y-4">
          <div className="flex items-end justify-center gap-1">
            {data.height.map((h, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-10 border-2 rounded-t-lg font-bold text-xs flex items-end justify-center pb-1 transition-all ${
                    data.complete && (idx === data.maxLeft || idx === data.maxRight)
                      ? 'bg-green-500 text-white border-green-600'
                      : data.newMax && (idx === data.left || idx === data.right)
                      ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                      : idx === data.left || idx === data.right
                      ? 'bg-blue-500 text-white border-blue-600 scale-105'
                      : 'bg-gray-400 text-white border-gray-500'
                  }`}
                  style={{ height: `${h * 20}px`, minHeight: '30px' }}
                >
                  {h}
                </div>
                <div className="text-xs text-gray-500 mt-1">{idx}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
              <div>Left: <span className="text-blue-600">{data.left}</span> (h={data.height[data.left]})</div>
              <div>Right: <span className="text-blue-600">{data.right}</span> (h={data.height[data.right]})</div>
              <div>Current Area: <span className="text-purple-600">{data.currentArea}</span></div>
              <div>Max Area: <span className="text-green-600">{data.maxArea}</span></div>
            </div>
          </div>
          {data.complete && (
            <div className="text-center text-lg font-bold text-green-600">
              Maximum Area: {data.maxArea} (indices [{data.maxLeft}, {data.maxRight}])
            </div>
          )}
        </div>
      );
    }

    // Valid Sudoku Visualization
    if (data.board && data.rows && data.cols && data.boxes) {
      const getBoxBorder = (i, j) => {
        let classes = 'border-2';
        if (i % 3 === 0) classes += ' border-t-4';
        if (j % 3 === 0) classes += ' border-l-4';
        if (i === 8) classes += ' border-b-4';
        if (j === 8) classes += ' border-r-4';
        return classes;
      };

      const isInConflictZone = (i, j) => {
        if (!data.current || !data.conflict) return false;
        const [currI, currJ] = data.current;
        
        if (data.conflict === 'row' && i === data.conflictIndex) return true;
        if (data.conflict === 'col' && j === data.conflictIndex) return true;
        if (data.conflict === 'box') {
          const boxI = Math.floor(i / 3);
          const boxJ = Math.floor(j / 3);
          const conflictBoxI = Math.floor(data.conflictIndex / 3);
          const conflictBoxJ = data.conflictIndex % 3;
          return boxI === conflictBoxI && boxJ === conflictBoxJ;
        }
        return false;
      };

      return (
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-0">
            {data.board.map((row, i) => (
              <div key={i} className="flex gap-0">
                {row.map((cell, j) => {
                  const isCurrent = data.current && data.current[0] === i && data.current[1] === j;
                  const inConflict = isInConflictZone(i, j);
                  
                  return (
                    <div
                      key={j}
                      className={`w-10 h-10 flex items-center justify-center font-bold text-lg transition-all ${getBoxBorder(i, j)} ${
                        !data.valid && isCurrent
                          ? 'bg-red-500 text-white border-red-600 scale-110 animate-pulse'
                          : isCurrent && data.added
                          ? 'bg-green-400 text-white border-green-500 scale-110'
                          : isCurrent
                          ? 'bg-blue-500 text-white border-blue-600 scale-110'
                          : !data.valid && inConflict
                          ? 'bg-red-100 border-red-300'
                          : data.complete && cell !== '.'
                          ? 'bg-green-100 border-green-300'
                          : cell === '.'
                          ? 'bg-gray-50 border-gray-300'
                          : 'bg-white border-gray-400'
                      }`}
                    >
                      {cell === '.' ? '' : cell}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="font-semibold mb-1">Row {data.current ? data.current[0] : '-'}:</div>
              <div className="flex gap-1 flex-wrap">
                {data.current && data.rows[data.current[0]].length > 0 ? (
                  data.rows[data.current[0]].map((num, i) => (
                    <span key={i} className="bg-blue-100 px-2 py-1 rounded border border-blue-300 font-bold">
                      {num}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">Empty</span>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="font-semibold mb-1">Col {data.current ? data.current[1] : '-'}:</div>
              <div className="flex gap-1 flex-wrap">
                {data.current && data.cols[data.current[1]].length > 0 ? (
                  data.cols[data.current[1]].map((num, i) => (
                    <span key={i} className="bg-purple-100 px-2 py-1 rounded border border-purple-300 font-bold">
                      {num}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">Empty</span>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="font-semibold mb-1">Box {data.boxIndex !== undefined ? data.boxIndex : '-'}:</div>
              <div className="flex gap-1 flex-wrap">
                {data.boxIndex !== undefined && data.boxes[data.boxIndex].length > 0 ? (
                  data.boxes[data.boxIndex].map((num, i) => (
                    <span key={i} className="bg-green-100 px-2 py-1 rounded border border-green-300 font-bold">
                      {num}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">Empty</span>
                )}
              </div>
            </div>
          </div>

          {data.valid !== null && (
            <div className={`text-center text-lg font-bold ${data.valid ? 'text-green-600' : 'text-red-600'}`}>
              {data.complete ? '✓ Valid Sudoku Board!' : !data.valid ? `✗ Invalid! Duplicate in ${data.conflict}` : ''}
            </div>
          )}
        </div>
      );
    }

    // Bubble Sort Visualization
    if (data.nums && data.hasOwnProperty('sorted') && data.hasOwnProperty('j')) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {data.nums.map((num, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                  data.complete
                    ? 'bg-green-500 text-white border-green-600'
                    : idx >= data.nums.length - data.sorted
                    ? 'bg-green-400 text-white border-green-500'
                    : idx === data.j || idx === data.j + 1
                    ? data.swapped
                      ? 'bg-red-500 text-white border-red-600 scale-110'
                      : 'bg-blue-500 text-white border-blue-600 scale-110'
                    : 'bg-white border-gray-300'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 text-sm font-semibold">
            <span className="text-blue-600">Pass: {data.i + 1}</span>
            <span className="text-purple-600">Comparing: {data.j >= 0 ? `${data.j} & ${data.j + 1}` : '-'}</span>
            <span className="text-green-600">Sorted: {data.sorted} elements</span>
          </div>
        </div>
      );
    }

    // Kadane's Algorithm (Max Subarray) Visualization
    if (data.nums && data.hasOwnProperty('maxSum') && data.hasOwnProperty('currentSum')) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {data.nums.map((num, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                  data.complete && idx >= data.subarrayStart && idx <= data.subarrayEnd
                    ? 'bg-green-500 text-white border-green-600 scale-105'
                    : data.newMax && idx >= data.subarrayStart && idx <= data.subarrayEnd
                    ? 'bg-yellow-400 text-white border-yellow-500 scale-105'
                    : idx === data.current
                    ? 'bg-blue-500 text-white border-blue-600 scale-110'
                    : idx >= data.subarrayStart && idx <= data.subarrayEnd
                    ? 'bg-blue-200 border-blue-400'
                    : idx <= data.current
                    ? 'bg-gray-100 border-gray-300'
                    : 'bg-white border-gray-300'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
              <div>Current Sum: <span className="text-blue-600">{data.currentSum}</span></div>
              <div>Max Sum: <span className="text-green-600">{data.maxSum}</span></div>
              <div className="col-span-2">
                Subarray: <span className="text-purple-600">[{data.subarrayStart}..{data.subarrayEnd}]</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Valid Parentheses (Stack) Visualization
    if (data.chars && data.stack !== undefined) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {data.chars.map((char, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-2xl transition-all ${
                  data.error && idx === data.current
                    ? 'bg-red-500 text-white border-red-600 scale-110'
                    : data.matched && idx === data.current
                    ? 'bg-green-500 text-white border-green-600 scale-110'
                    : idx === data.current
                    ? 'bg-blue-500 text-white border-blue-600 scale-110'
                    : idx < data.current
                    ? 'bg-gray-100 border-gray-300'
                    : 'bg-white border-gray-300'
                }`}
              >
                {char}
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="font-semibold mb-2">Stack:</div>
            <div className="flex gap-2 flex-wrap min-h-12 items-center">
              {data.stack.length === 0 ? (
                <span className="text-gray-400">Empty</span>
              ) : (
                data.stack.map((char, idx) => (
                  <div key={idx} className="bg-blue-100 px-4 py-2 rounded border border-blue-300 font-bold text-xl">
                    {char}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className={`text-center font-bold text-lg ${data.complete ? (data.valid ? 'text-green-600' : 'text-red-600') : 'text-gray-600'}`}>
            {data.complete && (data.valid ? '✓ Valid Parentheses' : '✗ Invalid Parentheses')}
          </div>
        </div>
      );
    }

    // Merge Sorted Arrays Visualization
    if (data.arr1 && data.arr2 && data.result !== undefined) {
      return (
        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-2">Array 1:</div>
              <div className="flex items-center gap-2 flex-wrap">
                {data.arr1.map((num, idx) => (
                  <div
                    key={idx}
                    className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold transition-all ${
                      idx === data.i && !data.complete
                        ? 'bg-blue-500 text-white border-blue-600 scale-110'
                        : idx < data.i
                        ? 'bg-gray-200 border-gray-300 opacity-50'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-2">Array 2:</div>
              <div className="flex items-center gap-2 flex-wrap">
                {data.arr2.map((num, idx) => (
                  <div
                    key={idx}
                    className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold transition-all ${
                      idx === data.j && !data.complete
                        ? 'bg-purple-500 text-white border-purple-600 scale-110'
                        : idx < data.j
                        ? 'bg-gray-200 border-gray-300 opacity-50'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-2">Merged Result:</div>
              <div className="flex items-center gap-2 flex-wrap">
                {data.result.length === 0 ? (
                  <span className="text-gray-400">Empty</span>
                ) : (
                  data.result.map((num, idx) => (
                    <div
                      key={idx}
                      className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold transition-all ${
                        data.complete
                          ? 'bg-green-500 text-white border-green-600'
                          : idx === data.result.length - 1
                          ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                          : 'bg-green-100 border-green-300'
                      }`}
                    >
                      {num}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Climbing Stairs (DP) Visualization
    if (data.n !== undefined && data.dp) {
      return (
        <div className="space-y-4">
          <div className="text-center text-lg font-semibold text-gray-700 mb-4">
            Calculating ways to climb {data.n} stairs
          </div>
          <div className="flex items-end justify-center gap-2 flex-wrap">
            {data.dp.slice(0, data.current + 1).map((ways, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                    data.complete && idx === data.n
                      ? 'bg-green-500 text-white border-green-600 scale-110'
                      : idx === data.current && data.calculating
                      ? 'bg-blue-500 text-white border-blue-600 scale-110'
                      : idx === data.current
                      ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                      : 'bg-blue-100 border-blue-300'
                  }`}
                  style={{ height: `${Math.max(40, ways * 8)}px` }}
                >
                  {ways}
                </div>
                <div className="text-sm text-gray-600 mt-2">Step {idx}</div>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            Formula: dp[i] = dp[i-1] + dp[i-2]
          </div>
        </div>
      );
    }

    // QuickSort Visualization
    if (data.nums && data.hasOwnProperty('pivot') && data.hasOwnProperty('depth') && !data.hasOwnProperty('phase')) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {data.nums.map((num, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                  data.complete
                    ? 'bg-green-500 text-white border-green-600'
                    : idx === data.pivot && data.pivotPlaced
                    ? 'bg-orange-500 text-white border-orange-600 scale-110'
                    : idx === data.pivot
                    ? 'bg-purple-500 text-white border-purple-600'
                    : idx === data.i && data.swapped
                    ? 'bg-red-500 text-white border-red-600 scale-110'
                    : idx === data.j
                    ? 'bg-blue-500 text-white border-blue-600 scale-110'
                    : idx >= data.low && idx <= data.high
                    ? 'bg-blue-100 border-blue-300'
                    : 'bg-gray-100 border-gray-300 opacity-40'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 text-sm font-semibold">
            <span className="text-purple-600">Pivot: {data.pivot >= 0 && data.pivot < data.nums.length ? data.nums[data.pivot] : '-'}</span>
            <span className="text-blue-600">Range: [{data.low}..{data.high}]</span>
            <span className="text-gray-600">Depth: {data.depth}</span>
          </div>
        </div>
      );
    }

    // Sliding Window Visualization
    if (data.nums && data.hasOwnProperty('windowSum') && data.k !== undefined) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {data.nums.map((num, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                  data.complete && idx >= data.windowStart && idx <= data.windowEnd
                    ? 'bg-green-500 text-white border-green-600 scale-105'
                    : data.newMax && idx >= data.windowStart && idx <= data.windowEnd
                    ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                    : idx >= data.windowStart && idx <= data.windowEnd
                    ? 'bg-blue-500 text-white border-blue-600'
                    : 'bg-white border-gray-300'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
              <div>Window Size: <span className="text-blue-600">{data.k}</span></div>
              <div>Window Sum: <span className="text-purple-600">{data.windowSum}</span></div>
              <div>Max Sum: <span className="text-green-600">{data.maxSum}</span></div>
              <div>Window: <span className="text-orange-600">[{data.windowStart}..{data.windowEnd}]</span></div>
            </div>
          </div>
        </div>
      );
    }

    // BFS Visualization
    if (data.graph && data.queue !== undefined && data.result !== undefined) {
      const nodes = Object.keys(data.graph).map(Number);
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {nodes.map((node) => (
              <div key={node} className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 flex items-center justify-center border-2 rounded-full font-bold text-lg transition-all ${
                    data.complete && data.result.includes(node)
                      ? 'bg-green-500 text-white border-green-600'
                      : node === data.current
                      ? 'bg-blue-500 text-white border-blue-600 scale-125'
                      : data.visited.includes(node)
                      ? 'bg-blue-200 border-blue-400'
                      : data.queue.includes(node)
                      ? 'bg-yellow-200 border-yellow-400'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {node}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {data.graph[node]?.length > 0 && `→ [${data.graph[node].join(',')}]`}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm font-semibold mb-2">Queue:</div>
              <div className="flex gap-2 flex-wrap">
                {data.queue.length === 0 ? (
                  <span className="text-gray-400">Empty</span>
                ) : (
                  data.queue.map((n, i) => (
                    <div key={i} className="bg-yellow-100 px-3 py-1 rounded border border-yellow-300 font-bold">
                      {n}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm font-semibold mb-2">Visited:</div>
              <div className="flex gap-2 flex-wrap">
                {data.visited.length === 0 ? (
                  <span className="text-gray-400">None</span>
                ) : (
                  data.visited.map((n, i) => (
                    <div key={i} className="bg-blue-100 px-3 py-1 rounded border border-blue-300 font-bold">
                      {n}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="text-center font-semibold text-purple-600">
            Traversal: [{data.result.join(' → ')}]
          </div>
        </div>
      );
    }

    // DFS Visualization
    if (data.graph && data.stack !== undefined && !data.queue) {
      const nodes = Object.keys(data.graph).map(Number);
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {nodes.map((node) => (
              <div key={node} className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 flex items-center justify-center border-2 rounded-full font-bold text-lg transition-all ${
                    data.complete && data.result.includes(node)
                      ? 'bg-green-500 text-white border-green-600'
                      : node === data.current
                      ? 'bg-blue-500 text-white border-blue-600 scale-125'
                      : data.visited.includes(node)
                      ? 'bg-blue-200 border-blue-400'
                      : data.stack.includes(node)
                      ? 'bg-purple-200 border-purple-400'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {node}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {data.graph[node]?.length > 0 && `→ [${data.graph[node].join(',')}]`}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm font-semibold mb-2">Call Stack:</div>
              <div className="flex gap-2 flex-wrap">
                {data.stack.length === 0 ? (
                  <span className="text-gray-400">Empty</span>
                ) : (
                  data.stack.map((n, i) => (
                    <div key={i} className="bg-purple-100 px-3 py-1 rounded border border-purple-300 font-bold">
                      {n}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm font-semibold mb-2">Depth: <span className="text-blue-600">{data.depth}</span></div>
            </div>
          </div>
          <div className="text-center font-semibold text-purple-600">
            Traversal: [{data.result.join(' → ')}]
          </div>
        </div>
      );
    }

    // Longest Substring Visualization
    if (data.chars && data.hasOwnProperty('maxLen')) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {data.chars.map((char, idx) => (
              <div
                key={idx}
                className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                  data.complete && idx >= data.maxStart && idx <= data.maxEnd
                    ? 'bg-green-500 text-white border-green-600 scale-110'
                    : data.newMax && idx >= data.maxStart && idx <= data.maxEnd
                    ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                    : idx >= data.start && idx <= data.end
                    ? 'bg-blue-500 text-white border-blue-600'
                    : idx <= data.end
                    ? 'bg-gray-100 border-gray-300'
                    : 'bg-white border-gray-300'
                }`}
              >
                {char}
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
              <div>Current Window: <span className="text-blue-600">[{data.start}..{data.end}]</span></div>
              <div>Max Length: <span className="text-green-600">{data.maxLen}</span></div>
              <div className="col-span-2">
                Current: <span className="text-purple-600">"{data.chars.slice(data.start, data.end + 1).join('')}"</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Coin Change (DP) Visualization
    if (data.coins && data.dp && data.amount !== undefined) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {data.dp.slice(0, Math.min(data.current + 1, data.amount + 1)).map((coins, idx) => (
              <div
                key={idx}
                className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold text-sm transition-all ${
                  data.complete && idx === data.amount
                    ? 'bg-green-500 text-white border-green-600 scale-110'
                    : idx === data.current && data.improved
                    ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                    : idx === data.current
                    ? 'bg-blue-500 text-white border-blue-600 scale-110'
                    : coins === Infinity
                    ? 'bg-red-100 border-red-300 text-red-500'
                    : 'bg-blue-100 border-blue-300'
                }`}
              >
                {coins === Infinity ? '∞' : coins}
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
              <div>Coins: <span className="text-blue-600">[{data.coins.join(', ')}]</span></div>
              <div>Target: <span className="text-purple-600">{data.amount}</span></div>
              <div className="col-span-2">
                Current Amount: <span className="text-orange-600">{data.current}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Rotate Array Visualization
    if (data.nums && data.hasOwnProperty('phase') && data.k !== undefined && !data.hasOwnProperty('depth')) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {data.nums.map((num, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                  data.complete
                    ? idx < data.k
                      ? 'bg-green-500 text-white border-green-600'
                      : 'bg-blue-500 text-white border-blue-600'
                    : data.swapping && (idx === data.start || idx === data.end)
                    ? 'bg-red-500 text-white border-red-600 scale-110'
                    : data.reversing && idx >= data.start && idx <= data.end
                    ? 'bg-yellow-400 text-white border-yellow-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-semibold">
              Phase {data.phase}/3: 
              <span className="ml-2 text-blue-600">
                {data.phase === 1 && 'Reverse entire array'}
                {data.phase === 2 && `Reverse first ${data.k} elements`}
                {data.phase === 3 && `Reverse last ${data.nums.length - data.k} elements`}
                {data.phase === 4 && 'Complete!'}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // Merge Sort Visualization
    if (data.original && data.subarrays && data.merged !== undefined && data.phase) {
      return (
        <div className="space-y-4">
          <div className="text-center font-semibold text-lg mb-2">
            Phase: <span className="text-blue-600">{data.phase.toUpperCase()}</span> | Depth: {data.depth}
          </div>
          {data.phase === 'divide' && data.subarrays.length > 0 && (
            <div className="space-y-2">
              {data.subarrays.map((sub, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2">
                  {sub.map((num, i) => (
                    <div key={i} className="w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold bg-blue-100 border-blue-300">
                      {num}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {data.phase === 'merge' && (
            <div className="space-y-3">
              <div className="text-center text-sm text-gray-600">Merging:</div>
              <div className="flex justify-center gap-8">
                {data.subarrays.map((sub, idx) => (
                  <div key={idx} className="flex gap-1">
                    {sub.map((num, i) => (
                      <div key={i} className="w-10 h-10 flex items-center justify-center border-2 rounded bg-yellow-100 border-yellow-300 text-sm font-bold">
                        {num}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-gray-600">Result:</div>
              <div className="flex items-center justify-center gap-1">
                {data.merged.map((num, i) => (
                  <div key={i} className="w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold bg-green-100 border-green-300">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.phase === 'complete' && (
            <div className="flex items-center justify-center gap-2">
              {data.merged.map((num, i) => (
                <div key={i} className="w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold bg-green-500 text-white border-green-600">
                  {num}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Palindrome Check Visualization
    if (data.chars && data.hasOwnProperty('isPalindrome') && data.original) {
      return (
        <div className="space-y-4">
          <div className="text-center text-sm text-gray-600 mb-2">
            Original: "{data.original}"
          </div>
          <div className="flex items-center justify-center gap-2">
            {data.chars.map((char, idx) => (
              <div
                key={idx}
                className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold transition-all ${
                  data.failed && (idx === data.left || idx === data.right)
                    ? 'bg-red-500 text-white border-red-600 scale-110'
                    : data.complete
                    ? 'bg-green-500 text-white border-green-600'
                    : data.matched && (idx === data.left || idx === data.right)
                    ? 'bg-green-400 text-white border-green-500 scale-110'
                    : idx === data.left || idx === data.right
                    ? 'bg-blue-500 text-white border-blue-600 scale-110'
                    : 'bg-white border-gray-300'
                }`}
              >
                {char}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 text-sm font-semibold">
            <span className="text-blue-600">Left: {data.left >= 0 ? data.left : '-'}</span>
            <span className="text-purple-600">Right: {data.right >= 0 ? data.right : '-'}</span>
            <span className={data.isPalindrome ? 'text-green-600' : 'text-red-600'}>
              {data.complete ? (data.isPalindrome ? '✓ Valid' : '✗ Invalid') : '...'}
            </span>
          </div>
        </div>
      );
    }

    // Floyd's Cycle Detection Visualization
    if (data.nums && data.hasOwnProperty('slow') && data.hasOwnProperty('fast') && data.hasOwnProperty('duplicate')) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            {data.nums.map((num, idx) => (
              <div
                key={idx}
                className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold transition-all ${
                  data.phase === 'complete' && num === data.duplicate
                    ? 'bg-red-500 text-white border-red-600 scale-125'
                    : idx === data.slow && idx === data.fast
                    ? 'bg-purple-500 text-white border-purple-600 scale-110'
                    : idx === data.slow
                    ? 'bg-blue-500 text-white border-blue-600 scale-110'
                    : idx === data.fast
                    ? 'bg-green-500 text-white border-green-600 scale-110'
                    : 'bg-white border-gray-300'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-sm font-semibold">
              <div>Slow: <span className="text-blue-600">{data.slow}</span></div>
              <div>Fast: <span className="text-green-600">{data.fast}</span></div>
              <div>Phase: <span className="text-purple-600">{data.phase}</span></div>
            </div>
          </div>
          {data.duplicate >= 0 && (
            <div className="text-center text-lg font-bold text-red-600">
              Duplicate Found: {data.duplicate}
            </div>
          )}
        </div>
      );
    }

    // House Robber Visualization
    if (data.nums && data.dp && data.hasOwnProperty('maxRob')) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            {data.nums.map((num, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold transition-all ${
                    data.complete && idx === data.current
                      ? 'bg-green-500 text-white border-green-600'
                      : idx === data.current
                      ? data.chosen === 'rob'
                        ? 'bg-green-400 text-white border-green-500 scale-110'
                        : 'bg-gray-300 text-white border-gray-400 scale-110'
                      : idx < data.current
                      ? 'bg-blue-100 border-blue-300'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  ${num}
                </div>
                <div className="text-xs text-gray-500 mt-1">House {idx}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-semibold mb-2">DP Array:</div>
            <div className="flex gap-2 justify-center flex-wrap">
              {data.dp.map((val, idx) => (
                <div key={idx} className="bg-purple-100 px-3 py-2 rounded border border-purple-300 font-bold">
                  dp[{idx}] = ${val}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center text-lg font-bold text-green-600">
            Max Money: ${data.maxRob}
          </div>
        </div>
      );
    }

    // Product Except Self Visualization
    if (data.nums && data.result !== undefined && data.hasOwnProperty('prefix') && data.hasOwnProperty('suffix')) {
      return (
        <div className="space-y-4">
          <div>
            <div className="text-sm font-semibold text-gray-600 mb-2">Input Array:</div>
            <div className="flex items-center justify-center gap-2">
              {data.nums.map((num, idx) => (
                <div
                  key={idx}
                  className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold ${
                    idx === data.current
                      ? 'bg-blue-500 text-white border-blue-600 scale-110'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
          {data.result.length > 0 && (
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-2">Result Array:</div>
              <div className="flex items-center justify-center gap-2">
                {data.result.map((num, idx) => (
                  <div
                    key={idx}
                    className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold ${
                      data.phase === 'complete'
                        ? 'bg-green-500 text-white border-green-600'
                        : idx === data.current
                        ? data.phase === 'prefix'
                          ? 'bg-yellow-400 text-white border-yellow-500'
                          : 'bg-purple-400 text-white border-purple-500'
                        : num !== undefined
                        ? 'bg-blue-100 border-blue-300'
                        : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    {num !== undefined ? num : '-'}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="text-center text-sm font-semibold text-purple-600">
            Phase: {data.phase.toUpperCase()}
          </div>
        </div>
      );
    }

    // Trapping Rain Water Visualization
    if (data.nums && data.waterLevels && data.hasOwnProperty('leftMax')) {
      return (
        <div className="space-y-4">
          <div className="flex items-end justify-center gap-1">
            {data.nums.map((height, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="flex flex-col-reverse items-center">
                  {data.waterLevels[idx] > 0 && (
                    <div
                      className="w-10 bg-blue-300 border-2 border-blue-400"
                      style={{ height: `${data.waterLevels[idx] * 15}px` }}
                    />
                  )}
                  <div
                    className={`w-10 border-2 rounded-t-lg font-bold text-sm flex items-center justify-center ${
                      idx === data.left || idx === data.right
                        ? 'bg-blue-500 text-white border-blue-600'
                        : 'bg-gray-700 text-white border-gray-800'
                    }`}
                    style={{ height: `${height * 15}px` }}
                  >
                    {height}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{idx}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
              <div>Left Max: <span className="text-blue-600">{data.leftMax}</span></div>
              <div>Right Max: <span className="text-purple-600">{data.rightMax}</span></div>
              <div className="col-span-2">Total Water: <span className="text-green-600">{data.water} units</span></div>
            </div>
          </div>
        </div>
      );
    }

    // Jump Game Visualization
    if (data.nums && data.hasOwnProperty('maxReach') && data.hasOwnProperty('canReach') && !data.hasOwnProperty('duplicate')) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            {data.nums.map((num, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold transition-all ${
                    data.complete && data.canReach
                      ? 'bg-green-500 text-white border-green-600'
                      : data.failed && idx === data.current
                      ? 'bg-red-500 text-white border-red-600 scale-110'
                      : idx === data.current
                      ? 'bg-blue-500 text-white border-blue-600 scale-110'
                      : idx <= data.maxReach
                      ? 'bg-green-100 border-green-300'
                      : 'bg-gray-100 border-gray-300 opacity-50'
                  }`}
                >
                  {num}
                </div>
                <div className="text-xs text-gray-500 mt-1">{idx}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-semibold">
              Max Reachable Index: <span className="text-green-600">{data.maxReach}</span>
              {data.complete && (
                <span className={`ml-4 ${data.canReach ? 'text-green-600' : 'text-red-600'}`}>
                  {data.canReach ? '✓ Can reach end!' : '✗ Cannot reach end'}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Top K Frequent Elements Visualization
    if (data.nums && data.map && data.hasOwnProperty('sorted') && data.k !== undefined && !data.hasOwnProperty('windowSum')) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            {data.nums.map((num, idx) => (
              <div
                key={idx}
                className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold ${
                  idx === data.current
                    ? 'bg-blue-500 text-white border-blue-600 scale-110'
                    : 'bg-white border-gray-300'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-semibold mb-2">Frequency Map:</div>
            <div className="flex gap-2 flex-wrap justify-center">
              {Object.entries(data.map).map(([num, freq]) => (
                <div
                  key={num}
                  className={`px-3 py-2 rounded border font-bold ${
                    data.result.includes(Number(num))
                      ? 'bg-green-100 border-green-300 text-green-700'
                      : 'bg-blue-100 border-blue-300'
                  }`}
                >
                  {num}: {freq}
                </div>
              ))}
            </div>
          </div>
          {data.result.length > 0 && (
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-600 mb-2">Top {data.k} Frequent:</div>
              <div className="flex gap-2 justify-center">
                {data.result.map((num, idx) => (
                  <div key={idx} className="w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold bg-green-500 text-white border-green-600">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Longest Palindromic Substring Visualization
    if (data.chars && data.hasOwnProperty('maxLen') && data.hasOwnProperty('type')) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            {data.chars.map((char, idx) => (
              <div
                key={idx}
                className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold transition-all ${
                  data.complete && idx >= data.left && idx <= data.right
                    ? 'bg-green-500 text-white border-green-600 scale-105'
                    : data.newMax && idx >= data.left && idx <= data.right
                    ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                    : idx === data.current
                    ? 'bg-purple-500 text-white border-purple-600 scale-110'
                    : idx >= data.left && idx <= data.right && data.matching
                    ? 'bg-blue-400 text-white border-blue-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                {char}
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-semibold">
              Longest: <span className="text-green-600">"{data.chars.slice(data.start, data.start + data.maxLen).join('')}"</span>
              <span className="ml-2 text-gray-600">(length: {data.maxLen})</span>
            </div>
            {data.type && data.type !== 'complete' && (
              <div className="text-sm text-gray-600 mt-2">
                Checking: <span className="text-blue-600">{data.type} length palindrome</span> at center {data.current}
              </div>
            )}
          </div>
        </div>
      );
    }

     // Encode/Decode Strings Visualization
    if (data.strs && data.encoded !== undefined && data.phase) {
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <div className="text-sm font-semibold text-gray-700 mb-2">Original Strings:</div>
            <div className="flex gap-2 flex-wrap">
              {data.strs.map((str, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-lg border-2 font-mono font-bold ${
                    i === data.current && data.phase === 'encode'
                      ? 'bg-blue-500 text-white border-blue-600 scale-110'
                      : 'bg-white border-blue-300'
                  }`}
                >
                  "{str}" {str.length === 0 && <span className="text-red-500">(empty)</span>}
                </div>
              ))}
            </div>
          </div>

          {data.phase.includes('encode') && (
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Encoded String:</div>
              <div className="font-mono font-bold text-lg break-all bg-white p-3 rounded border-2 border-green-300">
                {data.encoded || <span className="text-gray-400">Empty</span>}
              </div>
              {data.prefix && (
                <div className="text-sm text-green-700 mt-2">
                  Current: <span className="font-bold">{data.prefix}</span> + "{data.encoding}"
                </div>
              )}
            </div>
          )}

          {data.phase.includes('decode') && (
            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Decoded Strings:</div>
              <div className="flex gap-2 flex-wrap">
                {data.decoded.length === 0 ? (
                  <span className="text-gray-400">None yet</span>
                ) : (
                  data.decoded.map((str, i) => (
                    <div
                      key={i}
                      className={`px-3 py-2 rounded-lg border-2 font-mono font-bold ${
                        i === data.current - 1 && data.extracted
                          ? 'bg-purple-500 text-white border-purple-600 scale-110'
                          : 'bg-white border-purple-300'
                      }`}
                    >
                      "{str}"
                    </div>
                  ))
                )}
              </div>
              {data.length !== undefined && (
                <div className="text-sm text-purple-700 mt-2">
                  Reading length: <span className="font-bold">{data.length}</span> characters
                </div>
              )}
            </div>
          )}

          {data.success !== undefined && (
            <div className={`text-center text-lg font-bold ${data.success ? 'text-green-600' : 'text-red-600'}`}>
              {data.success ? '✓ Successfully Encoded & Decoded!' : '✗ Decoding Failed'}
            </div>
          )}
        </div>
      );
    }

    // Two Sum II Visualization
    if (data.numbers && data.target !== undefined && data.hasOwnProperty('left') && !data.height) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {data.numbers.map((num, idx) => (
              <div
                key={idx}
                className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                  data.found && (idx === data.left || idx === data.right)
                    ? 'bg-green-500 text-white border-green-600 scale-125'
                    : idx === data.left
                    ? 'bg-blue-500 text-white border-blue-600 scale-110'
                    : idx === data.right
                    ? 'bg-purple-500 text-white border-purple-600 scale-110'
                    : idx > data.left && idx < data.right
                    ? 'bg-gray-100 border-gray-300'
                    : 'bg-white border-gray-300 opacity-50'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-sm font-semibold">
              <div>Left: <span className="text-blue-600">idx={data.left}, val={data.numbers[data.left]}</span></div>
              <div>Target: <span className="text-orange-600">{data.target}</span></div>
              <div>Right: <span className="text-purple-600">idx={data.right}, val={data.numbers[data.right]}</span></div>
            </div>
            {data.sum !== null && (
              <div className="mt-2 text-center">
                Sum: <span className={`font-bold text-lg ${data.sum === data.target ? 'text-green-600' : data.sum < data.target ? 'text-blue-600' : 'text-red-600'}`}>
                  {data.numbers[data.left]} + {data.numbers[data.right]} = {data.sum}
                </span>
              </div>
            )}
          </div>
          {data.result && (
            <div className="text-center text-lg font-bold text-green-600">
              Found at indices: [{data.result.join(', ')}]
            </div>
          )}
        </div>
      );
    }

    // 3Sum Visualization
    if (data.sorted && data.result !== undefined && data.i !== undefined && !data.dp) {
      return (
        <div className="space-y-4">
          {data.original && (
            <div className="text-center text-sm text-gray-600">
              Original: [{data.original.join(', ')}] → Sorted: [{data.sorted.join(', ')}]
            </div>
          )}
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {data.sorted.map((num, idx) => (
              <div
                key={idx}
                className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold transition-all ${
                  idx === data.i
                    ? 'bg-red-500 text-white border-red-600 scale-110'
                    : idx === data.left
                    ? 'bg-blue-500 text-white border-blue-600 scale-110'
                    : idx === data.right
                    ? 'bg-purple-500 text-white border-purple-600 scale-110'
                    : idx < data.i
                    ? 'bg-gray-200 border-gray-300'
                    : 'bg-white border-gray-300'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-semibold mb-2">
              Fixed: <span className="text-red-600">{data.i >= 0 ? `i=${data.i}, val=${data.sorted[data.i]}` : '-'}</span>
              {data.left >= 0 && (
                <>
                  , Left: <span className="text-blue-600">j={data.left}, val={data.sorted[data.left]}</span>
                  , Right: <span className="text-purple-600">k={data.right}, val={data.sorted[data.right]}</span>
                </>
              )}
            </div>
            {data.sum !== null && (
              <div className="text-center mt-2">
                Sum: <span className={`font-bold text-lg ${data.sum === 0 ? 'text-green-600' : data.sum < 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {data.sorted[data.i]} + {data.sorted[data.left]} + {data.sorted[data.right]} = {data.sum}
                </span>
              </div>
            )}
          </div>
          <div className="bg-green-50 p-3 rounded-lg border-2 border-green-200">
            <div className="text-sm font-semibold mb-2">Triplets Found ({data.result.length}):</div>
            <div className="flex gap-2 flex-wrap">
              {data.result.length === 0 ? (
                <span className="text-gray-400">None yet</span>
              ) : (
                data.result.map((triplet, i) => (
                  <div key={i} className="bg-green-100 px-3 py-1 rounded border border-green-300 font-bold">
                    [{triplet.join(', ')}]
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      );
    }

    // Best Time to Buy/Sell Stock Visualization
    if (data.prices && data.minPrice !== undefined && data.maxProfit !== undefined) {
      return (
        <div className="space-y-4">
          <div className="flex items-end justify-center gap-1">
            {data.prices.map((price, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-12 border-2 rounded-t-lg font-bold text-xs flex items-end justify-center pb-1 transition-all ${
                    idx === data.bestBuy && data.complete
                      ? 'bg-green-500 text-white border-green-600'
                      : idx === data.bestSell && data.complete
                      ? 'bg-blue-500 text-white border-blue-600'
                      : idx === data.current && data.newMin
                      ? 'bg-green-400 text-white border-green-500 scale-110'
                      : idx === data.current && data.newMax
                      ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                      : idx === data.current
                      ? 'bg-blue-300 text-white border-blue-400 scale-105'
                      : idx === data.buyDay
                      ? 'bg-green-200 border-green-400'
                      : 'bg-gray-300 border-gray-400'
                  }`}
                  style={{ height: `${price * 3}px`, minHeight: '30px' }}
                >
                  ${price}
                </div>
                <div className="text-xs text-gray-500 mt-1">D{idx}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
              <div>Min Price: <span className="text-green-600">${data.minPrice === Infinity ? '-' : data.minPrice}</span> (Day {data.buyDay >= 0 ? data.buyDay : '-'})</div>
              <div>Max Profit: <span className="text-blue-600">${data.maxProfit}</span></div>
              {data.profit !== undefined && (
                <div className="col-span-2">
                  Current Profit: <span className="text-purple-600">${data.profit}</span>
                </div>
              )}
            </div>
          </div>
          {data.complete && (
            <div className="text-center text-lg font-bold text-green-600">
              Best Strategy: Buy on day {data.bestBuy} (${data.prices[data.bestBuy]}), Sell on day {data.bestSell} (${data.prices[data.bestSell]}) → Profit: ${data.maxProfit}
            </div>
          )}
        </div>
      );
    }

    // Daily Temperatures Visualization
    if (data.temperatures && data.result && data.stack !== undefined) {
      return (
        <div className="space-y-4">
          <div className="flex items-end justify-center gap-1">
            {data.temperatures.map((temp, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-xs font-bold mb-1 text-gray-700">
                  {data.result[idx] > 0 ? `+${data.result[idx]}` : data.result[idx] === 0 ? '0' : ''}
                </div>
                <div
                  className={`w-12 border-2 rounded-t-lg font-bold text-xs flex items-end justify-center pb-1 transition-all ${
                    idx === data.current && data.found
                      ? 'bg-green-500 text-white border-green-600'
                      : idx === data.popped
                      ? 'bg-yellow-400 text-white border-yellow-500 scale-110'
                      : idx === data.current
                      ? 'bg-blue-500 text-white border-blue-600 scale-110'
                      : data.stack.includes(idx)
                      ? 'bg-orange-300 border-orange-500'
                      : data.result[idx] > 0
                      ? 'bg-green-200 border-green-400'
                      : 'bg-gray-300 border-gray-400'
                  }`}
                  style={{ height: `${temp * 2}px`, minHeight: '30px' }}
                >
                  {temp}°
                </div>
                <div className="text-xs text-gray-500 mt-1">D{idx}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-semibold mb-2">Stack (waiting days):</div>
            <div className="flex gap-2 flex-wrap min-h-10 items-center">
              {data.stack.length === 0 ? (
                <span className="text-gray-400">Empty</span>
              ) : (
                data.stack.map((idx, i) => (
                  <div key={i} className="bg-orange-100 px-3 py-2 rounded border-2 border-orange-300 font-bold">
                    Day {idx} ({data.temperatures[idx]}°)
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-200">
            <div className="text-sm font-semibold mb-2">Result: Days to Wait</div>
            <div className="flex gap-2 flex-wrap justify-center">
              {data.result.map((days, i) => (
                <div key={i} className={`px-2 py-1 rounded border font-bold text-sm ${days > 0 ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'}`}>
                  {days}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (data.nums && data.hasOwnProperty('left')) {
      // Binary Search Visualization
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {data.nums.map((num, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                  idx === data.mid && data.found
                    ? 'bg-green-500 text-white border-green-600 scale-110'
                    : idx === data.mid
                    ? 'bg-blue-500 text-white border-blue-600 scale-110'
                    : idx >= data.left && idx <= data.right
                    ? 'bg-blue-100 border-blue-300'
                    : 'bg-gray-100 border-gray-300 opacity-40'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 text-sm font-semibold">
            <span className="text-blue-600">Left: {data.left}</span>
            <span className="text-purple-600">Mid: {data.mid >= 0 ? data.mid : '-'}</span>
            <span className="text-blue-600">Right: {data.right}</span>
            <span className="text-orange-600">Target: {data.target}</span>
          </div>
        </div>
      );
    } else if (data.nums && data.map !== undefined) {
      // Two Sum Visualization
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {data.nums.map((num, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                  data.found && data.result?.includes(idx)
                    ? 'bg-green-500 text-white border-green-600 scale-110'
                    : idx === data.current
                    ? 'bg-blue-500 text-white border-blue-600 scale-110'
                    : idx < data.current
                    ? 'bg-gray-100 border-gray-300'
                    : 'bg-white border-gray-300'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="font-semibold mb-2">HashMap:</div>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(data.map).length === 0 ? (
                <span className="text-gray-400">Empty</span>
              ) : (
                Object.entries(data.map).map(([key, val]) => (
                  <div key={key} className="bg-blue-100 px-3 py-1 rounded border border-blue-300">
                    {key} → {val}
                  </div>
                ))
              )}
            </div>
          </div>
          {data.complement !== null && (
            <div className="text-center font-semibold text-purple-600">
              Looking for complement: {data.complement}
            </div>
          )}
        </div>
      );
    } else if (data.list) {
      // Linked List Visualization
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            {data.list.map((num, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                    data.complete
                      ? 'bg-green-500 text-white border-green-600'
                      : idx === data.curr
                      ? 'bg-blue-500 text-white border-blue-600 scale-110'
                      : idx === data.prev
                      ? 'bg-purple-500 text-white border-purple-600'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {num}
                </div>
                {idx < data.list.length - 1 && (
                  <ChevronRight className={`w-6 h-6 ${data.complete ? 'rotate-180 text-green-600' : 'text-gray-400'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-center gap-8 text-sm font-semibold">
            <span className="text-purple-600">Prev: {data.prev !== null && data.prev >= 0 ? data.list[data.prev] : 'null'}</span>
            <span className="text-blue-600">Curr: {data.curr !== null && data.curr < data.list.length ? data.list[data.curr] : 'null'}</span>
            <span className="text-orange-600">Next: {data.next >= 0 && data.next < data.list.length ? data.list[data.next] : 'null'}</span>
          </div>
        </div>
      );
    }

    return null;
  };