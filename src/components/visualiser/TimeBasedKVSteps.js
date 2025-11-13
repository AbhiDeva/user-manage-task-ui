export const generateTimeBasedKVSteps = (operations) => {
    const steps = [];
    const store = new Map();

    steps.push({
      description: `Time-Based Key-Value Store: Initialize`,
      data: { store: {}, operations, current: -1, result: null }
    });

    for (let i = 0; i < operations.length; i++) {
      const op = operations[i];
      
      if (op[0] === 'set') {
        const [_, key, value, timestamp] = op;
        
        steps.push({
          description: `set("${key}", "${value}", ${timestamp})`,
          data: { store: Object.fromEntries(Array.from(store.entries()).map(([k, v]) => [k, [...v]])), operations, current: i, operation: 'set', key, value, timestamp }
        });

        if (!store.has(key)) {
          store.set(key, []);
        }
        store.get(key).push([timestamp, value]);

        steps.push({
          description: `Stored: "${key}" → "${value}" at time ${timestamp}`,
          data: { store: Object.fromEntries(Array.from(store.entries()).map(([k, v]) => [k, [...v]])), operations, current: i, operation: 'set', key, value, timestamp, stored: true }
        });
      } else {
        const [_, key, timestamp] = op;
        
        steps.push({
          description: `get("${key}", ${timestamp})`,
          data: { store: Object.fromEntries(Array.from(store.entries()).map(([k, v]) => [k, [...v]])), operations, current: i, operation: 'get', key, timestamp, searching: true }
        });

        if (!store.has(key)) {
          steps.push({
            description: `Key "${key}" not found, return ""`,
            data: { store: Object.fromEntries(Array.from(store.entries()).map(([k, v]) => [k, [...v]])), operations, current: i, operation: 'get', key, timestamp, result: '' }
          });
          continue;
        }

        const values = store.get(key);
        let left = 0, right = values.length - 1;
        let result = "";

        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          
          steps.push({
            description: `Binary search: check timestamp ${values[mid][0]} at index ${mid}`,
            data: { store: Object.fromEntries(Array.from(store.entries()).map(([k, v]) => [k, [...v]])), operations, current: i, operation: 'get', key, timestamp, left, right, mid, values: [...values] }
          });

          if (values[mid][0] <= timestamp) {
            result = values[mid][1];
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }

        steps.push({
          description: `Found: "${result}" (latest value at or before time ${timestamp})`,
          data: { store: Object.fromEntries(Array.from(store.entries()).map(([k, v]) => [k, [...v]])), operations, current: i, operation: 'get', key, timestamp, result }
        });
      }
    }

    steps.push({
      description: `All operations complete`,
      data: { store: Object.fromEntries(Array.from(store.entries()).map(([k, v]) => [k, [...v]])), operations, current: -1, complete: true }
    });

    return steps;
  };