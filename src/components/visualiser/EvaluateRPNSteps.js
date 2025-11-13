export const generateEvaluateRPNSteps = (tokens) => {
    const steps = [];
    const stack = [];
    const operators = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => Math.trunc(a / b)
    };

    steps.push({
      description: `Evaluate Reverse Polish Notation: [${tokens.join(', ')}]`,
      data: { tokens, stack: [], current: -1, result: null }
    });

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      steps.push({
        description: `Read token: "${token}"`,
        data: { tokens, stack: [...stack], current: i, result: null, reading: true }
      });

      if (operators[token]) {
        const b = stack.pop();
        const a = stack.pop();
        const result = operators[token](a, b);

        steps.push({
          description: `Operator "${token}": pop ${b}, pop ${a}, compute ${a} ${token} ${b} = ${result}`,
          data: { tokens, stack: [...stack], current: i, result: null, operation: { a, b, op: token, result } }
        });

        stack.push(result);

        steps.push({
          description: `Push result: ${result}`,
          data: { tokens, stack: [...stack], current: i, result: null, pushed: result }
        });
      } else {
        const num = parseInt(token);
        stack.push(num);

        steps.push({
          description: `Operand: push ${num} to stack`,
          data: { tokens, stack: [...stack], current: i, result: null, pushed: num }
        });
      }
    }

    steps.push({
      description: `Final result: ${stack[0]}`,
      data: { tokens, stack: [...stack], current: -1, result: stack[0], complete: true }
    });

    return steps;
  };