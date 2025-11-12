export const generateRotateArraySteps = (nums, k) => {
    const steps = [];
    const arr = [...nums];
    k = k % arr.length;

    steps.push({
      description: `Rotate array [${arr.join(', ')}] right by ${k} positions`,
      data: { nums: [...arr], k, phase: 0, start: -1, end: -1 }
    });

    steps.push({
      description: `Step 1: Reverse entire array`,
      data: { nums: [...arr], k, phase: 1, start: 0, end: arr.length - 1, reversing: true }
    });

    const reverse = (start, end, phase) => {
      const before = [...arr];
      while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        steps.push({
          description: `Swap arr[${start}] ↔ arr[${end}]`,
          data: { nums: [...arr], k, phase, start, end, swapping: true }
        });
        start++;
        end--;
      }
      steps.push({
        description: phase === 1 
          ? `Array reversed: [${arr.join(', ')}]`
          : phase === 2
          ? `First ${k} elements reversed: [${arr.join(', ')}]`
          : `Last ${arr.length - k} elements reversed: [${arr.join(', ')}]`,
        data: { nums: [...arr], k, phase, start: -1, end: -1 }
      });
    };

    reverse(0, arr.length - 1, 1);

    steps.push({
      description: `Step 2: Reverse first ${k} elements`,
      data: { nums: [...arr], k, phase: 2, start: 0, end: k - 1, reversing: true }
    });
    reverse(0, k - 1, 2);

    steps.push({
      description: `Step 3: Reverse remaining ${arr.length - k} elements`,
      data: { nums: [...arr], k, phase: 3, start: k, end: arr.length - 1, reversing: true }
    });
    reverse(k, arr.length - 1, 3);

    steps.push({
      description: `Complete! Array rotated: [${arr.join(', ')}]`,
      data: { nums: [...arr], k, phase: 4, start: -1, end: -1, complete: true }
    });

    return steps;
  };