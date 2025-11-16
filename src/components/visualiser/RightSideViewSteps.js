export const generateRightSideViewSteps = (input) => {
    const steps = [];
    const result = [];
    const queue = [{ node: input, level: 0 }];
    
    steps.push({
      description: 'Right Side View: Return rightmost node value at each level',
      data: { tree: input, result: [], visited: [], currentLevel: 0 }
    });

    const visited = [];
    while (queue.length > 0) {
      const levelSize = queue.length;
      let rightmostValue = null;

      for (let i = 0; i < levelSize; i++) {
        const { node, level } = queue.shift();
        visited.push(node.value);
        rightmostValue = node.value;

        steps.push({
          description: `Visit node ${node.value} at level ${level} (position ${i + 1}/${levelSize})`,
          data: { tree: input, currentNode: node.value, currentLevel: level, result: [...result], visited: [...visited], isRightmost: i === levelSize - 1 }
        });

        if (node.left) queue.push({ node: node.left, level: level + 1 });
        if (node.right) queue.push({ node: node.right, level: level + 1 });

        if (i === levelSize - 1) {
          result.push(rightmostValue);
          steps.push({
            description: `Rightmost node at level ${level} is ${rightmostValue}. Add to result!`,
            data: { tree: input, currentNode: node.value, currentLevel: level, result: [...result], visited: [...visited], isRightmost: true, addedToResult: true }
          });
        }
      }
    }

    steps.push({
      description: `Complete! Right side view: [${result.join(', ')}]`,
      data: { tree: input, result: [...result], visited: [...visited], complete: true }
    });

    return steps;
  };