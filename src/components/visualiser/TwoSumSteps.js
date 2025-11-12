export const generateTwoSumSteps = (nums, target) => {
    const steps = [];
    const map = new Map();
    
    steps.push({
      description: `Initialize: nums = [${nums.join(', ')}], target = ${target}`,
      data: { nums, map: {}, current: -1, complement: null, found: false }
    });

    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      
      steps.push({
        description: `i=${i}: Check nums[${i}] = ${nums[i]}, complement = ${target} - ${nums[i]} = ${complement}`,
        data: { nums, map: Object.fromEntries(map), current: i, complement, found: false }
      });

      if (map.has(complement)) {
        steps.push({
          description: `Found! nums[${map.get(complement)}] + nums[${i}] = ${nums[map.get(complement)]} + ${nums[i]} = ${target}`,
          data: { nums, map: Object.fromEntries(map), current: i, complement, found: true, result: [map.get(complement), i] }
        });
        break;
      }
      
      map.set(nums[i], i);
      steps.push({
        description: `Add to map: {${nums[i]}: ${i}}`,
        data: { nums, map: Object.fromEntries(map), current: i, complement: null, found: false }
      });
    }

    return steps;
  };