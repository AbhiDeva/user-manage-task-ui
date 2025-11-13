export const sampleProblems = {
    twoSum: {
      name: 'Two Sum',
      code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      input: { nums: [2, 7, 11, 15], target: 9 }
    },
    binarySearch: {
      name: 'Binary Search',
      code: `function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      input: { nums: [1, 3, 5, 7, 9, 11, 13], target: 7 }
    },
    reverseLinkedList: {
      name: 'Reverse Linked List',
      code: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
      input: { list: [1, 2, 3, 4, 5] }
    },
    bubbleSort: {
      name: 'Bubble Sort',
      code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      input: { nums: [64, 34, 25, 12, 22, 11, 90] }
    },
    maxSubarray: {
      name: "Kadane's Algorithm (Max Subarray)",
      code: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
      input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }
    },
    validParentheses: {
      name: 'Valid Parentheses (Stack)',
      code: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (!map[char]) stack.push(char);
    else if (stack.pop() !== map[char]) return false;
  }
  return stack.length === 0;
}`,
      input: { string: '({[]})' }
    },
    mergeSortedArrays: {
      name: 'Merge Two Sorted Arrays',
      code: `function merge(arr1, arr2) {
  let result = [], i = 0, j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }
  return result.concat(arr1.slice(i), arr2.slice(j));
}`,
      input: { arr1: [1, 3, 5, 7], arr2: [2, 4, 6, 8] }
    },
    climbingStairs: {
      name: 'Climbing Stairs (DP)',
      code: `function climbStairs(n) {
  if (n <= 2) return n;
  let dp = [0, 1, 2];
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}`,
      input: { n: 6 }
    },
    quickSort: {
      name: 'Quick Sort',
      code: `function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}
function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      input: { nums: [64, 25, 12, 22, 11, 90, 88, 45] }
    },
    slidingWindow: {
      name: 'Max Sum Subarray (Sliding Window)',
      code: `function maxSumSubarray(arr, k) {
  let maxSum = 0, windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
      input: { nums: [2, 1, 5, 1, 3, 2, 4, 1], k: 3 }
    },
    bfs: {
      name: 'Breadth-First Search (BFS)',
      code: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
      queue.push(...graph[node]);
    }
  }
  return result;
}`,
      input: { 
        graph: { 0: [1, 2], 1: [3, 4], 2: [5], 3: [], 4: [5], 5: [] },
        start: 0 
      }
    },
    dfs: {
      name: 'Depth-First Search (DFS)',
      code: `function dfs(graph, start, visited = new Set()) {
  if (visited.has(start)) return [];
  visited.add(start);
  const result = [start];
  
  for (let neighbor of graph[start]) {
    result.push(...dfs(graph, neighbor, visited));
  }
  return result;
}`,
      input: { 
        graph: { 0: [1, 2], 1: [3, 4], 2: [5], 3: [], 4: [5], 5: [] },
        start: 0 
      }
    },
    longestSubstring: {
      name: 'Longest Substring Without Repeating',
      code: `function lengthOfLongestSubstring(s) {
  let maxLen = 0, start = 0;
  const map = new Map();
  
  for (let end = 0; end < s.length; end++) {
    if (map.has(s[end])) {
      start = Math.max(start, map.get(s[end]) + 1);
    }
    map.set(s[end], end);
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}`,
      input: { string: 'abcabcbb' }
    },
    coinChange: {
      name: 'Coin Change (DP)',
      code: `function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      input: { coins: [1, 2, 5], amount: 11 }
    },
    rotateArray: {
      name: 'Rotate Array',
      code: `function rotate(nums, k) {
  k = k % nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
}
function reverse(nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}`,
      input: { nums: [1, 2, 3, 4, 5, 6, 7], k: 3 }
    },
    mergeSort: {
      name: 'Merge Sort',
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}`,
      input: { nums: [38, 27, 43, 3, 9, 82, 10] }
    },
    isPalindrome: {
      name: 'Valid Palindrome',
      code: `function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
      input: { string: 'A man, a plan, a canal: Panama' }
    },
    findDuplicate: {
      name: "Floyd's Cycle Detection (Find Duplicate)",
      code: `function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];
  
  // Find intersection point
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);
  
  // Find entrance to cycle
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}`,
      input: { nums: [1, 3, 4, 2, 2] }
    },
    houseRobber: {
      name: 'House Robber (DP)',
      code: `function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  let dp = [nums[0], Math.max(nums[0], nums[1])];
  
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
  }
  return dp[nums.length - 1];
}`,
      input: { nums: [2, 7, 9, 3, 1] }
    },
    productExceptSelf: {
      name: 'Product of Array Except Self',
      code: `function productExceptSelf(nums) {
  const result = [];
  let prefix = 1;
  
  // Calculate prefix products
  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }
  
  // Calculate suffix products
  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }
  return result;
}`,
      input: { nums: [1, 2, 3, 4] }
    },
    trappingRainWater: {
      name: 'Trapping Rain Water',
      code: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`,
      input: { nums: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] }
    },
    jumpGame: {
      name: 'Jump Game',
      code: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }
  return true;
}`,
      input: { nums: [2, 3, 1, 1, 4] }
    },
    topKFrequent: {
      name: 'Top K Frequent Elements',
      code: `function topKFrequent(nums, k) {
  const map = new Map();
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}`,
      input: { nums: [1, 1, 1, 2, 2, 3, 4, 4, 4, 4], k: 2 }
    },
    longestPalindrome: {
      name: 'Longest Palindromic Substring',
      code: `function longestPalindrome(s) {
  let start = 0, maxLen = 0;
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && 
           s[left] === s[right]) {
      if (right - left + 1 > maxLen) {
        start = left;
        maxLen = right - left + 1;
      }
      left--;
      right++;
    }
  }
  
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i);     // odd length
    expandAroundCenter(i, i + 1); // even length
  }
  return s.substring(start, start + maxLen);
}`,
      input: { string: 'babad' }
    },
    nQueens: {
      name: 'N-Queens (Backtracking)',
      code: `function solveNQueens(n) {
  const board = Array(n).fill().map(() => Array(n).fill('.'));
  const solutions = [];
  
  function isSafe(row, col) {
    // Check column and diagonals
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
      if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false;
      if (col + (row - i) < n && board[i][col + (row - i)] === 'Q') return false;
    }
    return true;
  }
  
  function backtrack(row) {
    if (row === n) {
      solutions.push(board.map(r => r.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  }
  
  backtrack(0);
  return solutions;
}`,
      input: { n: 4 }
    },
    wordSearch: {
      name: 'Word Search (Backtracking)',
      code: `function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;
  
  function dfs(row, col, index) {
    if (index === word.length) return true;
    if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
    if (board[row][col] !== word[index]) return false;
    
    const temp = board[row][col];
    board[row][col] = '#';
    
    const found = dfs(row + 1, col, index + 1) ||
                  dfs(row - 1, col, index + 1) ||
                  dfs(row, col + 1, index + 1) ||
                  dfs(row, col - 1, index + 1);
    
    board[row][col] = temp;
    return found;
  }
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
}`,
      input: { 
        board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 
        word: 'ABCCED' 
      }
    },
    binaryTreeInorder: {
      name: 'Binary Tree Inorder Traversal',
      code: `function inorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}`,
      input: { tree: [1, null, 2, 3] }
    },
    validateBST: {
      name: 'Validate Binary Search Tree',
      code: `function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  }
  return validate(root, -Infinity, Infinity);
}`,
      input: { tree: [5, 1, 4, null, null, 3, 6] }
    },
    lowestCommonAncestor: {
      name: 'Lowest Common Ancestor (LCA)',
      code: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  
  if (left && right) return root;
  return left || right;
}`,
      input: { tree: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p: 5, q: 1 }
    },
    kthSmallestBST: {
      name: 'Kth Smallest in BST',
      code: `function kthSmallest(root, k) {
  const result = [];
  
  function inorder(node) {
    if (!node || result.length >= k) return;
    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  }
  
  inorder(root);
  return result[k - 1];
}`,
      input: { tree: [5, 3, 6, 2, 4, null, null, 1], k: 3 }
    },
    permutations: {
      name: 'Permutations (Backtracking)',
      code: `function permute(nums) {
  const result = [];
  
  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }
    
    for (let num of nums) {
      if (current.includes(num)) continue;
      current.push(num);
      backtrack(current);
      current.pop();
    }
  }
  
  backtrack([]);
  return result;
}`,
      input: { nums: [1, 2, 3] }
    },
    combinations: {
      name: 'Combinations (Backtracking)',
      code: `function combine(n, k) {
  const result = [];
  
  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    
    for (let i = start; i <= n; i++) {
      current.push(i);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(1, []);
  return result;
}`,
      input: { n: 4, k: 2 }
    },
    subsets: {
      name: 'Subsets (Backtracking)',
      code: `function subsets(nums) {
  const result = [];
  
  function backtrack(start, current) {
    result.push([...current]);
    
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(0, []);
  return result;
}`,
      input: { nums: [1, 2, 3] }
    },
    knapsack01: {
      name: '0/1 Knapsack (DP)',
      code: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][capacity];
}`,
      input: { weights: [1, 3, 4, 5], values: [1, 4, 5, 7], capacity: 7 }
    },
    editDistance: {
      name: 'Edit Distance (DP)',
      code: `function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // delete
          dp[i][j - 1],     // insert
          dp[i - 1][j - 1]  // replace
        );
      }
    }
  }
  return dp[m][n];
}`,
      input: { word1: 'horse', word2: 'ros' }
    },
    longestIncreasingSubsequence: {
      name: 'Longest Increasing Subsequence (DP)',
      code: `function lengthOfLIS(nums) {
  const dp = Array(nums.length).fill(1);
  let maxLen = 1;
  
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }
  return maxLen;
}`,
      input: { nums: [10, 9, 2, 5, 3, 7, 101, 18] }
    },
    dijkstra: {
      name: "Dijkstra's Shortest Path",
      code: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const pq = [[0, start]];
  
  for (let node in graph) distances[node] = Infinity;
  distances[start] = 0;
  
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [dist, node] = pq.shift();
    
    if (visited.has(node)) continue;
    visited.add(node);
    
    for (let [neighbor, weight] of graph[node]) {
      const newDist = dist + weight;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.push([newDist, neighbor]);
      }
    }
  }
  return distances;
}`,
      input: { 
        graph: {
          'A': [['B', 4], ['C', 2]],
          'B': [['D', 3], ['E', 1]],
          'C': [['B', 1], ['D', 5]],
          'D': [['E', 2]],
          'E': []
        },
        start: 'A'
      }
    },
    trieImplementation: {
      name: 'Trie (Prefix Tree) Insert & Search',
      code: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }
  
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }
}`,
      input: { words: ['apple', 'app', 'apricot'], search: 'app' }
    },
    unionFind: {
      name: 'Union-Find (Disjoint Set)',
      code: `class UnionFind {
  constructor(n) {
    this.parent = Array(n).fill().map((_, i) => i);
    this.rank = Array(n).fill(0);
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
  
  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    
    if (rootX === rootY) return false;
    
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}`,
      input: { n: 6, edges: [[0, 1], [1, 2], [3, 4], [0, 4]] }
    },
    segmentTree: {
      name: 'Segment Tree (Range Sum Query)',
      code: `class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = Array(4 * this.n).fill(0);
    this.build(arr, 0, 0, this.n - 1);
  }
  
  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    this.build(arr, 2 * node + 1, start, mid);
    this.build(arr, 2 * node + 2, mid + 1, end);
    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
  }
  
  query(node, start, end, l, r) {
    if (r < start || l > end) return 0;
    if (l <= start && end <= r) return this.tree[node];
    const mid = Math.floor((start + end) / 2);
    return this.query(2 * node + 1, start, mid, l, r) +
           this.query(2 * node + 2, mid + 1, end, l, r);
  }
}`,
      input: { arr: [1, 3, 5, 7, 9, 11], query: [1, 3] }
    },
    kruskal: {
      name: "Kruskal's MST Algorithm",
      code: `function kruskal(n, edges) {
  edges.sort((a, b) => a[2] - b[2]);
  const uf = new UnionFind(n);
  const mst = [];
  
  for (let [u, v, weight] of edges) {
    if (uf.union(u, v)) {
      mst.push([u, v, weight]);
      if (mst.length === n - 1) break;
    }
  }
  return mst;
}`,
      input: { n: 4, edges: [[0,1,10], [0,2,6], [0,3,5], [1,3,15], [2,3,4]] }
    },
    topologicalSort: {
      name: 'Topological Sort (DFS)',
      code: `function topologicalSort(graph) {
  const visited = new Set();
  const stack = [];
  
  function dfs(node) {
    visited.add(node);
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
    stack.unshift(node);
  }
  
  for (let node in graph) {
    if (!visited.has(parseInt(node))) {
      dfs(parseInt(node));
    }
  }
  return stack;
}`,
      input: { graph: { 0: [1, 2], 1: [3], 2: [3], 3: [4], 4: [] } }
    },
    bellmanFord: {
      name: 'Bellman-Ford (Negative Weights)',
      code: `function bellmanFord(n, edges, start) {
  const distances = Array(n).fill(Infinity);
  distances[start] = 0;
  
  for (let i = 0; i < n - 1; i++) {
    for (let [u, v, weight] of edges) {
      if (distances[u] + weight < distances[v]) {
        distances[v] = distances[u] + weight;
      }
    }
  }
  
  // Check for negative cycles
  for (let [u, v, weight] of edges) {
    if (distances[u] + weight < distances[v]) {
      return "Negative cycle detected";
    }
  }
  return distances;
}`,
      input: { n: 5, edges: [[0,1,6], [0,2,7], [1,2,8], [1,3,5], [1,4,-4], [2,3,-3], [2,4,9], [3,1,-2], [4,3,7]], start: 0 }
    },
    huffmanCoding: {
      name: 'Huffman Coding (Greedy)',
      code: `function huffmanCoding(freq) {
  const heap = freq.map((f, i) => ({ char: String.fromCharCode(65 + i), freq: f, left: null, right: null }));
  
  while (heap.length > 1) {
    heap.sort((a, b) => a.freq - b.freq);
    const left = heap.shift();
    const right = heap.shift();
    const merged = {
      char: left.char + right.char,
      freq: left.freq + right.freq,
      left, right
    };
    heap.push(merged);
  }
  
  const codes = {};
  function generateCodes(node, code = '') {
    if (!node.left && !node.right) {
      codes[node.char] = code || '0';
      return;
    }
    if (node.left) generateCodes(node.left, code + '0');
    if (node.right) generateCodes(node.right, code + '1');
  }
  generateCodes(heap[0]);
  return codes;
}`,
      input: { freq: [5, 9, 12, 13, 16, 45] }
    },
    aStarSearch: {
      name: 'A* Pathfinding Algorithm',
      code: `function aStar(grid, start, goal) {
  const openSet = [start];
  const cameFrom = {};
  const gScore = { [start]: 0 };
  const fScore = { [start]: heuristic(start, goal) };
  
  while (openSet.length > 0) {
    openSet.sort((a, b) => (fScore[a] || Infinity) - (fScore[b] || Infinity));
    const current = openSet.shift();
    
    if (current === goal) return reconstructPath(cameFrom, current);
    
    for (let neighbor of getNeighbors(grid, current)) {
      const tentativeG = gScore[current] + 1;
      if (tentativeG < (gScore[neighbor] || Infinity)) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeG;
        fScore[neighbor] = tentativeG + heuristic(neighbor, goal);
        if (!openSet.includes(neighbor)) openSet.push(neighbor);
      }
    }
  }
  return null;
}

function heuristic(a, b) {
  const [x1, y1] = a.split(',').map(Number);
  const [x2, y2] = b.split(',').map(Number);
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}`,
      input: { 
        grid: [[0, 0, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], 
        start: '0,0', 
        goal: '3,3' 
      }
    },
    maxFlow: {
      name: 'Ford-Fulkerson Max Flow',
      code: `function maxFlow(graph, source, sink) {
  let flow = 0;
  const residual = JSON.parse(JSON.stringify(graph));
  
  function dfs(node, visited, minFlow) {
    if (node === sink) return minFlow;
    visited.add(node);
    
    for (let neighbor in residual[node]) {
      if (!visited.has(neighbor) && residual[node][neighbor] > 0) {
        const bottleneck = Math.min(minFlow, residual[node][neighbor]);
        const pathFlow = dfs(neighbor, visited, bottleneck);
        
        if (pathFlow > 0) {
          residual[node][neighbor] -= pathFlow;
          residual[neighbor][node] = (residual[neighbor][node] || 0) + pathFlow;
          return pathFlow;
        }
      }
    }
    return 0;
  }
  
  while (true) {
    const pathFlow = dfs(source, new Set(), Infinity);
    if (pathFlow === 0) break;
    flow += pathFlow;
  }
  return flow;
}`,
      input: { 
        graph: {
          's': { 'a': 10, 'b': 10 },
          'a': { 'b': 2, 'c': 4, 'd': 8 },
          'b': { 'd': 9 },
          'c': { 't': 10 },
          'd': { 'c': 6, 't': 10 },
          't': {}
        },
        source: 's',
        sink: 't'
      }
    },
    kmp: {
      name: 'KMP String Matching',
      code: `function KMP(text, pattern) {
  const lps = computeLPS(pattern);
  const matches = [];
  let i = 0, j = 0;
  
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    }
    
    if (j === pattern.length) {
      matches.push(i - j);
      j = lps[j - 1];
    } else if (i < text.length && text[i] !== pattern[j]) {
      if (j !== 0) j = lps[j - 1];
      else i++;
    }
  }
  return matches;
}

function computeLPS(pattern) {
  const lps = [0];
  let len = 0, i = 1;
  
  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) len = lps[len - 1];
      else { lps[i] = 0; i++; }
    }
  }
  return lps;
}`,
      input: { text: 'ABABDABACDABABCABAB', pattern: 'ABABCABAB' }
    },
    containsDuplicate: {
      name: 'Contains Duplicate',
      code: `function containsDuplicate(nums) {
  const seen = new Set();
  
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(nums[i])) {
      return true;
    }
    seen.add(nums[i]);
  }
  return false;
}`,
      input: { nums: [1, 2, 3, 1, 4, 5] }
    },
    validAnagram: {
      name: 'Valid Anagram',
      code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  
  const count = {};
  
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  
  return true;
}`,
      input: { s: 'anagram', t: 'nagaram' }
    },
    groupAnagrams: {
      name: 'Group Anagrams',
      code: `function groupAnagrams(strs) {
  const map = new Map();
  
  for (let str of strs) {
    const sorted = str.split('').sort().join('');
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
    map.get(sorted).push(str);
  }
  
  return Array.from(map.values());
}`,
      input: { strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'] }
    },
    containerWithMostWater: {
      name: 'Container With Most Water',
      code: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxArea = 0;
  
  while (left < right) {
    const width = right - left;
    const area = Math.min(height[left], height[right]) * width;
    maxArea = Math.max(maxArea, area);
    
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxArea;
}`,
      input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] }
    },
    validSudoku: {
      name: 'Valid Sudoku',
      code: `function isValidSudoku(board) {
  const rows = Array(9).fill().map(() => new Set());
  const cols = Array(9).fill().map(() => new Set());
  const boxes = Array(9).fill().map(() => new Set());
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j];
      if (num === '.') continue;
      
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      
      if (rows[i].has(num) || cols[j].has(num) || boxes[boxIndex].has(num)) {
        return false;
      }
      
      rows[i].add(num);
      cols[j].add(num);
      boxes[boxIndex].add(num);
    }
  }
  return true;
}`,
      input: {
        board: [
          ['5','3','.','.','7','.','.','.','.'],
          ['6','.','.','1','9','5','.','.','.'],
          ['.','9','8','.','.','.','.','6','.'],
          ['8','.','.','.','6','.','.','.','3'],
          ['4','.','.','8','.','3','.','.','1'],
          ['7','.','.','.','2','.','.','.','6'],
          ['.','6','.','.','.','.','2','8','.'],
          ['.','.','.','4','1','9','.','.','5'],
          ['.','.','.','.','8','.','.','7','9']
        ]
      }
    },
    encodeDecodeStrings: {
      name: 'Encode and Decode Strings',
      code: `function encode(strs) {
  return strs.map(s => s.length + '#' + s).join('');
}

function decode(str) {
  const result = [];
  let i = 0;
  while (i < str.length) {
    let j = i;
    while (str[j] !== '#') j++;
    const length = parseInt(str.slice(i, j));
    result.push(str.slice(j + 1, j + 1 + length));
    i = j + 1 + length;
  }
  return result;
}`,
      input: { 
        type: 'normal',
        strs: ['hello', 'world', 'test']
      },
      examples: {
        normal: ['hello', 'world', 'test'],
        medium: ['abc', 'def#ghi', 'j#k#l', '123'],
        worst: ['', 'a', '', 'b', '', 'c'],
        edge: ['#', '##', '#####']
      }
    },
    twoSumII: {
      name: 'Two Sum II (Sorted Array)',
      code: `function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}`,
      input: { 
        type: 'normal',
        numbers: [2, 7, 11, 15], 
        target: 9 
      },
      examples: {
        normal: { numbers: [2, 7, 11, 15], target: 9 },
        medium: { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target: 15 },
        worst: { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1000], target: 1001 },
        negative: { numbers: [-5, -3, -1, 0, 2, 4, 6], target: 1 }
      }
    },
    threeSum: {
      name: '3Sum',
      code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}`,
      input: { 
        type: 'normal',
        nums: [-1, 0, 1, 2, -1, -4] 
      },
      examples: {
        normal: [-1, 0, 1, 2, -1, -4],
        medium: [-4, -2, -2, -1, 0, 1, 2, 2, 3, 4],
        worst: [0, 0, 0, 0],
        negative: [-5, -4, -3, -2, -1, 0, 1, 2]
      }
    },
    bestTimeToBuyStock: {
      name: 'Best Time to Buy and Sell Stock',
      code: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }
  return maxProfit;
}`,
      input: { 
        type: 'normal',
        prices: [7, 1, 5, 3, 6, 4] 
      },
      examples: {
        normal: [7, 1, 5, 3, 6, 4],
        medium: [3, 8, 1, 4, 9, 2, 7],
        worst: [9, 8, 7, 6, 5, 4, 3, 2, 1],
        volatile: [2, 4, 1, 7, 5, 11, 3]
      }
    },
    dailyTemperatures: {
      name: 'Daily Temperatures',
      code: `function dailyTemperatures(temperatures) {
  const result = Array(temperatures.length).fill(0);
  const stack = [];
  
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = i - idx;
    }
    stack.push(i);
  }
  return result;
}`,
      input: { 
        type: 'normal',
        temperatures: [73, 74, 75, 71, 69, 72, 76, 73] 
      },
      examples: {
        normal: [73, 74, 75, 71, 69, 72, 76, 73],
        medium: [30, 40, 50, 60, 70, 80, 90],
        worst: [90, 80, 70, 60, 50, 40, 30],
        fluctuating: [89, 62, 70, 58, 47, 47, 46, 76, 100, 70]
      }
    },
    evaluateRPN: {
      name: 'Evaluate Reverse Polish Notation',
      code: `function evalRPN(tokens) {
  const stack = [];
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b)
  };
  
  for (let token of tokens) {
    if (operators[token]) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(operators[token](a, b));
    } else {
      stack.push(parseInt(token));
    }
  }
  return stack[0];
}`,
      input: { 
        type: 'normal',
        tokens: ['2', '1', '+', '3', '*']
      },
      examples: {
        normal: ['2', '1', '+', '3', '*'],
        medium: ['4', '13', '5', '/', '+'],
        complex: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'],
        negative: ['3', '11', '+', '5', '-']
      }
    },
    largestRectangleHistogram: {
      name: 'Largest Rectangle In Histogram',
      code: `function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    
    while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}`,
      input: { 
        type: 'normal',
        heights: [2, 1, 5, 6, 2, 3]
      },
      examples: {
        normal: [2, 1, 5, 6, 2, 3],
        medium: [2, 4, 3, 5, 1, 3, 6, 2],
        worst: [1, 1, 1, 1, 1],
        increasing: [1, 2, 3, 4, 5, 6]
      }
    },
    search2DMatrix: {
      name: 'Search a 2D Matrix',
      code: `function searchMatrix(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0, right = m * n - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midVal = matrix[Math.floor(mid / n)][mid % n];
    
    if (midVal === target) {
      return true;
    } else if (midVal < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return false;
}`,
      input: { 
        type: 'normal',
        matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]],
        target: 3
      },
      examples: {
        normal: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 3 },
        medium: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 13 },
        found: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 60 },
        notfound: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 100 }
      }
    },
    kokoEatingBananas: {
      name: 'Koko Eating Bananas',
      code: `function minEatingSpeed(piles, h) {
  let left = 1, right = Math.max(...piles);
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    let hours = 0;
    
    for (let pile of piles) {
      hours += Math.ceil(pile / mid);
    }
    
    if (hours <= h) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}`,
      input: { 
        type: 'normal',
        piles: [3, 6, 7, 11],
        h: 8
      },
      examples: {
        normal: { piles: [3, 6, 7, 11], h: 8 },
        medium: { piles: [30, 11, 23, 4, 20], h: 5 },
        tight: { piles: [30, 11, 23, 4, 20], h: 6 },
        easy: { piles: [3, 6, 7, 11], h: 20 }
      }
    },
    findMinRotatedArray: {
      name: 'Find Minimum In Rotated Sorted Array',
      code: `function findMin(nums) {
  let left = 0, right = nums.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
}`,
      input: { 
        type: 'normal',
        nums: [3, 4, 5, 1, 2]
      },
      examples: {
        normal: [3, 4, 5, 1, 2],
        medium: [4, 5, 6, 7, 0, 1, 2],
        norotate: [1, 2, 3, 4, 5],
        singlerotate: [2, 1]
      }
    },
    timeBasedKV: {
      name: 'Time Based Key-Value Store',
      code: `class TimeMap {
  constructor() {
    this.store = new Map();
  }
  
  set(key, value, timestamp) {
    if (!this.store.has(key)) {
      this.store.set(key, []);
    }
    this.store.get(key).push([timestamp, value]);
  }
  
  get(key, timestamp) {
    if (!this.store.has(key)) return "";
    const values = this.store.get(key);
    let left = 0, right = values.length - 1;
    let result = "";
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (values[mid][0] <= timestamp) {
        result = values[mid][1];
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  }
}`,
      input: { 
        type: 'normal',
        operations: [
          ['set', 'foo', 'bar', 1],
          ['set', 'foo', 'bar2', 4],
          ['get', 'foo', 1],
          ['get', 'foo', 3],
          ['set', 'foo', 'bar3', 4],
          ['get', 'foo', 4],
          ['get', 'foo', 5]
        ]
      },
      examples: {
        normal: [
          ['set', 'foo', 'bar', 1],
          ['set', 'foo', 'bar2', 4],
          ['get', 'foo', 1],
          ['get', 'foo', 3],
          ['set', 'foo', 'bar3', 4],
          ['get', 'foo', 4],
          ['get', 'foo', 5]
        ],
        multiple: [
          ['set', 'love', 'high', 10],
          ['set', 'love', 'low', 20],
          ['get', 'love', 5],
          ['get', 'love', 10],
          ['get', 'love', 15],
          ['get', 'love', 20],
          ['get', 'love', 25]
        ]
      }
    },
    reorderList: {
      name: 'Reorder List',
      code: `function reorderList(head) {
  if (!head || !head.next) return;
  
  // Find middle
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Reverse second half
  let prev = null, curr = slow.next;
  slow.next = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  
  // Merge two halves
  let first = head, second = prev;
  while (second) {
    const tmp1 = first.next;
    const tmp2 = second.next;
    first.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }
}`,
      input: { 
        type: 'normal',
        list: [1, 2, 3, 4, 5]
      },
      examples: {
        normal: [1, 2, 3, 4, 5],
        even: [1, 2, 3, 4],
        short: [1, 2, 3],
        two: [1, 2]
      }
    },
    medianTwoSortedArrays: {
      name: 'Median of Two Sorted Arrays',
      code: `function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  
  const m = nums1.length, n = nums2.length;
  let left = 0, right = m;
  
  while (left <= right) {
    const partition1 = Math.floor((left + right) / 2);
    const partition2 = Math.floor((m + n + 1) / 2) - partition1;
    
    const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
    const minRight1 = partition1 === m ? Infinity : nums1[partition1];
    const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
    const minRight2 = partition2 === n ? Infinity : nums2[partition2];
    
    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      if ((m + n) % 2 === 0) {
        return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
      } else {
        return Math.max(maxLeft1, maxLeft2);
      }
    } else if (maxLeft1 > minRight2) {
      right = partition1 - 1;
    } else {
      left = partition1 + 1;
    }
  }
}`,
      input: { 
        type: 'normal',
        nums1: [1, 3],
        nums2: [2]
      },
      examples: {
        normal: { nums1: [1, 3], nums2: [2] },
        medium: { nums1: [1, 2], nums2: [3, 4] },
        unequal: { nums1: [1, 3, 5, 7, 9], nums2: [2, 4, 6] },
        empty: { nums1: [], nums2: [1] }
      }
    },
    removeNthFromEnd: {
      name: 'Remove Nth Node From End of List',
      code: `function removeNthFromEnd(head, n) {
  const dummy = { val: 0, next: head };
  let fast = dummy, slow = dummy;
  
  // Move fast n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }
  
  // Move both until fast reaches end
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  
  // Remove the nth node
  slow.next = slow.next.next;
  return dummy.next;
}`,
      input: { 
        type: 'normal',
        list: [1, 2, 3, 4, 5],
        n: 2
      },
      examples: {
        normal: { list: [1, 2, 3, 4, 5], n: 2 },
        first: { list: [1, 2, 3, 4, 5], n: 5 },
        last: { list: [1, 2, 3, 4, 5], n: 1 },
        single: { list: [1], n: 1 }
      }
    },
    carFleet: {
      name: 'Car Fleet',
      code: `function carFleet(target, position, speed) {
  const cars = position.map((pos, i) => ({
    position: pos,
    speed: speed[i],
    time: (target - pos) / speed[i]
  })).sort((a, b) => b.position - a.position);
  
  const stack = [];
  for (let car of cars) {
    if (stack.length === 0 || car.time > stack[stack.length - 1]) {
      stack.push(car.time);
    }
  }
  return stack.length;
}`,
      input: { 
        type: 'normal',
        target: 12,
        position: [10, 8, 0, 5, 3],
        speed: [2, 4, 1, 1, 3]
      },
      examples: {
        normal: { target: 12, position: [10, 8, 0, 5, 3], speed: [2, 4, 1, 1, 3] },
        simple: { target: 10, position: [0, 4, 2], speed: [2, 1, 3] },
        nofleet: { target: 100, position: [0, 2, 4], speed: [4, 2, 1] },
        onefleet: { target: 10, position: [3], speed: [3] }
      }
    },
    taskScheduler: {
      name: 'Task Scheduler',
      code: `function leastInterval(tasks, n) {
  const freq = new Map();
  for (let task of tasks) {
    freq.set(task, (freq.get(task) || 0) + 1);
  }
  
  const maxFreq = Math.max(...freq.values());
  const maxCount = Array.from(freq.values()).filter(f => f === maxFreq).length;
  
  const partCount = maxFreq - 1;
  const partLength = n - (maxCount - 1);
  const emptySlots = partCount * partLength;
  const availableTasks = tasks.length - maxFreq * maxCount;
  const idles = Math.max(0, emptySlots - availableTasks);
  
  return tasks.length + idles;
}`,
      input: { 
        type: 'normal',
        tasks: ['A','A','A','B','B','B'],
        n: 2
      },
      examples: {
        normal: { tasks: ['A','A','A','B','B','B'], n: 2 },
        noidle: { tasks: ['A','A','A','B','B','B','C','C','C','D','D','E'], n: 2 },
        longidle: { tasks: ['A','A','A','B','B','B'], n: 3 },
        simple: { tasks: ['A','B','C','D','E','A','B','C'], n: 2 }
      }
    }
  };