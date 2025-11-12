export const generatePalindromeSteps = (str) => {
    const steps = [];
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const chars = cleaned.split('');
    
    steps.push({
      description: `Check if "${str}" is a palindrome. Cleaned: "${cleaned}"`,
      data: { original: str, chars, left: -1, right: -1, isPalindrome: true }
    });

    let left = 0;
    let right = chars.length - 1;

    while (left < right) {
      steps.push({
        description: `Compare chars[${left}] = '${chars[left]}' with chars[${right}] = '${chars[right]}'`,
        data: { original: str, chars, left, right, isPalindrome: true, comparing: true }
      });

      if (chars[left] !== chars[right]) {
        steps.push({
          description: `'${chars[left]}' ≠ '${chars[right]}' - Not a palindrome!`,
          data: { original: str, chars, left, right, isPalindrome: false, failed: true }
        });
        return steps;
      }

      steps.push({
        description: `'${chars[left]}' = '${chars[right]}' - Match! Continue...`,
        data: { original: str, chars, left, right, isPalindrome: true, matched: true }
      });

      left++;
      right--;
    }

    steps.push({
      description: `All characters match - Valid palindrome!`,
      data: { original: str, chars, left, right, isPalindrome: true, complete: true }
    });

    return steps;
  };