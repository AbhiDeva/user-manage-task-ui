export const generateLCASteps = (arr, p, q) => {
    const steps = [];
    const root = buildTree(arr);

    steps.push({
      description: `Find Lowest Common Ancestor of nodes ${p} and ${q}`,
      data: { tree: arr, p, q, current: null, lca: null }
    });

    const findLCA = (node, index) => {
      if (!node || node.val === p || node.val === q) {
        if (node) {
          steps.push({
            description: node.val === p || node.val === q ? `Found target node: ${node.val}` : `Reached null`,
            data: { tree: arr, p, q, current: index, lca: null, found: node?.val }
          });
        }
        return node;
      }

      steps.push({
        description: `Exploring node ${node.val}`,
        data: { tree: arr, p, q, current: index, lca: null, exploring: true }
      });

      const left = findLCA(node.left, 2 * index + 1);
      const right = findLCA(node.right, 2 * index + 2);

      if (left && right) {
        steps.push({
          description: `Node ${node.val} is the LCA (both targets found in subtrees)`,
          data: { tree: arr, p, q, current: index, lca: node.val, foundLCA: true }
        });
        return node;
      }

      return left || right;
    };

    const lca = findLCA(root, 0);
    
    steps.push({
      description: `LCA found: ${lca?.val}`,
      data: { tree: arr, p, q, current: null, lca: lca?.val, complete: true }
    });

    return steps;
  };