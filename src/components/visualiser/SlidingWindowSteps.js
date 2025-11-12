export const generateSlidingWindowSteps = (nums, k) => {
    const steps = [];
    let windowSum = 0;
    let maxSum = 0;
    let maxStart = 0;

    steps.push({
      description: `Initialize sliding window of size ${k}`,
      data: { nums, k, windowStart: 0, windowEnd: -1, windowSum: 0, maxSum: 0, maxStart: 0 }
    });

    for (let i = 0; i < k; i++) {
      windowSum += nums[i];
      steps.push({
        description: `Add arr[${i}] = ${nums[i]} to window, sum = ${windowSum}`,
        data: { nums, k, windowStart: 0, windowEnd: i, windowSum, maxSum, maxStart, building: true }
      });
    }

    maxSum = windowSum;
    steps.push({
      description: `Initial window complete, maxSum = ${maxSum}`,
      data: { nums, k, windowStart: 0, windowEnd: k - 1, windowSum, maxSum, maxStart: 0 }
    });

    for (let i = k; i < nums.length; i++) {
      windowSum = windowSum - nums[i - k] + nums[i];
      
      steps.push({
        description: `Slide window: remove arr[${i - k}] = ${nums[i - k]}, add arr[${i}] = ${nums[i]}`,
        data: { nums, k, windowStart: i - k + 1, windowEnd: i, windowSum, maxSum, maxStart, sliding: true }
      });

      if (windowSum > maxSum) {
        maxSum = windowSum;
        maxStart = i - k + 1;
        steps.push({
          description: `New maximum found! maxSum = ${maxSum}`,
          data: { nums, k, windowStart: i - k + 1, windowEnd: i, windowSum, maxSum, maxStart, newMax: true }
        });
      }
    }

    steps.push({
      description: `Complete! Maximum sum = ${maxSum} at window [${maxStart}..${maxStart + k - 1}]`,
      data: { nums, k, windowStart: maxStart, windowEnd: maxStart + k - 1, windowSum, maxSum, maxStart, complete: true }
    });

    return steps;
  };