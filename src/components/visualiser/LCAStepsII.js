export const generateLCAStepsII = (input) => {
    const steps = [];
    const path = [];

    const findLCA = (node, p, q) => {
      if (!node) return null;

      path.push(node.value);
      
      steps.push({
        description: `At node ${node.value}, comparing with p=${p} and q=${q}`,
        data: { tree: input.tree, p, q, currentNode: node.value, lca: null, path: [...path] }
      });

      if (p > node.value && q > node.value) {
        steps.push({
          description: `Both ${p} and ${q} are greater than ${node.value}, go RIGHT`,
          data: { tree: input.tree, p, q, currentNode: node.value, lca: null, path: [...path], direction: 'right' }
        });
        return findLCA(node.right, p, q);
      }

      if (p < node.value && q < node.value) {
        steps.push({
          description: `Both ${p} and ${q} are less than ${node.value}, go LEFT`,
          data: { tree: input.tree, p, q, currentNode: node.value, lca: null, path: [...path], direction: 'left' }
        });
        return findLCA(node.left, p, q);
      }

      steps.push({
        description: `Split point! ${p} and ${q} are on different sides of ${node.value}`,
        data: { tree: input.tree, p, q, currentNode: node.value, lca: node.value, path: [...path], direction: 'split' }
      });

      steps.push({
        description: `LCA found! Node ${node.value} is the lowest common ancestor`,
        data: { tree: input.tree, p, q, lca: node.value, path: [...path], complete: true }
      });

      return node.value;
    };

    steps.push({
      description: `Find LCA of ${input.p} and ${input.q} using BST property`,
      data: { tree: input.tree, p: input.p, q: input.q, lca: null, path: [] }
    });

    findLCA(input.tree, input.p, input.q);

    return steps;
  };