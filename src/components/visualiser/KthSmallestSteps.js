export const generateKthSmallestSteps = (arr, k) => {
    const steps = [];
    const root = buildTree(arr);
    const result = [];

    steps.push({
      description: `Find ${k}th smallest element in BST using inorder traversal`,
      data: { tree: arr, k, result: [], current: null, kth: null }
    });

    const inorder = (node, index) => {
      if (!node || result.length >= k) return;

      inorder(node.left, 2 * index + 1);
      
      if (result.length < k) {
        result.push(node.val);
        steps.push({
          description: `Visit node ${node.val} (${result.length}${result.length === 1 ? 'st' : result.length === 2 ? 'nd' : result.length === 3 ? 'rd' : 'th'} smallest)`,
          data: { tree: arr, k, result: [...result], current: index, kth: result.length === k ? node.val : null }
        });
      }

      inorder(node.right, 2 * index + 2);
    };

    inorder(root, 0);
    
    steps.push({
      description: `${k}th smallest element: ${result[k - 1]}`,
      data: { tree: arr, k, result, current: null, kth: result[k - 1], complete: true }
    });

    return steps;
  };