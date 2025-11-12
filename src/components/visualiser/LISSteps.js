export const generateLISSteps = (nums) => {
    const steps = [];
    const dp = Array(nums.length).fill(1);
    let maxLen = 1;

    steps.push({
      description: `Find Longest Increasing Subsequence in [${nums.join(', ')}]`,
      data: { nums, dp: [...dp], i: 0, j: -1, maxLen }
    });

    for (let i = 1; i < nums.length; i++) {
      steps.push({
        description: `Calculate LIS ending at index ${i} (value: ${nums[i]})`,
        data: { nums, dp: [...dp], i, j: -1, maxLen, calculating: true }
      });

      for (let j = 0; j < i; j++) {
        steps.push({
          description: `Compare nums[${i}]=${nums[i]} with nums[${j}]=${nums[j]}`,
          data: { nums, dp: [...dp], i, j, maxLen, comparing: true }
        });

        if (nums[i] > nums[j]) {
          const oldDp = dp[i];
          dp[i] = Math.max(dp[i], dp[j] + 1);
          if (dp[i] !== oldDp) {
            steps.push({
              description: `${nums[i]} > ${nums[j]}, update dp[${i}] = ${dp[i]}`,
              data: { nums, dp: [...dp], i, j, maxLen, updated: true }
            });
          }
        }
      }

      maxLen = Math.max(maxLen, dp[i]);
      steps.push({
        description: `dp[${i}] = ${dp[i]}, current max length = ${maxLen}`,
        data: { nums, dp: [...dp], i, j: -1, maxLen }
      });
    }

    steps.push({
      description: `Longest Increasing Subsequence length: ${maxLen}`,
      data: { nums, dp: [...dp], i: -1, j: -1, maxLen, complete: true }
    });

    return steps;
  };