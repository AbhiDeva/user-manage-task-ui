export const generateSegmentTreeSteps = (arr, queryRange) => {
    const steps = [];
    const n = arr.length;
    const tree = Array(4 * n).fill(0);

    steps.push({
      description: `Build Segment Tree for array [${arr.join(', ')}]`,
      data: { arr, tree: [...tree], phase: 'build', node: 0, start: 0, end: n - 1 }
    });

    const build = (node, start, end) => {
      if (start === end) {
        tree[node] = arr[start];
        steps.push({
          description: `Leaf node: tree[${node}] = arr[${start}] = ${arr[start]}`,
          data: { arr, tree: [...tree], phase: 'build', node, start, end, leaf: true }
        });
        return;
      }

      const mid = Math.floor((start + end) / 2);
      build(2 * node + 1, start, mid);
      build(2 * node + 2, mid + 1, end);
      tree[node] = tree[2 * node + 1] + tree[2 * node + 2];

      steps.push({
        description: `Internal node: tree[${node}] = ${tree[2*node+1]} + ${tree[2*node+2]} = ${tree[node]}`,
        data: { arr, tree: [...tree], phase: 'build', node, start, end }
      });
    };

    build(0, 0, n - 1);

    const [l, r] = queryRange;
    steps.push({
      description: `Query range [${l}, ${r}]`,
      data: { arr, tree: [...tree], phase: 'query', node: 0, start: 0, end: n - 1, queryRange }
    });

    const query = (node, start, end, l, r) => {
      if (r < start || l > end) return 0;
      if (l <= start && end <= r) {
        steps.push({
          description: `Range [${start}, ${end}] fully covered, return ${tree[node]}`,
          data: { arr, tree: [...tree], phase: 'query', node, start, end, queryRange, covered: true }
        });
        return tree[node];
      }

      const mid = Math.floor((start + end) / 2);
      steps.push({
        description: `Split at mid=${mid}, query left and right`,
        data: { arr, tree: [...tree], phase: 'query', node, start, end, queryRange, mid }
      });

      return query(2 * node + 1, start, mid, l, r) + query(2 * node + 2, mid + 1, end, l, r);
    };

    const result = query(0, 0, n - 1, l, r);

    steps.push({
      description: `Query result: sum of range [${l}, ${r}] = ${result}`,
      data: { arr, tree: [...tree], phase: 'complete', node: -1, start: -1, end: -1, queryRange, result }
    });

    return steps;
  };