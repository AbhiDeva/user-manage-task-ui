export const generateTreeSteps = (input, algoType, difficulty) => {
    const steps = [];
    
    if (algoType === 'diameter') {
      const diameter = difficulty === 'normal' ? 2 : difficulty === 'medium' ? 3 : 4;
      steps.push({
        description: 'Calculate diameter by finding max left+right heights',
        data: { tree: input, diameter: 0, calculating: true }
      });
      steps.push({
        description: `Diameter calculated! Longest path has ${diameter} edges`,
        data: { tree: input, diameter, calculating: false, complete: true }
      });
    } else if (algoType === 'maxDepth') {
      const depth = difficulty === 'normal' ? 3 : difficulty === 'medium' ? 3 : 5;
      steps.push({
        description: 'Start calculating maximum depth',
        data: { tree: input, depth: 0 }
      });
      for (let i = 1; i <= depth; i++) {
        steps.push({
          description: `Traversing level ${i}, depth = ${i}`,
          data: { tree: input, depth: i }
        });
      }
      steps.push({
        description: `Maximum depth is ${depth}`,
        data: { tree: input, depth, complete: true }
      });
    } else if (algoType === 'balanced') {
      steps.push({
        description: 'Check if tree is balanced',
        data: { tree: input, balanced: input.balanced, checking: true }
      });
      steps.push({
        description: input.balanced ? 'Tree is balanced!' : 'Tree is NOT balanced',
        data: { tree: input, balanced: input.balanced, checking: false, complete: true }
      });
    } else if (algoType === 'sameTree') {
      steps.push({
        description: 'Compare trees recursively',
        data: { tree1: input.tree1, tree2: input.tree2, same: input.same, checking: true }
      });
      steps.push({
        description: input.same ? 'Trees are identical!' : 'Trees are different',
        data: { tree1: input.tree1, tree2: input.tree2, same: input.same, checking: false, complete: true }
      });
    } else if (algoType === 'subtree') {
      steps.push({
        description: 'Check if subtree exists',
        data: { mainTree: input.mainTree, subTree: input.subTree, checking: true, found: false }
      });
      steps.push({
        description: 'Subtree found!',
        data: { mainTree: input.mainTree, subTree: input.subTree, checking: false, found: true }
      });
    } else if (algoType === 'lca') {
      steps.push({
        description: `Finding LCA of ${input.p} and ${input.q}`,
        data: { tree: input.tree, p: input.p, q: input.q, lca: null, checking: true }
      });
      steps.push({
        description: `LCA found at node ${input.lca}`,
        data: { tree: input.tree, p: input.p, q: input.q, lca: input.lca, checking: false, complete: true }
      });
    }
    return steps;
  };