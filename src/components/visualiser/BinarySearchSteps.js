export const generateBinarySearchSteps = (nums, target) => {
    const steps = [];
    let left = 0, right = nums.length - 1;
    
    steps.push({
      description: `Initialize: left=0, right=${right}, target=${target}`,
      data: { nums, left, right, mid: -1, target, found: false }
    });

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        description: `mid = (${left} + ${right}) / 2 = ${mid}, nums[${mid}] = ${nums[mid]}`,
        data: { nums, left, right, mid, target, found: false }
      });

      if (nums[mid] === target) {
        steps.push({
          description: `Found! nums[${mid}] = ${target}`,
          data: { nums, left, right, mid, target, found: true }
        });
        break;
      }

      if (nums[mid] < target) {
        steps.push({
          description: `${nums[mid]} < ${target}, search right half`,
          data: { nums, left: mid + 1, right, mid, target, found: false }
        });
        left = mid + 1;
      } else {
        steps.push({
          description: `${nums[mid]} > ${target}, search left half`,
          data: { nums, left, right: mid - 1, mid, target, found: false }
        });
        right = mid - 1;
      }
    }

    if (left > right) {
      steps.push({
        description: `Target not found`,
        data: { nums, left, right, mid: -1, target, found: false }
      });
    }

    return steps;
  };