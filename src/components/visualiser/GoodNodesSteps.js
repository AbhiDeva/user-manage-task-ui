export  const generateGoodNodesSteps = (input) => {
    const steps = [];
    let goodCount = 0;

    function dfs(node, maxSoFar, path = []) {
      if (!node) return;

      const currentPath = [...path, node.value];
      const isGood = node.value >= maxSoFar;
      
      if (isGood) goodCount++;

      steps.push({
        description: `Visit node ${node.value}, path max = ${maxSoFar}. ${isGood ? `${node.value} >= ${maxSoFar} - GOOD NODE!` : `${node.value} < ${maxSoFar} - Not good`}`,
        data: { tree: input, currentNode: node.value, maxSoFar, isGood, goodCount, path: currentPath }
      });

      const newMax = Math.max(maxSoFar, node.value);
      
      if (node.left || node.right) {
        steps.push({
          description: `Update max for children: ${newMax}. Explore subtrees...`,
          data: { tree: input, currentNode: node.value, maxSoFar: newMax, goodCount, path: currentPath }
        });
      }

      if (node.left) dfs(node.left, newMax, currentPath);
      if (node.right) dfs(node.right, newMax, currentPath);
    }

    steps.push({
      description: 'Good Node: Node value >= max value in path from root. Start DFS...',
      data: { tree: input, goodCount: 0, path: [] }
    });

    dfs(input, input.value);

    steps.push({
      description: `Complete! Total good nodes: ${goodCount}`,
      data: { tree: input, goodCount, complete: true }
    });

    return steps;
  };