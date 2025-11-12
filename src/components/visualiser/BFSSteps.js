export const generateBFSSteps = (graph, start) => {
    const steps = [];
    const visited = new Set();
    const queue = [start];
    const result = [];

    steps.push({
      description: `Initialize BFS from node ${start}`,
      data: { graph, queue: [start], visited: [], result: [], current: -1 }
    });

    while (queue.length > 0) {
      const node = queue.shift();
      
      steps.push({
        description: `Dequeue node ${node}`,
        data: { graph, queue: [...queue], visited: Array.from(visited), result: [...result], current: node, dequeuing: true }
      });

      if (!visited.has(node)) {
        visited.add(node);
        result.push(node);
        
        steps.push({
          description: `Visit node ${node}, add to result`,
          data: { graph, queue: [...queue], visited: Array.from(visited), result: [...result], current: node, visiting: true }
        });

        const neighbors = graph[node] || [];
        if (neighbors.length > 0) {
          queue.push(...neighbors);
          steps.push({
            description: `Enqueue neighbors of ${node}: [${neighbors.join(', ')}]`,
            data: { graph, queue: [...queue], visited: Array.from(visited), result: [...result], current: node, neighbors }
          });
        }
      } else {
        steps.push({
          description: `Node ${node} already visited, skip`,
          data: { graph, queue: [...queue], visited: Array.from(visited), result: [...result], current: node, skipped: true }
        });
      }
    }

    steps.push({
      description: `BFS complete! Traversal order: [${result.join(' → ')}]`,
      data: { graph, queue: [], visited: Array.from(visited), result, current: -1, complete: true }
    });

    return steps;
  };