export const generateClimbingStairsSteps = (n) => {
    const steps = [];
    const dp = [0, 1, 2];
    
    steps.push({
      description: `Calculate ways to climb ${n} stairs using dynamic programming`,
      data: { n, dp: [0, 1, 2], current: 2 }
    });

    steps.push({
      description: `Base cases: dp[0] = 0, dp[1] = 1, dp[2] = 2`,
      data: { n, dp: [...dp], current: 2 }
    });

    for (let i = 3; i <= n; i++) {
      steps.push({
        description: `Calculate dp[${i}]: Can come from step ${i-1} or ${i-2}`,
        data: { n, dp: [...dp], current: i, calculating: true }
      });

      dp[i] = dp[i - 1] + dp[i - 2];
      
      steps.push({
        description: `dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`,
        data: { n, dp: [...dp], current: i, result: dp[i] }
      });
    }

    steps.push({
      description: `Complete! There are ${dp[n]} ways to climb ${n} stairs`,
      data: { n, dp: [...dp], current: n, complete: true }
    });

    return steps;
  };