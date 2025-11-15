export const generateMaxDepthSteps = (input) => {
    const steps = [];
    const queue = [[input, 1]];
    let maxDepth = 0;

    steps.push({
      description: 'Start BFS traversal from root to find maximum depth',
      data: { tree: input, depth: 0, currentNode: null, visited: [] }
    });

    const visited = [];
    while (queue.length > 0) {
      const [node, depth] = queue.shift();
      if (!node) continue;

      visited.push(node.value);
      maxDepth = Math.max(maxDepth, depth);

      steps.push({
        description: `Visit node ${node.value} at depth ${depth}`,
        data: { tree: input, depth, currentNode: node.value, visited: [...visited], maxDepth }
      });

      if (node.left) {
        queue.push([node.left, depth + 1]);
        steps.push({
          description: `Add left child ${node.left.value} to queue at depth ${depth + 1}`,
          data: { tree: input, depth, currentNode: node.value, visited: [...visited], maxDepth, nextNode: node.left.value }
        });
      }

      if (node.right) {
        queue.push([node.right, depth + 1]);
        steps.push({
          description: `Add right child ${node.right.value} to queue at depth ${depth + 1}`,
          data: { tree: input, depth, currentNode: node.value, visited: [...visited], maxDepth, nextNode: node.right.value }
        });
      }
    }

    steps.push({
      description: `Complete! Maximum depth is ${maxDepth}`,
      data: { tree: input, depth: maxDepth, visited, complete: true }
    });

    return steps;
  };