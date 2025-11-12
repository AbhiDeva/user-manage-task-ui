export const generateSubsetsSteps = (nums) => {
    const steps = [];
    const result = [];

    steps.push({
      description: `Generate all subsets of [${nums.join(', ')}]`,
      data: { nums, current: [], result: [[]], depth: 0 }
    });

    const backtrack = (start, current, depth) => {
      result.push([...current]);
      
      if (current.length > 0) {
        steps.push({
          description: `Add subset: [${current.join(', ')}]`,
          data: { nums, current: [...current], result: result.map(r => [...r]), depth, added: true }
        });
      }

      for (let i = start; i < nums.length; i++) {
        current.push(nums[i]);
        steps.push({
          description: `Include ${nums[i]}: [${current.join(', ')}]`,
          data: { nums, current: [...current], result: result.map(r => [...r]), depth, including: nums[i] }
        });
        
        backtrack(i + 1, current, depth + 1);
        
        const removed = current.pop();
        steps.push({
          description: `Exclude ${removed}, backtrack`,
          data: { nums, current: [...current], result: result.map(r => [...r]), depth, excluding: removed }
        });
      }
    };

    backtrack(0, [], 0);
    
    steps.push({
      description: `Complete! Found ${result.length} subsets`,
      data: { nums, current: [], result: result.map(r => [...r]), depth: 0, complete: true }
    });

    return steps;
  };