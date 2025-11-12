export const generatePermutationsSteps = (nums) => {
    const steps = [];
    const result = [];

    steps.push({
      description: `Generate all permutations of [${nums.join(', ')}]`,
      data: { nums, current: [], result: [], depth: 0 }
    });

    const backtrack = (current, depth) => {
      if (current.length === nums.length) {
        result.push([...current]);
        steps.push({
          description: `Found permutation: [${current.join(', ')}]`,
          data: { nums, current: [...current], result: result.map(r => [...r]), depth, found: true }
        });
        return;
      }

      for (let num of nums) {
        if (current.includes(num)) continue;
        
        current.push(num);
        steps.push({
          description: `Add ${num} to current permutation: [${current.join(', ')}]`,
          data: { nums, current: [...current], result: result.map(r => [...r]), depth, adding: num }
        });
        
        backtrack(current, depth + 1);
        
        const removed = current.pop();
        steps.push({
          description: `Backtrack: Remove ${removed}`,
          data: { nums, current: [...current], result: result.map(r => [...r]), depth, removing: removed }
        });
      }
    };

    backtrack([], 0);
    
    steps.push({
      description: `Complete! Found ${result.length} permutations`,
      data: { nums, current: [], result: result.map(r => [...r]), depth: 0, complete: true }
    });

    return steps;
  };