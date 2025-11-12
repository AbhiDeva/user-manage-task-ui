export const generateNQueensSteps = (n) => {
    const steps = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    steps.push({
      description: `Solve ${n}-Queens problem using backtracking`,
      data: { board: board.map(r => [...r]), n, row: 0, col: -1, queens: [], solutions: 0 }
    });

    const isSafe = (row, col) => {
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 'Q') return false;
        if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false;
        if (col + (row - i) < n && board[i][col + (row - i)] === 'Q') return false;
      }
      return true;
    };

    const backtrack = (row) => {
      if (row === n) {
        steps.push({
          description: `Solution found! Total solutions: ${steps.filter(s => s.data.solution).length + 1}`,
          data: { board: board.map(r => [...r]), n, row: n, col: -1, queens: board.map((r, i) => [i, r.indexOf('Q')]), solution: true }
        });
        return;
      }

      for (let col = 0; col < n; col++) {
        steps.push({
          description: `Try placing queen at row ${row}, col ${col}`,
          data: { board: board.map(r => [...r]), n, row, col, queens: board.slice(0, row).map((r, i) => [i, r.indexOf('Q')]), trying: true }
        });

        if (isSafe(row, col)) {
          board[row][col] = 'Q';
          steps.push({
            description: `Queen placed at (${row}, ${col})`,
            data: { board: board.map(r => [...r]), n, row, col, queens: board.slice(0, row + 1).map((r, i) => [i, r.indexOf('Q')]), placed: true }
          });
          
          backtrack(row + 1);
          
          board[row][col] = '.';
          steps.push({
            description: `Backtrack: Remove queen from (${row}, ${col})`,
            data: { board: board.map(r => [...r]), n, row, col, queens: board.slice(0, row).map((r, i) => [i, r.indexOf('Q')]), backtracking: true }
          });
        } else {
          steps.push({
            description: `Position (${row}, ${col}) is unsafe, skip`,
            data: { board: board.map(r => [...r]), n, row, col, queens: board.slice(0, row).map((r, i) => [i, r.indexOf('Q')]), unsafe: true }
          });
        }
      }
    };

    backtrack(0);
    
    const solutionCount = steps.filter(s => s.data.solution).length;
    steps.push({
      description: `Complete! Found ${solutionCount} solution(s)`,
      data: { board: board.map(r => [...r]), n, row: -1, col: -1, queens: [], complete: true, solutionCount }
    });

    return steps;
  };