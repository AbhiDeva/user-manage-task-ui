export const generateContainsDuplicateSteps = (nums) => {
    const steps = [];
    const seen = new Set();

    steps.push({
      description: `Check if array [${nums.join(', ')}] contains duplicate`,
      data: { nums, seen: [], current: -1, duplicate: false }
    });

    for (let i = 0; i < nums.length; i++) {
      steps.push({
        description: `Check nums[${i}] = ${nums[i]}`,
        data: { nums, seen: Array.from(seen), current: i, duplicate: false, checking: true }
      });

      if (seen.has(nums[i])) {
        steps.push({
          description: `Duplicate found! ${nums[i]} already exists in set`,
          data: { nums, seen: Array.from(seen), current: i, duplicate: true, duplicateValue: nums[i] }
        });
        return steps;
      }

      seen.add(nums[i]);
      steps.push({
        description: `Add ${nums[i]} to set`,
        data: { nums, seen: Array.from(seen), current: i, duplicate: false, added: true }
      });
    }

    steps.push({
      description: `No duplicates found - all elements are unique`,
      data: { nums, seen: Array.from(seen), current: -1, duplicate: false, complete: true }
    });

    return steps;
  };