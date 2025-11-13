import { buildTree } from './Tree';
export const generateBinaryTreeInorderSteps = (arr) => {
    const steps = [];
    const root = buildTree(arr);
    const result = [];

    steps.push({
      description: `Inorder traversal: Left → Root → Right`,
      data: { tree: arr, result: [], current: null, stack: [] }
    });

    const traverse = (node, index = 0) => {
      if (!node) return;
      
      steps.push({
        description: `Visit left subtree of node ${node.val}`,
        data: { tree: arr, result: [...result], current: index, stack: [index], phase: 'left' }
      });
      traverse(node.left, 2 * index + 1);
      
      result.push(node.val);
      steps.push({
        description: `Process root: ${node.val}`,
        data: { tree: arr, result: [...result], current: index, stack: [index], phase: 'root' }
      });
      
      steps.push({
        description: `Visit right subtree of node ${node.val}`,
        data: { tree: arr, result: [...result], current: index, stack: [index], phase: 'right' }
      });
      traverse(node.right, 2 * index + 2);
    };

    traverse(root);
    
    steps.push({
      description: `Inorder traversal complete: [${result.join(', ')}]`,
      data: { tree: arr, result, current: null, stack: [], complete: true }
    });

    return steps;
  };