export const generateHuffmanCodingSteps = (freq) => {
    const steps = [];
    const chars = freq.map((f, i) => String.fromCharCode(65 + i));
    const heap = freq.map((f, i) => ({ char: chars[i], freq: f, left: null, right: null }));

    steps.push({
      description: `Build Huffman Tree for frequencies: ${chars.map((c, i) => `${c}:${freq[i]}`).join(', ')}`,
      data: { heap: heap.map(h => ({...h})), codes: {}, phase: 'build' }
    });

    while (heap.length > 1) {
      heap.sort((a, b) => a.freq - b.freq);
      const left = heap.shift();
      const right = heap.shift();

      steps.push({
        description: `Merge ${left.char}(${left.freq}) and ${right.char}(${right.freq})`,
        data: { heap: heap.map(h => ({...h})), codes: {}, phase: 'merge', merging: [left, right] }
      });

      const merged = {
        char: left.char + right.char,
        freq: left.freq + right.freq,
        left, right
      };
      heap.push(merged);

      steps.push({
        description: `Created node ${merged.char}(${merged.freq})`,
        data: { heap: heap.map(h => ({...h})), codes: {}, phase: 'build', created: merged }
      });
    }

    const codes = {};
    const generateCodes = (node, code = '') => {
      if (!node.left && !node.right) {
        codes[node.char] = code || '0';
        return;
      }
      if (node.left) generateCodes(node.left, code + '0');
      if (node.right) generateCodes(node.right, code + '1');
    };

    generateCodes(heap[0]);

    for (let char in codes) {
      steps.push({
        description: `Code for '${char}': ${codes[char]}`,
        data: { heap: heap.map(h => ({...h})), codes: {...codes}, phase: 'codes', current: char }
      });
    }

    steps.push({
      description: `Huffman coding complete`,
      data: { heap: heap.map(h => ({...h})), codes: {...codes}, phase: 'complete' }
    });

    return steps;
  };