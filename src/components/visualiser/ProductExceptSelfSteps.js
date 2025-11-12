export const generateProductExceptSelfSteps = (nums) => {
    const steps = [];
    const result = new Array(nums.length);
    
    steps.push({
      description: `Calculate product of array except self for [${nums.join(', ')}]`,
      data: { nums, result: [], phase: 'init', current: -1, prefix: 1, suffix: 1 }
    });

    let prefix = 1;
    steps.push({
      description: `Phase 1: Calculate prefix products (left to right)`,
      data: { nums, result: [], phase: 'prefix', current: -1, prefix: 1 }
    });

    for (let i = 0; i < nums.length; i++) {
      result[i] = prefix;
      steps.push({
        description: `result[${i}] = prefix = ${prefix}. Update prefix: ${prefix} × ${nums[i]} = ${prefix * nums[i]}`,
        data: { nums, result: [...result], phase: 'prefix', current: i, prefix }
      });
      prefix *= nums[i];
    }

    let suffix = 1;
    steps.push({
      description: `Phase 2: Calculate suffix products (right to left)`,
      data: { nums, result: [...result], phase: 'suffix', current: -1, suffix: 1 }
    });

    for (let i = nums.length - 1; i >= 0; i--) {
      result[i] *= suffix;
      steps.push({
        description: `result[${i}] = ${result[i] / suffix} × suffix(${suffix}) = ${result[i]}. Update suffix: ${suffix} × ${nums[i]} = ${suffix * nums[i]}`,
        data: { nums, result: [...result], phase: 'suffix', current: i, suffix }
      });
      suffix *= nums[i];
    }

    steps.push({
      description: `Complete! Product array: [${result.join(', ')}]`,
      data: { nums, result: [...result], phase: 'complete', current: -1, suffix: 1 }
    });

    return steps;
  };