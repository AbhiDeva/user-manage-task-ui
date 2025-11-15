export  const generateBalancedSteps = (input) => {
    const steps = [];
    const nodeHeights = new Map();

    const checkBalance = (node, path = []) => {
      if (!node) return 0;

      const currentPath = [...path, node.value];
      steps.push({
        description: `Check node ${node.value} for balance`,
        data: { tree: input, currentNode: node.value, path: currentPath, nodeHeights: Object.fromEntries(nodeHeights), balanced: true }
      });

      const leftHeight = node.left ? checkBalance(node.left, currentPath) : 0;
      if (leftHeight === -1) return -1;

      const rightHeight = node.right ? checkBalance(node.right, currentPath) : 0;
      if (rightHeight === -1) return -1;

      const heightDiff = Math.abs(leftHeight - rightHeight);
      nodeHeights.set(node.value, { left: leftHeight, right: rightHeight, diff: heightDiff });

      steps.push({
        description: `Node ${node.value}: Left height=${leftHeight}, Right height=${rightHeight}, Diff=${heightDiff}`,
        data: { 
          tree: input, 
          currentNode: node.value, 
          leftHeight, 
          rightHeight, 
          heightDiff, 
          path: currentPath,
          nodeHeights: Object.fromEntries(nodeHeights),
          balanced: heightDiff <= 1 
        }
      });

      if (heightDiff > 1) {
        steps.push({
          description: `UNBALANCED at node ${node.value}! Height difference (${heightDiff}) > 1`,
          data: { tree: input, currentNode: node.value, balanced: false, complete: true, nodeHeights: Object.fromEntries(nodeHeights) }
        });
        return -1;
      }

      return 1 + Math.max(leftHeight, rightHeight);
    };

    steps.push({
      description: 'Start checking if tree is height-balanced (|left-right| ≤ 1 for all nodes)',
      data: { tree: input, balanced: true, nodeHeights: {} }
    });

    const result = checkBalance(input);
    const isBalanced = result !== -1;

    if (isBalanced) {
      steps.push({
        description: 'Tree IS balanced! All nodes satisfy the height condition',
        data: { tree: input, balanced: true, complete: true, nodeHeights: Object.fromEntries(nodeHeights) }
      });
    }

    return steps;
  };