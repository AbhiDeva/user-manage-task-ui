export const generateEditDistanceSteps = (word1, word2) => {
    const steps = [];
    const m = word1.length, n = word2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    steps.push({
      description: `Edit Distance: "${word1}" → "${word2}"`,
      data: { word1, word2, dp: dp.map(r => [...r]), i: 0, j: 0 }
    });

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        steps.push({
          description: `Compare '${word1[i-1]}' with '${word2[j-1]}'`,
          data: { word1, word2, dp: dp.map(r => [...r]), i, j, comparing: true }
        });

        if (word1[i - 1] === word2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
          steps.push({
            description: `Match! No operation needed`,
            data: { word1, word2, dp: dp.map(r => [...r]), i, j, match: true }
          });
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
          steps.push({
            description: `Mismatch: min(delete, insert, replace) + 1 = ${dp[i][j]}`,
            data: { word1, word2, dp: dp.map(r => [...r]), i, j, mismatch: true }
          });
        }
      }
    }

    steps.push({
      description: `Minimum operations: ${dp[m][n]}`,
      data: { word1, word2, dp: dp.map(r => [...r]), i: m, j: n, complete: true }
    });

    return steps;
  };