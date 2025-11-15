export  const generateCanAttendMeetingsSteps = (input) => {
    const steps = [];
    const intervals = [...input.intervals];
    
    steps.push({
      description: 'Can a person attend all meetings? Check if there are any overlapping intervals.',
      data: { original: input.intervals, intervals: [...intervals], phase: 'setup', sorted: false, canAttend: true }
    });

    steps.push({
      description: 'Step 1: Sort meetings by start time',
      data: { original: input.intervals, intervals: [...intervals], phase: 'sorting', sorted: false, canAttend: true }
    });

    intervals.sort((a, b) => a[0] - b[0]);

    steps.push({
      description: `Sorted intervals: ${intervals.map(i => `[${i[0]},${i[1]}]`).join(', ')}`,
      data: { original: input.intervals, intervals: [...intervals], phase: 'sorted', sorted: true, canAttend: true }
    });

    steps.push({
      description: 'Step 2: Check consecutive meetings for overlaps',
      data: { original: input.intervals, intervals: [...intervals], phase: 'checking', sorted: true, canAttend: true, currentIdx: -1 }
    });

    for (let i = 1; i < intervals.length; i++) {
      const prev = intervals[i - 1];
      const curr = intervals[i];

      steps.push({
        description: `Compare: [${prev[0]},${prev[1]}] and [${curr[0]},${curr[1]}]`,
        data: { 
          original: input.intervals, 
          intervals: [...intervals], 
          phase: 'comparing', 
          sorted: true, 
          canAttend: true,
          currentIdx: i,
          prevInterval: prev,
          currInterval: curr
        }
      });

      if (curr[0] < prev[1]) {
        steps.push({
          description: `OVERLAP FOUND! Meeting [${curr[0]},${curr[1]}] starts at ${curr[0]}, but previous meeting ends at ${prev[1]}. Cannot attend all meetings!`,
          data: { 
            original: input.intervals, 
            intervals: [...intervals], 
            phase: 'overlap', 
            sorted: true, 
            canAttend: false,
            currentIdx: i,
            prevInterval: prev,
            currInterval: curr,
            overlapStart: curr[0],
            overlapEnd: prev[1],
            complete: true
          }
        });
        return steps;
      } else {
        steps.push({
          description: `No overlap: Meeting [${curr[0]},${curr[1]}] starts at ${curr[0]} >= previous ends at ${prev[1]}. Continue checking...`,
          data: { 
            original: input.intervals, 
            intervals: [...intervals], 
            phase: 'no-overlap', 
            sorted: true, 
            canAttend: true,
            currentIdx: i,
            prevInterval: prev,
            currInterval: curr
          }
        });
      }
    }

    steps.push({
      description: 'SUCCESS! No overlaps found. Can attend all meetings!',
      data: { 
        original: input.intervals, 
        intervals: [...intervals], 
        phase: 'complete', 
        sorted: true, 
        canAttend: true,
        complete: true
      }
    });

    return steps;
  };