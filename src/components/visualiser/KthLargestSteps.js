export  const generateKthLargestSteps = (input) => {
    const steps = [];
    const { k, operations } = input;
    const minHeap = [];

    steps.push({
      description: `Initialize KthLargest with k=${k}. Use Min Heap to track k largest elements.`,
      data: { k, minHeap: [], operations, currentOp: -1, phase: 'init' }
    });

    steps.push({
      description: 'Min Heap property: Root is smallest. Keep only k elements → Root is kth largest!',
      data: { k, minHeap: [], operations, currentOp: -1, phase: 'explain' }
    });

    for (let i = 0; i < operations.length; i++) {
      const [op, param] = operations[i];

      if (op === 'KthLargest') {
        steps.push({
          description: `Constructor: Add initial numbers [${param.join(', ')}]`,
          data: { k, minHeap: [], operations, currentOp: i, phase: 'constructor', initialNums: param }
        });

        for (const num of param) {
          minHeap.push(num);
          
          steps.push({
            description: `Add ${num} to heap`,
            data: { k, minHeap: [...minHeap], operations, currentOp: i, phase: 'add-to-heap', addedNum: num }
          });

          // Bubble up
          let idx = minHeap.length - 1;
          while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (minHeap[idx] >= minHeap[parentIdx]) break;
            
            [minHeap[idx], minHeap[parentIdx]] = [minHeap[parentIdx], minHeap[idx]];
            
            steps.push({
              description: `Bubble up: Swap ${minHeap[parentIdx]} with parent ${minHeap[idx]}`,
              data: { k, minHeap: [...minHeap], operations, currentOp: i, phase: 'bubble-up', swapIdx: idx, parentIdx }
            });
            
            idx = parentIdx;
          }

          // Remove smallest if size > k
          if (minHeap.length > k) {
            const removed = minHeap[0];
            const last = minHeap.pop();
            
            steps.push({
              description: `Heap size > k. Remove smallest: ${removed}`,
              data: { k, minHeap: [...minHeap, last], operations, currentOp: i, phase: 'remove-min', removed }
            });

            if (minHeap.length > 0) {
              minHeap[0] = last;
              
              // Bubble down
              let idx = 0;
              while (true) {
                const leftIdx = 2 * idx + 1;
                const rightIdx = 2 * idx + 2;
                let smallest = idx;

                if (leftIdx < minHeap.length && minHeap[leftIdx] < minHeap[smallest]) {
                  smallest = leftIdx;
                }
                if (rightIdx < minHeap.length && minHeap[rightIdx] < minHeap[smallest]) {
                  smallest = rightIdx;
                }

                if (smallest === idx) break;

                [minHeap[idx], minHeap[smallest]] = [minHeap[smallest], minHeap[idx]];
                
                steps.push({
                  description: `Bubble down: Swap ${minHeap[smallest]} with child ${minHeap[idx]}`,
                  data: { k, minHeap: [...minHeap], operations, currentOp: i, phase: 'bubble-down', swapIdx: idx, childIdx: smallest }
                });
                
                idx = smallest;
              }
            }
          }
        }

        const result = minHeap[0];
        steps.push({
          description: `Constructor complete. Heap: [${minHeap.join(', ')}]. Kth largest: ${result}`,
          data: { k, minHeap: [...minHeap], operations, currentOp: i, phase: 'constructor-complete', result }
        });

      } else if (op === 'add') {
        const num = param;
        
        steps.push({
          description: `add(${num}): Insert into stream`,
          data: { k, minHeap: [...minHeap], operations, currentOp: i, phase: 'add-start', addNum: num }
        });

        minHeap.push(num);
        
        steps.push({
          description: `Push ${num} to heap`,
          data: { k, minHeap: [...minHeap], operations, currentOp: i, phase: 'push', addedNum: num }
        });

        // Bubble up
        let idx = minHeap.length - 1;
        while (idx > 0) {
          const parentIdx = Math.floor((idx - 1) / 2);
          if (minHeap[idx] >= minHeap[parentIdx]) break;
          
          [minHeap[idx], minHeap[parentIdx]] = [minHeap[parentIdx], minHeap[idx]];
          
          steps.push({
            description: `Bubble up: ${minHeap[parentIdx]} < parent ${minHeap[idx]}, swap`,
            data: { k, minHeap: [...minHeap], operations, currentOp: i, phase: 'bubble-up', swapIdx: idx }
          });
          
          idx = parentIdx;
        }

        // Remove if needed
        if (minHeap.length > k) {
          const removed = minHeap[0];
          const last = minHeap.pop();
          
          steps.push({
            description: `Heap size (${minHeap.length + 1}) > k (${k}). Remove smallest: ${removed}`,
            data: { k, minHeap: [...minHeap, last], operations, currentOp: i, phase: 'remove-min', removed }
          });

          if (minHeap.length > 0) {
            minHeap[0] = last;
            
            let idx = 0;
            while (true) {
              const leftIdx = 2 * idx + 1;
              const rightIdx = 2 * idx + 2;
              let smallest = idx;

              if (leftIdx < minHeap.length && minHeap[leftIdx] < minHeap[smallest]) {
                smallest = leftIdx;
              }
              if (rightIdx < minHeap.length && minHeap[rightIdx] < minHeap[smallest]) {
                smallest = rightIdx;
              }

              if (smallest === idx) break;

              [minHeap[idx], minHeap[smallest]] = [minHeap[smallest], minHeap[idx]];
              
              steps.push({
                description: `Bubble down: Swap with smaller child`,
                data: { k, minHeap: [...minHeap], operations, currentOp: i, phase: 'bubble-down' }
              });
              
              idx = smallest;
            }
          }
        }

        const result = minHeap[0];
        steps.push({
          description: `Return ${result} (root = kth largest). Heap: [${minHeap.join(', ')}]`,
          data: { k, minHeap: [...minHeap], operations, currentOp: i, phase: 'add-complete', result }
        });
      }
    }

    steps.push({
      description: 'All operations complete!',
      data: { k, minHeap: [...minHeap], operations, currentOp: -1, phase: 'complete', complete: true }
    });

    return steps;
  }