export  const generateDailyTemperaturesSteps = (temperatures) => {
    const steps = [];
    const result = Array(temperatures.length).fill(0);
    const stack = [];

    steps.push({
      description: `Find days until warmer temperature: [${temperatures.join(', ')}]°`,
      data: { temperatures, result: [...result], stack: [], current: -1 }
    });

    for (let i = 0; i < temperatures.length; i++) {
      steps.push({
        description: `Day ${i}: temperature = ${temperatures[i]}°`,
        data: { temperatures, result: [...result], stack: [...stack], current: i, checking: true }
      });

      while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
        const idx = stack.pop();
        result[idx] = i - idx;
        
        steps.push({
          description: `${temperatures[i]}° > ${temperatures[idx]}° (day ${idx}): wait ${i - idx} day(s)`,
          data: { temperatures, result: [...result], stack: [...stack], current: i, popped: idx, found: true }
        });
      }

      stack.push(i);
      
      steps.push({
        description: `Push day ${i} (${temperatures[i]}°) to stack`,
        data: { temperatures, result: [...result], stack: [...stack], current: i, pushed: true }
      });
    }

    steps.push({
      description: `Result: [${result.join(', ')}] days`,
      data: { temperatures, result: [...result], stack: [...stack], current: -1, complete: true }
    });

    return steps;
  };