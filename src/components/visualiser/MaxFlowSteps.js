export const generateMaxFlowSteps = (graph, source, sink) => {
    const steps = [];
    const residual = JSON.parse(JSON.stringify(graph));
    let flow = 0;

    steps.push({
      description: `Ford-Fulkerson: Find max flow from ${source} to ${sink}`,
      data: { graph, residual, source, sink, flow, path: [] }
    });

    const dfs = (node, visited, minFlow, path) => {
      if (node === sink) return minFlow;
      visited.add(node);

      for (let neighbor in residual[node]) {
        if (!visited.has(neighbor) && residual[node][neighbor] > 0) {
          const bottleneck = Math.min(minFlow, residual[node][neighbor]);
          const pathFlow = dfs(neighbor, visited, bottleneck, [...path, [node, neighbor]]);

          if (pathFlow > 0) {
            residual[node][neighbor] -= pathFlow;
            residual[neighbor] = residual[neighbor] || {};
            residual[neighbor][node] = (residual[neighbor][node] || 0) + pathFlow;
            return pathFlow;
          }
        }
      }
      return 0;
    };

    let iteration = 0;
    while (true) {
      const pathFlow = dfs(source, new Set(), Infinity, []);
      if (pathFlow === 0) break;

      flow += pathFlow;
      iteration++;

      steps.push({
        description: `Iteration ${iteration}: Found augmenting path with flow ${pathFlow}`,
        data: { graph, residual: JSON.parse(JSON.stringify(residual)), source, sink, flow, pathFlow }
      });
    }

    steps.push({
      description: `Maximum flow: ${flow}`,
      data: { graph, residual: JSON.parse(JSON.stringify(residual)), source, sink, flow, complete: true }
    });

    return steps;
  };