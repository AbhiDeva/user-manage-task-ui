export const generateSearch2DMatrixSteps = (input) => {
    const { matrix, target } = input;
    const steps = [];
    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0, right = m * n - 1;

    steps.push({
      description: `Search for ${target} in ${m}×${n} matrix (treat as 1D sorted array)`,
      data: { matrix, target, left, right, mid: -1, found: false }
    });

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const row = Math.floor(mid / n);
      const col = mid % n;
      const midVal = matrix[row][col];

      steps.push({
        description: `mid=${mid} → [${row},${col}] = ${midVal}, compare with ${target}`,
        data: { matrix, target, left, right, mid, midPos: [row, col], midVal, found: false, checking: true }
      });

      if (midVal === target) {
        steps.push({
          description: `Found ${target} at position [${row}, ${col}]!`,
          data: { matrix, target, left, right, mid, midPos: [row, col], midVal, found: true }
        });
        return steps;
      } else if (midVal < target) {
        steps.push({
          description: `${midVal} < ${target}, search right half`,
          data: { matrix, target, left: mid + 1, right, mid, midPos: [row, col], midVal, found: false, direction: 'right' }
        });
        left = mid + 1;
      } else {
        steps.push({
          description: `${midVal} > ${target}, search left half`,
          data: { matrix, target, left, right: mid - 1, mid, midPos: [row, col], midVal, found: false, direction: 'left' }
        });
        right = mid - 1;
      }
    }

    steps.push({
      description: `${target} not found in matrix`,
      data: { matrix, target, left, right, mid: -1, found: false, complete: true }
    });

    return steps;
  };