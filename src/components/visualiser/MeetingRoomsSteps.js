export const generateMeetingRoomsSteps = (input) => {
    const steps = [];
    const intervals = input.intervals;
    
    steps.push({
      description: 'Given meeting intervals [start, end]. Find minimum rooms needed for all meetings.',
      data: { intervals, phase: 'setup', starts: [], ends: [], rooms: 0 }
    });

    const starts = intervals.map(i => i[0]).sort((a,b) => a-b);
    const ends = intervals.map(i => i[1]).sort((a,b) => a-b);

    steps.push({
      description: `Separate and sort start times: [${starts.join(', ')}]`,
      data: { intervals, phase: 'sort-starts', starts, ends: [], rooms: 0 }
    });

    steps.push({
      description: `Separate and sort end times: [${ends.join(', ')}]`,
      data: { intervals, phase: 'sort-ends', starts, ends, rooms: 0 }
    });

    steps.push({
      description: 'Use two pointers: one for starts, one for ends. Track rooms needed.',
      data: { intervals, phase: 'explain', starts, ends, rooms: 0, startPtr: 0, endPtr: 0 }
    });

    let rooms = 0;
    let endPtr = 0;
    const roomAllocations = [];

    for (let i = 0; i < starts.length; i++) {
      const startTime = starts[i];
      const endTime = ends[endPtr];

      steps.push({
        description: `Check: Meeting starts at ${startTime}, earliest ending is at ${endTime}`,
        data: { 
          intervals, 
          phase: 'compare', 
          starts, 
          ends, 
          rooms, 
          startPtr: i, 
          endPtr,
          comparing: { start: startTime, end: endTime },
          roomAllocations: [...roomAllocations]
        }
      });

      if (startTime < endTime) {
        rooms++;
        roomAllocations.push({ start: startTime, room: rooms });
        steps.push({
          description: `${startTime} < ${endTime}: Meeting starts BEFORE earliest one ends. Need NEW room! Total rooms: ${rooms}`,
          data: { 
            intervals, 
            phase: 'allocate', 
            starts, 
            ends, 
            rooms, 
            startPtr: i, 
            endPtr,
            action: 'allocate',
            roomAllocations: [...roomAllocations]
          }
        });
      } else {
        endPtr++;
        roomAllocations.push({ start: startTime, room: 'reuse', reused: endPtr });
        steps.push({
          description: `${startTime} >= ${endTime}: Meeting starts AFTER one ends. REUSE room! Move end pointer to ${endPtr}`,
          data: { 
            intervals, 
            phase: 'reuse', 
            starts, 
            ends, 
            rooms, 
            startPtr: i, 
            endPtr,
            action: 'reuse',
            roomAllocations: [...roomAllocations]
          }
        });
      }
    }

    steps.push({
      description: `Complete! Minimum ${rooms} meeting rooms required for all meetings.`,
      data: { 
        intervals, 
        phase: 'complete', 
        starts, 
        ends, 
        rooms, 
        complete: true,
        roomAllocations
      }
    });

    return steps;
  };