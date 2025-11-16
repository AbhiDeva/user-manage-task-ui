export const generateLevelOrderSteps = (input) => {
    const steps = [];
    const result = [];
    const queue = [{ node: input, level: 0 }];
    
    steps.push({
      description: 'Level Order Traversal: Visit nodes level by level using BFS',
      data: { tree: input, currentLevel: 0, result: [], queue: [input.value], visited: [] }
    });

    const visited = [];
    while (queue.length > 0) {
      const levelSize = queue.length;
      const currentLevel = [];
      const queueNodes = queue.map(q => q.node.value);

      steps.push({
        description: `Processing Level ${queue[0].level}: Queue has ${levelSize} node(s)`,
        data: { tree: input, currentLevel: queue[0].level, result: [...result], queue: queueNodes, visited: [...visited] }
      });

      for (let i = 0; i < levelSize; i++) {
        const { node, level } = queue.shift();
        currentLevel.push(node.value);
        visited.push(node.value);

        steps.push({
          description: `Visit node ${node.value} at level ${level}`,
          data: { tree: input, currentLevel: level, currentNode: node.value, result: [...result], visited: [...visited] }
        });

        if (node.left) {
          queue.push({ node: node.left, level: level + 1 });
          steps.push({
            description: `Add left child ${node.left.value} to queue`,
            data: { tree: input, currentLevel: level, currentNode: node.value, result: [...result], visited: [...visited], addedNode: node.left.value }
          });
        }
        
        if (node.right) {
          queue.push({ node: node.right, level: level + 1 });
          steps.push({
            description: `Add right child ${node.right.value} to queue`,
            data: { tree: input, currentLevel: level, currentNode: node.value, result: [...result], visited: [...visited], addedNode: node.right.value }
          });
        }
      }

      result.push(currentLevel);
      steps.push({
        description: `Level ${queue[0]?.level - 1 || result.length - 1} complete: [${currentLevel.join(', ')}]`,
        data: { tree: input, currentLevel: result.length - 1, result: [...result], visited: [...visited], levelComplete: true }
      });
    }

    steps.push({
      description: `Complete! Level order: ${JSON.stringify(result)}`,
      data: { tree: input, result: [...result], visited: [...visited], complete: true }
    });

    return steps;
  };