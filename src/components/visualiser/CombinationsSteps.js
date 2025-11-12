export const generateCombinationsSteps = (n, k) => {
    const steps = [];
    const result = [];

    steps.push({
      description: `Generate all ${k}-combinations from numbers 1 to ${n}`,
      data: { n, k, current: [], result: [], depth: 0 }
    });

    const backtrack = (start, current, depth) => {
      if (current.length === k) {
        result.push([...current]);
        steps.push({
          description: `Found combination: [${current.join(', ')}]`,
          data: { n, k, current: [...current], result: result.map(r => [...r]), depth, found: true }
        });
        return;
      }

      for (let i = start; i <= n; i++) {
        current.push(i);
        steps.push({
          description: `Add ${i}: [${current.join(', ')}]`,
          data: { n, k, current: [...current], result: result.map(r => [...r]), depth, adding: i }
        });
        
        backtrack(i + 1, current, depth + 1);
        
        const removed = current.pop();
        steps.push({
          description: `Backtrack: Remove ${removed}`,
          data: { n, k, current: [...current], result: result.map(r => [...r]), depth, removing: removed }
        });
      }
    };

    backtrack(1, [], 0);
    
    steps.push({
      description: `Complete! Found ${result.length} combinations`,
      data: { n, k, current: [], result: result.map(r => [...r]), depth: 0, complete: true }
    });

    return steps;
  };