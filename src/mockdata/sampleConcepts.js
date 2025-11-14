const concepts = {
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
    'closures': {
      title: 'Closures',
      normal: {
        steps: [
          { title: 'What is a Closure?', desc: 'Function that remembers its environment', visual: { type: 'closure-concept' } },
          { title: 'Simple Example', desc: 'Inner function accesses outer variable', code: "function outer() {\n  const name = 'Alice';\n  \n  function inner() {\n    console.log(name); // Can access!\n  }\n  \n  return inner;\n}", visual: { type: 'closure-scope', outerVar: 'name', innerAccess: true } },
          { title: 'Closure in Action', desc: 'Function keeps reference to variable', code: "const greet = outer();\ngreet(); // 'Alice'\n// Still has access to name!", visual: { type: 'closure-memory', variable: 'name: Alice', kept: true } },
          { title: 'Why It Works', desc: 'Closure preserves the scope', visual: { type: 'closure-explanation' } }
        ]
      },
      medium: {
        steps: [
          { title: 'Counter Example', desc: 'Private variable with closure', code: "function createCounter() {\n  let count = 0;\n  \n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  };\n}", visual: { type: 'counter-closure', count: 0 } },
          { title: 'Increment Called', desc: 'count is private but accessible', visual: { type: 'counter-closure', count: 1, action: 'increment' } },
          { title: 'Multiple Closures', desc: 'Each closure has own scope', code: "const counter1 = createCounter();\nconst counter2 = createCounter();\n\ncounter1.increment(); // 1\ncounter2.increment(); // 1\n// Independent!", visual: { type: 'multiple-closures', counters: [1, 1] } },
          { title: 'Use Cases', desc: 'When closures are useful', example: 'Data privacy, Factory functions, Event handlers, Callbacks' }
        ]
      },
      complex: {
        steps: [
          { title: 'Loop Problem', desc: 'Common closure mistake', code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => {\n    console.log(i); // 3, 3, 3 😱\n  }, 1000);\n}", visual: { type: 'closure-loop-problem', outputs: [3, 3, 3] } },
          { title: 'Why It Fails', desc: 'All closures share same variable', visual: { type: 'closure-shared-var', variable: 'i', finalValue: 3, closures: 3 } },
          { title: 'Solution: IIFE', desc: 'Create new scope for each iteration', code: "for (var i = 0; i < 3; i++) {\n  (function(j) {\n    setTimeout(() => {\n      console.log(j); // 0, 1, 2 ✓\n    }, 1000);\n  })(i);\n}", visual: { type: 'closure-loop-solution', outputs: [0, 1, 2] } },
          { title: 'Modern Solution', desc: 'Use let instead of var', code: "for (let i = 0; i < 3; i++) {\n  setTimeout(() => {\n    console.log(i); // 0, 1, 2 ✓\n  }, 1000);\n}\n// let creates new scope per iteration" }
        ]
      }
    },
    'closures': {
      title: 'Closures',
      normal: {
        steps: [
          { title: 'What is a Closure?', desc: 'Function that remembers its environment', visual: { type: 'closure-concept' } },
          { title: 'Simple Example', desc: 'Inner function accesses outer variable', code: "function outer() {\n  const name = 'Alice';\n  \n  function inner() {\n    console.log(name); // Can access!\n  }\n  \n  return inner;\n}", visual: { type: 'closure-scope', outerVar: 'name', innerAccess: true } },
          { title: 'Closure in Action', desc: 'Function keeps reference to variable', code: "const greet = outer();\ngreet(); // 'Alice'\n// Still has access to name!", visual: { type: 'closure-memory', variable: 'name: Alice', kept: true } },
          { title: 'Why It Works', desc: 'Closure preserves the scope', visual: { type: 'closure-explanation' } }
        ]
      },
      medium: {
        steps: [
          { title: 'Counter Example', desc: 'Private variable with closure', code: "function createCounter() {\n  let count = 0;\n  \n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  };\n}", visual: { type: 'counter-closure', count: 0 } },
          { title: 'Increment Called', desc: 'count is private but accessible', visual: { type: 'counter-closure', count: 1, action: 'increment' } },
          { title: 'Multiple Closures', desc: 'Each closure has own scope', code: "const counter1 = createCounter();\nconst counter2 = createCounter();\n\ncounter1.increment(); // 1\ncounter2.increment(); // 1\n// Independent!", visual: { type: 'multiple-closures', counters: [1, 1] } },
          { title: 'Real World Uses', desc: 'Closures in practice', visual: { type: 'closure-use-cases' } }
        ]
      },
      complex: {
        steps: [
          { title: 'Loop Problem', desc: 'Common closure mistake', code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => {\n    console.log(i); // 3, 3, 3 😱\n  }, 1000);\n}", visual: { type: 'closure-loop-problem', outputs: [3, 3, 3] } },
          { title: 'Why It Fails', desc: 'All closures share same variable', visual: { type: 'closure-shared-var', variable: 'i', finalValue: 3, closures: 3 } },
          { title: 'Solution: IIFE', desc: 'Create new scope for each iteration', code: "for (var i = 0; i < 3; i++) {\n  (function(j) {\n    setTimeout(() => {\n      console.log(j); // 0, 1, 2 ✓\n    }, 1000);\n  })(i);\n}", visual: { type: 'closure-loop-solution', outputs: [0, 1, 2] } },
          { title: 'Modern Solution', desc: 'Use let instead of var', code: "for (let i = 0; i < 3; i++) {\n  setTimeout(() => {\n    console.log(i); // 0, 1, 2 ✓\n  }, 1000);\n}\n// let creates new scope per iteration" }
        ]
      }
    },
    'closure-data-privacy': {
      title: 'Closures - Data Privacy',
      normal: {
        steps: [
          { title: 'The Problem', desc: 'Public variables can be changed', code: "const user = {\n  balance: 1000\n};\n\nuser.balance = 9999999; // Oops! 😱\nconsole.log(user.balance);", visual: { type: 'public-data-problem', value: 9999999 } },
          { title: 'Private with Closures', desc: 'Hide data inside function scope', code: "function createBankAccount(initial) {\n  let balance = initial; // Private!\n  \n  return {\n    deposit: (amt) => balance += amt,\n    withdraw: (amt) => balance -= amt,\n    getBalance: () => balance\n  };\n}", visual: { type: 'private-data-visual', balance: 1000, locked: true } },
          { title: 'Cannot Access Directly', desc: 'balance is truly private', code: "const account = createBankAccount(1000);\nconsole.log(account.balance); // undefined\n// Can't cheat! ✓", visual: { type: 'access-denied' } },
          { title: 'Controlled Access', desc: 'Only through methods', code: "account.deposit(500);  // ✓ Allowed\naccount.getBalance(); // 1500\n// Full control over data!" }
        ]
      },
      medium: {
        steps: [
          { title: 'Module Pattern', desc: 'Creating private state', code: "const ShoppingCart = (function() {\n  let items = []; // Private\n  let total = 0;  // Private\n  \n  return {\n    addItem(item, price) {\n      items.push(item);\n      total += price;\n    },\n    getTotal() {\n      return total;\n    },\n    getItemCount() {\n      return items.length;\n    }\n  };\n})();", visual: { type: 'module-pattern', private: ['items', 'total'], public: ['addItem', 'getTotal'] } },
          { title: 'State Encapsulation', desc: 'Private state in action', visual: { type: 'state-encapsulation', items: 2, total: 150, canAccess: false } },
          { title: 'Validation Example', desc: 'Protect data integrity', code: "function createUser(name, age) {\n  let _age = age;\n  \n  return {\n    setAge(newAge) {\n      if (newAge > 0 && newAge < 150) {\n        _age = newAge;\n      } else {\n        throw new Error('Invalid age');\n      }\n    },\n    getAge: () => _age\n  };\n}", visual: { type: 'validation-visual' } },
          { title: 'Benefits', desc: 'Why use private data', visual: { type: 'privacy-benefits' } }
        ]
      },
      complex: {
        steps: [
          { title: 'Advanced Privacy', desc: 'Multiple private variables', code: "function createSecureVault() {\n  const secrets = new Map();\n  let accessLog = [];\n  const masterKey = generateKey();\n  \n  return {\n    store(key, value) {\n      if (validateKey(key)) {\n        secrets.set(key, encrypt(value));\n        accessLog.push({action: 'store', time: Date.now()});\n      }\n    },\n    retrieve(key) {\n      accessLog.push({action: 'retrieve', time: Date.now()});\n      return decrypt(secrets.get(key));\n    }\n    // secrets, accessLog, masterKey all private!\n  };\n}" },
          { title: 'WeakMap for Privacy', desc: 'Alternative approach', code: "const privateData = new WeakMap();\n\nclass BankAccount {\n  constructor(balance) {\n    privateData.set(this, { balance });\n  }\n  \n  deposit(amt) {\n    const data = privateData.get(this);\n    data.balance += amt;\n  }\n  \n  getBalance() {\n    return privateData.get(this).balance;\n  }\n}" },
          { title: 'Symbols for Semi-Private', desc: 'Another pattern', code: "const _balance = Symbol('balance');\n\nclass Account {\n  constructor(initial) {\n    this[_balance] = initial;\n  }\n  \n  deposit(amt) {\n    this[_balance] += amt;\n  }\n}\n// Harder to access, not truly private" },
          { title: 'Best Practices', desc: 'Choosing the right approach', example: 'Closures: True privacy, simple\nWeakMap: Privacy with classes\nSymbols: Semi-private, documentation\n# prefix: Modern convention' }
        ]
      }
    },
    'closure-factory-functions': {
      title: 'Closures - Factory Functions',
      normal: {
        steps: [
          { title: 'What is a Factory?', desc: 'Function that creates objects', visual: { type: 'factory-concept' } },
          { title: 'Simple Factory', desc: 'Creating dog objects', code: "function createDog(name, breed) {\n  return {\n    name: name,\n    breed: breed,\n    bark() {\n      return `${name} says Woof!`;\n    }\n  };\n}", visual: { type: 'simple-factory', output: 'Dog object' } },
          { title: 'Factory in Action', desc: 'Multiple objects created', code: "const dog1 = createDog('Max', 'Beagle');\nconst dog2 = createDog('Bella', 'Poodle');\n\ndog1.bark(); // 'Max says Woof!'\ndog2.bark(); // 'Bella says Woof!'", visual: { type: 'multiple-objects', objects: 2 } },
          { title: 'Closure Magic', desc: 'Each method remembers its data', visual: { type: 'factory-closure-magic', name: 'Max', remembered: true } }
        ]
      },
      medium: {
        steps: [
          { title: 'Factory with Private State', desc: 'Combining privacy + factory', code: "function createPlayer(name) {\n  let score = 0;     // Private!\n  let level = 1;     // Private!\n  let health = 100;  // Private!\n  \n  return {\n    getName: () => name,\n    addScore(points) {\n      score += points;\n      if (score > 100) level++;\n    },\n    takeDamage(dmg) {\n      health -= dmg;\n    },\n    getStats() {\n      return { name, score, level, health };\n    }\n  };\n}", visual: { type: 'factory-private-state', player: 'Alice', private: ['score', 'level', 'health'] } },
          { title: 'Multiple Players', desc: 'Each with independent state', visual: { type: 'factory-multiple-players', players: [{ name: 'Alice', score: 50 }, { name: 'Bob', score: 30 }] } },
          { title: 'Configuration Factory', desc: 'Pre-configured functions', code: "function createMultiplier(factor) {\n  return function(num) {\n    return num * factor;\n  };\n}\n\nconst double = createMultiplier(2);\nconst triple = createMultiplier(3);\n\ndouble(5);  // 10\ntriple(5);  // 15", visual: { type: 'config-factory' } },
          { title: 'Factory vs Constructor', desc: 'Key differences', visual: { type: 'factory-vs-constructor' } }
        ]
      },
      complex: {
        steps: [
          { title: 'Composition Factory', desc: 'Building complex objects', code: "const canEat = () => ({\n  eat(food) {\n    console.log(`Eating ${food}`);\n  }\n});\n\nconst canWalk = () => ({\n  walk() {\n    console.log('Walking...');\n  }\n});\n\nconst canSwim = () => ({\n  swim() {\n    console.log('Swimming...');\n  }\n});\n\nfunction createDuck(name) {\n  return {\n    name,\n    ...canEat(),\n    ...canWalk(),\n    ...canSwim()\n  };\n}" },
          { title: 'Async Factory', desc: 'Creating objects with async data', code: "async function createUser(userId) {\n  const userData = await fetchUser(userId);\n  const preferences = await fetchPrefs(userId);\n  \n  let cachedPosts = null;\n  \n  return {\n    getName: () => userData.name,\n    async getPosts() {\n      if (!cachedPosts) {\n        cachedPosts = await fetchPosts(userId);\n      }\n      return cachedPosts;\n    }\n  };\n}" },
          { title: 'Factory with Methods', desc: 'Shared vs instance methods', code: "// Shared methods (better memory)\nconst playerMethods = {\n  attack(target) { /* ... */ },\n  defend() { /* ... */ }\n};\n\nfunction createPlayer(name) {\n  let health = 100;\n  \n  return Object.assign(Object.create(playerMethods), {\n    name,\n    getHealth: () => health\n  });\n}" },
          { title: 'When to Use', desc: 'Factory vs Class', example: 'Use Factory when:\n- Need data privacy\n- Want functional composition\n- Avoid "new" keyword\n- Dynamic object creation\n\nUse Class when:\n- Need inheritance\n- Want instanceof checks\n- Standard OOP patterns' }
        ]
      }
    },
    'closure-event-handlers': {
      title: 'Closures - Event Handlers',
      normal: {
        steps: [
          { title: 'Event Handler Closure', desc: 'Handlers remember their context', code: "function setupButton(message) {\n  const btn = document.querySelector('#myBtn');\n  \n  btn.addEventListener('click', function() {\n    alert(message); // Closure!\n  });\n}", visual: { type: 'event-handler-closure', message: 'Hello!', captured: true } },
          { title: 'Each Handler Independent', desc: 'Multiple buttons, different messages', code: "setupButton('Button 1 clicked');\nsetupButton('Button 2 clicked');\n// Each remembers its own message!", visual: { type: 'multiple-handlers', handlers: 2 } },
          { title: 'Visual Flow', desc: 'Click triggers closure', visual: { type: 'event-handler-flow' } },
          { title: 'Common Pattern', desc: 'Passing data to handlers', code: "buttons.forEach(btn => {\n  const id = btn.dataset.id;\n  btn.addEventListener('click', () => {\n    handleClick(id); // id captured!\n  });\n});" }
        ]
      },
      medium: {
        steps: [
          { title: 'Counter in Handler', desc: 'Private state with events', code: "function createClickCounter(elementId) {\n  let count = 0; // Private!\n  const el = document.getElementById(elementId);\n  \n  el.addEventListener('click', () => {\n    count++;\n    el.textContent = `Clicked ${count} times`;\n  });\n  \n  return {\n    reset: () => {\n      count = 0;\n      el.textContent = 'Clicked 0 times';\n    }\n  };\n}", visual: { type: 'handler-counter', count: 0 } },
          { title: 'After 3 Clicks', desc: 'Count increments privately', visual: { type: 'handler-counter', count: 3 } },
          { title: 'Debounce Pattern', desc: 'Closure in practical use', code: "function setupSearch() {\n  let timeoutId; // Captured!\n  const input = document.querySelector('#search');\n  \n  input.addEventListener('input', (e) => {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => {\n      search(e.target.value);\n    }, 500);\n  });\n}", visual: { type: 'debounce-handler' } },
          { title: 'Cleanup Important', desc: 'Remove listeners to avoid leaks', code: "function setupTemporary() {\n  const handler = () => console.log('clicked');\n  \n  button.addEventListener('click', handler);\n  \n  // Later: cleanup\n  return () => {\n    button.removeEventListener('click', handler);\n  };\n}" }
        ]
      },
      complex: {
        steps: [
          { title: 'State Machine', desc: 'Complex state with handlers', code: "function createToggle(elementId) {\n  const states = ['off', 'loading', 'on'];\n  let currentState = 0;\n  const el = document.getElementById(elementId);\n  \n  el.addEventListener('click', () => {\n    currentState = (currentState + 1) % states.length;\n    el.className = states[currentState];\n    el.textContent = states[currentState];\n  });\n  \n  return {\n    getState: () => states[currentState],\n    setState: (state) => {\n      const idx = states.indexOf(state);\n      if (idx !== -1) currentState = idx;\n    }\n  };\n}" },
          { title: 'Event Delegation', desc: 'Single handler, multiple items', code: "function setupList() {\n  const activeItems = new Set(); // Closure!\n  const list = document.querySelector('#list');\n  \n  list.addEventListener('click', (e) => {\n    if (e.target.matches('.item')) {\n      const id = e.target.dataset.id;\n      \n      if (activeItems.has(id)) {\n        activeItems.delete(id);\n        e.target.classList.remove('active');\n      } else {\n        activeItems.add(id);\n        e.target.classList.add('active');\n      }\n    }\n  });\n  \n  return {\n    getActive: () => Array.from(activeItems)\n  };\n}" },
          { title: 'React-like Hooks', desc: 'Closure-based state management', code: "function useState(initial) {\n  let state = initial;\n  const subscribers = [];\n  \n  function setState(newState) {\n    state = newState;\n    subscribers.forEach(fn => fn(state));\n  }\n  \n  function subscribe(fn) {\n    subscribers.push(fn);\n    return () => {\n      const idx = subscribers.indexOf(fn);\n      subscribers.splice(idx, 1);\n    };\n  }\n  \n  return [() => state, setState, subscribe];\n}" },
          { title: 'Best Practices', desc: 'Event handler tips', example: 'Store handlers for cleanup\nUse named functions, not anonymous\nAvoid capturing large objects\nClean up on component unmount\nUse event delegation when possible' }
        ]
      }
    },
    'closure-callbacks': {
      title: 'Closures - Callbacks',
      normal: {
        steps: [
          { title: 'What are Callbacks?', desc: 'Functions passed as arguments', visual: { type: 'callback-concept' } },
          { title: 'Simple Callback', desc: 'setTimeout with closure', code: "function greet(name) {\n  setTimeout(function() {\n    console.log(`Hello ${name}`);\n  }, 1000);\n  // Callback remembers name!\n}", visual: { type: 'simple-callback', variable: 'name', captured: true } },
          { title: 'Array Methods', desc: 'Closures in forEach, map, filter', code: "function multiplyBy(factor) {\n  const numbers = [1, 2, 3, 4, 5];\n  \n  return numbers.map(num => {\n    return num * factor; // factor captured!\n  });\n}\n\nmultiplyBy(10); // [10, 20, 30, 40, 50]", visual: { type: 'array-callback', factor: 10 } },
          { title: 'Why It Works', desc: 'Callback has access to outer scope', visual: { type: 'callback-scope-access' } }
        ]
      },
      medium: {
        steps: [
          { title: 'Async Callbacks', desc: 'Data available when callback runs', code: "function fetchUserData(userId) {\n  const timestamp = Date.now();\n  \n  fetch(`/api/users/${userId}`)\n    .then(response => response.json())\n    .then(data => {\n      // timestamp captured!\n      console.log(`Fetched at: ${timestamp}`);\n      console.log(data);\n    });\n}", visual: { type: 'async-callback', captured: 'timestamp' } },
          { title: 'Callback Factory', desc: 'Creating specialized callbacks', code: "function createValidator(field, rules) {\n  return function(value) {\n    // field and rules captured!\n    for (let rule of rules) {\n      if (!rule.test(value)) {\n        return `${field} failed: ${rule.message}`;\n      }\n    }\n    return null;\n  };\n}\n\nconst emailValidator = createValidator('email', [\n  { test: v => v.includes('@'), message: 'needs @' }\n]);\n\nemailValidator('test'); // 'email failed: needs @'", visual: { type: 'callback-factory' } },
          { title: 'Callback Hell', desc: 'Nested callbacks problem', code: "getData(id, function(data) {\n  getMore(data.id, function(more) {\n    getEvenMore(more.id, function(evenMore) {\n      // Pyramid of doom! 😱\n    });\n  });\n});", visual: { type: 'callback-hell', depth: 3 } },
          { title: 'Solution: Promises', desc: 'Flatten with promises/async-await', code: "async function getData(id) {\n  const data = await fetchData(id);\n  const more = await fetchMore(data.id);\n  const evenMore = await fetchEvenMore(more.id);\n  return evenMore;\n}" }
        ]
      },
      complex: {
        steps: [
          { title: 'Memoization', desc: 'Caching with closures', code: "function memoize(fn) {\n  const cache = {}; // Captured!\n  \n  return function(...args) {\n    const key = JSON.stringify(args);\n    \n    if (key in cache) {\n      console.log('From cache');\n      return cache[key];\n    }\n    \n    const result = fn(...args);\n    cache[key] = result;\n    return result;\n  };\n}\n\nconst expensiveCalc = memoize((n) => {\n  // Expensive operation\n  return n * n;\n});\n\nexpensiveCalc(5); // Calculates\nexpensiveCalc(5); // From cache!", visual: { type: 'memoization-visual', cache: { '5': 25 } } },
          { title: 'Partial Application', desc: 'Pre-filling arguments', code: "function partial(fn, ...fixedArgs) {\n  return function(...remainingArgs) {\n    // fixedArgs captured!\n    return fn(...fixedArgs, ...remainingArgs);\n  };\n}\n\nfunction greet(greeting, name) {\n  return `${greeting}, ${name}!`;\n}\n\nconst sayHello = partial(greet, 'Hello');\nsayHello('Alice'); // 'Hello, Alice!'\nsayHello('Bob');   // 'Hello, Bob!'" },
          { title: 'Pub/Sub Pattern', desc: 'Event system with closures', code: "function createEventEmitter() {\n  const events = {}; // Private!\n  \n  return {\n    on(event, callback) {\n      if (!events[event]) events[event] = [];\n      events[event].push(callback);\n      \n      // Return unsubscribe function\n      return () => {\n        const idx = events[event].indexOf(callback);\n        events[event].splice(idx, 1);\n      };\n    },\n    \n    emit(event, data) {\n      if (events[event]) {\n        events[event].forEach(cb => cb(data));\n      }\n    }\n  };\n}\n\nconst emitter = createEventEmitter();\nconst unsub = emitter.on('data', (d) => console.log(d));\nemitter.emit('data', 'hello');\nunsub(); // Clean up" },
          { title: 'Practical Tips', desc: 'Working with callbacks', example: 'Name your callbacks for debugging\nAvoid deep nesting (use promises)\nBe careful with closures in loops\nAlways handle errors\nConsider memory with long-lived callbacks' }
        ]
      }
    },
    'closure-memory-leaks': {
      title: 'Closures & Memory Leaks',
      normal: {
        steps: [
          { title: 'What is a Memory Leak?', desc: 'Memory not released when no longer needed', visual: { type: 'memory-leak-concept' } },
          { title: 'Normal Closure', desc: 'Keeps necessary references', code: "function createGreeter(name) {\n  return function() {\n    console.log(`Hello ${name}`);\n  };\n}\n// name is needed - OK!", visual: { type: 'normal-closure-memory', used: true } },
          { title: 'Accidental Leak', desc: 'Keeping unnecessary large data', code: "function processData() {\n  const hugeArray = new Array(1000000);\n  \n  return function() {\n    console.log('Done');\n    // hugeArray still in memory! 😱\n  };\n}", visual: { type: 'memory-leak-visual', size: 'large', leaked: true } },
          { title: 'The Problem', desc: 'Closure keeps entire scope alive', visual: { type: 'leak-explanation' } }
        ]
      },
      medium: {
        steps: [
          { title: 'Event Listener Leak', desc: 'Common memory leak pattern', code: "function setupButton() {\n  const bigData = fetchLargeData();\n  \n  button.addEventListener('click', () => {\n    // Only uses button, but bigData\n    // stays in memory!\n    console.log('Clicked');\n  });\n}", visual: { type: 'event-listener-leak', data: 'bigData', retained: true } },
          { title: 'Fix: Limit Scope', desc: 'Only capture what you need', code: "function setupButton() {\n  const bigData = fetchLargeData();\n  const needed = bigData.id;\n  \n  button.addEventListener('click', () => {\n    console.log(needed); // Only keeps id\n  });\n  // bigData can be garbage collected ✓\n}", visual: { type: 'event-listener-fixed', kept: 'id only' } },
          { title: 'Timer Leak', desc: 'setInterval keeps closure alive', code: "function startTimer() {\n  const data = new Array(10000);\n  \n  setInterval(() => {\n    console.log('tick');\n  }, 1000);\n  // data never freed! 😱\n}", visual: { type: 'timer-leak', interval: true } },
          { title: 'Fix: Clear Timer', desc: 'Clean up when done', code: "function startTimer() {\n  const data = new Array(10000);\n  \n  const id = setInterval(() => {\n    console.log('tick');\n  }, 1000);\n  \n  // Later:\n  clearInterval(id); // Cleanup ✓\n}" }
        ]
      },
      complex: {
        steps: [
          { title: 'Circular Reference', desc: 'Objects referencing each other', code: "function createLeak() {\n  const obj1 = {};\n  const obj2 = {};\n  \n  obj1.ref = obj2;\n  obj2.ref = obj1;\n  \n  return function() {\n    console.log(obj1.ref.ref);\n  };\n  // Circular reference kept alive!\n}", visual: { type: 'circular-reference', objects: 2 } },
          { title: 'DOM Reference Leak', desc: 'Keeping removed DOM nodes', code: "let cache = [];\n\nfunction storeElements() {\n  const div = document.querySelector('#temp');\n  cache.push(() => {\n    console.log(div.innerHTML);\n  });\n  // div removed from DOM\n  // but still in memory! 😱\n}", visual: { type: 'dom-leak', element: 'div', inDom: false, inMemory: true } },
          { title: 'Fix: Weak References', desc: 'Use WeakMap/WeakSet', code: "const cache = new WeakMap();\n\nfunction storeElement(el) {\n  cache.set(el, () => {\n    console.log('data');\n  });\n}\n// When el is removed, entry\n// automatically garbage collected ✓" },
          { title: 'Best Practices', desc: 'Prevent memory leaks', visual: { type: 'best-practices-table' } }
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
          { title: 'Visual Problem', desc: 'Too many function calls', visual: { type: 'debounce-problem', inputs: ['h', 'he', 'hel', 'hell', 'hello'], apiCalls: 5 } },
          { title: 'What is Debouncing?', desc: 'Wait until user stops typing', visual: { type: 'debounce-concept', typing: true } },
          { title: 'How It Works', desc: 'Timer resets on each keystroke', visual: { type: 'debounce-timer-visual', keystrokes: [0, 100, 200, 300, 400], timer: 300 } }
        ]
      },
      medium: {
        steps: [
          { title: 'Step by Step', desc: 'See timer in action', visual: { type: 'debounce-step-by-step', step: 1 } },
          { title: 'Timer Resets', desc: 'Each keystroke cancels previous timer', visual: { type: 'debounce-step-by-step', step: 2 } },
          { title: 'User Stops Typing', desc: 'Timer completes after 500ms', visual: { type: 'debounce-step-by-step', step: 3 } },
          { title: 'Function Executes', desc: 'API call happens once!', visual: { type: 'debounce-step-by-step', step: 4 } }
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
          { title: 'What is a Promise?', desc: 'Like ordering food - you get a receipt', visual: { type: 'promise-analogy', stage: 'order' } },
          { title: 'Three States', desc: 'Waiting, Success, or Failure', visual: { type: 'promise-states-visual', currentState: 'pending' } },
          { title: 'Promise Fulfilled', desc: 'Operation succeeded!', visual: { type: 'promise-states-visual', currentState: 'fulfilled', value: 'Your data!' } },
          { title: 'Promise Rejected', desc: 'Something went wrong', visual: { type: 'promise-states-visual', currentState: 'rejected', error: 'Network error!' } }
        ]
      },
      medium: {
        steps: [
          { title: 'Creating a Promise', desc: 'Fetching data example', visual: { type: 'promise-creation', stage: 'start' } },
          { title: 'Promise Pending', desc: 'Waiting for server response', visual: { type: 'promise-creation', stage: 'pending' } },
          { title: 'Data Arrives', desc: 'Resolve with data', visual: { type: 'promise-creation', stage: 'resolve', data: '{name: "Alice"}' } },
          { title: 'Using .then()', desc: 'Handle the result', visual: { type: 'promise-creation', stage: 'then', result: 'Data processed!' } }
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
          { title: 'The Problem with Promises', desc: 'Too many .then() chains', visual: { type: 'promise-chain-messy', chains: 3 } },
          { title: 'Async/Await Solution', desc: 'Write async code like sync code', visual: { type: 'async-await-clean' } },
          { title: 'How Await Works', desc: 'Pauses function until promise resolves', visual: { type: 'await-execution', stage: 'waiting' } },
          { title: 'Result Received', desc: 'Function continues with data', visual: { type: 'await-execution', stage: 'received', data: 'User data' } }
        ]
      },
      medium: {
        steps: [
          { title: 'Step 1: Function Starts', desc: 'Async function begins execution', visual: { type: 'async-flow', step: 1, line: 'async function getData()' } },
          { title: 'Step 2: Hit Await', desc: 'Function pauses at await', visual: { type: 'async-flow', step: 2, line: 'await fetch(url)', status: 'paused' } },
          { title: 'Step 3: Waiting', desc: 'Promise is pending', visual: { type: 'async-flow', step: 3, line: 'await fetch(url)', status: 'waiting' } },
          { title: 'Step 4: Continue', desc: 'Got data, function resumes', visual: { type: 'async-flow', step: 4, line: 'const data = response', status: 'resumed', data: 'Response' } }
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
          { title: 'Code Without Error Handling', desc: 'One error crashes everything', visual: { type: 'code-crash', crashed: true } },
          { title: 'Try Block', desc: 'Code that might throw error', visual: { type: 'try-catch-flow', block: 'try', status: 'running' } },
          { title: 'Error Occurs!', desc: 'Something went wrong', visual: { type: 'try-catch-flow', block: 'try', status: 'error', error: 'TypeError' } },
          { title: 'Catch Block Saves Us', desc: 'Error is caught and handled', visual: { type: 'try-catch-flow', block: 'catch', status: 'handled', message: 'Error logged, app continues' } }
        ]
      },
      medium: {
        steps: [
          { title: 'Execution Flow - Try', desc: 'Code runs normally', visual: { type: 'try-catch-execution', step: 1, currentLine: 'let data = parseData()', success: true } },
          { title: 'Error Thrown', desc: 'parseData() throws error', visual: { type: 'try-catch-execution', step: 2, currentLine: 'let data = parseData()', success: false, jump: true } },
          { title: 'Jump to Catch', desc: 'Execution jumps to catch block', visual: { type: 'try-catch-execution', step: 3, currentLine: 'catch (error)', catching: true } },
          { title: 'Finally Always Runs', desc: 'Cleanup code executes', visual: { type: 'try-catch-execution', step: 4, currentLine: 'finally { cleanup() }', cleanup: true } }
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