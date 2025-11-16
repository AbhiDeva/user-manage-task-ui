export const generateTrieStepsII = (input) => {
    const steps = [];
    const trie = { root: { children: {}, isEnd: false } };
    const insertedWords = [];

    steps.push({
      description: 'Initialize Trie with empty root node',
      data: { trie: { ...trie }, operations: input.operations, currentOp: -1, insertedWords: [] }
    });

    function visualizeTrie(root) {
      const result = [];
      function dfs(node, path = '') {
        if (node.isEnd) {
          result.push({ word: path, isEnd: true });
        }
        for (const [char, child] of Object.entries(node.children)) {
          result.push({ char, path: path + char, isEnd: child.isEnd });
          dfs(child, path + char);
        }
      }
      dfs(root);
      return result;
    }

    for (let i = 0; i < input.operations.length; i++) {
      const [operation, word] = input.operations[i];

      if (operation === 'insert') {
        steps.push({
          description: `insert("${word}"): Start at root`,
          data: { trie: { ...trie }, operations: input.operations, currentOp: i, operation, word, insertedWords: [...insertedWords], phase: 'start' }
        });

        let node = trie.root;
        for (let j = 0; j < word.length; j++) {
          const char = word[j];
          
          if (!node.children[char]) {
            node.children[char] = { children: {}, isEnd: false };
            steps.push({
              description: `Create new node for '${char}' at position ${j}`,
              data: { trie: { ...trie }, operations: input.operations, currentOp: i, operation, word, char, position: j, insertedWords: [...insertedWords], phase: 'create', path: word.substring(0, j + 1) }
            });
          } else {
            steps.push({
              description: `Node '${char}' already exists, move to it`,
              data: { trie: { ...trie }, operations: input.operations, currentOp: i, operation, word, char, position: j, insertedWords: [...insertedWords], phase: 'traverse', path: word.substring(0, j + 1) }
            });
          }
          
          node = node.children[char];
        }

        node.isEnd = true;
        insertedWords.push(word);
        steps.push({
          description: `Mark end of word "${word}"`,
          data: { trie: { ...trie }, operations: input.operations, currentOp: i, operation, word, insertedWords: [...insertedWords], phase: 'complete', result: true, visualization: visualizeTrie(trie.root) }
        });

      } else if (operation === 'search') {
        steps.push({
          description: `search("${word}"): Looking for exact word`,
          data: { trie: { ...trie }, operations: input.operations, currentOp: i, operation, word, insertedWords: [...insertedWords], phase: 'start' }
        });

        let node = trie.root;
        let found = true;

        for (let j = 0; j < word.length; j++) {
          const char = word[j];
          
          if (!node.children[char]) {
            found = false;
            steps.push({
              description: `Character '${char}' not found at position ${j}. Word doesn't exist.`,
              data: { trie: { ...trie }, operations: input.operations, currentOp: i, operation, word, char, position: j, insertedWords: [...insertedWords], phase: 'not-found', result: false }
            });
            break;
          }

          steps.push({
            description: `Found '${char}' at position ${j}, continue...`,
            data: { trie: { ...trie }, operations: input.operations, currentOp: i, operation, word, char, position: j, insertedWords: [...insertedWords], phase: 'traverse', path: word.substring(0, j + 1) }
          });

          node = node.children[char];
        }

        if (found) {
          const result = node.isEnd;
          steps.push({
            description: result ? `Found "${word}" and it's marked as end of word!` : `Prefix "${word}" exists but not as complete word`,
            data: { trie: { ...trie }, operations: input.operations, currentOp: i, operation, word, insertedWords: [...insertedWords], phase: 'complete', result }
          });
        }

      } else if (operation === 'startsWith') {
        steps.push({
          description: `startsWith("${word}"): Check if prefix exists`,
          data: { trie: { ...trie }, operations: input.operations, currentOp: i, operation, word, insertedWords: [...insertedWords], phase: 'start' }
        });

        let node = trie.root;
        let found = true;

        for (let j = 0; j < word.length; j++) {
          const char = word[j];
          
          if (!node.children[char]) {
            found = false;
            steps.push({
              description: `Character '${char}' not found. Prefix doesn't exist.`,
              data: { trie: { ...trie }, operations: input.operations, currentOp: i, operation, word, char, position: j, insertedWords: [...insertedWords], phase: 'not-found', result: false }
            });
            break;
          }

          steps.push({
            description: `Found '${char}', continue checking prefix...`,
            data: { trie: { ...trie }, operations: input.operations, currentOp: i, operation, word, char, position: j, insertedWords: [...insertedWords], phase: 'traverse', path: word.substring(0, j + 1) }
          });

          node = node.children[char];
        }

        if (found) {
          steps.push({
            description: `Prefix "${word}" exists in Trie!`,
            data: { trie: { ...trie }, operations: input.operations, currentOp: i, operation, word, insertedWords: [...insertedWords], phase: 'complete', result: true }
          });
        }
      }
    }

    steps.push({
      description: 'All operations complete!',
      data: { trie: { ...trie }, operations: input.operations, currentOp: -1, insertedWords: [...insertedWords], complete: true, visualization: visualizeTrie(trie.root) }
    });

    return steps;
  };