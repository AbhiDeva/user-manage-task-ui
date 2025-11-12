 export const generateThreeSumSteps = (nums) => {
    const steps = [];
    const sorted = [...nums].sort((a, b) => a - b);
    const result = [];

    steps.push({
      description: `Find triplets that sum to 0 in [${nums.join(', ')}]`,
      data: { original: nums, sorted, result: [], i: -1, left: -1, right: -1, sum: null }
    });

    steps.push({
      description: `Sort array: [${sorted.join(', ')}]`,
      data: { original: nums, sorted, result: [], i: -1, left: -1, right: -1, sum: null, sorted: true }
    });

    for (let i = 0; i < sorted.length - 2; i++) {
      if (i > 0 && sorted[i] === sorted[i - 1]) {
        steps.push({
          description: `Skip duplicate: sorted[${i}] = ${sorted[i]} (same as previous)`,
          data: { original: nums, sorted, result: [...result], i, left: -1, right: -1, sum: null, skipped: true }
        });
        continue;
      }

      let left = i + 1, right = sorted.length - 1;

      steps.push({
        description: `Fix i=${i} (value=${sorted[i]}), search for pairs with two pointers`,
        data: { original: nums, sorted, result: [...result], i, left, right, sum: null, fixing: true }
      });

      while (left < right) {
        const sum = sorted[i] + sorted[left] + sorted[right];

        steps.push({
          description: `Check: ${sorted[i]} + ${sorted[left]} + ${sorted[right]} = ${sum}`,
          data: { original: nums, sorted, result: [...result], i, left, right, sum, checking: true }
        });

        if (sum === 0) {
          result.push([sorted[i], sorted[left], sorted[right]]);
          
          steps.push({
            description: `Found triplet: [${sorted[i]}, ${sorted[left]}, ${sorted[right]}]`,
            data: { original: nums, sorted, result: [...result], i, left, right, sum, found: true }
          });

          while (left < right && sorted[left] === sorted[left + 1]) left++;
          while (left < right && sorted[right] === sorted[right - 1]) right--;
          left++;
          right--;
        } else if (sum < 0) {
          steps.push({
            description: `${sum} < 0, sum too small → move left pointer`,
            data: { original: nums, sorted, result: [...result], i, left, right, sum, action: 'move-left' }
          });
          left++;
        } else {
          steps.push({
            description: `${sum} > 0, sum too large → move right pointer`,
            data: { original: nums, sorted, result: [...result], i, left, right, sum, action: 'move-right' }
          });
          right--;
        }
      }
    }

    steps.push({
      description: `Found ${result.length} triplet(s): ${result.map(r => `[${r.join(',')}]`).join(', ')}`,
      data: { original: nums, sorted, result: [...result], i: -1, left: -1, right: -1, sum: null, complete: true }
    });

    return steps;
  };