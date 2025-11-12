export const generateKMPSteps = (text, pattern) => {
    const steps = [];
    
    // Compute LPS array
    const lps = [0];
    let len = 0, i = 1;

    steps.push({
      description: `KMP: Compute LPS array for pattern "${pattern}"`,
      data: { text, pattern, lps: [...lps], i: 0, j: 0, phase: 'lps', matches: [] }
    });

    while (i < pattern.length) {
      if (pattern[i] === pattern[len]) {
        len++;
        lps[i] = len;
        steps.push({
          description: `Match at ${i}: lps[${i}] = ${len}`,
          data: { text, pattern, lps: [...lps], i, j: 0, phase: 'lps', matches: [] }
        });
        i++;
      } else {
        if (len !== 0) {
          len = lps[len - 1];
        } else {
          lps[i] = 0;
          i++;
        }
      }
    }

    // Search pattern in text
    steps.push({
      description: `Search pattern in text: "${text}"`,
      data: { text, pattern, lps: [...lps], i: 0, j: 0, phase: 'search', matches: [] }
    });

    const matches = [];
    i = 0;
    let j = 0;

    while (i < text.length) {
      steps.push({
        description: `Compare text[${i}]='${text[i]}' with pattern[${j}]='${pattern[j]}'`,
        data: { text, pattern, lps: [...lps], i, j, phase: 'search', matches: [...matches], comparing: true }
      });

      if (text[i] === pattern[j]) {
        i++;
        j++;
      }

      if (j === pattern.length) {
        matches.push(i - j);
        steps.push({
          description: `Match found at index ${i - j}!`,
          data: { text, pattern, lps: [...lps], i, j, phase: 'search', matches: [...matches], found: i - j }
        });
        j = lps[j - 1];
      } else if (i < text.length && text[i] !== pattern[j]) {
        if (j !== 0) {
          j = lps[j - 1];
          steps.push({
            description: `Mismatch! Use LPS to skip: j = ${j}`,
            data: { text, pattern, lps: [...lps], i, j, phase: 'search', matches: [...matches], skip: true }
          });
        } else {
          i++;
        }
      }
    }

    steps.push({
      description: `KMP complete! Found ${matches.length} match(es)`,
      data: { text, pattern, lps: [...lps], i: text.length, j: 0, phase: 'complete', matches }
    });

    return steps;
  };