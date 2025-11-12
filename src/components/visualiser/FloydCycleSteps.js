export const generateFloydCycleSteps = (nums) => {
    const steps = [];
    
    steps.push({
      description: `Find duplicate in [${nums.join(', ')}] using Floyd's Cycle Detection`,
      data: { nums, slow: 0, fast: 0, phase: 'init', duplicate: -1 }
    });

    let slow = nums[0];
    let fast = nums[0];

    steps.push({
      description: `Phase 1: Find intersection point. slow = nums[0] = ${slow}, fast = nums[0] = ${fast}`,
      data: { nums, slow, fast, phase: 'finding', duplicate: -1 }
    });

    do {
      slow = nums[slow];
      fast = nums[nums[fast]];
      
      steps.push({
        description: `Move: slow = nums[${slow}], fast = nums[nums[${fast}]]`,
        data: { nums, slow, fast, phase: 'finding', duplicate: -1, moving: true }
      });
    } while (slow !== fast);

    steps.push({
      description: `Intersection found at ${slow}! Phase 2: Find cycle entrance`,
      data: { nums, slow, fast, phase: 'intersection', duplicate: -1 }
    });

    slow = nums[0];
    steps.push({
      description: `Reset slow to start. slow = ${slow}, fast = ${fast}`,
      data: { nums, slow, fast, phase: 'entrance', duplicate: -1 }
    });

    while (slow !== fast) {
      slow = nums[slow];
      fast = nums[fast];
      
      steps.push({
        description: `Move both by 1: slow = ${slow}, fast = ${fast}`,
        data: { nums, slow, fast, phase: 'entrance', duplicate: -1, moving: true }
      });
    }

    steps.push({
      description: `Duplicate found: ${slow}`,
      data: { nums, slow, fast, phase: 'complete', duplicate: slow }
    });

    return steps;
  };