import { generateTwoSumSteps } from '../components/visualiser/TwoSumSteps';
import { generateKMPSteps } from '../components/visualiser/KMPSteps';
import { generateBinarySearchSteps } from '../components/visualiser/BinarySearchSteps';
import { generateReverseListSteps } from '../components/visualiser/ReverseListSteps';
import { generateBubbleSortSteps } from '../components/visualiser/BubbleSortSteps';
import { generateMaxSubarraySteps } from '../components/visualiser/MaxSubarraySteps';
import { generateValidParenthesesSteps } from '../components/visualiser/ValidParenthesesSteps';
import { generateMergeSortedArraysSteps } from '../components/visualiser/MergeSortedArraysSteps';
import { generateClimbingStairsSteps } from '../components/visualiser/ClimbingStairsSteps';
import { generateQuickSortSteps } from '../components/visualiser/QuickSortSteps';
import { generateSlidingWindowSteps } from '../components/visualiser/SlidingWindowSteps';
import { generateBFSSteps } from '../components/visualiser/BFSSteps';
import { generateDFSSteps } from '../components/visualiser/DFSSteps';
import { generateLongestSubstringSteps } from '../components/visualiser/LongestSubstringSteps';
import { generateCoinChangeSteps } from '../components/visualiser/CoinChangeSteps';
import { generateRotateArraySteps } from '../components/visualiser/RotateArraySteps';
import { generateMergeSortSteps } from '../components/visualiser/MergeSortSteps';
import { generatePalindromeSteps } from '../components/visualiser/PalindromeSteps';
import { generateFloydCycleSteps } from '../components/visualiser/FloydCycleSteps';
import { generateHouseRobberSteps } from '../components/visualiser/HouseRobberSteps';
import { generateProductExceptSelfSteps } from '../components/visualiser/ProductExceptSelfSteps';
import { generateTrappingRainWaterSteps } from '../components/visualiser/TrappingRainWaterSteps';
import { generateJumpGameSteps } from '../components/visualiser/JumpGameSteps';
import { generateTopKFrequentSteps } from '../components/visualiser/TopKFrequentSteps';
import { generateLongestPalindromeSteps } from '../components/visualiser/LongestPalindromeSteps';
//import { generateNQueensSteps } from '../components/visualiser/NQueensSteps';
import { generateWordSearchSteps } from '../components/visualiser/WordSearchSteps';
import { generateBinaryTreeInorderSteps } from '../components/visualiser/BinaryTreeInorderSteps';
import { generateValidateBSTSteps } from '../components/visualiser/ValidateBSTSteps';
//import { generateLCASteps } from '../components/visualiser/LowestCommonAncestorSteps';
//import { generateKthSmallestSteps } from '../components/visualiser/KthSmallestBSTSteps';
import { generatePermutationsSteps } from '../components/visualiser/PermutationsSteps';
import { generateCombinationsSteps } from '../components/visualiser/CombinationsSteps';
import { generateSubsetsSteps } from '../components/visualiser/SubsetsSteps';
//import { generateKnapsackSteps } from '../components/visualiser/Knapsack01Steps';
import { generateEditDistanceSteps } from '../components/visualiser/EditDistanceSteps';
//import { generateLISSteps } from '../components/visualiser/LongestIncreasingSubsequenceSteps';
import { generateDijkstraSteps } from '../components/visualiser/DijkstraSteps';
//import { generateTrieSteps } from '../components/visualiser/TrieImplementationSteps';
import { generateUnionFindSteps } from '../components/visualiser/UnionFindSteps';
import { generateSegmentTreeSteps } from '../components/visualiser/SegmentTreeSteps';
import { generateKruskalSteps } from '../components/visualiser/KruskalSteps';
import { generateTopologicalSortSteps } from '../components/visualiser/TopologicalSortSteps';
import { generateBellmanFordSteps } from '../components/visualiser/BellmanFordSteps';
import { generateHuffmanCodingSteps } from '../components/visualiser/HuffmanCodingSteps';
//import { generateAStarSteps } from '../components/visualiser/AStarSearchSteps';
import { generateMaxFlowSteps } from '../components/visualiser/MaxFlowSteps';
import { generateContainsDuplicateSteps } from '../components/visualiser/ContainsDuplicateSteps';
import { generateValidAnagramSteps } from '../components/visualiser/ValidAnagramSteps';
//import { generateGroupAnagramsSteps } from '../components/visualiser/GroupAnagramsSteps';
import { generateContainerWithMostWaterSteps } from '../components/visualiser/ContainerWithMostWaterSteps';
import { generateValidSudokuSteps } from '../components/visualiser/ValidSudokuSteps';

import { generateDailyTemperaturesSteps } from '../components/visualiser/DailyTemperatureSteps';
import { generateBestTimeToBuyStockSteps } from '../components/visualiser/BestTimeToBuyStockSteps';
import { generateThreeSumSteps } from '../components/visualiser/ThreeSumSteps';
import { generateTwoSumIISteps } from '../components/visualiser/TwoSumIISteps';
import { generateEncodeDecodeSteps } from '../components/visualiser/EncodeDecodeSteps';

import {sampleProblems} from '../utils/codedata.js'


