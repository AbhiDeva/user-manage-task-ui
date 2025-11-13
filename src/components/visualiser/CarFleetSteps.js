export const generateCarFleetSteps = (input) => {
    const { target, position, speed } = input;
    const steps = [];

    steps.push({
      description: `Car Fleet: ${position.length} cars racing to target ${target}`,
      data: { target, position, speed, cars: [], sorted: false, stack: [], fleets: 0 }
    });

    // Create car objects with time to reach target
    const cars = position.map((pos, i) => ({
      id: i,
      position: pos,
      speed: speed[i],
      time: (target - pos) / speed[i]
    }));

    steps.push({
      description: `Calculate time to reach target for each car`,
      data: { target, position, speed, cars: cars.map(c => ({...c})), sorted: false, stack: [], fleets: 0, calculating: true }
    });

    for (let i = 0; i < cars.length; i++) {
      steps.push({
        description: `Car ${i}: position=${cars[i].position}, speed=${cars[i].speed}, time=${cars[i].time.toFixed(2)}`,
        data: { target, position, speed, cars: cars.map(c => ({...c})), sorted: false, stack: [], fleets: 0, current: i }
      });
    }

    // Sort by position (descending - closest to target first)
    const sortedCars = [...cars].sort((a, b) => b.position - a.position);

    steps.push({
      description: `Sort cars by position (closest to target first)`,
      data: { target, position, speed, cars: sortedCars.map(c => ({...c})), sorted: true, stack: [], fleets: 0 }
    });

    // Build fleets using stack
    const stack = [];

    for (let i = 0; i < sortedCars.length; i++) {
      const car = sortedCars[i];

      steps.push({
        description: `Process Car ${car.id} at position ${car.position} (time: ${car.time.toFixed(2)})`,
        data: { target, position, speed, cars: sortedCars.map(c => ({...c})), sorted: true, stack: [...stack], fleets: stack.length, current: i, checking: true }
      });

      if (stack.length === 0) {
        stack.push(car.time);
        steps.push({
          description: `First car - forms new fleet. Total fleets: ${stack.length}`,
          data: { target, position, speed, cars: sortedCars.map(c => ({...c})), sorted: true, stack: [...stack], fleets: stack.length, current: i, newFleet: true }
        });
      } else if (car.time > stack[stack.length - 1]) {
        stack.push(car.time);
        steps.push({
          description: `Car ${car.id} is slower (${car.time.toFixed(2)} > ${stack[stack.length - 2]?.toFixed(2) || 'N/A'}), forms new fleet. Total fleets: ${stack.length}`,
          data: { target, position, speed, cars: sortedCars.map(c => ({...c})), sorted: true, stack: [...stack], fleets: stack.length, current: i, newFleet: true }
        });
      } else {
        steps.push({
          description: `Car ${car.id} is faster (${car.time.toFixed(2)} ≤ ${stack[stack.length - 1].toFixed(2)}), catches up - joins fleet ahead`,
          data: { target, position, speed, cars: sortedCars.map(c => ({...c})), sorted: true, stack: [...stack], fleets: stack.length, current: i, joinsFleet: true }
        });
      }
    }

    steps.push({
      description: `Total car fleets: ${stack.length}`,
      data: { target, position, speed, cars: sortedCars.map(c => ({...c})), sorted: true, stack: [...stack], fleets: stack.length, current: -1, complete: true }
    });

    return steps;
  };