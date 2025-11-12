 export const generateContainerWithMostWaterSteps = (height) => {
    const steps = [];
    let left = 0, right = height.length - 1;
    let maxArea = 0;
    let maxLeft = 0, maxRight = 0;

    steps.push({
      description: `Find container with most water in heights: [${height.join(', ')}]`,
      data: { height, left, right, maxArea, maxLeft, maxRight, currentArea: 0 }
    });

    while (left < right) {
      const width = right - left;
      const minHeight = Math.min(height[left], height[right]);
      const area = minHeight * width;

      steps.push({
        description: `Calculate area: width=${width}, min_height=${minHeight}, area=${area}`,
        data: { height, left, right, maxArea, maxLeft, maxRight, currentArea: area, calculating: true }
      });

      if (area > maxArea) {
        maxArea = area;
        maxLeft = left;
        maxRight = right;
        
        steps.push({
          description: `New max area found: ${maxArea} at indices [${left}, ${right}]`,
          data: { height, left, right, maxArea, maxLeft, maxRight, currentArea: area, newMax: true }
        });
      }

      if (height[left] < height[right]) {
        steps.push({
          description: `height[${left}]=${height[left]} < height[${right}]=${height[right]}, move left pointer`,
          data: { height, left, right, maxArea, maxLeft, maxRight, currentArea: area, moving: 'left' }
        });
        left++;
      } else {
        steps.push({
          description: `height[${left}]=${height[left]} >= height[${right}]=${height[right]}, move right pointer`,
          data: { height, left, right, maxArea, maxLeft, maxRight, currentArea: area, moving: 'right' }
        });
        right--;
      }
    }

    steps.push({
      description: `Maximum area: ${maxArea} (container at indices [${maxLeft}, ${maxRight}])`,
      data: { height, left, right, maxArea, maxLeft, maxRight, currentArea: maxArea, complete: true }
    });

    return steps;
  };