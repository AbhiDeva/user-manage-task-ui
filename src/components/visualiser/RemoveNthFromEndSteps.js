export const generateRemoveNthFromEndSteps = (input) => {
    const { list, n } = input;
    const steps = [];

    steps.push({
      description: `Remove ${n}th node from end: [${list.join(' → ')}]`,
      data: { list: [...list], n, fast: 0, slow: 0, removed: -1 }
    });

    steps.push({
      description: `Phase 1: Move fast pointer ${n + 1} steps ahead`,
      data: { list: [...list], n, fast: 0, slow: 0, removed: -1, phase: 'advance' }
    });

    let fast = 0;
    for (let i = 0; i <= n; i++) {
      if (fast < list.length) {
        fast++;
        steps.push({
          description: `Fast pointer at index ${fast}`,
          data: { list: [...list], n, fast, slow: 0, removed: -1, phase: 'advance' }
        });
      }
    }

    steps.push({
      description: `Phase 2: Move both pointers until fast reaches end`,
      data: { list: [...list], n, fast, slow: 0, removed: -1, phase: 'move-both' }
    });

    let slow = 0;
    while (fast < list.length) {
      fast++;
      slow++;
      steps.push({
        description: `Move both: slow=${slow}, fast=${fast}`,
        data: { list: [...list], n, fast, slow, removed: -1, phase: 'move-both' }
      });
    }

    const removeIdx = slow;
    const result = [...list];
    result.splice(removeIdx, 1);

    steps.push({
      description: `Phase 3: Remove node at index ${removeIdx}`,
      data: { list: [...list], n, fast, slow, removed: removeIdx, phase: 'remove', result: [] }
    });

    steps.push({
      description: `Result: [${result.join(' → ')}]`,
      data: { list: [...list], n, fast, slow, removed: removeIdx, phase: 'complete', result: [...result] }
    });

    return steps;
  };