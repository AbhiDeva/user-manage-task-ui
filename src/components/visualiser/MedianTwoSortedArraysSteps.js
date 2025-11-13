
 export const generateMedianTwoSortedArraysSteps = (input) => {
    let { nums1, nums2 } = input;
    const steps = [];
    const original1 = [...nums1];
    const original2 = [...nums2];

    if (nums1.length > nums2.length) {
      [nums1, nums2] = [nums2, nums1];
    }

    steps.push({
      description: `Find median of two sorted arrays: [${original1.join(', ')}] and [${original2.join(', ')}]`,
      data: { nums1, nums2, original1, original2, partition1: -1, partition2: -1, median: null }
    });

    const m = nums1.length, n = nums2.length;
    let left = 0, right = m;

    while (left <= right) {
      const partition1 = Math.floor((left + right) / 2);
      const partition2 = Math.floor((m + n + 1) / 2) - partition1;

      steps.push({
        description: `Try partition1=${partition1}, partition2=${partition2}`,
        data: { nums1, nums2, original1, original2, partition1, partition2, left, right, median: null, checking: true }
      });

      const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
      const minRight1 = partition1 === m ? Infinity : nums1[partition1];
      const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
      const minRight2 = partition2 === n ? Infinity : nums2[partition2];

      steps.push({
        description: `Left: max(${maxLeft1}, ${maxLeft2}), Right: min(${minRight1}, ${minRight2})`,
        data: { nums1, nums2, original1, original2, partition1, partition2, left, right, maxLeft1, minRight1, maxLeft2, minRight2, median: null }
      });

      if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
        let median;
        if ((m + n) % 2 === 0) {
          median = (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
        } else {
          median = Math.max(maxLeft1, maxLeft2);
        }

        steps.push({
          description: `Valid partition found! Median = ${median}`,
          data: { nums1, nums2, original1, original2, partition1, partition2, left, right, median, found: true }
        });
        return steps;
      } else if (maxLeft1 > minRight2) {
        steps.push({
          description: `maxLeft1 (${maxLeft1}) > minRight2 (${minRight2}), move left`,
          data: { nums1, nums2, original1, original2, partition1, partition2, left, right: partition1 - 1, median: null, direction: 'left' }
        });
        right = partition1 - 1;
      } else {
        steps.push({
          description: `maxLeft2 (${maxLeft2}) > minRight1 (${minRight1}), move right`,
          data: { nums1, nums2, original1, original2, partition1, partition2, left: partition1 + 1, right, median: null, direction: 'right' }
        });
        left = partition1 + 1;
      }
    }

    return steps;
  };
