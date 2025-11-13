import { buildTree } from './Tree';
export const generateInvertTreeSteps = (tree) => {
    const steps = [];
    const root = buildTree(tree);

    steps.push({
      description: `Invert Binary Tree`,
      data: { tree: [...tree], inverted: [...tree], current: -1, phase: 'init' }
    });

    const invert = (node, index) => {
      if (!node || index >= tree.length) return;

      const leftIdx = 2 * index + 1;
      const rightIdx = 2 * index + 2;

      steps.push({
        description: `Visit node ${tree[index]} at index ${index}`,
        data: { tree: [...tree], inverted: [...tree], current: index, phase: 'visit' }
      });

      if (leftIdx < tree.length || rightIdx < tree.length) {
        const temp = tree[leftIdx];
        tree[leftIdx] = tree[rightIdx];
        tree[rightIdx] = temp;

        steps.push({
          description: `Swap children of node ${tree[index]}: left=${tree[rightIdx]} ↔ right=${tree[leftIdx]}`,
          data: { tree: [...tree], inverted: [...tree], current: index, phase: 'swap', swapped: [leftIdx, rightIdx] }
        });
      }

      invert(node.left, leftIdx);
      invert(node.right, rightIdx);
    };

    invert(root, 0);

    steps.push({
      description: `Tree inverted successfully`,
      data: { tree: tree.filter(v => v !== null), inverted: [...tree], current: -1, phase: 'complete' }
    });

    return steps;
  };