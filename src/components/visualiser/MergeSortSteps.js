export const generateMergeSortSteps = (nums) => {
    const steps = [];
    const originalArr = [...nums];
    
    steps.push({
      description: `Initialize Merge Sort: array = [${nums.join(', ')}]`,
      data: { original: originalArr, subarrays: [[...nums]], merged: [], depth: 0, phase: 'divide' }
    });

    const mergeSortHelper = (arr, start, depth) => {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);

      steps.push({
        description: `Divide at depth ${depth}: [${arr.join(', ')}] → [${left.join(', ')}] | [${right.join(', ')}]`,
        data: { original: originalArr, subarrays: [left, right], merged: [], depth, phase: 'divide', start }
      });

      const sortedLeft = mergeSortHelper(left, start, depth + 1);
      const sortedRight = mergeSortHelper(right, start + left.length, depth + 1);

      const merged = [];
      let i = 0, j = 0;

      while (i < sortedLeft.length && j < sortedRight.length) {
        if (sortedLeft[i] <= sortedRight[j]) {
          merged.push(sortedLeft[i++]);
        } else {
          merged.push(sortedRight[j++]);
        }
      }
      merged.push(...sortedLeft.slice(i), ...sortedRight.slice(j));

      steps.push({
        description: `Merge at depth ${depth}: [${sortedLeft.join(', ')}] + [${sortedRight.join(', ')}] → [${merged.join(', ')}]`,
        data: { original: originalArr, subarrays: [sortedLeft, sortedRight], merged, depth, phase: 'merge', start }
      });

      return merged;
    };

    const sorted = mergeSortHelper([...nums], 0, 0);

    steps.push({
      description: `Merge Sort complete! Sorted array: [${sorted.join(', ')}]`,
      data: { original: originalArr, subarrays: [], merged: sorted, depth: 0, phase: 'complete' }
    });

    return steps;
  };