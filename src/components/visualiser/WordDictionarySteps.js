export const generateWordDictionarySteps = (input) => {
    const steps = [];
    const dict = { root: {} };
    const addedWords = [];

    steps.push({
      description: 'Initialize Word Dictionary with wildcard search support (. matches any character)',
      data: { dict: { ...dict }, operations: input.operations, currentOp: -1, addedWords: [] }
    });

    for (let i = 0; i < input.operations.length; i++) {
      const [operation, word] = input.operations[i];

      if (operation === 'addWord') {
        steps.push({
          description: `addWord("${word}"): Insert word into dictionary`,
          data: { dict: { ...dict }, operations: input.operations, currentOp: i, operation, word, addedWords: [...addedWords], phase: 'start' }
        });

        let node = dict.root;
        for (let j = 0; j < word.length; j++) {
          const char = word[j];
          
          if (!node[char]) {
            node[char] = {};
            steps.push({
              description: `Create new node for '${char}' at position ${j}`,
              data: { dict: { ...dict }, operations: input.operations, currentOp: i, operation, word, char, position: j, addedWords: [...addedWords], phase: 'create', path: word.substring(0, j + 1) }
            });
          } else {
            steps.push({
              description: `Node '${char}' exists, continue`,
              data: { dict: { ...dict }, operations: input.operations, currentOp: i, operation, word, char, position: j, addedWords: [...addedWords], phase: 'traverse', path: word.substring(0, j + 1) }
            });
          }
          
          node = node[char];
        }

        node.isEnd = true;
        addedWords.push(word);
        steps.push({
          description: `Word "${word}" added successfully`,
          data: { dict: { ...dict }, operations: input.operations, currentOp: i, operation, word, addedWords: [...addedWords], phase: 'complete', result: true }
        });

      } else if (operation === 'search') {
        const hasWildcard = word.includes('.');
        
        steps.push({
          description: `search("${word}"): ${hasWildcard ? 'Using DFS to handle wildcards (.)' : 'Regular search'}`,
          data: { dict: { ...dict }, operations: input.operations, currentOp: i, operation, word, addedWords: [...addedWords], phase: 'start', hasWildcard }
        });

        function searchNode(w, idx, node, path = '') {
          if (idx === w.length) {
            const found = node.isEnd === true;
            steps.push({
              description: found ? `✓ Word found: "${path}"` : `Reached end but no word marker at "${path}"`,
              data: { dict: { ...dict }, operations: input.operations, currentOp: i, operation, word, addedWords: [...addedWords], phase: 'check-end', path, result: found }
            });
            return found;
          }

          const char = w[idx];

          if (char === '.') {
            steps.push({
              description: `Wildcard '.' at position ${idx} - try all possible characters`,
              data: { dict: { ...dict }, operations: input.operations, currentOp: i, operation, word, char, position: idx, addedWords: [...addedWords], phase: 'wildcard', path }
            });

            const keys = Object.keys(node).filter(k => k !== 'isEnd');
            
            for (const key of keys) {
              steps.push({
                description: `Try '${key}' for wildcard at position ${idx}`,
                data: { dict: { ...dict }, operations: input.operations, currentOp: i, operation, word, char: key, position: idx, addedWords: [...addedWords], phase: 'try-wildcard', path: path + key }
              });

              if (searchNode(w, idx + 1, node[key], path + key)) {
                return true;
              }
            }

            steps.push({
              description: `No match found for wildcard at position ${idx}`,
              data: { dict: { ...dict }, operations: input.operations, currentOp: i, operation, word, position: idx, addedWords: [...addedWords], phase: 'wildcard-fail', path }
            });

            return false;
          }

          if (!node[char]) {
            steps.push({
              description: `Character '${char}' not found at position ${idx}`,
              data: { dict: { ...dict }, operations: input.operations, currentOp: i, operation, word, char, position: idx, addedWords: [...addedWords], phase: 'not-found', path }
            });
            return false;
          }

          steps.push({
            description: `Found '${char}' at position ${idx}, continue...`,
            data: { dict: { ...dict }, operations: input.operations, currentOp: i, operation, word, char, position: idx, addedWords: [...addedWords], phase: 'traverse', path: path + char }
          });

          return searchNode(w, idx + 1, node[char], path + char);
        }

        const result = searchNode(word, 0, dict.root);

        steps.push({
          description: result ? `✓ Match found for "${word}"!` : `✗ No match found for "${word}"`,
          data: { dict: { ...dict }, operations: input.operations, currentOp: i, operation, word, addedWords: [...addedWords], phase: 'complete', result }
        });
      }
    }

    steps.push({
      description: 'All operations complete!',
      data: { dict: { ...dict }, operations: input.operations, currentOp: -1, addedWords: [...addedWords], complete: true }
    });

    return steps;
  };