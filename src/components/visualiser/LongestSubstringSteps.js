export const generateLongestSubstringSteps = (str) => {
    const steps = [];
    const chars = str.split('');
    let maxLen = 0;
    let start = 0;
    let maxStart = 0;
    let maxEnd = 0;
    const map = new Map();

    steps.push({
      description: `Find longest substring without repeating characters in "${str}"`,
      data: { chars, start: 0, end: -1, maxLen: 0, maxStart: 0, maxEnd: -1, map: {} }
    });

    for (let end = 0; end < chars.length; end++) {
      steps.push({
        description: `Check char[${end}] = '${chars[end]}'`,
        data: { chars, start, end, maxLen, maxStart, maxEnd, map: Object.fromEntries(map), checking: true }
      });

      if (map.has(chars[end])) {
        const oldStart = start;
        start = Math.max(start, map.get(chars[end]) + 1);
        steps.push({
          description: `'${chars[end]}' found at index ${map.get(chars[end])}, move start from ${oldStart} to ${start}`,
          data: { chars, start, end, maxLen, maxStart, maxEnd, map: Object.fromEntries(map), duplicate: true }
        });
      }

      map.set(chars[end], end);
      const currentLen = end - start + 1;

      if (currentLen > maxLen) {
        maxLen = currentLen;
        maxStart = start;
        maxEnd = end;
        steps.push({
          description: `New max length: ${maxLen} (substring: "${chars.slice(start, end + 1).join('')}")`,
          data: { chars, start, end, maxLen, maxStart, maxEnd, map: Object.fromEntries(map), newMax: true }
        });
      } else {
        steps.push({
          description: `Current window: "${chars.slice(start, end + 1).join('')}" (length: ${currentLen})`,
          data: { chars, start, end, maxLen, maxStart, maxEnd, map: Object.fromEntries(map) }
        });
      }
    }

    steps.push({
      description: `Complete! Longest substring: "${chars.slice(maxStart, maxEnd + 1).join('')}" (length: ${maxLen})`,
      data: { chars, start: maxStart, end: maxEnd, maxLen, maxStart, maxEnd, map: Object.fromEntries(map), complete: true }
    });

    return steps;
  };