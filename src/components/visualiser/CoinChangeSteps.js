export  const generateCoinChangeSteps = (coins, amount) => {
    const steps = [];
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    steps.push({
      description: `Find minimum coins to make amount ${amount} using coins [${coins.join(', ')}]`,
      data: { coins, amount, dp: [...dp], current: 0, coin: -1 }
    });

    steps.push({
      description: `Initialize: dp[0] = 0 (0 coins needed for amount 0)`,
      data: { coins, amount, dp: [...dp], current: 0, coin: -1 }
    });

    for (let i = 1; i <= amount; i++) {
      steps.push({
        description: `Calculate dp[${i}]: minimum coins for amount ${i}`,
        data: { coins, amount, dp: [...dp], current: i, coin: -1, calculating: true }
      });

      for (let coin of coins) {
        if (i >= coin) {
          const oldValue = dp[i];
          dp[i] = Math.min(dp[i], dp[i - coin] + 1);
          
          if (dp[i] !== oldValue) {
            steps.push({
              description: `Using coin ${coin}: dp[${i}] = min(${oldValue === Infinity ? '∞' : oldValue}, dp[${i - coin}] + 1) = ${dp[i]}`,
              data: { coins, amount, dp: [...dp], current: i, coin, improved: true }
            });
          }
        }
      }

      steps.push({
        description: `dp[${i}] = ${dp[i] === Infinity ? '∞ (impossible)' : dp[i]}`,
        data: { coins, amount, dp: [...dp], current: i, coin: -1 }
      });
    }

    steps.push({
      description: dp[amount] === Infinity 
        ? `Impossible to make amount ${amount}` 
        : `Complete! Minimum ${dp[amount]} coins needed for amount ${amount}`,
      data: { coins, amount, dp: [...dp], current: amount, coin: -1, complete: true }
    });

    return steps;
  };