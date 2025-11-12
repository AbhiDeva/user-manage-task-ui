export const generateTrappingRainWaterSteps = (nums) => {
    const steps = [];
    let left = 0, right = nums.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    const waterLevels = new Array(nums.length).fill(0);

    steps.push({
      description: `Calculate trapped rain water for heights: [${nums.join(', ')}]`,
      data: { nums, left, right, leftMax, rightMax, water, waterLevels: [...waterLevels] }
    });

    while (left < right) {
      steps.push({
        description: `Compare height[${left}] = ${nums[left]} with height[${right}] = ${nums[right]}`,
        data: { nums, left, right, leftMax, rightMax, water, waterLevels: [...waterLevels], comparing: true }
      });

      if (nums[left] < nums[right]) {
        leftMax = Math.max(leftMax, nums[left]);
        const trapped = leftMax - nums[left];
        waterLevels[left] = trapped;
        water += trapped;
        
        steps.push({
          description: `Left side: leftMax = ${leftMax}, water trapped at ${left} = ${trapped}. Total water = ${water}`,
          data: { nums, left, right, leftMax, rightMax, water, waterLevels: [...waterLevels], side: 'left', trapped }
        });
        left++;
      } else {
        rightMax = Math.max(rightMax, nums[right]);
        const trapped = rightMax - nums[right];
        waterLevels[right] = trapped;
        water += trapped;
        
        steps.push({
          description: `Right side: rightMax = ${rightMax}, water trapped at ${right} = ${trapped}. Total water = ${water}`,
          data: { nums, left, right, leftMax, rightMax, water, waterLevels: [...waterLevels], side: 'right', trapped }
        });
        right--;
      }
    }

    steps.push({
      description: `Complete! Total water trapped = ${water} units`,
      data: { nums, left, right, leftMax, rightMax, water, waterLevels: [...waterLevels], complete: true }
    });

    return steps;
  };