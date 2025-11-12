export const generateQuickSortSteps = (nums) => {
    const steps = [];
    const arr = [...nums];
    
    steps.push({
      description: `Initialize QuickSort: array = [${arr.join(', ')}]`,
      data: { nums: [...arr], low: 0, high: arr.length - 1, pivot: -1, i: -1, j: -1 }
    });

    const quickSortHelper = (low, high, depth = 0) => {
      if (low < high) {
        steps.push({
          description: `Partition range [${low}..${high}], pivot = arr[${high}] = ${arr[high]}`,
          data: { nums: [...arr], low, high, pivot: high, i: low - 1, j: low, depth }
        });

        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
          steps.push({
            description: `Compare arr[${j}] = ${arr[j]} with pivot ${pivot}`,
            data: { nums: [...arr], low, high, pivot: high, i, j, depth, comparing: true }
          });

          if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            steps.push({
              description: `${arr[j]} < ${pivot}, swap arr[${i}] ↔ arr[${j}]`,
              data: { nums: [...arr], low, high, pivot: high, i, j, depth, swapped: true }
            });
          }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        const pi = i + 1;
        
        steps.push({
          description: `Place pivot ${pivot} at position ${pi}`,
          data: { nums: [...arr], low, high, pivot: pi, i, j: high, depth, pivotPlaced: true }
        });

        quickSortHelper(low, pi - 1, depth + 1);
        quickSortHelper(pi + 1, high, depth + 1);
      }
    };

    quickSortHelper(0, arr.length - 1);

    steps.push({
      description: `QuickSort complete! Array is sorted`,
      data: { nums: [...arr], low: -1, high: -1, pivot: -1, i: -1, j: -1, complete: true }
    });

    return steps;
  };