export   const generateValidBSTSteps = (input) => {
    const steps = [];
    let isValid = true;

    function validate(node, min, max, path = []) {
      if (!node) return;

      const currentPath = [...path, node.value];
      const valid = node.value > min && node.value < max;

      steps.push({
        description: `Check node ${node.value}: Must be in range (${min === -Infinity ? '-∞' : min}, ${max === Infinity ? '∞' : max})`,
        data: { tree: input, currentNode: node.value, min, max, valid, isValid: isValid && valid, path: currentPath }
      });

      if (!valid) {
        isValid = false;
        steps.push({
          description: `INVALID! ${node.value} violates BST property. Must be > ${min} and < ${max}`,
          data: { tree: input, currentNode: node.value, min, max, valid: false, isValid: false, path: currentPath, complete: true }
        });
        return;
      }

      steps.push({
        description: `✓ Node ${node.value} is valid. Check children with updated ranges...`,
        data: { tree: input, currentNode: node.value, min, max, valid: true, isValid: true, path: currentPath }
      });

      if (node.left) {
        steps.push({
          description: `Left subtree of ${node.value}: all values must be < ${node.value}`,
          data: { tree: input, currentNode: node.value, nextNode: node.left.value, direction: 'left', min, max: node.value, path: currentPath }
        });
        validate(node.left, min, node.value, currentPath);
      }

      if (node.right && isValid) {
        steps.push({
          description: `Right subtree of ${node.value}: all values must be > ${node.value}`,
          data: { tree: input, currentNode: node.value, nextNode: node.right.value, direction: 'right', min: node.value, max, path: currentPath }
        });
        validate(node.right, node.value, max, currentPath);
      }
    }

    steps.push({
      description: 'Validate BST: Left < Root < Right for all nodes',
      data: { tree: input, isValid: true }
    });

    validate(input, -Infinity, Infinity);

    if (isValid) {
      steps.push({
        description: 'SUCCESS! Tree is a valid Binary Search Tree',
        data: { tree: input, isValid: true, complete: true }
      });
    }

    return steps;
  };