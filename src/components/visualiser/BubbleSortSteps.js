export const generateBubbleSortSteps = (nums) => {
    const steps = [];
    const arr = [...nums];
    const n = arr.length;
    
    steps.push({
      description: `Initialize: array = [${arr.join(', ')}]`,
      data: { nums: [...arr], i: -1, j: -1, sorted: 0, swapped: false }
    });

    for (let i = 0; i < n - 1; i++) {
      steps.push({
        description: `Pass ${i + 1}: Compare adjacent elements`,
        data: { nums: [...arr], i, j: -1, sorted: i, swapped: false }
      });

      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          description: `Compare arr[${j}] = ${arr[j]} with arr[${j + 1}] = ${arr[j + 1]}`,
          data: { nums: [...arr], i, j, sorted: i, swapped: false, comparing: true }
        });

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({
            description: `Swap! ${arr[j + 1]} > ${arr[j]}, swap positions`,
            data: { nums: [...arr], i, j, sorted: i, swapped: true }
          });
        } else {
          steps.push({
            description: `No swap needed, ${arr[j]} ≤ ${arr[j + 1]}`,
            data: { nums: [...arr], i, j, sorted: i, swapped: false }
          });
        }
      }
    }

    steps.push({
      description: `Sorting complete! Array is now sorted`,
      data: { nums: [...arr], i: -1, j: -1, sorted: n, swapped: false, complete: true }
    });

    return steps;
  };