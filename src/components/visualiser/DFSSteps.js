export const generateDFSSteps = (graph, start) => {
    const steps = [];
    const visited = new Set();
    const result = [];
    const stack = [];

    const dfsHelper = (node, depth = 0) => {
      if (visited.has(node)) {
        steps.push({
          description: `Node ${node} already visited, backtrack`,
          data: { graph, stack: [...stack], visited: Array.from(visited), result: [...result], current: node, depth, skipped: true }
        });
        return;
      }

      visited.add(node);
      result.push(node);
      stack.push(node);

      steps.push({
        description: `Visit node ${node} at depth ${depth}`,
        data: { graph, stack: [...stack], visited: Array.from(visited), result: [...result], current: node, depth, visiting: true }
      });

      const neighbors = graph[node] || [];
      for (let neighbor of neighbors) {
        steps.push({
          description: `Explore neighbor ${neighbor} of node ${node}`,
          data: { graph, stack: [...stack], visited: Array.from(visited), result: [...result], current: node, depth, exploring: neighbor }
        });
        dfsHelper(neighbor, depth + 1);
      }

      stack.pop();
      steps.push({
        description: `Backtrack from node ${node}`,
        data: { graph, stack: [...stack], visited: Array.from(visited), result: [...result], current: node, depth, backtracking: true }
      });
    };

    steps.push({
      description: `Initialize DFS from node ${start}`,
      data: { graph, stack: [], visited: [], result: [], current: -1, depth: 0 }
    });

    dfsHelper(start);

    steps.push({
      description: `DFS complete! Traversal order: [${result.join(' → ')}]`,
      data: { graph, stack: [], visited: Array.from(visited), result, current: -1, complete: true }
    });

    return steps;
  };