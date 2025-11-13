export  const generateFindMinRotatedArraySteps = (nums) => {
    const steps = [];
    let left = 0, right = nums.length - 1;

    steps.push({
      description: `Find minimum in rotated sorted array: [${nums.join(', ')}]`,
      data: { nums, left, right, mid: -1, min: -1 }
    });

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      steps.push({
        description: `mid=${mid}, nums[mid]=${nums[mid]}, nums[right]=${nums[right]}`,
        data: { nums, left, right, mid, min: -1, checking: true }
      });

      if (nums[mid] > nums[right]) {
        steps.push({
          description: `${nums[mid]} > ${nums[right]}: minimum is in right half`,
          data: { nums, left: mid + 1, right, mid, min: -1, direction: 'right' }
        });
        left = mid + 1;
      } else {
        steps.push({
          description: `${nums[mid]} ≤ ${nums[right]}: minimum is in left half (including mid)`,
          data: { nums, left, right: mid, mid, min: -1, direction: 'left' }
        });
        right = mid;
      }
    }

    steps.push({
      description: `Minimum found: ${nums[left]} at index ${left}`,
      data: { nums, left, right, mid: -1, min: nums[left], complete: true }
    });

    return steps;
  };