export const generateSteps = (problemKey, input) => {
    switch (problemKey) {
      case 'twoSum':
        return generateTwoSumSteps(input.nums, input.target);
      case 'binarySearch':
        return generateBinarySearchSteps(input.nums, input.target);
      case 'reverseLinkedList':
        return generateReverseListSteps(input.list);
      case 'bubbleSort':
        return generateBubbleSortSteps(input.nums);
      case 'maxSubarray':
        return generateMaxSubarraySteps(input.nums);
      case 'validParentheses':
        return generateValidParenthesesSteps(input.string);
      case 'mergeSortedArrays':
        return generateMergeSortedArraysSteps(input.arr1, input.arr2);
      case 'climbingStairs':
        return generateClimbingStairsSteps(input.n);
      case 'quickSort':
        return generateQuickSortSteps(input.nums);
      case 'slidingWindow':
        return generateSlidingWindowSteps(input.nums, input.k);
      case 'bfs':
        return generateBFSSteps(input.graph, input.start);
      case 'dfs':
        return generateDFSSteps(input.graph, input.start);
      case 'longestSubstring':
        return generateLongestSubstringSteps(input.string);
      case 'coinChange':
        return generateCoinChangeSteps(input.coins, input.amount);
      case 'rotateArray':
        return generateRotateArraySteps(input.nums, input.k);
      case 'mergeSort':
        return generateMergeSortSteps(input.nums);
      case 'isPalindrome':
        return generatePalindromeSteps(input.string);
      case 'findDuplicate':
        return generateFloydCycleSteps(input.nums);
      case 'houseRobber':
        return generateHouseRobberSteps(input.nums);
      case 'productExceptSelf':
        return generateProductExceptSelfSteps(input.nums);
      case 'trappingRainWater':
        return generateTrappingRainWaterSteps(input.nums);
      case 'jumpGame':
        return generateJumpGameSteps(input.nums);
      case 'topKFrequent':
        return generateTopKFrequentSteps(input.nums, input.k);
      case 'longestPalindrome':
        return generateLongestPalindromeSteps(input.string);
      case 'nQueens':
        return generateNQueensSteps(input.n);
      case 'wordSearch':
        return generateWordSearchSteps(input.board, input.word);
      case 'binaryTreeInorder':
        return generateBinaryTreeInorderSteps(input.tree);
      case 'validateBST':
        return generateValidateBSTSteps(input.tree);
      case 'lowestCommonAncestor':
        return generateLCASteps(input.tree, input.p, input.q);
      case 'kthSmallestBST':
        return generateKthSmallestSteps(input.tree, input.k);
      case 'permutations':
        return generatePermutationsSteps(input.nums);
      case 'combinations':
        return generateCombinationsSteps(input.n, input.k);
      case 'subsets':
        return generateSubsetsSteps(input.nums);
      case 'knapsack01':
        return generateKnapsackSteps(input.weights, input.values, input.capacity);
      case 'editDistance':
        return generateEditDistanceSteps(input.word1, input.word2);
      case 'longestIncreasingSubsequence':
        return generateLISSteps(input.nums);
      case 'dijkstra':
        return generateDijkstraSteps(input.graph, input.start);
      case 'trieImplementation':
        return generateTrieSteps(input.words, input.search);
      case 'unionFind':
        return generateUnionFindSteps(input.n, input.edges);
      case 'segmentTree':
        return generateSegmentTreeSteps(input.arr, input.query);
      case 'kruskal':
        return generateKruskalSteps(input.n, input.edges);
      case 'topologicalSort':
        return generateTopologicalSortSteps(input.graph);
      case 'bellmanFord':
        return generateBellmanFordSteps(input.n, input.edges, input.start);
      case 'huffmanCoding':
        return generateHuffmanCodingSteps(input.freq);
      case 'aStarSearch':
        return generateAStarSteps(input.grid, input.start, input.goal);
      case 'maxFlow':
        return generateMaxFlowSteps(input.graph, input.source, input.sink);
      case 'kmp':
        return generateKMPSteps(input.text, input.pattern);
      case 'containsDuplicate':
        return generateContainsDuplicateSteps(input.nums);
      case 'validAnagram':
        return generateValidAnagramSteps(input.s, input.t);
      case 'groupAnagrams':
        return generateGroupAnagramsSteps(input.strs);
      case 'containerWithMostWater':
        return generateContainerWithMostWaterSteps(input.height);
      case 'validSudoku':
        return generateValidSudokuSteps(input.board);
       case 'encodeDecodeStrings':
        return generateEncodeDecodeSteps(input.type ? sampleProblems.encodeDecodeStrings.examples[input.type] : input.strs);
      case 'twoSumII':
        return generateTwoSumIISteps(input.type ? sampleProblems.twoSumII.examples[input.type] : input);
      case 'threeSum':
        return generateThreeSumSteps(input.type ? sampleProblems.threeSum.examples[input.type] : input.nums);
      case 'bestTimeToBuyStock':
        return generateBestTimeToBuyStockSteps(input.type ? sampleProblems.bestTimeToBuyStock.examples[input.type] : input.prices);
      case 'dailyTemperatures':
        return generateDailyTemperaturesSteps(input.type ? sampleProblems.dailyTemperatures.examples[input.type] : input.temperatures);
      default:
        return [];
    }
  };
