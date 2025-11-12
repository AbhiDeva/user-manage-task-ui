export const generateDijkstraSteps = (graph, start) => {
    const steps = [];
    const distances = {};
    const visited = new Set();
    const pq = [[0, start]];

    for (let node in graph) distances[node] = Infinity;
    distances[start] = 0;

    steps.push({
      description: `Initialize Dijkstra from node ${start}`,
      data: { graph, distances: {...distances}, visited: [], pq: [...pq], current: start }
    });

    while (pq.length > 0) {
      pq.sort((a, b) => a[0] - b[0]);
      const [dist, node] = pq.shift();

      if (visited.has(node)) continue;

      steps.push({
        description: `Visit node ${node} with distance ${dist}`,
        data: { graph, distances: {...distances}, visited: Array.from(visited), pq: pq.map(p => [...p]), current: node, visiting: true }
      });

      visited.add(node);

      for (let [neighbor, weight] of graph[node]) {
        const newDist = dist + weight;
        
        steps.push({
          description: `Check edge ${node} → ${neighbor} (weight: ${weight})`,
          data: { graph, distances: {...distances}, visited: Array.from(visited), pq: pq.map(p => [...p]), current: node, edge: [node, neighbor, weight] }
        });

        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          pq.push([newDist, neighbor]);
          steps.push({
            description: `Update distance to ${neighbor}: ${newDist}`,
            data: { graph, distances: {...distances}, visited: Array.from(visited), pq: pq.map(p => [...p]), current: node, updated: neighbor }
          });
        }
      }
    }

    steps.push({
      description: `Shortest paths computed from ${start}`,
      data: { graph, distances: {...distances}, visited: Array.from(visited), pq: [], current: null, complete: true }
    });

    return steps;
  };