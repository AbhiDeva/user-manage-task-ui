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