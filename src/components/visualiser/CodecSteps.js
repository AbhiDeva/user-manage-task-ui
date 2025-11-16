export  const generateCodecSteps = (input) => {
    const steps = [];

    steps.push({
      description: 'Serialize: Convert tree to string representation',
      data: { tree: input, phase: 'serialize-start', serialized: '' }
    });

    function serialize(node, path = []) {
      if (!node) {
        steps.push({
          description: `null node in path: [${path.join(' → ')}]`,
          data: { tree: input, phase: 'serialize', currentNode: null, path, partial: 'null' }
        });
        return 'null';
      }

      const currentPath = [...path, node.value];
      
      steps.push({
        description: `Serialize node ${node.value}`,
        data: { tree: input, phase: 'serialize', currentNode: node.value, path: currentPath }
      });

      const left = serialize(node.left, currentPath);
      const right = serialize(node.right, currentPath);
      
      const result = `${node.value},${left},${right}`;
      
      steps.push({
        description: `Node ${node.value} serialized: "${node.value},..."`,
        data: { tree: input, phase: 'serialize', currentNode: node.value, path: currentPath, partial: result }
      });

      return result;
    }

    const serialized = serialize(input);

    steps.push({
      description: `Serialization complete: "${serialized}"`,
      data: { tree: input, phase: 'serialize-complete', serialized, complete: true }
    });

    steps.push({
      description: 'Deserialize: Reconstruct tree from string',
      data: { tree: input, phase: 'deserialize-start', serialized }
    });

    const values = serialized.split(',');
    let idx = 0;

    function deserialize(path = []) {
      const val = values[idx++];
      
      if (val === 'null') {
        steps.push({
          description: `Read "null" - no node here`,
          data: { tree: input, phase: 'deserialize', currentValue: val, path, serialized }
        });
        return null;
      }

      const nodeVal = parseInt(val);
      const currentPath = [...path, nodeVal];

      steps.push({
        description: `Build node ${nodeVal}`,
        data: { tree: input, phase: 'deserialize', currentValue: nodeVal, path: currentPath, serialized }
      });

      const node = { value: nodeVal };
      node.left = deserialize(currentPath);
      node.right = deserialize(currentPath);

      return node;
    }

    deserialize();

    steps.push({
      description: 'Deserialization complete! Tree reconstructed successfully.',
      data: { tree: input, phase: 'deserialize-complete', serialized, complete: true }
    });

    return steps;
  };