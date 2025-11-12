export const generateAStarSteps = (grid, start, goal) => {
    const steps = [];
    
    steps.push({
      description: `A* pathfinding from ${start} to ${goal}`,
      data: { grid, start, goal, openSet: [start], closedSet: [], current: null, path: [] }
    });

    const heuristic = (a, b) => {
      const [x1, y1] = a.split(',').map(Number);
      const [x2, y2] = b.split(',').map(Number);
      return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    };

    const getNeighbors = (pos) => {
      const [x, y] = pos.split(',').map(Number);
      const neighbors = [];
      if (x > 0 && grid[x-1][y] === 0) neighbors.push(`${x-1},${y}`);
      if (x < grid.length - 1 && grid[x+1][y] === 0) neighbors.push(`${x+1},${y}`);
      if (y > 0 && grid[x][y-1] === 0) neighbors.push(`${x},${y-1}`);
      if (y < grid[0].length - 1 && grid[x][y+1] === 0) neighbors.push(`${x},${y+1}`);
      return neighbors;
    };

    const openSet = [start];
    const closedSet = [];
    const gScore = { [start]: 0 };
    const fScore = { [start]: heuristic(start, goal) };
    const cameFrom = {};

    while (openSet.length > 0) {
      openSet.sort((a, b) => (fScore[a] || Infinity) - (fScore[b] || Infinity));
      const current = openSet.shift();

      steps.push({
        description: `Explore node ${current} (f=${fScore[current]})`,
        data: { grid, start, goal, openSet: [...openSet], closedSet: [...closedSet], current, path: [] }
      });

      if (current === goal) {
        const path = [];
        let temp = current;
        while (temp) {
          path.unshift(temp);
          temp = cameFrom[temp];
        }
        steps.push({
          description: `Path found! Length: ${path.length}`,
          data: { grid, start, goal, openSet: [], closedSet: [...closedSet], current, path, complete: true }
        });
        break;
      }

      closedSet.push(current);

      for (let neighbor of getNeighbors(current)) {
        if (closedSet.includes(neighbor)) continue;

        const tentativeG = gScore[current] + 1;

        if (tentativeG < (gScore[neighbor] || Infinity)) {
          cameFrom[neighbor] = current;
          gScore[neighbor] = tentativeG;
          fScore[neighbor] = tentativeG + heuristic(neighbor, goal);

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
            steps.push({
              description: `Add ${neighbor} to open set (g=${gScore[neighbor]}, h=${heuristic(neighbor, goal)})`,
              data: { grid, start, goal, openSet: [...openSet], closedSet: [...closedSet], current, path: [], added: neighbor }
            });
          }
        }
      }
    }

    return steps;
  };