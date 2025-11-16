export const generateWordSearchStepsII = (input) => {
    const steps = [];
    const { board, words } = input;
    const found = [];
    const boardCopy = board.map(row => [...row]);

    steps.push({
      description: 'Word Search II: Find all words from list in the 2D board',
      data: { board: boardCopy, words, found: [], phase: 'setup' }
    });

    steps.push({
      description: 'Step 1: Build Trie from word list for efficient searching',
      data: { board: boardCopy, words, found: [], phase: 'build-trie', buildingTrie: true }
    });

    const trie = {};
    for (const word of words) {
      let node = trie;
      for (const char of word) {
        if (!node[char]) node[char] = {};
        node = node[char];
      }
      node.word = word;
      
      steps.push({
        description: `Added "${word}" to Trie`,
        data: { board: boardCopy, words, found: [], phase: 'add-to-trie', currentWord: word, buildingTrie: true }
      });
    }

    steps.push({
      description: 'Step 2: Start DFS from each cell to find words',
      data: { board: boardCopy, words, found: [], phase: 'start-search', trie }
    });

    const rows = board.length;
    const cols = board[0].length;
    let searchCount = 0;

    function dfs(r, c, node, path, visited) {
      if (r < 0 || r >= rows || c < 0 || c >= cols) return;
      if (visited[r][c]) return;

      const char = boardCopy[r][c];
      if (!node[char]) return;

      searchCount++;
      const newPath = path + char;
      const newVisited = visited.map(row => [...row]);
      newVisited[r][c] = true;

      steps.push({
        description: `At [${r},${c}] = '${char}', path: "${newPath}"`,
        data: { 
          board: boardCopy, 
          words, 
          found: [...found], 
          phase: 'exploring', 
          currentPos: [r, c], 
          currentPath: newPath,
          visited: newVisited
        }
      });

      node = node[char];

      if (node.word && !found.includes(node.word)) {
        found.push(node.word);
        steps.push({
          description: `✓ Found word: "${node.word}"!`,
          data: { 
            board: boardCopy, 
            words, 
            found: [...found], 
            phase: 'found-word', 
            currentPos: [r, c],
            foundWord: node.word,
            visited: newVisited
          }
        });
        delete node.word;
      }

      if (searchCount < 50) {
        dfs(r + 1, c, node, newPath, newVisited);
        dfs(r - 1, c, node, newPath, newVisited);
        dfs(r, c + 1, node, newPath, newVisited);
        dfs(r, c - 1, node, newPath, newVisited);
      }
    }

    for (let r = 0; r < rows && searchCount < 50; r++) {
      for (let c = 0; c < cols && searchCount < 50; c++) {
        steps.push({
          description: `Starting search from [${r},${c}] = '${boardCopy[r][c]}'`,
          data: { 
            board: boardCopy, 
            words, 
            found: [...found], 
            phase: 'start-from-cell', 
            startPos: [r, c]
          }
        });

        const visited = Array(rows).fill(0).map(() => Array(cols).fill(false));
        dfs(r, c, trie, '', visited);
      }
    }

    steps.push({
      description: `Complete! Found ${found.length} word(s): [${found.join(', ')}]`,
      data: { board: boardCopy, words, found: [...found], phase: 'complete', complete: true }
    });

    return steps;
  };