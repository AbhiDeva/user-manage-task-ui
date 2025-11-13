export const generateMergeKListsSteps = (lists) => {
    const steps = [];

    steps.push({
      description: `Merge ${lists.length} sorted lists`,
      data: { lists: lists.map(l => [...l]), merged: [], level: 0, merging: [] }
    });

    let currentLists = lists.map(l => [...l]);
    let level = 0;

    while (currentLists.length > 1) {
      level++;
      const merged = [];

      steps.push({
        description: `Level ${level}: Merge pairs of lists`,
        data: { lists: currentLists.map(l => [...l]), merged: [], level, merging: [] }
      });

      for (let i = 0; i < currentLists.length; i += 2) {
        const l1 = currentLists[i];
        const l2 = i + 1 < currentLists.length ? currentLists[i + 1] : null;

        steps.push({
          description: `Merge list ${i}${l2 ? ` and list ${i + 1}` : ' (no pair)'}`,
          data: { lists: currentLists.map(l => [...l]), merged: merged.map(m => [...m]), level, merging: [i, i + 1] }
        });

        const mergedList = [];
        let p1 = 0, p2 = 0;

        while (p1 < l1.length && (!l2 || p2 < l2.length)) {
          if (!l2 || p2 >= l2.length || l1[p1] <= l2[p2]) {
            mergedList.push(l1[p1++]);
          } else {
            mergedList.push(l2[p2++]);
          }
        }

        merged.push(mergedList);

        steps.push({
          description: `Merged result: [${mergedList.join(', ')}]`,
          data: { lists: currentLists.map(l => [...l]), merged: merged.map(m => [...m]), level, merging: [i, i + 1], result: [...mergedList] }
        });
      }

      currentLists = merged;
    }

    steps.push({
      description: `Final merged list: [${currentLists[0].join(', ')}]`,
      data: { lists: [currentLists[0]], merged: [], level, merging: [], complete: true }
    });

    return steps;
  };