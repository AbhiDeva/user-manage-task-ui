 export const generateValidateBSTSteps = (arr) => {
    const steps = [];
    const root = buildTree(arr);

    steps.push({
      description: `Validate if tree is a valid Binary Search Tree`,
      data: { tree: arr, current: null, min: -Infinity, max: Infinity, valid: true }
    });

    const validate = (node, index, min, max) => {
      if (!node) return true;

      steps.push({
        description: `Check node ${node.val}: must be in range (${min === -Infinity ? '-∞' : min}, ${max === Infinity ? '∞' : max})`,
        data: { tree: arr, current: index, min, max, valid: true, checking: true }
      });

      if (node.val <= min || node.val >= max) {
        steps.push({
          description: `Invalid! ${node.val} violates BST property`,
          data: { tree: arr, current: index, min, max, valid: false, invalid: true }
        });
        return false;
      }

      steps.push({
        description: `Node ${node.val} is valid in range`,
        data: { tree: arr, current: index, min, max, valid: true, validated: true }
      });

      return validate(node.left, 2 * index + 1, min, node.val) &&
             validate(node.right, 2 * index + 2, node.val, max);
    };

    const isValid = validate(root, 0, -Infinity, Infinity);
    
    steps.push({
      description: isValid ? `Valid BST!` : `Not a valid BST`,
      data: { tree: arr, current: null, min: -Infinity, max: Infinity, valid: isValid, complete: true }
    });

    return steps;
  };