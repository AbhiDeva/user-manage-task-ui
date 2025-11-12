export const generateWordSearchSteps = (board, word) => {
    const steps = [];
    const rows = board.length;
    const cols = board[0].length;
    const boardCopy = board.map(r => [...r]);

    steps.push({
      description: `Search for word "${word}" in the board`,
      data: { board: boardCopy.map(r => [...r]), word, path: [], found: false, current: null }
    });

    const dfs = (row, col, index, path) => {
      if (index === word.length) {
        steps.push({
          description: `Word "${word}" found!`,
          data: { board: boardCopy.map(r => [...r]), word, path: [...path], found: true, current: null }
        });
        return true;
      }

      if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
      if (boardCopy[row][col] !== word[index]) return false;

      steps.push({
        description: `Match '${word[index]}' at (${row}, ${col}). Progress: "${word.slice(0, index + 1)}"`,
        data: { board: boardCopy.map(r => [...r]), word, path: [...path, [row, col]], found: false, current: [row, col], matching: true }
      });

      const temp = boardCopy[row][col];
      boardCopy[row][col] = '#';
      path.push([row, col]);

      const found = dfs(row + 1, col, index + 1, path) ||
                    dfs(row - 1, col, index + 1, path) ||
                    dfs(row, col + 1, index + 1, path) ||
                    dfs(row, col - 1, index + 1, path);

      if (!found) {
        steps.push({
          description: `Backtrack from (${row}, ${col})`,
          data: { board: boardCopy.map(r => [...r]), word, path: [...path], found: false, current: [row, col], backtracking: true }
        });
      }

      boardCopy[row][col] = temp;
      path.pop();
      return found;
    };

    let found = false;
    for (let i = 0; i < rows && !found; i++) {
      for (let j = 0; j < cols && !found; j++) {
        if (board[i][j] === word[0]) {
          steps.push({
            description: `Start DFS from (${i}, ${j})`,
            data: { board: board.map(r => [...r]), word, path: [], found: false, current: [i, j], starting: true }
          });
          found = dfs(i, j, 0, []);
        }
      }
    }

    if (!found) {
      steps.push({
        description: `Word "${word}" not found in board`,
        data: { board: board.map(r => [...r]), word, path: [], found: false, current: null, complete: true }
      });
    }

    return steps;
  };