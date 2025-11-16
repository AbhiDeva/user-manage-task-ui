export const generateBuildTreeSteps = (input) => {
    const steps = [];
    const { preorder, inorder } = input;

    steps.push({
      description: 'Build tree from Preorder and Inorder traversals',
      data: { preorder: [...preorder], inorder: [...inorder], phase: 'setup', builtTree: null }
    });

    steps.push({
      description: `Preorder (Root → Left → Right): [${preorder.join(', ')}]`,
      data: { preorder: [...preorder], inorder: [...inorder], phase: 'explain-preorder' }
    });

    steps.push({
      description: `Inorder (Left → Root → Right): [${inorder.join(', ')}]`,
      data: { preorder: [...preorder], inorder: [...inorder], phase: 'explain-inorder' }
    });

    function build(pre, ino, depth = 0) {
      if (pre.length === 0) return null;

      const rootVal = pre[0];
      const mid = ino.indexOf(rootVal);

      steps.push({
        description: `Root: ${rootVal} (first in preorder). Find in inorder at index ${mid}`,
        data: { preorder: [...pre], inorder: [...ino], phase: 'build', rootVal, mid, depth }
      });

      steps.push({
        description: `Left subtree: inorder[0:${mid}] = [${ino.slice(0, mid).join(', ') || 'empty'}]`,
        data: { preorder: [...pre], inorder: [...ino], phase: 'left', rootVal, leftInorder: ino.slice(0, mid), depth }
      });

      steps.push({
        description: `Right subtree: inorder[${mid + 1}:end] = [${ino.slice(mid + 1).join(', ') || 'empty'}]`,
        data: { preorder: [...pre], inorder: [...ino], phase: 'right', rootVal, rightInorder: ino.slice(mid + 1), depth }
      });

      const node = { value: rootVal };
      node.left = build(pre.slice(1, mid + 1), ino.slice(0, mid), depth + 1);
      node.right = build(pre.slice(mid + 1), ino.slice(mid + 1), depth + 1);

      return node;
    }

    const builtTree = build([...preorder], [...inorder]);

    steps.push({
      description: 'Tree construction complete!',
      data: { preorder: [...preorder], inorder: [...inorder], phase: 'complete', builtTree, complete: true }
    });

    return steps;
  };