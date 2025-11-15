export const generateSubtreeSteps = (input) => {
    const steps = [];
    const checkedNodes = [];

    const isSame = (p, q) => {
      if (!p && !q) return true;
      if (!p || !q) return false;
      return p.value === q.value && isSame(p.left, q.left) && isSame(p.right, q.right);
    };

    const traverse = (node, depth = 0) => {
      if (!node) return false;

      checkedNodes.push(node.value);
      steps.push({
        description: `Check if subtree matches starting at node ${node.value}`,
        data: { mainTree: input.mainTree, subTree: input.subTree, currentNode: node.value, checkedNodes: [...checkedNodes], found: false, depth }
      });

      if (isSame(node, input.subTree)) {
        steps.push({
          description: `MATCH FOUND! Subtree exists starting at node ${node.value}`,
          data: { mainTree: input.mainTree, subTree: input.subTree, currentNode: node.value, checkedNodes: [...checkedNodes], found: true, complete: true }
        });
        return true;
      }

      steps.push({
        description: `No match at node ${node.value}, checking left subtree...`,
        data: { mainTree: input.mainTree, subTree: input.subTree, currentNode: node.value, checkedNodes: [...checkedNodes], found: false }
      });

      if (traverse(node.left, depth + 1)) return true;

      steps.push({
        description: `No match in left subtree, checking right subtree...`,
        data: { mainTree: input.mainTree, subTree: input.subTree, currentNode: node.value, checkedNodes: [...checkedNodes], found: false }
      });

      return traverse(node.right, depth + 1);
    };

    steps.push({
      description: 'Start searching for subtree in main tree',
      data: { mainTree: input.mainTree, subTree: input.subTree, checkedNodes: [], found: false }
    });

    traverse(input.mainTree);

    return steps;
  };