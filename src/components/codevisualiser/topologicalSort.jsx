import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

const TopologicalSortVisualizer = () => {
  const [executionStep, setExecutionStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedNodes, setCompletedNodes] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [executionOrder, setExecutionOrder] = useState([]);
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    {
      name: 'User Profile System',
      description: 'Loading user data with dependencies',
      nodes: [
        { id: 'auth', label: 'Authenticate User', deps: [], time: 1, endpoint: '/api/auth/login' },
        { id: 'user', label: 'Get User Profile', deps: ['auth'], time: 2, endpoint: '/api/users/{userId}' },
        { id: 'preferences', label: 'Get Preferences', deps: ['user'], time: 1, endpoint: '/api/users/{userId}/preferences' },
        { id: 'posts', label: 'Get User Posts', deps: ['user'], time: 2, endpoint: '/api/users/{userId}/posts' },
        { id: 'followers', label: 'Get Followers', deps: ['user'], time: 1, endpoint: '/api/users/{userId}/followers' },
        { id: 'analytics', label: 'Get Analytics', deps: ['posts', 'followers'], time: 2, endpoint: '/api/analytics' }
      ]
    },
    {
      name: 'E-commerce Checkout',
      description: 'Processing order with payment dependencies',
      nodes: [
        { id: 'cart', label: 'Get Cart', deps: [], time: 1, endpoint: '/api/cart' },
        { id: 'inventory', label: 'Check Inventory', deps: ['cart'], time: 2, endpoint: '/api/inventory/check' },
        { id: 'shipping', label: 'Calculate Shipping', deps: ['cart'], time: 1, endpoint: '/api/shipping/calculate' },
        { id: 'tax', label: 'Calculate Tax', deps: ['cart', 'shipping'], time: 1, endpoint: '/api/tax/calculate' },
        { id: 'payment', label: 'Process Payment', deps: ['inventory', 'tax'], time: 3, endpoint: '/api/payment/process' },
        { id: 'order', label: 'Create Order', deps: ['payment'], time: 2, endpoint: '/api/orders/create' },
        { id: 'confirm', label: 'Send Confirmation', deps: ['order'], time: 1, endpoint: '/api/notifications/email' }
      ]
    },
    {
      name: 'Dashboard Data Loading',
      description: 'Complex dashboard with multiple data sources',
      nodes: [
        { id: 'session', label: 'Validate Session', deps: [], time: 1, endpoint: '/api/session/validate' },
        { id: 'company', label: 'Get Company Data', deps: ['session'], time: 1, endpoint: '/api/company/{id}' },
        { id: 'projects', label: 'Get Projects', deps: ['company'], time: 2, endpoint: '/api/projects' },
        { id: 'team', label: 'Get Team Members', deps: ['company'], time: 1, endpoint: '/api/team' },
        { id: 'metrics', label: 'Get Metrics', deps: ['projects'], time: 2, endpoint: '/api/metrics' },
        { id: 'reports', label: 'Generate Reports', deps: ['metrics', 'team'], time: 3, endpoint: '/api/reports/generate' }
      ]
    }
  ];

  const currentExample = examples[selectedExample];

  // Topological Sort Implementation
  const topologicalSort = (nodes) => {
    const result = [];
    const visited = new Set();
    const visiting = new Set();

    const visit = (nodeId) => {
      if (visited.has(nodeId)) return;
      if (visiting.has(nodeId)) {
        throw new Error('Circular dependency detected!');
      }

      visiting.add(nodeId);
      const node = nodes.find(n => n.id === nodeId);
      
      for (const dep of node.deps) {
        visit(dep);
      }

      visiting.delete(nodeId);
      visited.add(nodeId);
      result.push(nodeId);
    };

    try {
      for (const node of nodes) {
        visit(node.id);
      }
      return { success: true, order: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getNodePosition = (index, total) => {
    const levels = {};
    const sorted = topologicalSort(currentExample.nodes);
    
    if (!sorted.success) return { x: 50, y: 50 };

    // Assign levels based on dependencies
    sorted.order.forEach(nodeId => {
      const node = currentExample.nodes.find(n => n.id === nodeId);
      const depLevels = node.deps.map(dep => levels[dep] || 0);
      levels[nodeId] = depLevels.length > 0 ? Math.max(...depLevels) + 1 : 0;
    });

    const maxLevel = Math.max(...Object.values(levels));
    const nodesAtLevel = {};
    
    Object.entries(levels).forEach(([nodeId, level]) => {
      if (!nodesAtLevel[level]) nodesAtLevel[level] = [];
      nodesAtLevel[level].push(nodeId);
    });

    const nodeId = currentExample.nodes[index].id;
    const level = levels[nodeId];
    const indexAtLevel = nodesAtLevel[level].indexOf(nodeId);
    const totalAtLevel = nodesAtLevel[level].length;

    return {
      x: ((level + 1) / (maxLevel + 2)) * 80 + 10,
      y: ((indexAtLevel + 1) / (totalAtLevel + 1)) * 80 + 10
    };
  };

  useEffect(() => {
    if (!isPlaying) return;
    
    const sorted = topologicalSort(currentExample.nodes);
    if (!sorted.success) {
      setIsPlaying(false);
      return;
    }

    if (executionStep < sorted.order.length) {
      const currentNodeId = sorted.order[executionStep];
      setActiveNode(currentNodeId);
      
      const timer = setTimeout(() => {
        setCompletedNodes(prev => [...prev, currentNodeId]);
        setExecutionOrder(prev => [...prev, currentNodeId]);
        setActiveNode(null);
        setExecutionStep(prev => prev + 1);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [executionStep, isPlaying, currentExample]);

  const handlePlay = () => {
    if (executionStep === currentExample.nodes.length) {
      handleReset();
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setExecutionStep(0);
    setCompletedNodes([]);
    setActiveNode(null);
    setExecutionOrder([]);
    setIsPlaying(false);
  };

  const getNodeStatus = (nodeId) => {
    if (completedNodes.includes(nodeId)) return 'completed';
    if (activeNode === nodeId) return 'active';
    return 'pending';
  };

  const sortResult = topologicalSort(currentExample.nodes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3">
            Topological Sort for API Dependencies
          </h1>
          <p className="text-gray-300 text-lg">
            Visualizing optimal execution order for nested API calls
          </p>
        </div>

        {/* Concept Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-900/30 border-2 border-blue-500 rounded-xl p-5 backdrop-blur">
            <h3 className="text-xl font-bold text-blue-400 mb-2">What is it?</h3>
            <p className="text-gray-300 text-sm">
              Topological sorting orders tasks so dependencies are resolved before dependent tasks execute.
            </p>
          </div>
          <div className="bg-purple-900/30 border-2 border-purple-500 rounded-xl p-5 backdrop-blur">
            <h3 className="text-xl font-bold text-purple-400 mb-2">Why use it?</h3>
            <p className="text-gray-300 text-sm">
              Ensures APIs are called in the correct order, maximizes parallelization, and prevents errors.
            </p>
          </div>
          <div className="bg-green-900/30 border-2 border-green-500 rounded-xl p-5 backdrop-blur">
            <h3 className="text-xl font-bold text-green-400 mb-2">Time Complexity</h3>
            <p className="text-gray-300 text-sm">
              O(V + E) where V is nodes (APIs) and E is edges (dependencies). Very efficient!
            </p>
          </div>
        </div>

        {/* Example Selector */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedExample(index);
                handleReset();
              }}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                selectedExample === index
                  ? 'bg-blue-600 text-white scale-105 shadow-lg'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {example.name}
            </button>
          ))}
        </div>

        {/* Current Example Info */}
        <div className="bg-slate-800/80 border-2 border-slate-600 rounded-xl p-6 mb-8 backdrop-blur">
          <h2 className="text-2xl font-bold text-white mb-2">{currentExample.name}</h2>
          <p className="text-gray-300 mb-4">{currentExample.description}</p>
          
          {/* Controls */}
          <div className="flex gap-4">
            <button
              onClick={isPlaying ? () => setIsPlaying(false) : handlePlay}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              {isPlaying ? <Clock size={20} /> : <Play size={20} />}
              {isPlaying ? 'Running...' : 'Execute APIs'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
            >
              <RotateCcw size={20} /> Reset
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Visualization */}
          <div className="bg-slate-800/80 border-2 border-slate-600 rounded-xl p-6 backdrop-blur">
            <h3 className="text-xl font-bold text-white mb-4">Dependency Graph</h3>
            <div className="relative bg-slate-900 rounded-lg p-4" style={{ height: '500px' }}>
              {/* Draw edges first */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {currentExample.nodes.map((node, idx) => {
                  const fromPos = getNodePosition(idx, currentExample.nodes.length);
                  return node.deps.map(depId => {
                    const depIdx = currentExample.nodes.findIndex(n => n.id === depId);
                    const toPos = getNodePosition(depIdx, currentExample.nodes.length);
                    const isActive = completedNodes.includes(depId) || activeNode === depId;
                    return (
                      <line
                        key={`${depId}-${node.id}`}
                        x1={`${toPos.x}%`}
                        y1={`${toPos.y}%`}
                        x2={`${fromPos.x}%`}
                        y2={`${fromPos.y}%`}
                        stroke={isActive ? '#3b82f6' : '#475569'}
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                    );
                  });
                })}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
                  </marker>
                </defs>
              </svg>

              {/* Draw nodes */}
              {currentExample.nodes.map((node, index) => {
                const pos = getNodePosition(index, currentExample.nodes.length);
                const status = getNodeStatus(node.id);
                
                return (
                  <div
                    key={node.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center text-center p-2 border-4 transition-all ${
                        status === 'completed'
                          ? 'bg-green-600 border-green-400 scale-100'
                          : status === 'active'
                          ? 'bg-blue-600 border-blue-400 scale-110 animate-pulse'
                          : 'bg-slate-700 border-slate-600 scale-90'
                      }`}
                    >
                      <div>
                        <div className="text-white text-xs font-bold leading-tight">
                          {node.label}
                        </div>
                        {status === 'completed' && (
                          <CheckCircle className="mx-auto mt-1" size={16} color="white" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Execution Details */}
          <div className="space-y-6">
            {/* Execution Order */}
            <div className="bg-slate-800/80 border-2 border-slate-600 rounded-xl p-6 backdrop-blur">
              <h3 className="text-xl font-bold text-white mb-4">Optimal Execution Order</h3>
              {sortResult.success ? (
                <div className="space-y-2">
                  {sortResult.order.map((nodeId, index) => {
                    const node = currentExample.nodes.find(n => n.id === nodeId);
                    const status = getNodeStatus(nodeId);
                    return (
                      <div
                        key={nodeId}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          status === 'completed'
                            ? 'bg-green-900/30 border-2 border-green-500'
                            : status === 'active'
                            ? 'bg-blue-900/30 border-2 border-blue-500 animate-pulse'
                            : 'bg-slate-700/30 border-2 border-slate-600'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          status === 'completed' ? 'bg-green-600' : status === 'active' ? 'bg-blue-600' : 'bg-slate-600'
                        } text-white`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-semibold">{node.label}</div>
                          <div className="text-gray-400 text-xs">{node.endpoint}</div>
                        </div>
                        {status === 'completed' && <CheckCircle size={20} className="text-green-400" />}
                        {status === 'active' && <Clock size={20} className="text-blue-400 animate-spin" />}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle size={20} />
                    <span className="font-semibold">{sortResult.error}</span>
                  </div>
                </div>
              )}
            </div>

            {/* API Details */}
            <div className="bg-slate-800/80 border-2 border-slate-600 rounded-xl p-6 backdrop-blur">
              <h3 className="text-xl font-bold text-white mb-4">API Call Details</h3>
              <div className="space-y-3">
                {currentExample.nodes.map(node => (
                  <div key={node.id} className="bg-slate-900/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">{node.label}</span>
                      <span className="text-gray-400 text-sm">{node.time}s</span>
                    </div>
                    <div className="text-blue-400 text-xs mb-2">{node.endpoint}</div>
                    {node.deps.length > 0 ? (
                      <div className="text-gray-400 text-xs">
                        Depends on: {node.deps.map(dep => 
                          currentExample.nodes.find(n => n.id === dep)?.label
                        ).join(', ')}
                      </div>
                    ) : (
                      <div className="text-green-400 text-xs">No dependencies</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Code */}
        <div className="mt-8 bg-slate-800/80 border-2 border-slate-600 rounded-xl p-6 backdrop-blur">
          <h3 className="text-2xl font-bold text-white mb-4">Implementation Code</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-bold text-blue-400 mb-2">1. Topological Sort Algorithm</h4>
              <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-green-400">{`function topologicalSort(apiCalls) {
  const result = [];
  const visited = new Set();
  const visiting = new Set();

  function visit(nodeId) {
    if (visited.has(nodeId)) return;
    if (visiting.has(nodeId)) {
      throw new Error('Circular dependency detected!');
    }

    visiting.add(nodeId);
    const node = apiCalls.find(n => n.id === nodeId);
    
    // Visit all dependencies first
    for (const dep of node.dependencies) {
      visit(dep);
    }

    visiting.delete(nodeId);
    visited.add(nodeId);
    result.push(nodeId);
  }

  for (const node of apiCalls) {
    visit(node.id);
  }

  return result; // Ordered execution sequence
}`}</code>
              </pre>
            </div>

            <div>
              <h4 className="text-lg font-bold text-purple-400 mb-2">2. Execute APIs in Order</h4>
              <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-green-400">{`async function executeAPIsInOrder(apiCalls) {
  const order = topologicalSort(apiCalls);
  const results = {};

  for (const nodeId of order) {
    const node = apiCalls.find(n => n.id === nodeId);
    
    // Get data from dependencies
    const depData = node.dependencies.map(dep => results[dep]);
    
    // Execute API call with dependency data
    console.log(\`Executing: \${node.label}\`);
    results[nodeId] = await fetch(node.endpoint, {
      method: 'POST',
      body: JSON.stringify({ dependencies: depData })
    }).then(res => res.json());
  }

  return results;
}`}</code>
              </pre>
            </div>

            <div>
              <h4 className="text-lg font-bold text-orange-400 mb-2">3. Parallel Execution (Optimized)</h4>
              <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-green-400">{`async function executeAPIsParallel(apiCalls) {
  const results = {};
  const order = topologicalSort(apiCalls);
  const levels = assignLevels(apiCalls, order);

  // Execute APIs level by level
  for (let level = 0; level <= Math.max(...Object.values(levels)); level++) {
    const nodesAtLevel = Object.entries(levels)
      .filter(([_, l]) => l === level)
      .map(([id]) => id);

    // Execute all nodes at this level in parallel
    await Promise.all(
      nodesAtLevel.map(async (nodeId) => {
        const node = apiCalls.find(n => n.id === nodeId);
        const depData = node.dependencies.map(dep => results[dep]);
        
        results[nodeId] = await fetch(node.endpoint, {
          method: 'POST',
          body: JSON.stringify({ dependencies: depData })
        }).then(res => res.json());
      })
    );
  }

  return results;
}`}</code>
              </pre>
            </div>

            <div>
              <h4 className="text-lg font-bold text-pink-400 mb-2">4. Usage Example</h4>
              <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-green-400">{`const apiCalls = [
  { id: 'auth', endpoint: '/api/auth', dependencies: [] },
  { id: 'user', endpoint: '/api/user', dependencies: ['auth'] },
  { id: 'posts', endpoint: '/api/posts', dependencies: ['user'] },
  { id: 'comments', endpoint: '/api/comments', dependencies: ['posts'] }
];

// Sequential execution in correct order
const results = await executeAPIsInOrder(apiCalls);

// Parallel execution where possible
const fastResults = await executeAPIsParallel(apiCalls);`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-2 border-blue-500 rounded-xl p-8 backdrop-blur">
          <h3 className="text-2xl font-bold text-white mb-4">Key Benefits</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-bold text-blue-400 mb-3">✓ Correctness</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Guarantees dependencies are met before execution</li>
                <li>• Prevents race conditions and data inconsistencies</li>
                <li>• Detects circular dependencies early</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-purple-400 mb-3">✓ Performance</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Enables parallel execution of independent APIs</li>
                <li>• Minimizes total execution time</li>
                <li>• Optimizes resource utilization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopologicalSortVisualizer;