export  const generateLinkedListCycleSteps = (input) => {
    const steps = [];
    let slow = 0;
    let fast = 0;

    steps.push({
      description: 'Initialize slow and fast pointers at head',
      data: { nodes: input.nodes, cycleAt: input.cycleAt, slow: 0, fast: 0, found: false }
    });

    for (let i = 0; i < input.nodes.length * 2; i++) {
      slow = (slow + 1) % input.nodes.length;
      fast = (fast + 2) % input.nodes.length;

      if (slow >= input.cycleAt) slow = ((slow - input.cycleAt) % (input.nodes.length - input.cycleAt)) + input.cycleAt;
      if (fast >= input.cycleAt) fast = ((fast - input.cycleAt) % (input.nodes.length - input.cycleAt)) + input.cycleAt;

      steps.push({
        description: `Move slow to index ${slow}, fast to index ${fast}`,
        data: { nodes: input.nodes, cycleAt: input.cycleAt, slow, fast, found: false }
      });

      if (slow === fast && i > 0) {
        steps.push({
          description: `Pointers meet! Cycle detected at index ${slow}`,
          data: { nodes: input.nodes, cycleAt: input.cycleAt, slow, fast, found: true }
        });
        break;
      }
    }
    return steps;
  };
