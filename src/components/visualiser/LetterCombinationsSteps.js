export const generateLetterCombinationsSteps = (input) => {
    const steps = [];
    const digits = input.digits;
    
    if (!digits) {
      steps.push({
        description: 'Empty input - return empty array',
        data: {
          digits: '',
          phone: {},
          result: [],
          phase: 'complete',
          complete: true
        }
      });
      return steps;
    }

    const phone = {
      '2': 'abc', '3': 'def', '4': 'ghi',
      '5': 'jkl', '6': 'mno', '7': 'pqrs',
      '8': 'tuv', '9': 'wxyz'
    };

    steps.push({
      description: 'Starting with digits. We will use backtracking to generate all possible letter combinations.',
      data: {
        digits: digits,
        phone: phone,
        result: [],
        phase: 'setup',
        currentPath: '',
        currentIndex: 0,
        callStack: []
      }
    });

    const result = [];

    function backtrack(index, path, depth) {
      const callStack = Array(depth).fill('').map((_, i) => ({
        index: i,
        letter: path[i] || '?'
      }));

      if (index === digits.length) {
        result.push(path);
        steps.push({
          description: 'Reached end of digits! Found combination: ' + path,
          data: {
            digits: digits,
            phone: phone,
            result: [...result],
            phase: 'found',
            currentPath: path,
            currentIndex: index,
            callStack: callStack,
            foundCombination: path
          }
        });
        return;
      }

      const currentDigit = digits[index];
      const letters = phone[currentDigit];

      steps.push({
        description: 'At index ' + index + ', digit ' + currentDigit + ' maps to letters ' + letters,
        data: {
          digits: digits,
          phone: phone,
          result: [...result],
          phase: 'exploring',
          currentPath: path,
          currentIndex: index,
          currentDigit: currentDigit,
          availableLetters: letters,
          callStack: callStack
        }
      });

      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        const newPath = path + letter;
        
        steps.push({
          description: 'Try letter ' + letter + ' (' + (i + 1) + '/' + letters.length + '). New path: ' + newPath,
          data: {
            digits: digits,
            phone: phone,
            result: [...result],
            phase: 'trying',
            currentPath: newPath,
            currentIndex: index,
            currentDigit: currentDigit,
            availableLetters: letters,
            selectedLetter: letter,
            letterIndex: i,
            callStack: [...callStack, { index: index, letter: letter }]
          }
        });

        backtrack(index + 1, newPath, depth + 1);

        if (i < letters.length - 1) {
          steps.push({
            description: 'Backtrack from ' + newPath + '. Try next letter for digit ' + currentDigit,
            data: {
              digits: digits,
              phone: phone,
              result: [...result],
              phase: 'backtracking',
              currentPath: path,
              currentIndex: index,
              currentDigit: currentDigit,
              availableLetters: letters,
              callStack: callStack
            }
          });
        }
      }
    }

    backtrack(0, '', 0);

    steps.push({
      description: 'COMPLETE! Found ' + result.length + ' combinations',
      data: {
        digits: digits,
        phone: phone,
        result: result,
        phase: 'complete',
        currentPath: '',
        currentIndex: digits.length,
        complete: true,
        callStack: []
      }
    });

    return steps;
  };