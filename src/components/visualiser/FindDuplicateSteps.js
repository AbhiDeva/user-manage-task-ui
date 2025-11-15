export const generateFindDuplicateSteps = (input) => {
    const steps = [];
    let slow = 0;
    let fast = 0;

    steps.push({
      description: 'Array indices represent pointers. Each value points to next index. Duplicate creates a cycle!',
      data: { nums: input.nums, slow: 0, fast: 0, phase: 0, found: false, explanation: 'setup' }
    });

    steps.push({
      description: `Array: [${input.nums.join(', ')}]. We treat indices as linked list nodes.`,
      data: { nums: input.nums, slow: 0, fast: 0, phase: 0, found: false, explanation: 'array' }
    });

    steps.push({
      description: 'Phase 1: Use Floyd\'s algorithm to detect cycle and find intersection point',
      data: { nums: input.nums, slow: 0, fast: 0, phase: 1, found: false }
    });

    // Phase 1: Find intersection
    let iteration = 0;
    do {
      const prevSlow = slow;
      const prevFast = fast;
      
      slow = input.nums[slow];
      fast = input.nums[input.nums[fast]];
      iteration++;

      steps.push({
        description: `Phase 1 Step ${iteration}: Slow moves from index ${prevSlow} → ${slow} (value at nums[${prevSlow}] = ${input.nums[prevSlow]}). Fast moves from ${prevFast} → ${input.nums[prevFast]} → ${fast}`,
        data: { nums: input.nums, slow, fast, phase: 1, found: false, prevSlow, prevFast }
      });

      if (slow === fast) {
        steps.push({
          description: `Intersection found at index ${slow}! Both pointers meet. This proves a cycle exists.`,
          data: { nums: input.nums, slow, fast, phase: 1, found: false, intersection: true }
        });
        break;
      }
    } while (iteration < input.nums.length);

    const intersectionPoint = slow;
    steps.push({
      description: `Phase 1 Complete. Intersection at index ${intersectionPoint}. Now find cycle entrance (the duplicate).`,
      data: { nums: input.nums, slow, fast, phase: 1, found: false, intersection: true }
    });

    // Phase 2: Find entrance to cycle (duplicate)
    slow = 0;
    steps.push({
      description: 'Phase 2: Reset slow to start (index 0), keep fast at intersection. Move both 1 step at a time.',
      data: { nums: input.nums, slow: 0, fast, phase: 2, found: false }
    });

    iteration = 0;
    while (slow !== fast) {
      const prevSlow = slow;
      const prevFast = fast;
      
      slow = input.nums[slow];
      fast = input.nums[fast];
      iteration++;

      steps.push({
        description: `Phase 2 Step ${iteration}: Slow at index ${prevSlow} → ${slow}. Fast at index ${prevFast} → ${fast}. Moving both 1 step.`,
        data: { nums: input.nums, slow, fast, phase: 2, found: false }
      });

      if (slow === fast) {
        break;
      }
    }

    const duplicate = slow;
    steps.push({
      description: `DUPLICATE FOUND! Index ${duplicate} is where they meet. The value ${duplicate} appears multiple times.`,
      data: { nums: input.nums, slow, fast, phase: 2, found: true, duplicate }
    });

    steps.push({
      description: `Why ${duplicate}? Multiple array elements point to index ${duplicate}, creating the cycle entrance. This is the duplicate number!`,
      data: { nums: input.nums, slow, fast, phase: 2, found: true, duplicate, explanation: 'why' }
    });

    // Add verification
    const indices = [];
    input.nums.forEach((val, idx) => {
      if (val === duplicate) indices.push(idx);
    });
    
    steps.push({
      description: `Verification: Value ${duplicate} appears at indices: [${indices.join(', ')}]. Count: ${indices.length} times.`,
      data: { nums: input.nums, slow, fast, phase: 2, found: true, duplicate, indices, complete: true }
    });

    return steps;
  };