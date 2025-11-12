export  const generateEncodeDecodeSteps = (strs) => {
    const steps = [];
    
    steps.push({
      description: `Encode strings: [${strs.map(s => `"${s}"`).join(', ')}]`,
      data: { strs, encoded: '', phase: 'encode', current: -1, decoded: [] }
    });

    let encoded = '';
    for (let i = 0; i < strs.length; i++) {
      const str = strs[i];
      const prefix = str.length + '#';
      
      steps.push({
        description: `Encode "${str}": length=${str.length}, prefix="${prefix}"`,
        data: { strs, encoded, phase: 'encode', current: i, decoded: [], encoding: str, prefix }
      });

      encoded += prefix + str;
      
      steps.push({
        description: `Append: "${prefix}${str}" → encoded="${encoded}"`,
        data: { strs, encoded, phase: 'encode', current: i, decoded: [], appended: true }
      });
    }

    steps.push({
      description: `Encoding complete: "${encoded}"`,
      data: { strs, encoded, phase: 'encode-complete', current: -1, decoded: [] }
    });

    // Decode phase
    steps.push({
      description: `Decode string: "${encoded}"`,
      data: { strs, encoded, phase: 'decode', current: 0, decoded: [], pointer: 0 }
    });

    const decoded = [];
    let i = 0;
    while (i < encoded.length) {
      let j = i;
      
      steps.push({
        description: `Find delimiter '#' starting at index ${i}`,
        data: { strs, encoded, phase: 'decode', current: decoded.length, decoded: [...decoded], pointer: i, finding: true }
      });

      while (j < encoded.length && encoded[j] !== '#') j++;
      const length = parseInt(encoded.slice(i, j));
      
      steps.push({
        description: `Length found: ${length} (from "${encoded.slice(i, j)}")`,
        data: { strs, encoded, phase: 'decode', current: decoded.length, decoded: [...decoded], pointer: i, length, delimiterPos: j }
      });

      const str = encoded.slice(j + 1, j + 1 + length);
      decoded.push(str);
      
      steps.push({
        description: `Extract string: "${str}" (${length} chars)`,
        data: { strs, encoded, phase: 'decode', current: decoded.length - 1, decoded: [...decoded], pointer: j + 1, extracted: str }
      });

      i = j + 1 + length;
    }

    steps.push({
      description: `Decoding complete! Result: [${decoded.map(s => `"${s}"`).join(', ')}]`,
      data: { strs, encoded, phase: 'complete', current: -1, decoded, success: JSON.stringify(strs) === JSON.stringify(decoded) }
    });

    return steps;
  };