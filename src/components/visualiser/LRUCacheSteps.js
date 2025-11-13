export const generateLRUCacheSteps = (input) => {
    const { capacity, operations } = input;
    const steps = [];
    const cache = new Map();

    steps.push({
      description: `Initialize LRU Cache with capacity ${capacity}`,
      data: { capacity, cache: {}, operations, current: -1, result: null, evicted: null }
    });

    for (let i = 0; i < operations.length; i++) {
      const [op, key, value] = operations[i];

      if (op === 'put') {
        steps.push({
          description: `put(${key}, ${value})`,
          data: { capacity, cache: Object.fromEntries(cache), operations, current: i, operation: 'put', key, value, result: null, evicted: null }
        });

        if (cache.has(key)) {
          cache.delete(key);
          steps.push({
            description: `Key ${key} exists, remove old entry`,
            data: { capacity, cache: Object.fromEntries(cache), operations, current: i, operation: 'put', key, value, result: null, evicted: null, updating: true }
          });
        }

        cache.set(key, value);
        steps.push({
          description: `Add (${key}, ${value}) as most recent`,
          data: { capacity, cache: Object.fromEntries(cache), operations, current: i, operation: 'put', key, value, result: null, evicted: null, added: true }
        });

        if (cache.size > capacity) {
          const evictedKey = cache.keys().next().value;
          cache.delete(evictedKey);
          steps.push({
            description: `Cache full! Evict least recently used: key ${evictedKey}`,
            data: { capacity, cache: Object.fromEntries(cache), operations, current: i, operation: 'put', key, value, result: null, evicted: evictedKey }
          });
        }
      } else {
        steps.push({
          description: `get(${key})`,
          data: { capacity, cache: Object.fromEntries(cache), operations, current: i, operation: 'get', key, result: null, evicted: null }
        });

        if (!cache.has(key)) {
          steps.push({
            description: `Key ${key} not found, return -1`,
            data: { capacity, cache: Object.fromEntries(cache), operations, current: i, operation: 'get', key, result: -1, evicted: null, notFound: true }
          });
        } else {
          const val = cache.get(key);
          cache.delete(key);
          cache.set(key, val);
          steps.push({
            description: `Key ${key} found (value=${val}), move to most recent`,
            data: { capacity, cache: Object.fromEntries(cache), operations, current: i, operation: 'get', key, result: val, evicted: null, found: true }
          });
        }
      }
    }

    steps.push({
      description: `All operations complete`,
      data: { capacity, cache: Object.fromEntries(cache), operations, current: -1, result: null, evicted: null, complete: true }
    });

    return steps;
  };