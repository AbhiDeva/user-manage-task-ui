export const generateLargestRectangleSteps = (heights) => {
    const steps = [];
    const stack = [];
    let maxArea = 0;
    let maxRect = { height: 0, width: 0, left: 0, right: 0 };

    steps.push({
      description: `Find largest rectangle in histogram: [${heights.join(', ')}]`,
      data: { heights, stack: [], maxArea, current: -1, maxRect }
    });

    for (let i = 0; i <= heights.length; i++) {
      const h = i === heights.length ? 0 : heights[i];

      if (i < heights.length) {
        steps.push({
          description: `Process bar ${i}: height = ${h}`,
          data: { heights, stack: [...stack], maxArea, current: i, maxRect, checking: true }
        });
      }

      while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
        const heightIdx = stack.pop();
        const height = heights[heightIdx];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        const area = height * width;

        steps.push({
          description: `Pop ${heightIdx} (h=${height}): width=${width}, area=${height}×${width}=${area}`,
          data: { 
            heights, 
            stack: [...stack], 
            maxArea, 
            current: i, 
            maxRect,
            calculating: { height, width, area, left: stack.length === 0 ? 0 : stack[stack.length - 1] + 1, right: i - 1 }
          }
        });

        if (area > maxArea) {
          maxArea = area;
          maxRect = { height, width, left: stack.length === 0 ? 0 : stack[stack.length - 1] + 1, right: i - 1 };

          steps.push({
            description: `New max area: ${maxArea}`,
            data: { heights, stack: [...stack], maxArea, current: i, maxRect, newMax: true }
          });
        }
      }

      if (i < heights.length) {
        stack.push(i);
        steps.push({
          description: `Push ${i} to stack`,
          data: { heights, stack: [...stack], maxArea, current: i, maxRect, pushed: true }
        });
      }
    }

    steps.push({
      description: `Maximum rectangle area: ${maxArea}`,
      data: { heights, stack: [], maxArea, current: -1, maxRect, complete: true }
    });

    return steps;
  };