export  const generateSameTreeSteps = (input) => {
    const steps = [];
    const path1 = [];
    const path2 = [];

    const compare = (p, q, depth = 0) => {
      path1.push(p?.value || 'null');
      path2.push(q?.value || 'null');

      steps.push({
        description: `Compare nodes at depth ${depth}: Tree1=${p?.value || 'null'}, Tree2=${q?.value || 'null'}`,
        data: { tree1: input.tree1, tree2: input.tree2, same: true, path1: [...path1], path2: [...path2], currentDepth: depth }
      });

      if (!p && !q) {
        steps.push({
          description: 'Both nodes are null - match continues',
          data: { tree1: input.tree1, tree2: input.tree2, same: true, path1: [...path1], path2: [...path2] }
        });
        return true;
      }

      if (!p || !q) {
        steps.push({
          description: `Mismatch! One node is null, other is not`,
          data: { tree1: input.tree1, tree2: input.tree2, same: false, path1: [...path1], path2: [...path2], complete: true }
        });
        return false;
      }

      if (p.value !== q.value) {
        steps.push({
          description: `Mismatch! Values differ: ${p.value} ≠ ${q.value}`,
          data: { tree1: input.tree1, tree2: input.tree2, same: false, path1: [...path1], path2: [...path2], complete: true }
        });
        return false;
      }

      steps.push({
        description: `Values match: ${p.value} = ${q.value}, checking children...`,
        data: { tree1: input.tree1, tree2: input.tree2, same: true, path1: [...path1], path2: [...path2] }
      });

      const leftSame = compare(p.left, q.left, depth + 1);
      if (!leftSame) return false;

      const rightSame = compare(p.right, q.right, depth + 1);
      return rightSame;
    };

    steps.push({
      description: 'Start comparing trees node by node',
      data: { tree1: input.tree1, tree2: input.tree2, same: true, path1: [], path2: [] }
    });

    const result = compare(input.tree1, input.tree2);

    if (result) {
      steps.push({
        description: 'Trees are IDENTICAL! All nodes and structure match',
        data: { tree1: input.tree1, tree2: input.tree2, same: true, complete: true, path1, path2 }
      });
    }

    return steps;
  };