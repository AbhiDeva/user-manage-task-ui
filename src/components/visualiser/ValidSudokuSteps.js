 export const generateValidSudokuSteps = (board) => {
    const steps = [];
    const rows = Array(9).fill().map(() => new Set());
    const cols = Array(9).fill().map(() => new Set());
    const boxes = Array(9).fill().map(() => new Set());

    steps.push({
      description: `Validate 9x9 Sudoku board`,
      data: { 
        board: board.map(r => [...r]), 
        rows: rows.map(s => Array.from(s)),
        cols: cols.map(s => Array.from(s)),
        boxes: boxes.map(s => Array.from(s)),
        current: null, 
        valid: true,
        checking: null
      }
    });

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const num = board[i][j];
        
        if (num === '.') {
          steps.push({
            description: `Cell [${i},${j}] is empty, skip`,
            data: { 
              board: board.map(r => [...r]), 
              rows: rows.map(s => Array.from(s)),
              cols: cols.map(s => Array.from(s)),
              boxes: boxes.map(s => Array.from(s)),
              current: [i, j], 
              valid: true,
              empty: true
            }
          });
          continue;
        }

        const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

        steps.push({
          description: `Check cell [${i},${j}] = '${num}' (row ${i}, col ${j}, box ${boxIndex})`,
          data: { 
            board: board.map(r => [...r]), 
            rows: rows.map(s => Array.from(s)),
            cols: cols.map(s => Array.from(s)),
            boxes: boxes.map(s => Array.from(s)),
            current: [i, j], 
            valid: true,
            checking: num,
            boxIndex
          }
        });

        // Check row
        if (rows[i].has(num)) {
          steps.push({
            description: `Invalid! '${num}' already exists in row ${i}`,
            data: { 
              board: board.map(r => [...r]), 
              rows: rows.map(s => Array.from(s)),
              cols: cols.map(s => Array.from(s)),
              boxes: boxes.map(s => Array.from(s)),
              current: [i, j], 
              valid: false,
              conflict: 'row',
              conflictIndex: i
            }
          });
          return steps;
        }

        // Check column
        if (cols[j].has(num)) {
          steps.push({
            description: `Invalid! '${num}' already exists in column ${j}`,
            data: { 
              board: board.map(r => [...r]), 
              rows: rows.map(s => Array.from(s)),
              cols: cols.map(s => Array.from(s)),
              boxes: boxes.map(s => Array.from(s)),
              current: [i, j], 
              valid: false,
              conflict: 'col',
              conflictIndex: j
            }
          });
          return steps;
        }

        // Check box
        if (boxes[boxIndex].has(num)) {
          steps.push({
            description: `Invalid! '${num}' already exists in box ${boxIndex}`,
            data: { 
              board: board.map(r => [...r]), 
              rows: rows.map(s => Array.from(s)),
              cols: cols.map(s => Array.from(s)),
              boxes: boxes.map(s => Array.from(s)),
              current: [i, j], 
              valid: false,
              conflict: 'box',
              conflictIndex: boxIndex
            }
          });
          return steps;
        }

        rows[i].add(num);
        cols[j].add(num);
        boxes[boxIndex].add(num);

        steps.push({
          description: `'${num}' is valid at [${i},${j}], add to sets`,
          data: { 
            board: board.map(r => [...r]), 
            rows: rows.map(s => Array.from(s)),
            cols: cols.map(s => Array.from(s)),
            boxes: boxes.map(s => Array.from(s)),
            current: [i, j], 
            valid: true,
            added: true,
            boxIndex
          }
        });
      }
    }

    steps.push({
      description: `Sudoku board is valid!`,
      data: { 
        board: board.map(r => [...r]), 
        rows: rows.map(s => Array.from(s)),
        cols: cols.map(s => Array.from(s)),
        boxes: boxes.map(s => Array.from(s)),
        current: null, 
        valid: true,
        complete: true
      }
    });

    return steps;
  };
