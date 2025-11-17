export const generateNumIslandsSteps = (input) => {
    const steps = [];
    const grid = input.grid.map(row => [...row]);
    const originalGrid = input.grid.map(row => [...row]);
    let count = 0;
    const islandColors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-red-500', 'bg-orange-500'];

    steps.push({
      description: 'Starting grid scan. We will use DFS to find and mark all connected islands.',
      data: {
        grid: grid.map(row => [...row]),
        originalGrid: originalGrid,
        phase: 'setup',
        count: 0,
        visiting: null,
        currentIsland: []
      }
    });

    function dfs(i, j, islandCells, islandNum) {
      if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') {
        return;
      }

      steps.push({
        description: 'Visiting cell (' + i + ', ' + j + ') - marking as part of island ' + islandNum,
        data: {
          grid: grid.map(row => [...row]),
          originalGrid: originalGrid,
          phase: 'visiting',
          count: count,
          visiting: { i: i, j: j },
          currentIsland: [...islandCells],
          islandNum: islandNum
        }
      });

      grid[i][j] = '0';
      islandCells.push({ i: i, j: j });

      steps.push({
        description: 'Marked (' + i + ', ' + j + ') as visited. Exploring neighbors...',
        data: {
          grid: grid.map(row => [...row]),
          originalGrid: originalGrid,
          phase: 'marked',
          count: count,
          visiting: { i: i, j: j },
          currentIsland: [...islandCells],
          islandNum: islandNum
        }
      });

      dfs(i + 1, j, islandCells, islandNum);
      dfs(i - 1, j, islandCells, islandNum);
      dfs(i, j + 1, islandCells, islandNum);
      dfs(i, j - 1, islandCells, islandNum);
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        steps.push({
          description: 'Scanning cell (' + i + ', ' + j + ')',
          data: {
            grid: grid.map(row => [...row]),
            originalGrid: originalGrid,
            phase: 'scanning',
            count: count,
            visiting: { i: i, j: j },
            currentIsland: [],
            islandNum: count
          }
        });

        if (grid[i][j] === '1') {
          count++;
          const islandCells = [];

          steps.push({
            description: 'Found new island at (' + i + ', ' + j + ')! Island #' + count + '. Starting DFS...',
            data: {
              grid: grid.map(row => [...row]),
              originalGrid: originalGrid,
              phase: 'found',
              count: count,
              visiting: { i: i, j: j },
              currentIsland: [],
              islandNum: count
            }
          });

          dfs(i, j, islandCells, count);

          steps.push({
            description: 'Completed exploring island #' + count + '. Total cells: ' + islandCells.length,
            data: {
              grid: grid.map(row => [...row]),
              originalGrid: originalGrid,
              phase: 'completed',
              count: count,
              visiting: null,
              currentIsland: islandCells,
              islandNum: count
            }
          });
        }
      }
    }

    steps.push({
      description: 'COMPLETE! Found ' + count + ' islands in total.',
      data: {
        grid: grid.map(row => [...row]),
        originalGrid: originalGrid,
        phase: 'complete',
        count: count,
        visiting: null,
        currentIsland: [],
        complete: true
      }
    });

    return steps;
  };