export const generateReverseListSteps = (list) => {
    const steps = [];
    
    steps.push({
      description: `Initialize: prev=null, curr=head`,
      data: { list, prev: null, curr: 0, next: -1 }
    });

    for (let i = 0; i < list.length; i++) {
      steps.push({
        description: `Save next node: next = curr.next`,
        data: { list, prev: i - 1, curr: i, next: i + 1 }
      });

      steps.push({
        description: `Reverse pointer: curr.next = prev`,
        data: { list, prev: i - 1, curr: i, next: i + 1, reversed: true }
      });

      steps.push({
        description: `Move pointers: prev = curr, curr = next`,
        data: { list, prev: i, curr: i + 1, next: i + 2 }
      });
    }

    steps.push({
      description: `Complete! Return prev as new head`,
      data: { list: [...list].reverse(), prev: list.length - 1, curr: null, next: -1, complete: true }
    });

    return steps;
  };