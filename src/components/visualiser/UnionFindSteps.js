export const generateUnionFindSteps = (n, edges) => {
    const steps = [];
    const parent = Array(n).fill().map((_, i) => i);
    const rank = Array(n).fill(0);

    steps.push({
      description: `Initialize Union-Find for ${n} nodes`,
      data: { n, parent: [...parent], rank: [...rank], edges, current: null }
    });

    const find = (x) => {
      if (parent[x] !== x) {
        parent[x] = find(parent[x]);
      }
      return parent[x];
    };

    for (let [x, y] of edges) {
      steps.push({
        description: `Union nodes ${x} and ${y}`,
        data: { n, parent: [...parent], rank: [...rank], edges, current: [x, y], phase: 'find' }
      });

      const rootX = find(x);
      const rootY = find(y);

      steps.push({
        description: `Find roots: root(${x}) = ${rootX}, root(${y}) = ${rootY}`,
        data: { n, parent: [...parent], rank: [...rank], edges, current: [x, y], roots: [rootX, rootY] }
      });

      if (rootX === rootY) {
        steps.push({
          description: `Nodes ${x} and ${y} already in same set`,
          data: { n, parent: [...parent], rank: [...rank], edges, current: [x, y], same: true }
        });
        continue;
      }

      if (rank[rootX] < rank[rootY]) {
        parent[rootX] = rootY;
      } else if (rank[rootX] > rank[rootY]) {
        parent[rootY] = rootX;
      } else {
        parent[rootY] = rootX;
        rank[rootX]++;
      }

      steps.push({
        description: `Merged: ${x} and ${y} now in same set`,
        data: { n, parent: [...parent], rank: [...rank], edges, current: [x, y], merged: true }
      });
    }

    steps.push({
      description: `Union-Find complete`,
      data: { n, parent: [...parent], rank: [...rank], edges, current: null, complete: true }
    });

    return steps;
  };