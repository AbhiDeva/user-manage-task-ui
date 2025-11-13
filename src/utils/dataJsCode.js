export const sampleConcepts = {
    'shallow-deep-objects': {
      title: 'Shallow vs Deep Clone - Objects',
      normal: {
        steps: [
          { title: 'Simple Object', desc: 'Flat object with primitives', code: "const original = {\n  name: 'Alice',\n  age: 25\n};" },
          { title: 'Shallow Clone', desc: 'Using spread operator', code: "const shallow = { ...original };\nshallow.name = 'Bob';\n// ✓ Original unchanged", demo: { original: { name: 'Alice', age: 25 }, shallow: { name: 'Bob', age: 25 }, affected: false } },
          { title: 'Nested Object', desc: 'Object contains another object', code: "const original = {\n  name: 'Alice',\n  address: { city: 'NYC' }\n};" },
          { title: 'Problem!', desc: 'Shallow clone shares nested reference', code: "const shallow = { ...original };\nshallow.address.city = 'LA';\n// ✗ Original.address changed too!", demo: { original: { name: 'Alice', address: { city: 'LA' } }, shallow: { name: 'Alice', address: { city: 'LA' } }, affected: true } }
        ]
      },
      medium: {
        steps: [
          { title: 'Shallow Methods', desc: 'Multiple ways to shallow clone', code: "const shallow1 = { ...original };\nconst shallow2 = Object.assign({}, original);\nconst shallow3 = { ...original };" },
          { title: 'Deep Clone Solution', desc: 'Recursively clone nested objects', code: "const deep = JSON.parse(\n  JSON.stringify(original)\n);\ndeep.address.city = 'LA';\n// ✓ Original unchanged", demo: { type: 'deep-success' } },
          { title: 'Visual Comparison', desc: 'Memory references', visual: { type: 'object-memory', shallow: true, deep: true } },
          { title: 'When to Use', desc: 'Choose based on structure', advice: 'Shallow: flat objects, Deep: nested structures' }
        ]
      },
      complex: {
        steps: [
          { title: 'Complex Nested', desc: 'Multiple levels deep', code: "const original = {\n  user: {\n    name: 'Alice',\n    profile: {\n      bio: 'Developer',\n      social: { twitter: '@alice' }\n    }\n  }\n};" },
          { title: 'Shallow Fails', desc: 'Only top level copied', code: "const shallow = { ...original };\nshallow.user.profile.social.twitter = '@bob';\n// All references changed!", demo: { type: 'multi-level-fail' } },
          { title: 'Deep Clone Works', desc: 'All levels independently copied', code: "const deep = structuredClone(original);\ndeep.user.profile.social.twitter = '@bob';\n// ✓ Original untouched" },
          { title: 'Performance Note', desc: 'Trade-offs to consider', example: 'Shallow: O(n) fast, Deep: O(n*m) slower but safe' }
        ]
      }
    },
    'shallow-deep-arrays': {
      title: 'Shallow vs Deep Clone - Arrays',
      normal: {
        steps: [
          { title: 'Simple Array', desc: 'Array of primitives', code: "const original = [1, 2, 3, 4, 5];" },
          { title: 'Shallow Clone Works', desc: 'Primitives are copied by value', code: "const shallow = [...original];\nshallow[0] = 99;\n// ✓ Original unchanged: [1,2,3,4,5]", demo: { original: [1, 2, 3, 4, 5], shallow: [99, 2, 3, 4, 5], affected: false } },
          { title: 'Nested Array', desc: 'Array contains arrays', code: "const original = [\n  [1, 2],\n  [3, 4]\n];" },
          { title: 'Problem!', desc: 'Nested arrays share reference', code: "const shallow = [...original];\nshallow[0][0] = 99;\n// ✗ Original[0][0] also 99!", demo: { original: [[99, 2], [3, 4]], shallow: [[99, 2], [3, 4]], affected: true } }
        ]
      },
      medium: {
        steps: [
          { title: 'Shallow Methods', desc: 'Common array cloning techniques', code: "const shallow1 = [...original];\nconst shallow2 = original.slice();\nconst shallow3 = Array.from(original);\nconst shallow4 = original.concat();" },
          { title: 'Deep Clone Arrays', desc: 'Handle nested arrays', code: "const deep = JSON.parse(\n  JSON.stringify(original)\n);\ndeep[0][0] = 99;\n// ✓ Original unchanged", demo: { type: 'array-deep-success' } },
          { title: 'Visual Array Memory', desc: 'References in memory', visual: { type: 'array-memory', nested: true } },
          { title: 'Map Method', desc: 'Shallow clone each level', code: "const deep = original.map(arr => [...arr]);\n// Works for 2 levels only" }
        ]
      },
      complex: {
        steps: [
          { title: 'Multi-dimensional', desc: '3D array example', code: "const original = [\n  [[1, 2], [3, 4]],\n  [[5, 6], [7, 8]]\n];" },
          { title: 'Shallow Limitation', desc: 'Only first level independent', code: "const shallow = [...original];\nshallow[0][0][0] = 99;\n// Changes propagate up!", visual: { type: 'multidim-fail' } },
          { title: 'Recursive Deep Clone', desc: 'Handle any depth', code: "function deepCloneArray(arr) {\n  return arr.map(item => \n    Array.isArray(item) \n      ? deepCloneArray(item)\n      : item\n  );\n}" },
          { title: 'Modern Solution', desc: 'structuredClone for any depth', code: "const deep = structuredClone(original);\n// ✓ Handles any nesting level" }
        ]
      }
    },
    'shallow-deep-array-objects': {
      title: 'Shallow vs Deep - Array of Objects',
      normal: {
        steps: [
          { title: 'Array of Objects', desc: 'Common data structure', code: "const users = [\n  { id: 1, name: 'Alice' },\n  { id: 2, name: 'Bob' }\n];" },
          { title: 'Shallow Clone Array', desc: 'Array is new, objects are not', code: "const shallow = [...users];\nshallow[0].name = 'Charlie';\n// ✗ Original also changed!", demo: { original: [{ id: 1, name: 'Charlie' }], shallow: [{ id: 1, name: 'Charlie' }], affected: true } },
          { title: 'Why It Fails', desc: 'Objects inside are still references', visual: { type: 'array-obj-ref' } },
          { title: 'Need Deep Clone', desc: 'Clone both array AND objects', code: "const deep = users.map(u => ({...u}));\ndeep[0].name = 'Charlie';\n// ✓ Original unchanged" }
        ]
      },
      medium: {
        steps: [
          { title: 'Common Mistake', desc: 'Spread only clones array', code: "const shallow = [...users];\n// Each user object still shared!" },
          { title: 'One Level Deep', desc: 'Clone array and objects', code: "const deep = users.map(user => ({\n  ...user\n}));\n// ✓ Works for flat objects", demo: { type: 'map-spread' } },
          { title: 'JSON Method', desc: 'Quick deep clone', code: "const deep = JSON.parse(\n  JSON.stringify(users)\n);\n// Works but has limitations" },
          { title: 'Comparison Table', desc: 'Method effectiveness', visual: { type: 'method-table', context: 'array-objects' } }
        ]
      },
      complex: {
        steps: [
          { title: 'Real World Data', desc: 'Objects with nested properties', code: "const users = [\n  {\n    id: 1,\n    name: 'Alice',\n    settings: { theme: 'dark' }\n  }\n];" },
          { title: 'Shallow Map Fails', desc: 'Nested settings still shared', code: "const shallow = users.map(u => ({...u}));\nshallow[0].settings.theme = 'light';\n// ✗ Original changed too!" },
          { title: 'Deep Clone Solution', desc: 'Recursive or structuredClone', code: "const deep = structuredClone(users);\n// OR\nconst deep = users.map(u => ({\n  ...u,\n  settings: {...u.settings}\n}));" },
          { title: 'Performance Tips', desc: 'Choose wisely', example: 'structuredClone: best for complex data\nManual spread: faster for known structure' }
        ]
      }
    },
    'shallow-deep-nested-arrays': {
      title: 'Shallow vs Deep - Nested Array of Objects',
      normal: {
        steps: [
          { title: 'Nested Structure', desc: 'Arrays inside arrays with objects', code: "const data = [\n  [{ id: 1, val: 'A' }],\n  [{ id: 2, val: 'B' }]\n];" },
          { title: 'Triple Problem', desc: 'Three levels of references', visual: { type: 'triple-ref', levels: ['array', 'nested-array', 'object'] } },
          { title: 'Shallow Fails', desc: 'None of the levels are cloned', code: "const shallow = [...data];\nshallow[0][0].val = 'Z';\n// ✗ Original also 'Z'!", demo: { affected: true, levels: 3 } },
          { title: 'Complexity', desc: 'Most challenging to clone', visual: { type: 'complexity-meter', level: 'high' } }
        ]
      },
      medium: {
        steps: [
          { title: 'Level by Level', desc: 'Understanding the depth', code: "[\n  // Level 1: Outer array\n  [\n    // Level 2: Inner array\n    { // Level 3: Object\n      id: 1\n    }\n  ]\n]" },
          { title: 'Partial Clone', desc: 'Clone outer array only', code: "const partial = [...data];\n// Only outer array new\n// Inner arrays + objects shared", visual: { type: 'partial-clone', cloned: 1, shared: 2 } },
          { title: 'Two Level Clone', desc: 'Clone outer and inner arrays', code: "const twoLevel = data.map(arr => [...arr]);\n// Arrays new, objects still shared", visual: { type: 'partial-clone', cloned: 2, shared: 1 } },
          { title: 'Full Deep Clone', desc: 'All three levels independent', code: "const deep = data.map(arr =>\n  arr.map(obj => ({...obj}))\n);\n// ✓ Fully independent" }
        ]
      },
      complex: {
        steps: [
          { title: 'Real Example', desc: 'Nested todo lists', code: "const todoLists = [\n  [\n    { id: 1, task: 'Code', done: false,\n      tags: ['work', 'urgent'] }\n  ],\n  [\n    { id: 2, task: 'Review', done: true,\n      tags: ['work'] }\n  ]\n];" },
          { title: 'Manual Deep Clone', desc: 'Clone everything explicitly', code: "const deep = todoLists.map(list =>\n  list.map(todo => ({\n    ...todo,\n    tags: [...todo.tags]\n  }))\n);\n// ✓ Completely independent" },
          { title: 'structuredClone', desc: 'Easiest solution', code: "const deep = structuredClone(todoLists);\n// Handles all nesting automatically!" },
          { title: 'Best Practices', desc: 'Guidelines for complex data', advice: 'Use structuredClone for unknown depths\nManual for performance-critical code\nJSON for simple serializable data' }
        ]
      }
    },
    'deep-clone': {
      title: 'Deep Clone of Object',
      normal: {
        steps: [
          { title: 'Shallow vs Deep', desc: 'Understanding the difference', code: "const original = { name: 'Alice', age: 25 };\nconst shallow = original;\nshallow.name = 'Bob';\n// Both changed!" },
          { title: 'Reference Copy', desc: 'Shallow copy just copies reference', visual: { type: 'reference', original: { name: 'Alice' }, copy: 'same-ref' } },
          { title: 'Nested Object Problem', desc: 'Nested objects are still references', code: "const obj = { user: { name: 'Alice' } };\nconst copy = { ...obj };\ncopy.user.name = 'Bob';\n// Original changed too!" },
          { title: 'Need Deep Clone', desc: 'Must recursively copy all levels', visual: { type: 'deep', original: { user: { name: 'Alice' } }, copy: 'new-ref' } }
        ]
      },
      medium: {
        steps: [
          { title: 'JSON Method', desc: 'Simple deep clone technique', code: "const original = { a: 1, b: { c: 2 } };\nconst clone = JSON.parse(\n  JSON.stringify(original)\n);" },
          { title: 'JSON Limitations', desc: 'Loses functions, dates, undefined', code: "const obj = {\n  fn: () => {},\n  date: new Date(),\n  undef: undefined\n};\n// All lost with JSON!" },
          { title: 'Structured Clone', desc: 'Modern browser API', code: "const clone = structuredClone(original);\n// Handles dates, maps, sets!" },
          { title: 'Visual Compare', desc: 'Original vs Clone are independent', visual: { type: 'independent', original: { a: 1, b: { c: 2 } }, clone: { a: 1, b: { c: 2 } }, independent: true } }
        ]
      },
      complex: {
        steps: [
          { title: 'Recursive Function', desc: 'Custom deep clone implementation', code: "function deepClone(obj) {\n  if (obj === null || typeof obj !== 'object')\n    return obj;\n  \n  const clone = Array.isArray(obj) ? [] : {};\n  \n  for (let key in obj) {\n    clone[key] = deepClone(obj[key]);\n  }\n  \n  return clone;\n}" },
          { title: 'Handle Special Cases', desc: 'Dates, RegExp, Maps, Sets', code: "if (obj instanceof Date)\n  return new Date(obj);\nif (obj instanceof RegExp)\n  return new RegExp(obj);\nif (obj instanceof Map)\n  return new Map(obj);\nif (obj instanceof Set)\n  return new Set(obj);" },
          { title: 'Circular References', desc: 'Prevent infinite loops', code: "function deepClone(obj, seen = new WeakMap()) {\n  if (seen.has(obj)) return seen.get(obj);\n  \n  const clone = {};\n  seen.set(obj, clone);\n  // ... continue cloning\n}" },
          { title: 'Libraries', desc: 'Production-ready solutions', example: 'Lodash _.cloneDeep(), Ramda R.clone()' }
        ]
      }
    },
    'throttling': {
      title: 'Throttling',
      normal: {
        steps: [
          { title: 'The Problem', desc: 'Function called too frequently', code: "window.addEventListener('scroll', () => {\n  console.log('Scrolling!');\n  // Called 100s of times!\n});" },
          { title: 'What is Throttling?', desc: 'Limit function execution rate', visual: { type: 'timeline', events: ['call', 'call', 'call', 'call'], executed: [true, false, false, true], label: 'Execute once per interval' } },
          { title: 'Basic Throttle', desc: 'Allow execution every X milliseconds', code: "function throttle(func, delay) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastCall >= delay) {\n      lastCall = now;\n      func(...args);\n    }\n  };\n}" },
          { title: 'Usage', desc: 'Wrap your function', code: "const throttledScroll = throttle(() => {\n  console.log('Scrolling!');\n}, 1000);\n\nwindow.addEventListener('scroll', throttledScroll);" }
        ]
      },
      medium: {
        steps: [
          { title: 'Visual Timeline', desc: '1000ms throttle interval', visual: { type: 'throttle-timeline', interval: 1000, calls: [0, 200, 400, 600, 800, 1000, 1200], executed: [0, 1000, 1200] } },
          { title: 'Leading Edge', desc: 'Execute immediately on first call', code: "const throttled = throttle(fn, 1000);\n// First call: executes immediately\n// Next calls: wait for interval", demo: { type: 'leading' } },
          { title: 'Trailing Edge', desc: 'Execute after interval ends', code: "function throttle(func, delay, trailing = true) {\n  let timeout, lastCall = 0;\n  // Execute after last call + delay\n}", demo: { type: 'trailing' } },
          { title: 'Real Use Cases', desc: 'When to use throttling', example: 'Scroll events, Window resize, Mouse move, API rate limiting' }
        ]
      },
      complex: {
        steps: [
          { title: 'Advanced Throttle', desc: 'Leading + Trailing options', code: "function throttle(func, delay, options = {}) {\n  let timeout, lastCall = 0;\n  const { leading = true, trailing = true } = options;\n  \n  return function(...args) {\n    const now = Date.now();\n    const remaining = delay - (now - lastCall);\n    \n    if (remaining <= 0 || remaining > delay) {\n      if (timeout) {\n        clearTimeout(timeout);\n        timeout = null;\n      }\n      if (leading) {\n        lastCall = now;\n        func.apply(this, args);\n      }\n    } else if (!timeout && trailing) {\n      timeout = setTimeout(() => {\n        lastCall = Date.now();\n        timeout = null;\n        func.apply(this, args);\n      }, remaining);\n    }\n  };\n}" },
          { title: 'Performance Impact', desc: 'Before vs After throttling', visual: { type: 'performance', before: 1000, after: 10 } },
          { title: 'Cancel Throttle', desc: 'Stop pending executions', code: "const throttled = throttle(fn, 1000);\nthrottled.cancel = function() {\n  clearTimeout(timeout);\n};" },
          { title: 'Lodash Implementation', desc: 'Production-ready solution', example: '_.throttle(func, wait, {leading: true, trailing: true})' }
        ]
      }
    },
    'debouncing': {
      title: 'Debouncing',
      normal: {
        steps: [
          { title: 'The Problem', desc: 'User types fast, API called too much', code: "input.addEventListener('input', (e) => {\n  searchAPI(e.target.value);\n  // Called on every keystroke!\n});" },
          { title: 'What is Debouncing?', desc: 'Wait until user stops typing', visual: { type: 'timeline', events: ['k', 'e', 'y', 's'], executed: [false, false, false, true], label: 'Execute after quiet period' } },
          { title: 'Basic Debounce', desc: 'Delay execution until pause', code: "function debounce(func, delay) {\n  let timeout;\n  return function(...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => {\n      func.apply(this, args);\n    }, delay);\n  };\n}" },
          { title: 'Usage', desc: 'Wrap your function', code: "const debouncedSearch = debounce((query) => {\n  searchAPI(query);\n}, 500);\n\ninput.addEventListener('input', (e) => {\n  debouncedSearch(e.target.value);\n});" }
        ]
      },
      medium: {
        steps: [
          { title: 'Visual Timeline', desc: '500ms debounce delay', visual: { type: 'debounce-timeline', delay: 500, calls: [0, 100, 200, 300, 400, 700], executed: [1200] } },
          { title: 'Timer Reset', desc: 'Each call resets the timer', demo: { type: 'timer-reset', resets: [0, 100, 200, 300], final: 800 } },
          { title: 'Immediate Mode', desc: 'Execute on leading edge', code: "function debounce(func, delay, immediate) {\n  let timeout;\n  return function(...args) {\n    const callNow = immediate && !timeout;\n    clearTimeout(timeout);\n    timeout = setTimeout(() => {\n      timeout = null;\n      if (!immediate) func.apply(this, args);\n    }, delay);\n    if (callNow) func.apply(this, args);\n  };\n}" },
          { title: 'Use Cases', desc: 'When to use debouncing', example: 'Search input, Form validation, Auto-save, Window resize' }
        ]
      },
      complex: {
        steps: [
          { title: 'Advanced Debounce', desc: 'Max wait option', code: "function debounce(func, wait, options = {}) {\n  let timeout, maxTimeout;\n  const { maxWait, leading = false } = options;\n  \n  return function(...args) {\n    const later = () => {\n      timeout = null;\n      if (maxTimeout) clearTimeout(maxTimeout);\n      func.apply(this, args);\n    };\n    \n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n    \n    if (maxWait && !maxTimeout) {\n      maxTimeout = setTimeout(() => {\n        clearTimeout(timeout);\n        later();\n      }, maxWait);\n    }\n  };\n}" },
          { title: 'Debounce vs Throttle', desc: 'Key differences', visual: { type: 'comparison', debounce: 'Waits for pause', throttle: 'Executes at intervals' } },
          { title: 'Cancel & Flush', desc: 'Control pending calls', code: "const debounced = debounce(fn, 1000);\ndebounced.cancel(); // Cancel pending\ndebounced.flush();  // Execute immediately" },
          { title: 'Performance Gains', desc: 'Real-world impact', example: 'Search: 100 calls → 1 call\nResize: 500 calls → 1 call' }
        ]
      }
    },
    'promises': {
      title: 'Promises',
      normal: {
        steps: [
          { title: 'What is a Promise?', desc: 'Represents future value', code: "const promise = new Promise((resolve, reject) => {\n  // Async operation\n  setTimeout(() => {\n    resolve('Success!');\n  }, 1000);\n});" },
          { title: 'Three States', desc: 'Promise lifecycle', visual: { type: 'promise-states', states: ['Pending', 'Fulfilled', 'Rejected'] } },
          { title: 'Using Promises', desc: 'then() and catch()', code: "promise\n  .then(result => {\n    console.log(result); // 'Success!'\n  })\n  .catch(error => {\n    console.error(error);\n  });" },
          { title: 'Chaining', desc: 'Sequential async operations', code: "fetchUser()\n  .then(user => fetchPosts(user.id))\n  .then(posts => console.log(posts))\n  .catch(error => console.error(error));" }
        ]
      },
      medium: {
        steps: [
          { title: 'Promise Flow', desc: 'State transitions', visual: { type: 'promise-flow', from: 'Pending', to: 'Fulfilled', value: 'data' } },
          { title: 'Creating Promises', desc: 'Wrapping async code', code: "function fetchData(url) {\n  return new Promise((resolve, reject) => {\n    fetch(url)\n      .then(res => res.json())\n      .then(data => resolve(data))\n      .catch(err => reject(err));\n  });\n}" },
          { title: 'Promise.resolve', desc: 'Create resolved promise', code: "const promise = Promise.resolve(42);\n// Immediately fulfilled with value 42\n\nconst promise2 = Promise.reject('Error');\n// Immediately rejected" },
          { title: 'Finally', desc: 'Cleanup regardless of outcome', code: "promise\n  .then(data => process(data))\n  .catch(err => handle(err))\n  .finally(() => {\n    // Always runs\n    cleanup();\n  });" }
        ]
      },
      complex: {
        steps: [
          { title: 'Error Handling', desc: 'Catch at any level', code: "promise1\n  .then(data => {\n    throw new Error('Oops');\n    return promise2; // Skipped\n  })\n  .then(data => { /* Skipped */ })\n  .catch(error => {\n    console.error(error); // Catches error\n  });" },
          { title: 'Race Conditions', desc: 'Promise.race()', code: "Promise.race([\n  fetch('/api/fast'),\n  fetch('/api/slow')\n])\n.then(result => {\n  // First to complete wins\n});", visual: { type: 'race' } },
          { title: 'Promise Chain', desc: 'Return values flow through', code: "Promise.resolve(1)\n  .then(x => x + 1)    // 2\n  .then(x => x * 2)    // 4\n  .then(x => x ** 2)   // 16\n  .then(x => console.log(x));" },
          { title: 'Anti-patterns', desc: 'Common mistakes', example: 'Nested promises, Not returning promises, Forgetting .catch()' }
        ]
      }
    },
    'async-await': {
      title: 'Async/Await',
      normal: {
        steps: [
          { title: 'What is Async/Await?', desc: 'Syntactic sugar over promises', code: "// Promise way\nfetchData()\n  .then(data => console.log(data));\n\n// Async/Await way\nconst data = await fetchData();\nconsole.log(data);" },
          { title: 'Async Function', desc: 'Always returns a promise', code: "async function getData() {\n  return 'Hello';\n}\n// Same as:\nfunction getData() {\n  return Promise.resolve('Hello');\n}" },
          { title: 'Await Keyword', desc: 'Pause until promise resolves', code: "async function fetchUser() {\n  const response = await fetch('/api/user');\n  const data = await response.json();\n  return data;\n}", visual: { type: 'await-pause' } },
          { title: 'Sequential Execution', desc: 'One after another', code: "async function process() {\n  const user = await fetchUser();    // Wait\n  const posts = await fetchPosts();  // Then wait\n  return { user, posts };\n}" }
        ]
      },
      medium: {
        steps: [
          { title: 'Error Handling', desc: 'Use try/catch with await', code: "async function getData() {\n  try {\n    const data = await fetch('/api');\n    return data;\n  } catch (error) {\n    console.error('Failed:', error);\n  }\n}" },
          { title: 'Parallel Execution', desc: 'Run multiple awaits together', code: "async function getData() {\n  // Sequential (slow)\n  const user = await fetchUser();\n  const posts = await fetchPosts();\n  \n  // Parallel (fast)\n  const [user, posts] = await Promise.all([\n    fetchUser(),\n    fetchPosts()\n  ]);\n}", visual: { type: 'parallel-vs-sequential' } },
          { title: 'Top-level Await', desc: 'Modern JavaScript feature', code: "// In ES modules\nconst data = await fetch('/api');\n\n// No need to wrap in async function!" },
          { title: 'Async Loops', desc: 'Iterate over promises', code: "async function processItems(items) {\n  for (const item of items) {\n    await processItem(item);\n  }\n}" }
        ]
      },
      complex: {
        steps: [
          { title: 'Concurrent Processing', desc: 'Balance between sequential and parallel', code: "async function processInBatches(items, batchSize) {\n  for (let i = 0; i < items.length; i += batchSize) {\n    const batch = items.slice(i, i + batchSize);\n    await Promise.all(\n      batch.map(item => processItem(item))\n    );\n  }\n}" },
          { title: 'Early Return', desc: 'Await in conditionals', code: "async function getData(useCache) {\n  if (useCache) {\n    const cached = await getFromCache();\n    if (cached) return cached;\n  }\n  return await fetchFromAPI();\n}" },
          { title: 'Async IIFE', desc: 'Immediately invoked async function', code: "(async () => {\n  const data = await fetchData();\n  console.log(data);\n})();" },
          { title: 'Best Practices', desc: 'Guidelines', advice: 'Use Promise.all for parallel ops\nAvoid await in loops unless needed\nAlways handle errors with try/catch' }
        ]
      }
    },
    'try-catch': {
      title: 'Try/Catch Error Handling',
      normal: {
        steps: [
          { title: 'Basic Try/Catch', desc: 'Handle runtime errors', code: "try {\n  const data = JSON.parse(invalidJSON);\n  console.log(data);\n} catch (error) {\n  console.error('Parse failed:', error);\n}" },
          { title: 'Error Object', desc: 'Catch provides error details', code: "catch (error) {\n  console.log(error.name);    // 'SyntaxError'\n  console.log(error.message); // Description\n  console.log(error.stack);   // Stack trace\n}", visual: { type: 'error-object' } },
          { title: 'Finally Block', desc: 'Always executes', code: "try {\n  openFile();\n  processFile();\n} catch (error) {\n  handleError(error);\n} finally {\n  closeFile(); // Always runs\n}" },
          { title: 'Flow Control', desc: 'How execution flows', visual: { type: 'try-catch-flow' } }
        ]
      },
      medium: {
        steps: [
          { title: 'Nested Try/Catch', desc: 'Multiple error handlers', code: "try {\n  try {\n    riskyOperation();\n  } catch (innerError) {\n    // Handle specific error\n    throw innerError; // Re-throw if needed\n  }\n} catch (outerError) {\n  // Handle any error\n}" },
          { title: 'Specific Error Types', desc: 'Catch different errors differently', code: "try {\n  operation();\n} catch (error) {\n  if (error instanceof TypeError) {\n    // Handle type error\n  } else if (error instanceof RangeError) {\n    // Handle range error\n  } else {\n    // Handle others\n  }\n}" },
          { title: 'Async Try/Catch', desc: 'Works with async/await', code: "async function fetchData() {\n  try {\n    const response = await fetch('/api');\n    return await response.json();\n  } catch (error) {\n    console.error('Fetch failed:', error);\n    return null;\n  }\n}" },
          { title: 'Custom Errors', desc: 'Create your own error types', code: "class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = 'ValidationError';\n  }\n}\n\nthrow new ValidationError('Invalid input');" }
        ]
      },
      complex: {
        steps: [
          { title: 'Error Boundaries', desc: 'Component-level error handling', code: "class ErrorBoundary {\n  try {\n    return component.render();\n  } catch (error) {\n    return <ErrorFallback error={error} />;\n  }\n}" },
          { title: 'Global Error Handler', desc: 'Catch unhandled errors', code: "window.addEventListener('error', (event) => {\n  console.error('Global error:', event.error);\n  sendToLogging(event.error);\n});\n\nwindow.addEventListener('unhandledrejection', (event) => {\n  console.error('Unhandled promise:', event.reason);\n});" },
          { title: 'Retry Logic', desc: 'Try operation multiple times', code: "async function retry(fn, maxAttempts = 3) {\n  for (let i = 0; i < maxAttempts; i++) {\n    try {\n      return await fn();\n    } catch (error) {\n      if (i === maxAttempts - 1) throw error;\n      await sleep(1000 * (i + 1));\n    }\n  }\n}" },
          { title: 'Best Practices', desc: 'Error handling guidelines', advice: 'Catch specific errors\nLog with context\nDon\'t catch if you can\'t handle\nUse finally for cleanup' }
        ]
      }
    },
    'promise-all-vs-settled': {
      title: 'Promise.all vs Promise.allSettled',
      normal: {
        steps: [
          { title: 'Promise.all', desc: 'Fails if ANY promise rejects', code: "const promises = [\n  fetch('/api/user'),\n  fetch('/api/posts'),\n  fetch('/api/comments')\n];\n\nPromise.all(promises)\n  .then(results => {\n    // All succeeded\n  })\n  .catch(error => {\n    // One failed, stops here\n  });" },
          { title: 'The Problem', desc: 'One failure stops everything', visual: { type: 'promise-all-fail', promises: [true, false, true], result: 'rejected' } },
          { title: 'Promise.allSettled', desc: 'Waits for ALL to complete', code: "Promise.allSettled(promises)\n  .then(results => {\n    // All finished (success or fail)\n    results.forEach(result => {\n      if (result.status === 'fulfilled') {\n        console.log(result.value);\n      } else {\n        console.log(result.reason);\n      }\n    });\n  });" },
          { title: 'Key Difference', desc: 'Handling failures', visual: { type: 'comparison-basic' } }
        ]
      },
      medium: {
        steps: [
          { title: 'Promise.all Behavior', desc: 'Short-circuits on first rejection', code: "Promise.all([\n  Promise.resolve('A'),\n  Promise.reject('Error!'),\n  Promise.resolve('C') // Never checked\n])\n.catch(error => {\n  console.log(error); // 'Error!'\n});", visual: { type: 'short-circuit' } },
          { title: 'allSettled Response', desc: 'Array of result objects', code: "Promise.allSettled([\n  Promise.resolve('A'),\n  Promise.reject('Error!'),\n  Promise.resolve('C')\n])\n.then(results => {\n  // [\n  //   {status: 'fulfilled', value: 'A'},\n  //   {status: 'rejected', reason: 'Error!'},\n  //   {status: 'fulfilled', value: 'C'}\n  // ]\n});" },
          { title: 'Use Cases Comparison', desc: 'When to use which', visual: { type: 'use-case-table' } },
          { title: 'Real Example', desc: 'Multiple API calls', code: "// Use all: Need ALL data\nPromise.all([fetchUser(), fetchPosts()])\n\n// Use allSettled: Partial data OK\nPromise.allSettled([fetchUser(), fetchPosts()])" }
        ]
      },
      complex: {
        steps: [
          { title: 'Error Recovery', desc: 'Handle mixed results', code: "const results = await Promise.allSettled([\n  fetchUser(),\n  fetchPosts(),\n  fetchComments()\n]);\n\nconst successful = results\n  .filter(r => r.status === 'fulfilled')\n  .map(r => r.value);\n\nconst failed = results\n  .filter(r => r.status === 'rejected')\n  .map(r => r.reason);\n\nif (failed.length > 0) {\n  logErrors(failed);\n}\n\nreturn successful;" },
          { title: 'Promise.any', desc: 'First successful promise', code: "Promise.any([\n  fetch('/api/server1'),\n  fetch('/api/server2'),\n  fetch('/api/server3')\n])\n.then(firstSuccess => {\n  // Use fastest successful response\n});\n// Rejects only if ALL fail", visual: { type: 'promise-any' } },
          { title: 'Promise.race', desc: 'First completed (success or fail)', code: "Promise.race([\n  fetch('/api'),\n  timeout(5000)\n])\n.then(result => {\n  // Whichever finishes first\n});", visual: { type: 'promise-race' } },
          { title: 'Comparison Table', desc: 'All promise combinators', visual: { type: 'full-comparison-table' } }
        ]
      }
    },
    'call-bind-apply': {
      title: 'Call, Bind & Apply',
      normal: {
        steps: [
          { title: 'Setup', desc: 'Create an object and a function', code: "const person = { name: 'Alice' };\nfunction greet() { return `Hi ${this.name}`; }" },
          { title: 'Call', desc: 'call() invokes immediately with "this"', code: "greet.call(person); // 'Hi Alice'", highlight: 'person' },
          { title: 'Apply', desc: 'apply() invokes immediately with array args', code: "greet.apply(person, []); // 'Hi Alice'", highlight: 'person' },
          { title: 'Bind', desc: 'bind() returns new function with bound "this"', code: "const boundGreet = greet.bind(person);\nboundGreet(); // 'Hi Alice'", highlight: 'person' }
        ]
      },
      medium: {
        steps: [
          { title: 'Setup', desc: 'Function with parameters', code: "function introduce(age, city) {\n  return `${this.name}, ${age}, ${city}`;\n}" },
          { title: 'Call with args', desc: 'Pass arguments one by one', code: "introduce.call(person, 25, 'NYC');\n// 'Alice, 25, NYC'", highlight: '25, NYC' },
          { title: 'Apply with array', desc: 'Pass arguments as array', code: "introduce.apply(person, [25, 'NYC']);\n// 'Alice, 25, NYC'", highlight: '[25, NYC]' },
          { title: 'Bind with args', desc: 'Partial application possible', code: "const intro = introduce.bind(person, 25);\nintro('NYC'); // 'Alice, 25, NYC'", highlight: '25' }
        ]
      },
      complex: {
        steps: [
          { title: 'Setup', desc: 'Method borrowing scenario', code: "const calc = {\n  multiply: function(a, b) {\n    return a * b * this.factor;\n  }\n};" },
          { title: 'Borrow method', desc: 'Use another object\'s method', code: "const obj = { factor: 10 };\ncalc.multiply.call(obj, 2, 3);\n// 60", highlight: 'obj' },
          { title: 'Function currying', desc: 'Create specialized functions', code: "const double = calc.multiply.bind({factor: 2});\ndouble(5, 1); // 10", highlight: 'bind' },
          { title: 'Real use case', desc: 'Array methods on NodeList', code: "const nodes = document.querySelectorAll('div');\n[].forEach.call(nodes, node => {...});", highlight: 'call' }
        ]
      }
    },
    'event-bubbling': {
      title: 'Event Bubbling',
      normal: {
        steps: [
          { title: 'DOM Structure', desc: 'Nested elements', dom: ['grandparent', 'parent', 'child'] },
          { title: 'Click Child', desc: 'User clicks the innermost element', dom: ['grandparent', 'parent', 'child'], active: 'child' },
          { title: 'Bubble to Parent', desc: 'Event bubbles up to parent', dom: ['grandparent', 'parent', 'child'], active: 'parent', prev: 'child' },
          { title: 'Bubble to Grandparent', desc: 'Event continues to grandparent', dom: ['grandparent', 'parent', 'child'], active: 'grandparent', prev: 'parent' }
        ]
      },
      medium: {
        steps: [
          { title: 'Setup Listeners', desc: 'Add event listeners to all', dom: ['grandparent', 'parent', 'child'], listeners: true },
          { title: 'Click & Log', desc: 'All listeners execute bottom-up', dom: ['grandparent', 'parent', 'child'], active: 'child', log: ['Child clicked'] },
          { title: 'Parent Handler', desc: 'Parent listener executes', dom: ['grandparent', 'parent', 'child'], active: 'parent', log: ['Child clicked', 'Parent clicked'] },
          { title: 'Complete Bubble', desc: 'Grandparent completes the chain', dom: ['grandparent', 'parent', 'child'], active: 'grandparent', log: ['Child clicked', 'Parent clicked', 'Grandparent clicked'] }
        ]
      },
      complex: {
        steps: [
          { title: 'stopPropagation()', desc: 'Prevent bubbling', code: "child.addEventListener('click', (e) => {\n  e.stopPropagation();\n});" },
          { title: 'Click with Stop', desc: 'Only child handler executes', dom: ['grandparent', 'parent', 'child'], active: 'child', stopped: true, log: ['Child clicked'] },
          { title: 'Event Delegation', desc: 'Efficient pattern for dynamic elements', code: "parent.addEventListener('click', (e) => {\n  if (e.target.matches('.child')) {...}\n});" },
          { title: 'Benefits', desc: 'Less memory, handles dynamic content', dom: ['grandparent', 'parent', 'child', 'child', 'child'], listeners: 'parent-only' }
        ]
      }
    },
    'event-capturing': {
      title: 'Event Capturing',
      normal: {
        steps: [
          { title: 'DOM Structure', desc: 'Same nested structure', dom: ['grandparent', 'parent', 'child'] },
          { title: 'Capture Phase', desc: 'Event travels DOWN from root', dom: ['grandparent', 'parent', 'child'], active: 'grandparent', direction: 'down' },
          { title: 'Through Parent', desc: 'Continues downward', dom: ['grandparent', 'parent', 'child'], active: 'parent', prev: 'grandparent', direction: 'down' },
          { title: 'Reach Target', desc: 'Arrives at clicked element', dom: ['grandparent', 'parent', 'child'], active: 'child', prev: 'parent' }
        ]
      },
      medium: {
        steps: [
          { title: 'Enable Capturing', desc: 'Third parameter: true', code: "element.addEventListener('click', handler, true);" },
          { title: 'Full Event Flow', desc: '3 phases: Capture → Target → Bubble', dom: ['grandparent', 'parent', 'child'], phases: true },
          { title: 'Capture Listeners', desc: 'Execute top-down', dom: ['grandparent', 'parent', 'child'], active: 'grandparent', log: ['Grandparent (capture)'] },
          { title: 'Then Bubbling', desc: 'After target, bubble up', dom: ['grandparent', 'parent', 'child'], active: 'parent', log: ['Grandparent (capture)', 'Parent (capture)', 'Child', 'Parent (bubble)'] }
        ]
      },
      complex: {
        steps: [
          { title: 'Mixed Listeners', desc: 'Some capture, some bubble', code: "gp.addEventListener('click', h1, true); // capture\nparent.addEventListener('click', h2); // bubble" },
          { title: 'Execution Order', desc: 'Capture first, then bubble', dom: ['grandparent', 'parent', 'child'], order: ['GP(capture)', 'P(capture)', 'Child', 'P(bubble)', 'GP(bubble)'] },
          { title: 'stopPropagation', desc: 'Works in both phases', code: "e.stopPropagation(); // stops current phase" },
          { title: 'Use Cases', desc: 'Intercept before children handle', example: 'Form validation, modal overlays' }
        ]
      }
    },
    'call-stack': {
      title: 'Call Stack',
      normal: {
        steps: [
          { title: 'Empty Stack', desc: 'Program starts', stack: [] },
          { title: 'Function Call', desc: 'first() is called', stack: ['first()'], code: "function first() { second(); }\nfirst();" },
          { title: 'Nested Call', desc: 'second() is called from first()', stack: ['first()', 'second()'], code: "function second() { console.log('Hi'); }" },
          { title: 'Stack Unwinds', desc: 'Functions complete and pop off', stack: ['first()'], then: [] }
        ]
      },
      medium: {
        steps: [
          { title: 'Multiple Calls', desc: 'Tracking execution order', stack: [], code: "function a() { b(); c(); }\nfunction b() {}\nfunction c() {}\na();" },
          { title: 'Push a()', desc: 'a() added to stack', stack: ['a()'] },
          { title: 'Push b()', desc: 'b() called from a()', stack: ['a()', 'b()'] },
          { title: 'Pop b(), Push c()', desc: 'b() completes, c() called', stack: ['a()', 'c()'] },
          { title: 'Stack Clears', desc: 'All functions complete', stack: [] }
        ]
      },
      complex: {
        steps: [
          { title: 'Recursion', desc: 'Function calls itself', code: "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n-1);\n}\nfactorial(3);" },
          { title: 'Stack Builds', desc: 'Multiple frames accumulate', stack: ['factorial(3)', 'factorial(2)', 'factorial(1)'] },
          { title: 'Base Case', desc: 'Recursion stops', stack: ['factorial(3)', 'factorial(2)', 'factorial(1) → 1'] },
          { title: 'Stack Unwinds', desc: 'Return values propagate up', stack: ['factorial(3)', 'factorial(2) → 2'], then: ['factorial(3) → 6'] },
          { title: 'Stack Overflow', desc: 'Too many frames = error', error: 'Maximum call stack size exceeded' }
        ]
      }
    },
    'hoisting': {
      title: 'Hoisting',
      normal: {
        steps: [
          { title: 'Code Written', desc: 'How you write it', code: "console.log(x);\nvar x = 5;\nconsole.log(x);" },
          { title: 'Declaration Hoisted', desc: 'How JS interprets it', code: "var x; // hoisted to top\nconsole.log(x); // undefined\nx = 5;\nconsole.log(x); // 5" },
          { title: 'Function Hoisting', desc: 'Entire function hoisted', code: "greet(); // works!\nfunction greet() { return 'Hi'; }" },
          { title: 'Result', desc: 'Declaration moves up, not assignment', output: 'undefined, then 5' }
        ]
      },
      medium: {
        steps: [
          { title: 'let & const', desc: 'Temporal Dead Zone (TDZ)', code: "console.log(y); // ReferenceError\nlet y = 10;" },
          { title: 'TDZ Explained', desc: 'Hoisted but not initialized', zone: 'TDZ', code: "// TDZ starts\n// console.log(y); ← Error\nlet y = 10; // TDZ ends" },
          { title: 'Function Expression', desc: 'Not hoisted like declarations', code: "sayHi(); // TypeError\nvar sayHi = function() { return 'Hi'; };" },
          { title: 'Why Error?', desc: 'Variable hoisted, function not', code: "var sayHi; // hoisted\nsayHi(); // undefined is not a function\nsayHi = function() {...};" }
        ]
      },
      complex: {
        steps: [
          { title: 'Mixed Scenario', desc: 'var, let, const, functions', code: "console.log(a, b, c);\nvar a = 1;\nlet b = 2;\nconst c = 3;" },
          { title: 'Execution Context', desc: 'Memory allocation phase', phase: 'Creation', code: "var a = undefined; // hoisted\n// b, c in TDZ\nfunction declarations fully hoisted" },
          { title: 'Class Hoisting', desc: 'Classes are NOT hoisted', code: "const obj = new MyClass(); // Error\nclass MyClass {}" },
          { title: 'Best Practice', desc: 'Always declare at top', advice: 'Use let/const, declare before use' }
        ]
      }
    }
  };