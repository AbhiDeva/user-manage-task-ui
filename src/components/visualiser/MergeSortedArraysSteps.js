export  const generateMergeSortedArraysSteps = (arr1, arr2) => {
    const steps = [];
    let result = [], i = 0, j = 0;
    
    steps.push({
      description: `Initialize: arr1 = [${arr1.join(', ')}], arr2 = [${arr2.join(', ')}]`,
      data: { arr1, arr2, result: [], i: 0, j: 0 }
    });

    while (i < arr1.length && j < arr2.length) {
      steps.push({
        description: `Compare arr1[${i}] = ${arr1[i]} with arr2[${j}] = ${arr2[j]}`,
        data: { arr1, arr2, result: [...result], i, j, comparing: true }
      });

      if (arr1[i] <= arr2[j]) {
        result.push(arr1[i]);
        steps.push({
          description: `${arr1[i]} ≤ ${arr2[j]}, add ${arr1[i]} to result`,
          data: { arr1, arr2, result: [...result], i: i + 1, j, added: arr1[i] }
        });
        i++;
      } else {
        result.push(arr2[j]);
        steps.push({
          description: `${arr2[j]} < ${arr1[i]}, add ${arr2[j]} to result`,
          data: { arr1, arr2, result: [...result], i, j: j + 1, added: arr2[j] }
        });
        j++;
      }
    }

    while (i < arr1.length) {
      result.push(arr1[i]);
      steps.push({
        description: `Add remaining arr1[${i}] = ${arr1[i]} to result`,
        data: { arr1, arr2, result: [...result], i: i + 1, j }
      });
      i++;
    }

    while (j < arr2.length) {
      result.push(arr2[j]);
      steps.push({
        description: `Add remaining arr2[${j}] = ${arr2[j]} to result`,
        data: { arr1, arr2, result: [...result], i, j: j + 1 }
      });
      j++;
    }

    steps.push({
      description: `Merge complete! Result = [${result.join(', ')}]`,
      data: { arr1, arr2, result, i, j, complete: true }
    });

    return steps;
  };