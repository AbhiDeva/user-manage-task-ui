export const generateCopyRandomListSteps = (nodes) => {
    const steps = [];

    steps.push({
      description: `Copy Linked List with Random Pointer: ${nodes.length} nodes`,
      data: { nodes, phase: 'init', current: -1, interleaved: [], copied: [], separated: [] }
    });

    // Phase 1: Create interleaved list
    steps.push({
      description: `Phase 1: Create copy nodes and interleave with originals`,
      data: { nodes, phase: 'interleave', current: -1, interleaved: [], copied: [], separated: [] }
    });

    const interleaved = [];
    for (let i = 0; i < nodes.length; i++) {
      interleaved.push({ ...nodes[i], id: i, isOriginal: true });
      interleaved.push({ val: nodes[i].val, next: null, random: null, id: i, isOriginal: false, isCopy: true });
      
      steps.push({
        description: `Create copy of node ${i} (val=${nodes[i].val}) and insert after original`,
        data: { nodes, phase: 'interleave', current: i, interleaved: [...interleaved], copied: [], separated: [] }
      });
    }

    // Fix next pointers in interleaved list
    for (let i = 0; i < interleaved.length; i++) {
      if (interleaved[i].isOriginal && i + 1 < interleaved.length) {
        interleaved[i].next = i + 1;
      } else if (interleaved[i].isCopy) {
        const originalNext = nodes[interleaved[i].id].next;
        if (originalNext !== null) {
          interleaved[i].next = (interleaved[i].id + 1) * 2;
        }
      }
    }

    steps.push({
      description: `Interleaved list created: Original → Copy → Original → Copy...`,
      data: { nodes, phase: 'interleave', current: -1, interleaved: [...interleaved], copied: [], separated: [], complete: true }
    });

    // Phase 2: Set random pointers
    steps.push({
      description: `Phase 2: Set random pointers for copy nodes`,
      data: { nodes, phase: 'random', current: -1, interleaved: [...interleaved], copied: [], separated: [] }
    });

    for (let i = 0; i < nodes.length; i++) {
      const originalIdx = i * 2;
      const copyIdx = i * 2 + 1;
      
      steps.push({
        description: `Process node ${i}: Check if original has random pointer`,
        data: { nodes, phase: 'random', current: i, interleaved: [...interleaved], copied: [], separated: [], checking: originalIdx }
      });

      if (nodes[i].random !== null) {
        const randomTarget = nodes[i].random * 2 + 1;
        interleaved[copyIdx].random = randomTarget;
        
        steps.push({
          description: `Set copy node ${i} random → copy node ${nodes[i].random}`,
          data: { nodes, phase: 'random', current: i, interleaved: [...interleaved], copied: [], separated: [], setting: copyIdx, target: randomTarget }
        });
      } else {
        steps.push({
          description: `Node ${i} has no random pointer, skip`,
          data: { nodes, phase: 'random', current: i, interleaved: [...interleaved], copied: [], separated: [] }
        });
      }
    }

    steps.push({
      description: `All random pointers set`,
      data: { nodes, phase: 'random', current: -1, interleaved: [...interleaved], copied: [], separated: [], complete: true }
    });

    // Phase 3: Separate lists
    steps.push({
      description: `Phase 3: Separate original and copied lists`,
      data: { nodes, phase: 'separate', current: -1, interleaved: [...interleaved], copied: [], separated: [] }
    });

    const copied = [];
    for (let i = 0; i < interleaved.length; i++) {
      if (interleaved[i].isCopy) {
        const copiedNode = { ...interleaved[i] };
        // Fix next pointer to point to next copy node
        if (copiedNode.next !== null && copiedNode.next < interleaved.length) {
          const nextOriginalId = interleaved[copiedNode.next].id;
          copiedNode.next = copied.length + 1 < nodes.length ? copied.length + 1 : null;
        } else {
          copiedNode.next = null;
        }
        // Fix random pointer to point to correct copy node index
        if (copiedNode.random !== null) {
          const randomOriginalId = interleaved[copiedNode.random].id;
          copiedNode.random = randomOriginalId;
        }
        copied.push(copiedNode);
        
        steps.push({
          description: `Extract copy node ${copiedNode.id} to new list`,
          data: { nodes, phase: 'separate', current: copiedNode.id, interleaved: [...interleaved], copied: [...copied], separated: [] }
        });
      }
    }

    steps.push({
      description: `Complete! Deep copy created with all pointers preserved`,
      data: { nodes, phase: 'complete', current: -1, interleaved: [...interleaved], copied: [...copied], separated: [], complete: true }
    });

    return steps;
  };