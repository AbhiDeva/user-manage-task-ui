export const generateDiameterSteps = (input) => {
    const steps = [];
    const calcDiameter = (node, path = []) => {
      if (!node) return { height: 0, diameter: 0 };
      
      const currentPath = [...path, node.value];
      steps.push({
        description: `Visiting node ${node.value}, calculating heights of subtrees`,
        data: { tree: input, diameter: 0, currentNode: node.value, path: currentPath, phase: 'calculating' }
      });

      const left = node.left ? calcDiameter(node.left, currentPath) : { height: 0, diameter: 0 };
      const right = node.right ? calcDiameter(node.right, currentPath) : { height: 0, diameter: 0 };
      
      const leftHeight = left.height;
      const rightHeight = right.height;
      const currentDiameter = leftHeight + rightHeight;
      
      steps.push({
        description: `At node ${node.value}: Left height=${leftHeight}, Right height=${rightHeight}, Diameter through this node=${currentDiameter}`,
        data: { tree: input, diameter: currentDiameter, currentNode: node.value, leftHeight, rightHeight, path: currentPath, phase: 'computed' }
      });

      return {
        height: 1 + Math.max(leftHeight, rightHeight),
        diameter: Math.max(currentDiameter, left.diameter, right.diameter)
      };
    };

    steps.push({
      description: 'Start: Diameter is longest path between any two nodes',
      data: { tree: input, diameter: 0, phase: 'start' }
    });

    const result = calcDiameter(input);
    
    steps.push({
      description: `Complete! Maximum diameter is ${result.diameter} edges`,
      data: { tree: input, diameter: result.diameter, phase: 'complete', complete: true }
    });

    return steps;
  };
