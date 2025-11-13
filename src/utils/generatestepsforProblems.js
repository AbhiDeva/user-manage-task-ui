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
import { generateNQueensSteps } from '../components/visualiser/NQueenSteps';
import { generateWordSearchSteps } from '../components/visualiser/WordSearchSteps';
import { generateBinaryTreeInorderSteps } from '../components/visualiser/BinaryTreeInorderSteps';
import { generateValidateBSTSteps } from '../components/visualiser/ValidateBSTSteps';
import { generateLCASteps } from '../components/visualiser/LCASteps';
import { generateKthSmallestSteps } from '../components/visualiser/KthSmallestSteps';
import { generatePermutationsSteps } from '../components/visualiser/PermutationsSteps';
import { generateCombinationsSteps } from '../components/visualiser/CombinationsSteps';
import { generateSubsetsSteps } from '../components/visualiser/SubsetsSteps';
import { generateKnapsackSteps } from '../components/visualiser/KnapsackSteps';
import { generateEditDistanceSteps } from '../components/visualiser/EditDistanceSteps';
import { generateLISSteps } from '../components/visualiser/LISSteps';
import { generateDijkstraSteps } from '../components/visualiser/DijkstraSteps';
import { generateTrieSteps } from '../components/visualiser/TrieSteps';
import { generateUnionFindSteps } from '../components/visualiser/UnionFindSteps';
import { generateSegmentTreeSteps } from '../components/visualiser/SegmentTreeSteps';
import { generateKruskalSteps } from '../components/visualiser/KruskalSteps';
import { generateTopologicalSortSteps } from '../components/visualiser/TopologicalSortSteps';
import { generateBellmanFordSteps } from '../components/visualiser/BellmanFordSteps';
import { generateHuffmanCodingSteps } from '../components/visualiser/HuffmanCodingSteps';
import { generateAStarSteps } from '../components/visualiser/AStarSteps';
import { generateMaxFlowSteps } from '../components/visualiser/MaxFlowSteps';
import { generateContainsDuplicateSteps } from '../components/visualiser/ContainsDuplicateSteps';
import { generateValidAnagramSteps } from '../components/visualiser/ValidAnagramSteps';
import { generateGroupAnagramsSteps } from '../components/visualiser/GroupsAnagramSteps';
import { generateContainerWithMostWaterSteps } from '../components/visualiser/ContainerWithMostWaterSteps';
import { generateValidSudokuSteps } from '../components/visualiser/ValidSudokuSteps';

import { generateDailyTemperaturesSteps } from '../components/visualiser/DailyTemperatureSteps';
import { generateBestTimeToBuyStockSteps } from '../components/visualiser/BestTimeToBuyStockSteps';
import { generateThreeSumSteps } from '../components/visualiser/ThreeSumSteps';
import { generateTwoSumIISteps } from '../components/visualiser/TwoSumIISteps';
import { generateEncodeDecodeSteps } from '../components/visualiser/EncodeDecodeSteps';
import { generateEvaluateRPNSteps } from '../components/visualiser/EvaluateRPNSteps';
import { generateLargestRectangleSteps } from '../components/visualiser/LargestRectangleSteps';
import { generateSearch2DMatrixSteps } from '../components/visualiser/Search2DMatrixSteps';
import { generateKokoEatingBananasSteps } from '../components/visualiser/KokoEatingBananasSteps';
import { generateFindMinRotatedArraySteps } from '../components/visualiser/FindMinRotatedArraySteps';
import { generateTimeBasedKVSteps } from '../components/visualiser/TimeBasedKVSteps';
import { generateReorderListSteps } from '../components/visualiser/ReorderListSteps';
import { generateMedianTwoSortedArraysSteps } from '../components/visualiser/MedianTwoSortedArraysSteps';
import { generateRemoveNthFromEndSteps } from '../components/visualiser/RemoveNthFromEndSteps';
import { generateCarFleetSteps } from '../components/visualiser/CarFleetSteps';
import { generateTaskSchedulerSteps } from '../components/visualiser/TaskSchedulerSteps';
import { generateCopyRandomListSteps } from '../components/visualiser/CopyRandomListSteps';

import { generateLRUCacheSteps } from '../components/visualiser/LRUCacheSteps';
import { generateMergeKListsSteps } from '../components/visualiser/MergeKListsSteps';
import { generateReverseKGroupSteps } from '../components/visualiser/ReverseKGroupSteps';
import { generateInvertTreeSteps } from '../components/visualiser/InvertTreeSteps';

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
      case 'evaluateRPN':
        return generateEvaluateRPNSteps(input.type ? sampleProblems.evaluateRPN.examples[input.type] : input.tokens);
      case 'largestRectangleHistogram':
        return generateLargestRectangleSteps(input.type ? sampleProblems.largestRectangleHistogram.examples[input.type] : input.heights);
      case 'search2DMatrix':
        return generateSearch2DMatrixSteps(input.type ? sampleProblems.search2DMatrix.examples[input.type] : input);
      case 'kokoEatingBananas':
        return generateKokoEatingBananasSteps(input.type ? sampleProblems.kokoEatingBananas.examples[input.type] : input);
      case 'findMinRotatedArray':
        return generateFindMinRotatedArraySteps(input.type ? sampleProblems.findMinRotatedArray.examples[input.type] : input.nums);
      case 'timeBasedKV':
        return generateTimeBasedKVSteps(input.type ? sampleProblems.timeBasedKV.examples[input.type] : input.operations);
      case 'reorderList':
        return generateReorderListSteps(input.type ? sampleProblems.reorderList.examples[input.type] : input.list);
      case 'medianTwoSortedArrays':
        return generateMedianTwoSortedArraysSteps(input.type ? sampleProblems.medianTwoSortedArrays.examples[input.type] : input);
      case 'removeNthFromEnd':
        return generateRemoveNthFromEndSteps(input.type ? sampleProblems.removeNthFromEnd.examples[input.type] : input);
      case 'carFleet':
        return generateCarFleetSteps(input.type ? sampleProblems.carFleet.examples[input.type] : input);
      case 'taskScheduler':
        return generateTaskSchedulerSteps(input.type ? sampleProblems.taskScheduler.examples[input.type] : input);
      case 'copyRandomList':
        return generateCopyRandomListSteps(input.type ? sampleProblems.copyRandomList.examples[input.type] : input.nodes);
       case 'lruCache':
        return generateLRUCacheSteps(input.type ? sampleProblems.lruCache.examples[input.type] : input);
      case 'mergeKLists':
        return generateMergeKListsSteps(input.type ? sampleProblems.mergeKLists.examples[input.type] : input.lists);
      case 'reverseKGroup':
        return generateReverseKGroupSteps(input.type ? sampleProblems.reverseKGroup.examples[input.type] : input);
      case 'invertTree':
        return generateInvertTreeSteps(input.type ? sampleProblems.invertTree.examples[input.type] : input.tree);
        default:
        return [];
    }
  };
