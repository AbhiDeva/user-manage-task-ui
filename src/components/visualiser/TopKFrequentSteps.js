export const generateTopKFrequentSteps = (nums, k) => {
    const steps = [];
    const map = new Map();

    steps.push({
      description: `Find top ${k} frequent elements in [${nums.join(', ')}]`,
      data: { nums, k, map: {}, sorted: [], result: [], phase: 'counting' }
    });

    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      map.set(num, (map.get(num) || 0) + 1);
      steps.push({
        description: `Count ${num}: frequency = ${map.get(num)}`,
        data: { nums, k, map: Object.fromEntries(map), sorted: [], result: [], phase: 'counting', current: i }
      });
    }

    const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);
    
    steps.push({
      description: `Sort by frequency: ${sorted.map(([n, f]) => `${n}(${f})`).join(', ')}`,
      data: { nums, k, map: Object.fromEntries(map), sorted, result: [], phase: 'sorting' }
    });

    const result = sorted.slice(0, k).map(([num]) => num);
    
    steps.push({
      description: `Top ${k} frequent elements: [${result.join(', ')}]`,
      data: { nums, k, map: Object.fromEntries(map), sorted, result, phase: 'complete' }
    });

    return steps;
  };