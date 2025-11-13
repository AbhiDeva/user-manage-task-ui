
export const buildTree = (arr) => {
    if (!arr || arr.length === 0) return null;
    const nodes = arr.map(val => val === null ? null : { val, left: null, right: null });
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i]) {
        const leftIdx = 2 * i + 1;
        const rightIdx = 2 * i + 2;
        if (leftIdx < nodes.length) nodes[i].left = nodes[leftIdx];
        if (rightIdx < nodes.length) nodes[i].right = nodes[rightIdx];
      }
    }
    return nodes[0];
  };