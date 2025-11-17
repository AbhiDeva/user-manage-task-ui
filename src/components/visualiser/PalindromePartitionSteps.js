export const generatePalindromePartitionSteps = (input) => {
    const steps = [];
    const s = input.s;

    steps.push({
      description: 'Starting with string: ' + s + '. We will partition it into all possible palindromic substrings.',
      data: {
        s: s,
        result: [],
        phase: 'setup',
        currentPath: [],
        currentStart: 0,
        checking: null
      }
    });

    const result = [];

    function isPalindrome(str, left, right) {
      while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
      }
      return true;
    }

    function backtrack(start, path, depth) {
      if (start === s.length) {
        result.push([...path]);
        steps.push({
          description: 'Reached end of string! Found partition: [' + path.join(', ') + ']',
          data: {
            s: s,
            result: [...result],
            phase: 'found',
            currentPath: [...path],
            currentStart: start,
            foundPartition: [...path]
          }
        });
        return;
      }

      steps.push({
        description: 'At position ' + start + ', exploring substrings starting from index ' + start,
        data: {
          s: s,
          result: [...result],
          phase: 'exploring',
          currentPath: [...path],
          currentStart: start,
          checking: null
        }
      });

      for (let end = start; end < s.length; end++) {
        const substring = s.substring(start, end + 1);
        const isPalin = isPalindrome(s, start, end);

        steps.push({
          description: 'Checking substring: ' + substring + ' (index ' + start + ' to ' + end + ')',
          data: {
            s: s,
            result: [...result],
            phase: 'checking',
            currentPath: [...path],
            currentStart: start,
            checking: { start: start, end: end, substring: substring, isPalindrome: isPalin }
          }
        });

        if (isPalin) {
          path.push(substring);
          
          steps.push({
            description: substring + ' is a palindrome! Add to current path and continue.',
            data: {
              s: s,
              result: [...result],
              phase: 'valid',
              currentPath: [...path],
              currentStart: start,
              checking: { start: start, end: end, substring: substring, isPalindrome: true }
            }
          });

          backtrack(end + 1, path, depth + 1);

          path.pop();

          if (end < s.length - 1) {
            steps.push({
              description: 'Backtrack: Remove ' + substring + ' and try next substring',
              data: {
                s: s,
                result: [...result],
                phase: 'backtracking',
                currentPath: [...path],
                currentStart: start,
                checking: null
              }
            });
          }
        } else {
          steps.push({
            description: substring + ' is NOT a palindrome. Skip it.',
            data: {
              s: s,
              result: [...result],
              phase: 'invalid',
              currentPath: [...path],
              currentStart: start,
              checking: { start: start, end: end, substring: substring, isPalindrome: false }
            }
          });
        }
      }
    }

    backtrack(0, [], 0);

    steps.push({
      description: 'COMPLETE! Found ' + result.length + ' palindrome partitions',
      data: {
        s: s,
        result: result,
        phase: 'complete',
        currentPath: [],
        currentStart: s.length,
        complete: true
      }
    });

    return steps;
  };