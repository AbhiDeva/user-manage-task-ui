 export const generateGroupAnagramsSteps = (strs) => {
    const steps = [];
    const map = new Map();
    const groups = [];

    steps.push({
      description: `Group anagrams from: [${strs.join(', ')}]`,
      data: { strs, map: {}, groups: [], current: -1, sortedKey: null }
    });

    for (let i = 0; i < strs.length; i++) {
      const str = strs[i];
      const sorted = str.split('').sort().join('');

      steps.push({
        description: `Process "${str}": sorted key = "${sorted}"`,
        data: { strs, map: Object.fromEntries(map), groups: Array.from(map.values()), current: i, sortedKey: sorted, processing: str }
      });

      if (!map.has(sorted)) {
        map.set(sorted, []);
        steps.push({
          description: `Create new group for key "${sorted}"`,
          data: { strs, map: Object.fromEntries(map), groups: Array.from(map.values()), current: i, sortedKey: sorted, newGroup: true }
        });
      }

      map.get(sorted).push(str);
      steps.push({
        description: `Add "${str}" to group "${sorted}"`,
        data: { strs, map: Object.fromEntries(map), groups: Array.from(map.values()), current: i, sortedKey: sorted, added: str }
      });
    }

    steps.push({
      description: `Grouping complete! Found ${map.size} anagram group(s)`,
      data: { strs, map: Object.fromEntries(map), groups: Array.from(map.values()), current: -1, sortedKey: null, complete: true }
    });

    return steps;
  };