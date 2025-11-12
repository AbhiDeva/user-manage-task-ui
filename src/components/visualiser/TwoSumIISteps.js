export const generateTwoSumIISteps = (input) => {
    const { numbers, target } = input;
    const steps = [];
    let left = 0, right = numbers.length - 1;

    steps.push({
      description: `Find two numbers that sum to ${target} in sorted array [${numbers.join(', ')}]`,
      data: { numbers, target, left, right, sum: null, found: false }
    });

    while (left < right) {
      const sum = numbers[left] + numbers[right];

      steps.push({
        description: `Check: numbers[${left}]=${numbers[left]} + numbers[${right}]=${numbers[right]} = ${sum}`,
        data: { numbers, target, left, right, sum, found: false, checking: true }
      });

      if (sum === target) {
        steps.push({
          description: `Found! ${numbers[left]} + ${numbers[right]} = ${target}. Indices: [${left + 1}, ${right + 1}]`,
          data: { numbers, target, left, right, sum, found: true, result: [left + 1, right + 1] }
        });
        return steps;
      } else if (sum < target) {
        steps.push({
          description: `${sum} < ${target}, sum too small → move left pointer right`,
          data: { numbers, target, left, right, sum, found: false, action: 'move-left' }
        });
        left++;
      } else {
        steps.push({
          description: `${sum} > ${target}, sum too large → move right pointer left`,
          data: { numbers, target, left, right, sum, found: false, action: 'move-right' }
        });
        right--;
      }
    }

    steps.push({
      description: `No solution found`,
      data: { numbers, target, left, right, sum: null, found: false, complete: true }
    });

    return steps;
  };