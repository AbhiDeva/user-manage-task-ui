export const generateFindDuplicateSteps = (input) => {
    const steps = [];
    let slow = 0;
    let fast = 0;

    steps.push({
      description: 'Phase 1: Initialize pointers to find intersection',
      data: { nums: input.nums, slow: 0, fast: 0, phase: 1, found: false }
    });

    for (let i = 0; i < input.nums.length; i++) {
      slow = input.nums[slow];
      fast = input.nums[input.nums[fast]];
      steps.push({
        description: `Phase 1: Slow at ${slow}, Fast at ${fast}`,
        data: { nums: input.nums, slow, fast, phase: 1, found: false }
      });
      if (slow === fast) {
        steps.push({
          description: 'Intersection found! Moving to Phase 2',
          data: { nums: input.nums, slow, fast, phase: 1, found: false, intersection: true }
        });
        break;
      }
    }

    slow = 0;
    steps.push({
      description: 'Phase 2: Reset slow to find duplicate',
      data: { nums: input.nums, slow: 0, fast, phase: 2, found: false }
    });

    for (let i = 0; i < input.nums.length; i++) {
      slow = input.nums[slow];
      fast = input.nums[fast];
      steps.push({
        description: `Phase 2: Slow=${slow}, Fast=${fast}`,
        data: { nums: input.nums, slow, fast, phase: 2, found: false }
      });
      if (slow === fast) {
        steps.push({
          description: `Duplicate found! Number ${input.nums[slow]}`,
          data: { nums: input.nums, slow, fast, phase: 2, found: true, duplicate: input.nums[slow] }
        });
        break;
      }
    }
    return steps;
  };