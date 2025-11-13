export  const generateKokoEatingBananasSteps = (input) => {
    const { piles, h } = input;
    const steps = [];
    let left = 1, right = Math.max(...piles);

    steps.push({
      description: `Find minimum eating speed: piles=[${piles.join(', ')}], h=${h} hours`,
      data: { piles, h, left, right, mid: -1, hours: 0, minSpeed: -1 }
    });

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      let hours = 0;

      steps.push({
        description: `Try speed k=${mid} bananas/hour`,
        data: { piles, h, left, right, mid, hours: 0, minSpeed: -1, trying: true }
      });

      for (let i = 0; i < piles.length; i++) {
        const timeForPile = Math.ceil(piles[i] / mid);
        hours += timeForPile;

        steps.push({
          description: `Pile ${i} (${piles[i]} bananas): ⌈${piles[i]}/${mid}⌉ = ${timeForPile} hours, total=${hours}`,
          data: { piles, h, left, right, mid, hours, minSpeed: -1, currentPile: i, timeForPile }
        });
      }

      steps.push({
        description: `Total: ${hours} hours. ${hours <= h ? `✓ Feasible` : `✗ Too slow`}`,
        data: { piles, h, left, right, mid, hours, minSpeed: -1, feasible: hours <= h }
      });

      if (hours <= h) {
        steps.push({
          description: `k=${mid} works, try slower (search left)`,
          data: { piles, h, left, right: mid, mid, hours, minSpeed: -1, direction: 'left' }
        });
        right = mid;
      } else {
        steps.push({
          description: `k=${mid} too slow, need faster (search right)`,
          data: { piles, h, left: mid + 1, right, mid, hours, minSpeed: -1, direction: 'right' }
        });
        left = mid + 1;
      }
    }

    steps.push({
      description: `Minimum eating speed: ${left} bananas/hour`,
      data: { piles, h, left, right, mid: -1, hours: 0, minSpeed: left, complete: true }
    });

    return steps;
  };