export const generateBellmanFordSteps = (n, edges, start) => {
    const steps = [];
    const distances = Array(n).fill(Infinity);
    distances[start] = 0;

    steps.push({
      description: `Bellman-Ford from node ${start}`,
      data: { n, edges, distances: [...distances], iteration: 0, current: null, start }
    });

    for (let i = 0; i < n - 1; i++) {
      steps.push({
        description: `Iteration ${i + 1}: Relax all edges`,
        data: { n, edges, distances: [...distances], iteration: i + 1, current: null, start }
      });

      for (let [u, v, weight] of edges) {
        steps.push({
          description: `Check edge (${u} → ${v}, weight: ${weight})`,
          data: { n, edges, distances: [...distances], iteration: i + 1, current: [u, v, weight], start }
        });

        if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
          distances[v] = distances[u] + weight;
          steps.push({
            description: `Update distance[${v}] = ${distances[v]}`,
            data: { n, edges, distances: [...distances], iteration: i + 1, current: [u, v, weight], updated: v, start }
          });
        }
      }
    }

    // Check for negative cycles
    let negativeCycle = false;
    for (let [u, v, weight] of edges) {
      if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
        negativeCycle = true;
        break;
      }
    }

    steps.push({
      description: negativeCycle ? `Negative cycle detected!` : `Shortest paths computed`,
      data: { n, edges, distances: [...distances], iteration: n - 1, current: null, complete: true, negativeCycle, start }
    });

    return steps;
  };