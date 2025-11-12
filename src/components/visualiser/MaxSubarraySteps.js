export const generateMaxSubarraySteps = (nums) => {
    const steps = [];
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    steps.push({
      description: `Initialize: maxSum = ${nums[0]}, currentSum = ${nums[0]}`,
      data: { nums, current: 0, maxSum, currentSum, subarrayStart: 0, subarrayEnd: 0 }
    });

    let tempStart = 0;
    let finalStart = 0;
    let finalEnd = 0;

    for (let i = 1; i < nums.length; i++) {
      const oldCurrentSum = currentSum;
      
      if (nums[i] > currentSum + nums[i]) {
        currentSum = nums[i];
        tempStart = i;
        steps.push({
          description: `arr[${i}] = ${nums[i]} > ${oldCurrentSum} + ${nums[i]}, start new subarray`,
          data: { nums, current: i, maxSum, currentSum, subarrayStart: tempStart, subarrayEnd: i }
        });
      } else {
        currentSum = currentSum + nums[i];
        steps.push({
          description: `${oldCurrentSum} + arr[${i}] = ${currentSum}, extend current subarray`,
          data: { nums, current: i, maxSum, currentSum, subarrayStart: tempStart, subarrayEnd: i }
        });
      }

      if (currentSum > maxSum) {
        maxSum = currentSum;
        finalStart = tempStart;
        finalEnd = i;
        steps.push({
          description: `New maximum found! maxSum = ${maxSum}`,
          data: { nums, current: i, maxSum, currentSum, subarrayStart: finalStart, subarrayEnd: finalEnd, newMax: true }
        });
      }
    }

    steps.push({
      description: `Complete! Maximum subarray sum = ${maxSum}`,
      data: { nums, current: -1, maxSum, currentSum, subarrayStart: finalStart, subarrayEnd: finalEnd, complete: true }
    });

    return steps;
  };