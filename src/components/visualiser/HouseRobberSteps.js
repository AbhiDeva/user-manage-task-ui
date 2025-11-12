export const generateHouseRobberSteps = (nums) => {
    const steps = [];
    
    if (nums.length === 0) return steps;
    if (nums.length === 1) {
      steps.push({
        description: `Only one house: rob house[0] = ${nums[0]}`,
        data: { nums, dp: [nums[0]], current: 0, maxRob: nums[0], complete: true }
      });
      return steps;
    }

    const dp = [nums[0], Math.max(nums[0], nums[1])];
    
    steps.push({
      description: `Houses: [${nums.join(', ')}]. Initialize: dp[0] = ${dp[0]}, dp[1] = ${dp[1]}`,
      data: { nums, dp: [...dp], current: 1, maxRob: dp[1] }
    });

    for (let i = 2; i < nums.length; i++) {
      steps.push({
        description: `House ${i} (value ${nums[i]}): Rob or skip?`,
        data: { nums, dp: [...dp], current: i, maxRob: dp[i - 1], calculating: true }
      });

      const robCurrent = dp[i - 2] + nums[i];
      const skipCurrent = dp[i - 1];

      steps.push({
        description: `Rob current: dp[${i-2}] + ${nums[i]} = ${robCurrent}. Skip: dp[${i-1}] = ${skipCurrent}`,
        data: { nums, dp: [...dp], current: i, maxRob: dp[i - 1], comparing: true, robValue: robCurrent, skipValue: skipCurrent }
      });

      dp[i] = Math.max(robCurrent, skipCurrent);
      
      steps.push({
        description: `Choose ${dp[i] === robCurrent ? 'ROB' : 'SKIP'}. dp[${i}] = ${dp[i]}`,
        data: { nums, dp: [...dp], current: i, maxRob: dp[i], chosen: dp[i] === robCurrent ? 'rob' : 'skip' }
      });
    }

    steps.push({
      description: `Maximum money: ${dp[nums.length - 1]}`,
      data: { nums, dp: [...dp], current: nums.length - 1, maxRob: dp[nums.length - 1], complete: true }
    });

    return steps;
  };