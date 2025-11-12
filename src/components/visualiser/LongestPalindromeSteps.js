export const generateLongestPalindromeSteps = (str) => {
    const steps = [];
    const chars = str.split('');
    let start = 0, maxLen = 0;

    steps.push({
      description: `Find longest palindromic substring in "${str}"`,
      data: { chars, start: -1, maxLen: 0, current: -1, left: -1, right: -1, type: null }
    });

    const expandAroundCenter = (left, right, type, center) => {
      const originalLeft = left;
      const originalRight = right;
      
      steps.push({
        description: `Check ${type} palindrome at center ${center}: expand from [${left}..${right}]`,
        data: { chars, start, maxLen, current: center, left, right, type, expanding: true }
      });

      while (left >= 0 && right < chars.length && chars[left] === chars[right]) {
        const len = right - left + 1;
        
        steps.push({
          description: `'${chars[left]}' = '${chars[right]}', palindrome: "${chars.slice(left, right + 1).join('')}" (length ${len})`,
          data: { chars, start, maxLen, current: center, left, right, type, matching: true }
        });

        if (len > maxLen) {
          start = left;
          maxLen = len;
          steps.push({
            description: `New longest: "${chars.slice(left, right + 1).join('')}" (length ${maxLen})`,
            data: { chars, start, maxLen, current: center, left, right, type, newMax: true }
          });
        }

        left--;
        right++;
      }

      if (left >= 0 && right < chars.length) {
        steps.push({
          description: `'${chars[left]}' ≠ '${chars[right]}', stop expanding`,
          data: { chars, start, maxLen, current: center, left, right, type, stopped: true }
        });
      }
    };

    for (let i = 0; i < chars.length; i++) {
      steps.push({
        description: `Checking center at index ${i}`,
        data: { chars, start, maxLen, current: i, left: -1, right: -1, type: 'center' }
      });

      expandAroundCenter(i, i, 'odd', i);
      expandAroundCenter(i, i + 1, 'even', i);
    }

    steps.push({
      description: `Longest palindrome: "${chars.slice(start, start + maxLen).join('')}" (length ${maxLen})`,
      data: { chars, start, maxLen, current: -1, left: start, right: start + maxLen - 1, type: 'complete', complete: true }
    });

    return steps;
  };