export const generateMaxPathSumSteps = (input) => {
    const steps = [];
    let maxSum = -Infinity;

    function maxGain(node, path = []) {
      if (!node) return 0;

      const currentPath = [...path, node.value];

      steps.push({
        description: `Visit node ${node.value}`,
        data: { tree: input, currentNode: node.value, maxSum, path: currentPath, phase: 'visiting' }
      });

      const leftGain = Math.max(maxGain(node.left, currentPath), 0);
      const rightGain = Math.max(maxGain(node.right, currentPath), 0);

      steps.push({
        description: `Node ${node.value}: leftGain=${leftGain}, rightGain=${rightGain}`,
        data: { tree: input, currentNode: node.value, leftGain, rightGain, maxSum, path: currentPath, phase: 'calculating' }
      });

      const pathSum = node.value + leftGain + rightGain;
      
      steps.push({
        description: `Path through ${node.value}: ${node.value} + ${leftGain} + ${rightGain} = ${pathSum}`,
        data: { tree: input, currentNode: node.value, leftGain, rightGain, pathSum, maxSum, path: currentPath, phase: 'path-sum' }
      });

      if (pathSum > maxSum) {
        maxSum = pathSum;
        steps.push({
          description: `New max path sum: ${maxSum} (through node ${node.value})`,
          data: { tree: input, currentNode: node.value, leftGain, rightGain, pathSum, maxSum, path: currentPath, phase: 'new-max' }
        });
      }

      return node.value + Math.max(leftGain, rightGain);
    }

    steps.push({
      description: 'Find maximum path sum. Path can start and end at any node.',
      data: { tree: input, maxSum: -Infinity }
    });

    maxGain(input);

    steps.push({
      description: `Complete! Maximum path sum is ${maxSum}`,
      data: { tree: input, maxSum, complete: true }
    });

    return steps;
  };