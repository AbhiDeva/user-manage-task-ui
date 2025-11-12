export const generateJumpGameSteps = (nums) => {
    const steps = [];
    let maxReach = 0;

    steps.push({
      description: `Can we reach the end of [${nums.join(', ')}]?`,
      data: { nums, current: -1, maxReach: 0, canReach: true }
    });

    for (let i = 0; i < nums.length; i++) {
      steps.push({
        description: `At position ${i}, value = ${nums[i]}, maxReach = ${maxReach}`,
        data: { nums, current: i, maxReach, canReach: true, checking: true }
      });

      if (i > maxReach) {
        steps.push({
          description: `Position ${i} is unreachable (${i} > ${maxReach}). Cannot reach end!`,
          data: { nums, current: i, maxReach, canReach: false, failed: true }
        });
        return steps;
      }

      const newReach = i + nums[i];
      if (newReach > maxReach) {
        maxReach = newReach;
        steps.push({
          description: `From ${i}, can jump to ${newReach}. Update maxReach = ${maxReach}`,
          data: { nums, current: i, maxReach, canReach: true, updated: true }
        });
      }

      if (maxReach >= nums.length - 1) {
        steps.push({
          description: `Can reach end! maxReach (${maxReach}) >= last index (${nums.length - 1})`,
          data: { nums, current: i, maxReach, canReach: true, complete: true }
        });
        return steps;
      }
    }

    steps.push({
      description: `Reached end successfully!`,
      data: { nums, current: nums.length - 1, maxReach, canReach: true, complete: true }
    });

    return steps;
  };