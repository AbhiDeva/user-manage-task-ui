export const generateKnapsackSteps = (weights, values, capacity) => {
    const steps = [];
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

    steps.push({
      description: `0/1 Knapsack: weights=[${weights}], values=[${values}], capacity=${capacity}`,
      data: { weights, values, capacity, dp: dp.map(r => [...r]), i: 0, w: 0 }
    });

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        const weight = weights[i - 1];
        const value = values[i - 1];

        steps.push({
          description: `Item ${i}: weight=${weight}, value=${value}, capacity=${w}`,
          data: { weights, values, capacity, dp: dp.map(r => [...r]), i, w, checking: true }
        });

        if (weight <= w) {
          const include = value + dp[i - 1][w - weight];
          const exclude = dp[i - 1][w];
          dp[i][w] = Math.max(include, exclude);
          
          steps.push({
            description: `Include (${include}) vs Exclude (${exclude}) = ${dp[i][w]}`,
            data: { weights, values, capacity, dp: dp.map(r => [...r]), i, w, decision: dp[i][w] === include ? 'include' : 'exclude' }
          });
        } else {
          dp[i][w] = dp[i - 1][w];
          steps.push({
            description: `Item too heavy, skip`,
            data: { weights, values, capacity, dp: dp.map(r => [...r]), i, w, skip: true }
          });
        }
      }
    }

    steps.push({
      description: `Maximum value: ${dp[n][capacity]}`,
      data: { weights, values, capacity, dp: dp.map(r => [...r]), i: n, w: capacity, complete: true }
    });

    return steps;
  };