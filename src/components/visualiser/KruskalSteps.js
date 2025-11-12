export const generateKruskalSteps = (n, edges) => {
    const steps = [];
    const sortedEdges = [...edges].sort((a, b) => a[2] - b[2]);
    const parent = Array(n).fill().map((_, i) => i);
    const mst = [];

    steps.push({
      description: `Kruskal's MST: Sort edges by weight`,
      data: { n, edges: sortedEdges, mst: [], parent: [...parent], current: null }
    });

    const find = (x) => {
      if (parent[x] !== x) parent[x] = find(parent[x]);
      return parent[x];
    };

    const union = (x, y) => {
      const rootX = find(x);
      const rootY = find(y);
      if (rootX === rootY) return false;
      parent[rootX] = rootY;
      return true;
    };

    for (let [u, v, weight] of sortedEdges) {
      steps.push({
        description: `Consider edge (${u}, ${v}) with weight ${weight}`,
        data: { n, edges: sortedEdges, mst: [...mst], parent: [...parent], current: [u, v, weight] }
      });

      if (union(u, v)) {
        mst.push([u, v, weight]);
        steps.push({
          description: `Add edge (${u}, ${v}) to MST`,
          data: { n, edges: sortedEdges, mst: [...mst], parent: [...parent], current: [u, v, weight], added: true }
        });

        if (mst.length === n - 1) break;
      } else {
        steps.push({
          description: `Skip edge (${u}, ${v}) - would create cycle`,
          data: { n, edges: sortedEdges, mst: [...mst], parent: [...parent], current: [u, v, weight], cycle: true }
        });
      }
    }

    const totalWeight = mst.reduce((sum, [,,w]) => sum + w, 0);
    steps.push({
      description: `MST complete! Total weight: ${totalWeight}`,
      data: { n, edges: sortedEdges, mst: [...mst], parent: [...parent], current: null, complete: true, totalWeight }
    });

    return steps;
  };