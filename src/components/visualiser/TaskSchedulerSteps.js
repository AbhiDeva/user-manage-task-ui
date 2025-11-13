export  const generateTaskSchedulerSteps = (input) => {
    const { tasks, n } = input;
    const steps = [];

    steps.push({
      description: `Task Scheduler: ${tasks.length} tasks with cooldown n=${n}`,
      data: { tasks, n, freq: {}, schedule: [], phase: 'init' }
    });

    // Count frequency of each task
    const freq = new Map();
    for (let task of tasks) {
      freq.set(task, (freq.get(task) || 0) + 1);
    }

    steps.push({
      description: `Phase 1: Count task frequencies`,
      data: { tasks, n, freq: Object.fromEntries(freq), schedule: [], phase: 'count' }
    });

    const freqObj = Object.fromEntries(freq);
    for (let [task, count] of freq.entries()) {
      steps.push({
        description: `Task ${task}: appears ${count} time(s)`,
        data: { tasks, n, freq: freqObj, schedule: [], phase: 'count', current: task }
      });
    }

    // Find max frequency
    const maxFreq = Math.max(...freq.values());
    const maxCount = Array.from(freq.values()).filter(f => f === maxFreq).length;

    steps.push({
      description: `Phase 2: Find max frequency = ${maxFreq} (${maxCount} task(s) have this frequency)`,
      data: { tasks, n, freq: freqObj, schedule: [], phase: 'maxfreq', maxFreq, maxCount }
    });

    // Calculate intervals
    const partCount = maxFreq - 1;
    const partLength = n - (maxCount - 1);
    const emptySlots = partCount * partLength;
    const availableTasks = tasks.length - maxFreq * maxCount;
    const idles = Math.max(0, emptySlots - availableTasks);

    steps.push({
      description: `Phase 3: Calculate layout`,
      data: { 
        tasks, n, freq: freqObj, schedule: [], phase: 'calculate',
        maxFreq, maxCount, partCount, partLength, emptySlots, availableTasks, idles
      }
    });

    steps.push({
      description: `Parts between max freq tasks: ${partCount}`,
      data: { 
        tasks, n, freq: freqObj, schedule: [], phase: 'calculate',
        maxFreq, maxCount, partCount, partLength, emptySlots, availableTasks, idles,
        explaining: 'partCount'
      }
    });

    steps.push({
      description: `Length of each part: n - (maxCount - 1) = ${n} - ${maxCount - 1} = ${partLength}`,
      data: { 
        tasks, n, freq: freqObj, schedule: [], phase: 'calculate',
        maxFreq, maxCount, partCount, partLength, emptySlots, availableTasks, idles,
        explaining: 'partLength'
      }
    });

    steps.push({
      description: `Empty slots available: ${partCount} × ${partLength} = ${emptySlots}`,
      data: { 
        tasks, n, freq: freqObj, schedule: [], phase: 'calculate',
        maxFreq, maxCount, partCount, partLength, emptySlots, availableTasks, idles,
        explaining: 'emptySlots'
      }
    });

    steps.push({
      description: `Available tasks to fill: ${tasks.length} - ${maxFreq * maxCount} = ${availableTasks}`,
      data: { 
        tasks, n, freq: freqObj, schedule: [], phase: 'calculate',
        maxFreq, maxCount, partCount, partLength, emptySlots, availableTasks, idles,
        explaining: 'availableTasks'
      }
    });

    steps.push({
      description: `Idle slots needed: max(0, ${emptySlots} - ${availableTasks}) = ${idles}`,
      data: { 
        tasks, n, freq: freqObj, schedule: [], phase: 'calculate',
        maxFreq, maxCount, partCount, partLength, emptySlots, availableTasks, idles,
        explaining: 'idles'
      }
    });

    // Build schedule visualization
    const schedule = [];
    const tasksList = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]);
    
    steps.push({
      description: `Phase 4: Build schedule layout`,
      data: { 
        tasks, n, freq: freqObj, schedule: [], phase: 'build',
        maxFreq, maxCount, partCount, partLength, emptySlots, availableTasks, idles
      }
    });

    // Create frames for max frequency tasks
    for (let i = 0; i < maxFreq; i++) {
      for (let j = 0; j < maxCount; j++) {
        schedule.push(tasksList[j][0]);
      }
      if (i < maxFreq - 1) {
        for (let k = 0; k < n - (maxCount - 1); k++) {
          schedule.push('_');
        }
      }
      
      steps.push({
        description: `Frame ${i + 1}: Add max frequency tasks${i < maxFreq - 1 ? ' + cooldown slots' : ''}`,
        data: { 
          tasks, n, freq: freqObj, schedule: [...schedule], phase: 'build',
          maxFreq, maxCount, partCount, partLength, emptySlots, availableTasks, idles,
          frame: i
        }
      });
    }

    // Fill remaining tasks
    let remainingTasks = [];
    for (let [task, count] of tasksList) {
      if (count < maxFreq) {
        for (let i = 0; i < count; i++) {
          remainingTasks.push(task);
        }
      }
    }

    let emptyIdx = 0;
    for (let task of remainingTasks) {
      while (emptyIdx < schedule.length && schedule[emptyIdx] !== '_') {
        emptyIdx++;
      }
      if (emptyIdx < schedule.length) {
        schedule[emptyIdx] = task;
        steps.push({
          description: `Fill slot ${emptyIdx} with task ${task}`,
          data: { 
            tasks, n, freq: freqObj, schedule: [...schedule], phase: 'fill',
            maxFreq, maxCount, partCount, partLength, emptySlots, availableTasks, idles,
            filling: emptyIdx
          }
        });
      }
    }

    // Replace remaining _ with idle
    for (let i = 0; i < schedule.length; i++) {
      if (schedule[i] === '_') {
        schedule[i] = 'idle';
      }
    }

    const totalTime = tasks.length + idles;

    steps.push({
      description: `Complete! Total time: ${tasks.length} tasks + ${idles} idle = ${totalTime}`,
      data: { 
        tasks, n, freq: freqObj, schedule: [...schedule], phase: 'complete',
        maxFreq, maxCount, partCount, partLength, emptySlots, availableTasks, idles,
        totalTime
      }
    });

    return steps;
  };