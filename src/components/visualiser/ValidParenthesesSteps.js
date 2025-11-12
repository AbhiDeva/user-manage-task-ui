export const generateValidParenthesesSteps = (str) => {
    const steps = [];
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    const chars = str.split('');
    
    steps.push({
      description: `Initialize: string = "${str}", stack = []`,
      data: { chars, stack: [], current: -1, valid: true }
    });

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      
      steps.push({
        description: `Reading char[${i}] = '${char}'`,
        data: { chars, stack: [...stack], current: i, valid: true, reading: true }
      });

      if (!map[char]) {
        stack.push(char);
        steps.push({
          description: `Opening bracket '${char}', push to stack`,
          data: { chars, stack: [...stack], current: i, valid: true }
        });
      } else {
        const top = stack.pop();
        if (top !== map[char]) {
          steps.push({
            description: `Closing bracket '${char}' doesn't match! Expected '${map[char]}', got '${top || 'empty'}'`,
            data: { chars, stack: [...stack], current: i, valid: false, error: true }
          });
          return steps;
        }
        steps.push({
          description: `Closing bracket '${char}' matches '${top}', pop from stack`,
          data: { chars, stack: [...stack], current: i, valid: true, matched: true }
        });
      }
    }

    const isValid = stack.length === 0;
    steps.push({
      description: isValid ? `Stack is empty - Valid parentheses!` : `Stack not empty - Invalid!`,
      data: { chars, stack: [...stack], current: -1, valid: isValid, complete: true }
    });

    return steps;
  };