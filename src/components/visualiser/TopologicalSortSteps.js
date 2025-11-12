export const generateTopologicalSortSteps = (graph) => {
    const steps = [];
    const visited = new Set();
    const stack = [];

    steps.push({
      description: `Topological Sort using DFS`,
      data: { graph, visited: [], stack: [], current: null }
    });

    const dfs = (node) => {
      visited.add(node);
      steps.push({
        description: `Visit node ${node}`,
        data: { graph, visited: Array.from(visited), stack: [...stack], current: node, visiting: true }
      });

      for (let neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          steps.push({
            description: `Explore neighbor ${neighbor} from ${node}`,
            data: { graph, visited: Array.from(visited), stack: [...stack], current: node, exploring: neighbor }
          });
          dfs(neighbor);
        }
      }

      stack.unshift(node);
      steps.push({
        description: `Add ${node} to front of result`,
        data: { graph, visited: Array.from(visited), stack: [...stack], current: node, added: true }
      });
    };

    for (let node in graph) {
      if (!visited.has(parseInt(node))) {
        dfs(parseInt(node));
      }
    }

    steps.push({
      description: `Topological order: [${stack.join(' → ')}]`,
      data: { graph, visited: Array.from(visited), stack: [...stack], current: null, complete: true }
    });

    return steps;
  };