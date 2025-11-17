export  const generateLastStoneWeightSteps = (input) => {
    const steps = [];
    const heap = [...input.stones];
    
    steps.push({
      description: 'Starting with the given stones. We need to repeatedly smash the two heaviest stones together.',
      data: { 
        heap: [...heap], 
        original: [...input.stones],
        phase: 'setup',
        sorted: false
      }
    });

    steps.push({
      description: 'Step 1: Sort stones in descending order (creating a max heap)',
      data: { 
        heap: [...heap], 
        original: [...input.stones],
        phase: 'sorting',
        sorted: false
      }
    });

    heap.sort((a, b) => b - a);

    steps.push({
      description: 'Sorted heap. Heaviest stones are at the front.',
      data: { 
        heap: [...heap], 
        original: [...input.stones],
        phase: 'sorted',
        sorted: true
      }
    });

    let iteration = 1;
    while (heap.length > 1) {
      const first = heap[0];
      const second = heap[1];

      steps.push({
        description: 'Iteration ' + iteration + ': Take two heaviest stones: ' + first + ' and ' + second,
        data: { 
          heap: [...heap], 
          original: [...input.stones],
          phase: 'selecting',
          sorted: true,
          first: first,
          second: second,
          firstIdx: 0,
          secondIdx: 1
        }
      });

      heap.shift();
      heap.shift();

      if (first === second) {
        steps.push({
          description: 'Smash ' + first + ' and ' + second + ': Equal weights! Both stones are destroyed.',
          data: { 
            heap: [...heap], 
            original: [...input.stones],
            phase: 'destroyed',
            sorted: true,
            first: first,
            second: second,
            result: 0
          }
        });
      } else {
        const diff = first - second;
        steps.push({
          description: 'Smash ' + first + ' and ' + second + ': difference is ' + diff,
          data: { 
            heap: [...heap], 
            original: [...input.stones],
            phase: 'calculating',
            sorted: true,
            first: first,
            second: second,
            result: diff
          }
        });

        heap.push(diff);
        
        steps.push({
          description: 'Add stone of weight ' + diff + ' back to the heap',
          data: { 
            heap: [...heap], 
            original: [...input.stones],
            phase: 'adding',
            sorted: false,
            newStone: diff
          }
        });

        heap.sort((a, b) => b - a);

        steps.push({
          description: 'Re-sort heap',
          data: { 
            heap: [...heap], 
            original: [...input.stones],
            phase: 'sorted',
            sorted: true
          }
        });
      }

      iteration++;
    }

    const finalWeight = heap.length === 0 ? 0 : heap[0];
    steps.push({
      description: 'COMPLETE! Final answer: ' + finalWeight,
      data: { 
        heap: [...heap], 
        original: [...input.stones],
        phase: 'complete',
        sorted: true,
        final: finalWeight,
        complete: true
      }
    });

    return steps;
  };