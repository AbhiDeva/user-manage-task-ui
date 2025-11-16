export const generateKthSmallestStepsII = (input) => {
    const steps = [];
    const inorderList = [];
    let count = 0;

    function inorder(node, path = []) {
      if (!node) return;

      const currentPath = [...path, node.value];

      steps.push({
        description: `Visit node ${node.value}, go LEFT first (inorder traversal)`,
        data: { tree: input, currentNode: node.value, inorderList: [...inorderList], count, k: input.k, path: currentPath, phase: 'visiting' }
      });

      inorder(node.left, currentPath);

      count++;
      inorderList.push(node.value);
      
      steps.push({
        description: `Process node ${node.value} (${count}${count === 1 ? 'st' : count === 2 ? 'nd' : count === 3 ? 'rd' : 'th'} smallest)${count === input.k ? ' ← FOUND!' : ''}`,
        data: { tree: input, currentNode: node.value, inorderList: [...inorderList], count, k: input.k, path: currentPath, phase: 'processing', found: count === input.k }
      });

      if (count === input.k) {
        steps.push({
          description: `${input.k}${input.k === 1 ? 'st' : input.k === 2 ? 'nd' : input.k === 3 ? 'rd' : 'th'} smallest element is ${node.value}!`,
          data: { tree: input, currentNode: node.value, inorderList: [...inorderList], count, k: input.k, result: node.value, complete: true }
        });
        return;
      }

      inorder(node.right, currentPath);
    }

    steps.push({
      description: `Find ${input.k}${input.k === 1 ? 'st' : input.k === 2 ? 'nd' : input.k === 3 ? 'rd' : 'th'} smallest using inorder traversal (Left → Root → Right)`,
      data: { tree: input, inorderList: [], count: 0, k: input.k }
    });

    inorder(input);

    return steps;
  };