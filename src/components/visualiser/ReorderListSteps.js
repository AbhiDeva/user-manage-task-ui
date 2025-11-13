export  const generateReorderListSteps = (list) => {
    const steps = [];

    steps.push({
      description: `Reorder list: [${list.join(' → ')}]`,
      data: { list: [...list], phase: 'init', slow: -1, fast: -1, result: [] }
    });

    // Find middle
    let slow = 0, fast = 0;
    steps.push({
      description: `Phase 1: Find middle using slow/fast pointers`,
      data: { list: [...list], phase: 'find-middle', slow, fast, result: [] }
    });

    while (fast + 1 < list.length && fast + 2 < list.length) {
      slow++;
      fast += 2;
      
      steps.push({
        description: `Move: slow=${slow}, fast=${fast}`,
        data: { list: [...list], phase: 'find-middle', slow, fast, result: [] }
      });
    }

    steps.push({
      description: `Middle found at index ${slow}`,
      data: { list: [...list], phase: 'find-middle', slow, fast, result: [], middleFound: true }
    });

    // Split and reverse second half
    const firstHalf = list.slice(0, slow + 1);
    let secondHalf = list.slice(slow + 1).reverse();

    steps.push({
      description: `Phase 2: Split and reverse second half`,
      data: { list: [...list], phase: 'reverse', slow, fast: -1, firstHalf: [...firstHalf], secondHalf: [...secondHalf], result: [] }
    });

    // Merge
    steps.push({
      description: `Phase 3: Merge alternating nodes`,
      data: { list: [...list], phase: 'merge', slow, fast: -1, firstHalf: [...firstHalf], secondHalf: [...secondHalf], result: [] }
    });

    const result = [];
    let i = 0, j = 0;
    while (i < firstHalf.length || j < secondHalf.length) {
      if (i < firstHalf.length) {
        result.push(firstHalf[i]);
        steps.push({
          description: `Add ${firstHalf[i]} from first half`,
          data: { list: [...list], phase: 'merge', slow, fast: -1, firstHalf: [...firstHalf], secondHalf: [...secondHalf], result: [...result], i, j }
        });
        i++;
      }
      if (j < secondHalf.length) {
        result.push(secondHalf[j]);
        steps.push({
          description: `Add ${secondHalf[j]} from second half`,
          data: { list: [...list], phase: 'merge', slow, fast: -1, firstHalf: [...firstHalf], secondHalf: [...secondHalf], result: [...result], i, j }
        });
        j++;
      }
    }

    steps.push({
      description: `Reordered: [${result.join(' → ')}]`,
      data: { list: [...list], phase: 'complete', slow, fast: -1, firstHalf: [...firstHalf], secondHalf: [...secondHalf], result: [...result], complete: true }
    });

    return steps;
  };