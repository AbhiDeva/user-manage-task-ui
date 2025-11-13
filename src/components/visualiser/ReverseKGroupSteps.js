export const generateReverseKGroupSteps = (input) => {
    const { list, k } = input;
    const steps = [];

    steps.push({
      description: `Reverse nodes in groups of ${k}: [${list.join(' → ')}]`,
      data: { list: [...list], k, current: 0, reversed: [], phase: 'init' }
    });

    let result = [];
    let i = 0;

    while (i < list.length) {
      const groupStart = i;
      const group = [];

      for (let j = 0; j < k && i < list.length; j++, i++) {
        group.push(list[i]);
      }

      steps.push({
        description: `Extract group starting at index ${groupStart}: [${group.join(', ')}]`,
        data: { list: [...list], k, current: groupStart, reversed: [...result], phase: 'extract', group: [...group] }
      });

      if (group.length === k) {
        const reversedGroup = [...group].reverse();
        result.push(...reversedGroup);

        steps.push({
          description: `Reverse group: [${group.join(', ')}] → [${reversedGroup.join(', ')}]`,
          data: { list: [...list], k, current: groupStart, reversed: [...result], phase: 'reverse', group: [...reversedGroup] }
        });
      } else {
        result.push(...group);
        steps.push({
          description: `Group incomplete (${group.length} < ${k}), keep as is`,
          data: { list: [...list], k, current: groupStart, reversed: [...result], phase: 'keep', group: [...group] }
        });
      }
    }

    steps.push({
      description: `Result: [${result.join(' → ')}]`,
      data: { list: [...list], k, current: -1, reversed: [...result], phase: 'complete' }
    });

    return steps;
  };