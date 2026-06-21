export type A2ZDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface A2ZProblem {
  id: string;
  name: string;
  difficulty: A2ZDifficulty;
  leetcode?: string;   // full LC URL
  note?: string;       // quick hint / pattern tag
}

export interface A2ZSubStep {
  id: string;
  title: string;
  problems: A2ZProblem[];
}

export interface A2ZStep {
  id: string;
  stepNo: number;
  title: string;
  subSteps: A2ZSubStep[];
}

// ─────────────────────────────────────────────────────────────────────────────
//  Helper to build IDs
// ─────────────────────────────────────────────────────────────────────────────
const p = (
  step: number,
  sub: number,
  num: number,
  name: string,
  difficulty: A2ZDifficulty,
  leetcode?: string,
  note?: string,
): A2ZProblem => ({
  id: `s${step}_${sub}_p${num}`,
  name,
  difficulty,
  leetcode,
  note,
});

// ─────────────────────────────────────────────────────────────────────────────
//  THE COMPLETE STRIVER A2Z SHEET
// ─────────────────────────────────────────────────────────────────────────────
export const A2Z_SHEET: A2ZStep[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 1 — Learn the Basics
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's1', stepNo: 1, title: 'Learn the Basics',
    subSteps: [
      {
        id: 's1_1', title: '1.1 · Things to Know (C++ / Java / Python)',
        problems: [
          p(1,1,1,'User Input / Output','Easy',undefined,'scanf/cin, printf/cout'),
          p(1,1,2,'Data Types','Easy',undefined,'int, long, float, double, char'),
          p(1,1,3,'If-Else Statements','Easy',undefined,'Conditional branching'),
          p(1,1,4,'Switch Statements','Easy',undefined,'Multi-branch selector'),
          p(1,1,5,'Arrays & Strings','Easy',undefined,'Basics of 1-D arrays and char arrays'),
          p(1,1,6,'For Loops','Easy',undefined,'Iteration'),
          p(1,1,7,'While Loops','Easy',undefined,'Iteration'),
          p(1,1,8,'Functions (recursive)','Easy',undefined,'Call stack, base case, recursion'),
          p(1,1,9,'Time Complexity Basics','Easy',undefined,'Big-O, Big-Theta, Big-Omega'),
        ],
      },
      {
        id: 's1_2', title: '1.2 · Build-Up Logical Thinking (Patterns)',
        problems: [
          p(1,2,1,'Pattern 1 – Rectangular Star','Easy',undefined,'Nested loops'),
          p(1,2,2,'Pattern 2 – Right Triangle Star','Easy',undefined,'Nested loops'),
          p(1,2,3,'Pattern 3 – Right Triangle Numbers','Easy',undefined,'Nested loops'),
          p(1,2,4,'Pattern 4 – Right Triangle Same Numbers','Easy',undefined,''),
          p(1,2,5,'Pattern 5 – Inverted Right Triangle Star','Easy',undefined,''),
          p(1,2,6,'Pattern 6 – Inverted Right Triangle Numbers','Easy',undefined,''),
          p(1,2,7,'Pattern 7 – Pyramid Star','Easy',undefined,'Spaces + stars'),
          p(1,2,8,'Pattern 8 – Inverted Pyramid Star','Easy',undefined,''),
          p(1,2,9,'Pattern 9 – Diamond Star','Easy',undefined,'Pyramid + inverted'),
          p(1,2,10,'Pattern 10 – Half Diamond','Easy',undefined,''),
          p(1,2,11,'Pattern 11 – Binary Triangle','Easy',undefined,'0s and 1s alternating'),
          p(1,2,12,'Pattern 12 – Number Crown','Easy',undefined,''),
          p(1,2,13,'Pattern 13 – Increasing Numbers','Easy',undefined,''),
          p(1,2,14,'Pattern 14 – Increasing Letters','Easy',undefined,''),
          p(1,2,15,'Pattern 15 – Inverted Increasing Letters','Easy',undefined,''),
          p(1,2,16,'Pattern 16 – Alpha Triangle','Easy',undefined,''),
          p(1,2,17,'Pattern 17 – Alpha Hill','Easy',undefined,''),
          p(1,2,18,'Pattern 18 – Alpha Triangle (rev)','Easy',undefined,''),
          p(1,2,19,'Pattern 19 – Symmetric Void','Easy',undefined,''),
          p(1,2,20,'Pattern 20 – Symmetric Star Butterflies','Easy',undefined,''),
          p(1,2,21,'Pattern 21 – Hollow Rectangle Star','Easy',undefined,''),
          p(1,2,22,'Pattern 22 – The Number Pattern','Easy',undefined,''),
        ],
      },
      {
        id: 's1_3', title: '1.3 · Learn STL / Collections / Python STL',
        problems: [
          p(1,3,1,'C++ STL – Pairs','Easy',undefined,'make_pair'),
          p(1,3,2,'C++ STL – Vectors','Easy',undefined,'push_back, pop_back, size'),
          p(1,3,3,'C++ STL – List','Easy',undefined,'Doubly linked'),
          p(1,3,4,'C++ STL – Deque','Easy',undefined,'push_front, push_back'),
          p(1,3,5,'C++ STL – Stack','Easy',undefined,'LIFO'),
          p(1,3,6,'C++ STL – Queue','Easy',undefined,'FIFO'),
          p(1,3,7,'C++ STL – Priority Queue','Easy',undefined,'Max / min heap'),
          p(1,3,8,'C++ STL – Set / Multiset','Easy',undefined,'Ordered unique'),
          p(1,3,9,'C++ STL – Map / Multimap','Easy',undefined,'Key-value ordered'),
          p(1,3,10,'C++ STL – Unordered Set / Map','Easy',undefined,'Hash-based O(1)'),
        ],
      },
      {
        id: 's1_4', title: '1.4 · Know Basic Maths',
        problems: [
          p(1,4,1,'Count Digits in a Number','Easy',undefined,'Modulo and division'),
          p(1,4,2,'Reverse a Number','Easy',undefined,'Digit extraction'),
          p(1,4,3,'Check Palindrome Number','Easy','https://leetcode.com/problems/palindrome-number/','Reverse and compare'),
          p(1,4,4,'GCD / HCF of Two Numbers','Easy',undefined,'Euclidean algorithm'),
          p(1,4,5,'Armstrong Numbers','Easy',undefined,'Sum of cubes of digits'),
          p(1,4,6,'Print All Divisors of a Number','Easy',undefined,'Loop till sqrt(n)'),
          p(1,4,7,'Check for Prime','Easy',undefined,'Trial division up to sqrt'),
        ],
      },
      {
        id: 's1_5', title: '1.5 · Learn Basic Recursion',
        problems: [
          p(1,5,1,'Print 1 to N using Recursion','Easy',undefined,'Base case: n > N'),
          p(1,5,2,'Print N to 1 using Recursion','Easy',undefined,''),
          p(1,5,3,'Sum of First N Numbers','Easy',undefined,''),
          p(1,5,4,'Factorial of N','Easy',undefined,''),
          p(1,5,5,'Reverse an Array','Easy',undefined,'Two-pointer recursion'),
          p(1,5,6,'Check if String is Palindrome','Easy','https://leetcode.com/problems/valid-palindrome/',''),
          p(1,5,7,'Fibonacci Number','Easy','https://leetcode.com/problems/fibonacci-number/','Memoise for efficiency'),
        ],
      },
      {
        id: 's1_6', title: '1.6 · Learn Basic Hashing',
        problems: [
          p(1,6,1,'Hashing Theory','Easy',undefined,'Collision, chaining, open addressing'),
          p(1,6,2,'Count Frequency of Each Element','Easy',undefined,'HashMap/array'),
          p(1,6,3,'Find the Highest/Lowest Frequency Element','Easy',undefined,'Iterate frequency map'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 2 — Sorting Techniques
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's2', stepNo: 2, title: 'Learn Important Sorting Techniques',
    subSteps: [
      {
        id: 's2_1', title: '2.1 · Sorting I',
        problems: [
          p(2,1,1,'Selection Sort','Easy',undefined,'Find min, swap to front'),
          p(2,1,2,'Bubble Sort','Easy',undefined,'Bubble largest to end'),
          p(2,1,3,'Insertion Sort','Easy',undefined,'Insert into sorted prefix'),
        ],
      },
      {
        id: 's2_2', title: '2.2 · Sorting II',
        problems: [
          p(2,2,1,'Merge Sort','Medium',undefined,'Divide & conquer O(n log n)'),
          p(2,2,2,'Recursive Bubble Sort','Easy',undefined,''),
          p(2,2,3,'Recursive Insertion Sort','Easy',undefined,''),
          p(2,2,4,'Quick Sort','Medium',undefined,'Pivot partitioning O(n log n) avg'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 3 — Arrays
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's3', stepNo: 3, title: 'Solve Problems on Arrays',
    subSteps: [
      {
        id: 's3_1', title: '3.1 · Easy',
        problems: [
          p(3,1,1,'Largest Element in an Array','Easy',undefined,'Single pass'),
          p(3,1,2,'Second Largest Element (no sort)','Easy',undefined,'Two-pass or one-pass'),
          p(3,1,3,'Check if Array is Sorted','Easy','https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/',''),
          p(3,1,4,'Remove Duplicates from Sorted Array','Easy','https://leetcode.com/problems/remove-duplicates-from-sorted-array/','Two pointers'),
          p(3,1,5,'Left Rotate Array by One Place','Easy',undefined,'Store first, shift left'),
          p(3,1,6,'Left Rotate Array by D Places','Medium',undefined,'Reversal algorithm'),
          p(3,1,7,'Move Zeros to End','Easy','https://leetcode.com/problems/move-zeroes/','Two pointers'),
          p(3,1,8,'Linear Search','Easy',undefined,''),
          p(3,1,9,'Union of Two Sorted Arrays','Medium',undefined,'Two-pointer merge'),
          p(3,1,10,'Find Missing Number in Array','Easy','https://leetcode.com/problems/missing-number/','XOR or sum formula'),
          p(3,1,11,'Maximum Consecutive Ones','Easy','https://leetcode.com/problems/max-consecutive-ones/',''),
          p(3,1,12,'Find Number that Appears Once','Easy','https://leetcode.com/problems/single-number/','XOR trick'),
          p(3,1,13,'Longest Subarray with Sum K (Positives)','Medium',undefined,'Sliding window'),
          p(3,1,14,'Longest Subarray with Sum K (Pos + Neg)','Medium',undefined,'Prefix sum + HashMap'),
        ],
      },
      {
        id: 's3_2', title: '3.2 · Medium',
        problems: [
          p(3,2,1,'Two Sum','Medium','https://leetcode.com/problems/two-sum/','HashMap O(n)'),
          p(3,2,2,'Sort Array of 0s 1s and 2s','Medium','https://leetcode.com/problems/sort-colors/','Dutch National Flag'),
          p(3,2,3,'Majority Element (> N/2 times)','Medium','https://leetcode.com/problems/majority-element/','Boyer-Moore Voting'),
          p(3,2,4,"Kadane's Algorithm – Max Subarray Sum",'Medium','https://leetcode.com/problems/maximum-subarray/','Reset curr to 0 if negative'),
          p(3,2,5,'Stock Buy and Sell','Medium','https://leetcode.com/problems/best-time-to-buy-and-sell-stock/','Track min price'),
          p(3,2,6,'Rearrange Alternating Positive & Negative','Medium','https://leetcode.com/problems/rearrange-array-elements-by-sign/',''),
          p(3,2,7,'Next Permutation','Medium','https://leetcode.com/problems/next-permutation/','Find breakpoint, swap, reverse suffix'),
          p(3,2,8,'Leaders in an Array','Medium',undefined,'Traverse from right'),
          p(3,2,9,'Longest Consecutive Sequence','Medium','https://leetcode.com/problems/longest-consecutive-sequence/','HashSet O(n)'),
          p(3,2,10,'Set Matrix Zeros','Medium','https://leetcode.com/problems/set-matrix-zeroes/','Use first row/col as flags'),
          p(3,2,11,'Rotate Matrix 90 Degrees','Medium','https://leetcode.com/problems/rotate-image/','Transpose + reverse rows'),
          p(3,2,12,'Print Matrix in Spiral Order','Medium','https://leetcode.com/problems/spiral-matrix/',''),
          p(3,2,13,'Count Subarrays with Given Sum','Medium','https://leetcode.com/problems/subarray-sum-equals-k/','Prefix sum + HashMap'),
        ],
      },
      {
        id: 's3_3', title: '3.3 · Hard',
        problems: [
          p(3,3,1,"Pascal's Triangle",'Medium','https://leetcode.com/problems/pascals-triangle/','nCr formula or DP'),
          p(3,3,2,'Majority Element (N/3 times)','Medium','https://leetcode.com/problems/majority-element-ii/','Extended Boyer-Moore'),
          p(3,3,3,'3-Sum Problem','Hard','https://leetcode.com/problems/3sum/','Sort + two pointers'),
          p(3,3,4,'4-Sum Problem','Hard','https://leetcode.com/problems/4sum/','Sort + two pointers'),
          p(3,3,5,'Largest Subarray with Zero Sum','Medium',undefined,'Prefix sum + HashMap'),
          p(3,3,6,'Count Subarrays with XOR = K','Medium',undefined,'Prefix XOR + HashMap'),
          p(3,3,7,'Merge Overlapping Intervals','Medium','https://leetcode.com/problems/merge-intervals/','Sort by start, merge'),
          p(3,3,8,'Merge Two Sorted Arrays without Extra Space','Hard','https://leetcode.com/problems/merge-sorted-array/','Gap method or 3-pointer'),
          p(3,3,9,'Find the Repeating and Missing Numbers','Hard',undefined,'XOR or math'),
          p(3,3,10,'Count Inversions','Hard',undefined,'Merge sort trick'),
          p(3,3,11,'Reverse Pairs','Hard','https://leetcode.com/problems/reverse-pairs/','Modified merge sort'),
          p(3,3,12,'Maximum Product Subarray','Medium','https://leetcode.com/problems/maximum-product-subarray/','Track min/max'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 4 — Binary Search
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's4', stepNo: 4, title: 'Binary Search [1D, 2D, Search Space]',
    subSteps: [
      {
        id: 's4_1', title: '4.1 · BS on 1D Arrays',
        problems: [
          p(4,1,1,'Binary Search to Find X in Sorted Array','Easy','https://leetcode.com/problems/binary-search/','lo, hi, mid'),
          p(4,1,2,'Implement Lower Bound','Easy',undefined,'First pos ≥ target'),
          p(4,1,3,'Implement Upper Bound','Easy',undefined,'First pos > target'),
          p(4,1,4,'Search Insert Position','Easy','https://leetcode.com/problems/search-insert-position/','Lower bound'),
          p(4,1,5,'Floor and Ceil in Sorted Array','Easy',undefined,'Lower/upper bound variant'),
          p(4,1,6,'First and Last Occurrence of X','Easy','https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/','Two binary searches'),
          p(4,1,7,'Count Occurrences in Sorted Array','Easy',undefined,'last - first + 1'),
          p(4,1,8,'Search in Rotated Sorted Array I','Medium','https://leetcode.com/problems/search-in-rotated-sorted-array/','Check which half is sorted'),
          p(4,1,9,'Search in Rotated Sorted Array II','Medium','https://leetcode.com/problems/search-in-rotated-sorted-array-ii/','Duplicates edge case'),
          p(4,1,10,'Find Minimum in Rotated Sorted Array','Medium','https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',''),
          p(4,1,11,'How Many Times Array is Rotated','Easy',undefined,'Index of min element'),
          p(4,1,12,'Single Element in Sorted Array','Medium','https://leetcode.com/problems/single-element-in-a-sorted-array/','XOR or BS on pairs'),
          p(4,1,13,'Find Peak Element','Medium','https://leetcode.com/problems/find-peak-element/','BS on slope'),
        ],
      },
      {
        id: 's4_2', title: '4.2 · BS on Answers',
        problems: [
          p(4,2,1,'Square Root of a Number','Easy','https://leetcode.com/problems/sqrtx/','BS + overflow guard'),
          p(4,2,2,'Find Nth Root of a Number','Easy',undefined,'BS on answer'),
          p(4,2,3,'Koko Eating Bananas','Medium','https://leetcode.com/problems/koko-eating-bananas/','BS on speed'),
          p(4,2,4,'Minimum Days to Make M Bouquets','Medium','https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/','BS on days'),
          p(4,2,5,'Find the Smallest Divisor','Medium','https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/','BS on divisor'),
          p(4,2,6,'Capacity to Ship Packages in D Days','Medium','https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/','BS on capacity'),
          p(4,2,7,'Kth Missing Positive Number','Easy','https://leetcode.com/problems/kth-missing-positive-number/','BS on count of missing'),
          p(4,2,8,'Aggressive Cows','Hard',undefined,'BS on minimum distance'),
          p(4,2,9,'Book Allocation Problem','Hard',undefined,'BS on max pages'),
          p(4,2,10,'Split Array – Largest Sum','Hard','https://leetcode.com/problems/split-array-largest-sum/','BS on max subarray sum'),
          p(4,2,11,"Painter's Partition Problem",'Hard',undefined,'BS on max boards'),
          p(4,2,12,'Minimize Max Distance to Gas Station','Hard',undefined,'BS on answer'),
          p(4,2,13,'Median of Two Sorted Arrays','Hard','https://leetcode.com/problems/median-of-two-sorted-arrays/','BS on partition'),
          p(4,2,14,'Kth Element of Two Sorted Arrays','Medium',undefined,'BS on partition'),
        ],
      },
      {
        id: 's4_3', title: '4.3 · BS on 2D Arrays',
        problems: [
          p(4,3,1,'Row with Maximum Number of 1s','Medium',undefined,'Upper bound per row'),
          p(4,3,2,'Search in a 2D Matrix','Medium','https://leetcode.com/problems/search-a-2d-matrix/','Treat as 1D sorted'),
          p(4,3,3,'Search in a 2D Matrix II','Medium','https://leetcode.com/problems/search-a-2d-matrix-ii/','Start from top-right'),
          p(4,3,4,'Find Peak Element in 2D Matrix','Hard','https://leetcode.com/problems/find-a-peak-element-ii/','Binary search on columns'),
          p(4,3,5,'Matrix Median','Hard',undefined,'BS on value'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 5 — Strings
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's5', stepNo: 5, title: 'Strings [Basic and Medium]',
    subSteps: [
      {
        id: 's5_1', title: '5.1 · Basic & Easy String Problems',
        problems: [
          p(5,1,1,'Remove Outermost Parentheses','Easy','https://leetcode.com/problems/remove-outermost-parentheses/','Counter approach'),
          p(5,1,2,'Reverse Words in a String','Easy','https://leetcode.com/problems/reverse-words-in-a-string/','Split + reverse'),
          p(5,1,3,'Largest Odd Number in a String','Easy','https://leetcode.com/problems/largest-odd-number-in-a-string/','Scan from right'),
          p(5,1,4,'Longest Common Prefix','Easy','https://leetcode.com/problems/longest-common-prefix/','Vertical scan'),
          p(5,1,5,'Isomorphic Strings','Easy','https://leetcode.com/problems/isomorphic-strings/','Two HashMaps'),
          p(5,1,6,'Check if One String is Rotation of Another','Easy',undefined,'s1+s1 contains s2'),
          p(5,1,7,'Check if Two Strings are Anagram','Easy','https://leetcode.com/problems/valid-anagram/','Frequency array'),
        ],
      },
      {
        id: 's5_2', title: '5.2 · Medium String Problems',
        problems: [
          p(5,2,1,'Sort Characters by Frequency','Medium','https://leetcode.com/problems/sort-characters-by-frequency/','Bucket sort'),
          p(5,2,2,'Maximum Nesting Depth of Parentheses','Easy','https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/','Counter'),
          p(5,2,3,'Roman Number to Integer','Medium','https://leetcode.com/problems/roman-to-integer/','Map + look-ahead'),
          p(5,2,4,'Integer to Roman','Medium','https://leetcode.com/problems/integer-to-roman/','Greedy with value list'),
          p(5,2,5,'Implement ATOI / STRSTR','Medium','https://leetcode.com/problems/string-to-integer-atoi/','Edge-case heavy'),
          p(5,2,6,'Longest Palindromic Substring','Medium','https://leetcode.com/problems/longest-palindromic-substring/','Expand around center'),
          p(5,2,7,'Sum of Beauty of All Substrings','Medium','https://leetcode.com/problems/sum-of-beauty-of-all-substrings/','Frequency tracking'),
          p(5,2,8,'Minimum Bracket Reversals to Balance Expression','Hard',undefined,'Count open/close'),
          p(5,2,9,'Count and Say','Medium','https://leetcode.com/problems/count-and-say/','RLE simulation'),
          p(5,2,10,'Rabin-Karp / String Hashing','Hard',undefined,'Rolling hash'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 6 — Linked List
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's6', stepNo: 6, title: 'Learn LinkedList',
    subSteps: [
      {
        id: 's6_1', title: '6.1 · Singly Linked List Basics',
        problems: [
          p(6,1,1,'Introduction to LinkedList – struct, nodes','Easy',undefined,'head → node → null'),
          p(6,1,2,'Insert a Node in LinkedList','Easy',undefined,'Head / tail / middle'),
          p(6,1,3,'Delete a Node in LinkedList','Easy','https://leetcode.com/problems/delete-node-in-a-linked-list/',''),
          p(6,1,4,'Find Length of LinkedList','Easy',undefined,'Traverse and count'),
          p(6,1,5,'Search an Element in LinkedList','Easy',undefined,'Linear scan'),
        ],
      },
      {
        id: 's6_2', title: '6.2 · Doubly Linked List',
        problems: [
          p(6,2,1,'Introduction to Doubly Linked List','Easy',undefined,'prev & next pointers'),
          p(6,2,2,'Insert a Node in DLL','Easy',undefined,''),
          p(6,2,3,'Delete a Node in DLL','Easy',undefined,''),
          p(6,2,4,'Reverse a DLL','Easy',undefined,'Swap prev/next pointers'),
        ],
      },
      {
        id: 's6_3', title: '6.3 · Medium LL Problems',
        problems: [
          p(6,3,1,'Middle of a LinkedList','Easy','https://leetcode.com/problems/middle-of-the-linked-list/','Fast & slow pointers'),
          p(6,3,2,'Reverse a LinkedList','Easy','https://leetcode.com/problems/reverse-linked-list/','3-pointer or stack'),
          p(6,3,3,'Detect a Loop/Cycle in LL','Medium','https://leetcode.com/problems/linked-list-cycle/',"Floyd's cycle detection"),
          p(6,3,4,'Find Starting Point of Loop','Medium','https://leetcode.com/problems/linked-list-cycle-ii/',"Floyd's phase 2"),
          p(6,3,5,'Length of Loop in LL','Medium',undefined,'Count steps after detection'),
          p(6,3,6,'Check if LL is Palindrome','Medium','https://leetcode.com/problems/palindrome-linked-list/','Reverse second half'),
          p(6,3,7,'Segregate Odd and Even Nodes','Medium','https://leetcode.com/problems/odd-even-linked-list/','Two-pointer relink'),
          p(6,3,8,'Remove Nth Node from Back','Medium','https://leetcode.com/problems/remove-nth-node-from-end-of-list/','Two-pass or one-pass'),
          p(6,3,9,'Delete the Middle Node','Medium','https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/','Fast & slow'),
          p(6,3,10,'Sort Linked List','Medium','https://leetcode.com/problems/sort-list/','Merge sort O(n log n)'),
          p(6,3,11,'Sort LL of 0s 1s and 2s','Medium',undefined,'Count / relink'),
          p(6,3,12,'Find Intersection Point of Y LL','Easy','https://leetcode.com/problems/intersection-of-two-linked-lists/','Two-pointer sync'),
          p(6,3,13,'Add 1 to Number Represented as LL','Medium',undefined,'Reverse, add, reverse back'),
          p(6,3,14,'Add Two Numbers in LL','Medium','https://leetcode.com/problems/add-two-numbers/','Carry simulation'),
        ],
      },
      {
        id: 's6_4', title: '6.4 · Hard LL Problems',
        problems: [
          p(6,4,1,'Reverse LL in Groups of K','Hard','https://leetcode.com/problems/reverse-nodes-in-k-group/','Recursive / iterative'),
          p(6,4,2,'Rotate a LinkedList','Medium','https://leetcode.com/problems/rotate-list/','Connect tail to head'),
          p(6,4,3,'Flattening of LinkedList','Hard',undefined,'Merge sort approach'),
          p(6,4,4,'Clone a LL with Random Pointer','Hard','https://leetcode.com/problems/copy-list-with-random-pointer/','Interweave or HashMap'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 7 — Recursion [PatternWise]
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's7', stepNo: 7, title: 'Recursion [PatternWise]',
    subSteps: [
      {
        id: 's7_1', title: '7.1 · Get a Strong Hold',
        problems: [
          p(7,1,1,'Recursive Implementation of atoi()','Medium',undefined,'Digit by digit'),
          p(7,1,2,'Pow(x, n)','Medium','https://leetcode.com/problems/powx-n/','Fast power O(log n)'),
          p(7,1,3,'Count Good Numbers','Medium','https://leetcode.com/problems/count-good-numbers/','Math + fast pow'),
          p(7,1,4,'Sort a Stack using Recursion','Medium',undefined,'Insert in sorted position'),
          p(7,1,5,'Reverse a Stack using Recursion','Medium',undefined,'Push to bottom recursively'),
        ],
      },
      {
        id: 's7_2', title: '7.2 · Subsequences Pattern',
        problems: [
          p(7,2,1,'Generate All Binary Strings','Medium',undefined,'Pick 0 or 1 at each position'),
          p(7,2,2,'Generate Parentheses','Medium','https://leetcode.com/problems/generate-parentheses/','open count, close count'),
          p(7,2,3,'Print All Subsequences / Power Set','Medium','https://leetcode.com/problems/subsets/','Pick / not pick'),
          p(7,2,4,'Count All Subsequences with Sum K','Medium',undefined,'Pick / not pick with sum'),
          p(7,2,5,'Check if Subsequence with Sum K Exists','Easy',undefined,'Early exit on true'),
          p(7,2,6,'Combination Sum I','Medium','https://leetcode.com/problems/combination-sum/','Reuse allowed'),
          p(7,2,7,'Combination Sum II','Medium','https://leetcode.com/problems/combination-sum-ii/','No reuse, no dup'),
          p(7,2,8,'Subset Sum I','Medium',undefined,'All subset sums'),
          p(7,2,9,'Subsets II (No Duplicates)','Medium','https://leetcode.com/problems/subsets-ii/','Sort + skip dup'),
          p(7,2,10,'Combination Sum III','Medium','https://leetcode.com/problems/combination-sum-iii/','k numbers sum to n'),
          p(7,2,11,'Letter Combinations of a Phone Number','Medium','https://leetcode.com/problems/letter-combinations-of-a-phone-number/','Digit → letters mapping'),
          p(7,2,12,'Palindrome Partitioning','Hard','https://leetcode.com/problems/palindrome-partitioning/','Backtrack + palindrome check'),
          p(7,2,13,'Permutation Sequence','Hard','https://leetcode.com/problems/permutation-sequence/','Math + factoradic'),
        ],
      },
      {
        id: 's7_3', title: '7.3 · Hard Combos',
        problems: [
          p(7,3,1,'N-Queens','Hard','https://leetcode.com/problems/n-queens/','Column/diag bitmask'),
          p(7,3,2,'Sudoku Solver','Hard','https://leetcode.com/problems/sudoku-solver/','Constraint backtrack'),
          p(7,3,3,'M Coloring Problem','Hard',undefined,'Color graph, no adj same'),
          p(7,3,4,'Rat in a Maze','Hard',undefined,'DFS all paths'),
          p(7,3,5,'Word Break','Medium','https://leetcode.com/problems/word-break/','Backtrack or DP'),
          p(7,3,6,'Expression Add Operators','Hard','https://leetcode.com/problems/expression-add-operators/','Backtrack with carry'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 8 — Bit Manipulation
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's8', stepNo: 8, title: 'Bit Manipulation',
    subSteps: [
      {
        id: 's8_1', title: '8.1 · Learn Bit Manipulation',
        problems: [
          p(8,1,1,'Introduction to Bit Manipulation (Theory)','Easy',undefined,'AND OR XOR NOT shifts'),
          p(8,1,2,'Check if i-th Bit is Set','Easy',undefined,'(n >> i) & 1'),
          p(8,1,3,'Check if Number is Odd','Easy',undefined,'n & 1'),
          p(8,1,4,'Check if Number is Power of 2','Easy','https://leetcode.com/problems/power-of-two/','n & (n-1) == 0'),
          p(8,1,5,'Count Set Bits','Easy','https://leetcode.com/problems/number-of-1-bits/','Brian Kernighan or popcount'),
          p(8,1,6,'Set/Unset the Rightmost Unset Bit','Easy',undefined,'Bit tricks'),
          p(8,1,7,'Swap Two Numbers','Easy',undefined,'XOR swap'),
          p(8,1,8,'Divide Two Integers (No *, /, %)','Medium','https://leetcode.com/problems/divide-two-integers/','Bit shift subtraction'),
        ],
      },
      {
        id: 's8_2', title: '8.2 · Interview Problems',
        problems: [
          p(8,2,1,'Count Bits to Flip A to B','Easy',undefined,'Popcount(A XOR B)'),
          p(8,2,2,'Find Number Appearing Odd Times','Easy',undefined,'XOR all elements'),
          p(8,2,3,'Power Set','Medium','https://leetcode.com/problems/subsets/','2^n iterations'),
          p(8,2,4,'Find XOR of Numbers from L to R','Easy',undefined,'XOR(1..L-1) XOR XOR(1..R)'),
          p(8,2,5,'Find Two Numbers Appearing Odd Times','Medium',undefined,'XOR + grouping by set bit'),
        ],
      },
      {
        id: 's8_3', title: '8.3 · Advanced Maths',
        problems: [
          p(8,3,1,'Print Prime Factors of a Number','Easy',undefined,'Trial division'),
          p(8,3,2,'All Divisors of a Number','Easy',undefined,'Loop till sqrt'),
          p(8,3,3,'Sieve of Eratosthenes','Medium',undefined,'O(n log log n)'),
          p(8,3,4,'Prime Factorization using Sieve','Medium',undefined,'Smallest prime factor sieve'),
          p(8,3,5,'Power(n, x) – Fast Exponentiation','Medium',undefined,'Binary exponentiation'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 9 — Stacks and Queues
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's9', stepNo: 9, title: 'Stack and Queues',
    subSteps: [
      {
        id: 's9_1', title: '9.1 · Learning',
        problems: [
          p(9,1,1,'Implement Stack using Arrays','Easy',undefined,'top pointer'),
          p(9,1,2,'Implement Queue using Arrays','Easy',undefined,'Circular queue'),
          p(9,1,3,'Implement Stack using Queue','Medium','https://leetcode.com/problems/implement-stack-using-queues/',''),
          p(9,1,4,'Implement Queue using Stack','Medium','https://leetcode.com/problems/implement-queue-using-stacks/','Lazy pop'),
          p(9,1,5,'Implement Stack using LinkedList','Easy',undefined,'Head as top'),
          p(9,1,6,'Implement Queue using LinkedList','Easy',undefined,'Enqueue at tail'),
          p(9,1,7,'Check for Balanced Parentheses','Easy','https://leetcode.com/problems/valid-parentheses/','Stack push/match'),
          p(9,1,8,'Implement Min Stack','Medium','https://leetcode.com/problems/min-stack/','Dual stack or encoding'),
        ],
      },
      {
        id: 's9_2', title: '9.2 · Infix / Prefix / Postfix Conversions',
        problems: [
          p(9,2,1,'Infix to Postfix Conversion','Medium',undefined,'Operator precedence stack'),
          p(9,2,2,'Prefix to Infix Conversion','Medium',undefined,'Right-to-left scan'),
          p(9,2,3,'Prefix to Postfix Conversion','Medium',undefined,''),
          p(9,2,4,'Postfix to Prefix Conversion','Medium',undefined,''),
          p(9,2,5,'Postfix to Infix Conversion','Medium',undefined,''),
          p(9,2,6,'Infix to Prefix Conversion','Medium',undefined,'Reverse + infix-to-postfix'),
        ],
      },
      {
        id: 's9_3', title: '9.3 · Monotonic Stack / Queue Problems',
        problems: [
          p(9,3,1,'Next Greater Element I','Medium','https://leetcode.com/problems/next-greater-element-i/','Monotonic decreasing stack'),
          p(9,3,2,'Next Greater Element II (Circular)','Medium','https://leetcode.com/problems/next-greater-element-ii/',''),
          p(9,3,3,'Next Smaller Element','Medium',undefined,'Monotonic increasing stack'),
          p(9,3,4,'Number of NGEs to the Right','Medium',undefined,''),
          p(9,3,5,'Trapping Rain Water','Hard','https://leetcode.com/problems/trapping-rain-water/','Two pointers or stack'),
          p(9,3,6,'Sum of Subarray Minimums','Hard','https://leetcode.com/problems/sum-of-subarray-minimums/','Mono stack, next/prev smaller'),
          p(9,3,7,'Asteroid Collision','Medium','https://leetcode.com/problems/asteroid-collision/','Stack simulation'),
          p(9,3,8,'Sum of Subarray Ranges','Hard','https://leetcode.com/problems/sum-of-subarray-ranges/','Max – Min per subarray'),
          p(9,3,9,'Remove K Digits to Get Smallest Number','Hard','https://leetcode.com/problems/remove-k-digits/','Monotonic stack'),
          p(9,3,10,'Largest Rectangle in a Histogram','Hard','https://leetcode.com/problems/largest-rectangle-in-histogram/','Stack prev/next smaller'),
          p(9,3,11,'Maximal Rectangle of 1s','Hard','https://leetcode.com/problems/maximal-rectangle/','Histogram per row'),
        ],
      },
      {
        id: 's9_4', title: '9.4 · Implementation Problems',
        problems: [
          p(9,4,1,'Sliding Window Maximum','Hard','https://leetcode.com/problems/sliding-window-maximum/','Monotonic deque'),
          p(9,4,2,'Stock Span Problem','Medium',undefined,'Monotonic stack prev greater'),
          p(9,4,3,'The Celebrity Problem','Medium',undefined,'Two-pointer elimination'),
          p(9,4,4,'Rotten Oranges','Medium','https://leetcode.com/problems/rotting-oranges/','Multi-source BFS'),
          p(9,4,5,'LRU Cache','Hard','https://leetcode.com/problems/lru-cache/','HashMap + DLL'),
          p(9,4,6,'LFU Cache','Hard','https://leetcode.com/problems/lfu-cache/','HashMap + sorted freq'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 10 — Sliding Window & Two Pointer
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's10', stepNo: 10, title: 'Sliding Window & Two Pointer',
    subSteps: [
      {
        id: 's10_1', title: '10.1 · Medium Problems',
        problems: [
          p(10,1,1,'Longest Substring Without Repeating Characters','Medium','https://leetcode.com/problems/longest-substring-without-repeating-characters/','HashMap + shrink window'),
          p(10,1,2,'Max Consecutive Ones III','Medium','https://leetcode.com/problems/max-consecutive-ones-iii/','Count zeros in window'),
          p(10,1,3,'Fruit Into Baskets','Medium','https://leetcode.com/problems/fruit-into-baskets/','At most 2 distinct'),
          p(10,1,4,'Longest Repeating Character Replacement','Medium','https://leetcode.com/problems/longest-repeating-character-replacement/','Max freq in window'),
          p(10,1,5,'Binary Subarray with Sum','Medium','https://leetcode.com/problems/binary-subarrays-with-sum/','Prefix sum or sliding'),
          p(10,1,6,'Count Nice Subarrays','Medium','https://leetcode.com/problems/count-number-of-nice-subarrays/','Prefix odd-count'),
          p(10,1,7,'Substrings Containing All 3 Characters','Medium','https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/','Shrinkable window'),
          p(10,1,8,'Max Points from Cards (Two Sides)','Medium','https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/','Sliding middle window'),
        ],
      },
      {
        id: 's10_2', title: '10.2 · Hard Problems',
        problems: [
          p(10,2,1,'Longest Substring with At Most K Distinct Chars','Hard','https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/',''),
          p(10,2,2,'Subarrays with Exactly K Distinct Integers','Hard','https://leetcode.com/problems/subarrays-with-k-different-integers/','at-most-K trick'),
          p(10,2,3,'Minimum Window Substring','Hard','https://leetcode.com/problems/minimum-window-substring/','Shrink after covering all'),
          p(10,2,4,'Minimum Window Subsequence','Hard',undefined,'Two-pointer match'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 11 — Heaps
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's11', stepNo: 11, title: 'Heaps [Learning, Medium, Hard]',
    subSteps: [
      {
        id: 's11_1', title: '11.1 · Learning',
        problems: [
          p(11,1,1,'Introduction to Priority Queues / Binary Heaps','Easy',undefined,'Min heap, max heap, heapify'),
          p(11,1,2,'Min Heap & Max Heap Implementation','Easy',undefined,'Array-based heap'),
          p(11,1,3,'Check if Array Represents Min-Heap','Easy',undefined,'Parent ≤ children check'),
          p(11,1,4,'Convert Min Heap to Max Heap','Easy',undefined,'Heapify bottom-up'),
        ],
      },
      {
        id: 's11_2', title: '11.2 · Medium Problems',
        problems: [
          p(11,2,1,'Kth Largest Element in an Array','Medium','https://leetcode.com/problems/kth-largest-element-in-an-array/','Min heap of size k'),
          p(11,2,2,'Kth Smallest Element in an Array','Medium',undefined,'Max heap of size k'),
          p(11,2,3,'Sort K Sorted Array','Medium',undefined,'Min heap of size k'),
          p(11,2,4,'Merge M Sorted Lists','Hard','https://leetcode.com/problems/merge-k-sorted-lists/','Min heap with (val, row, col)'),
          p(11,2,5,'Replace Each Array Element by its Rank','Easy',undefined,'Sort + rank map'),
          p(11,2,6,'Task Scheduler','Medium','https://leetcode.com/problems/task-scheduler/','Max heap + cooldown'),
          p(11,2,7,'Hands of Straights','Medium','https://leetcode.com/problems/hand-of-straights/','Min heap + map'),
        ],
      },
      {
        id: 's11_3', title: '11.3 · Hard Problems',
        problems: [
          p(11,3,1,'Design Twitter','Hard','https://leetcode.com/problems/design-twitter/','HashMap + min heap'),
          p(11,3,2,'Connect N Ropes with Minimum Cost','Hard',undefined,'Min heap greedy'),
          p(11,3,3,'Kth Largest in a Stream','Medium','https://leetcode.com/problems/kth-largest-element-in-a-stream/','Min heap of size k'),
          p(11,3,4,'Maximum Sum Combination','Hard',undefined,'Max heap + set'),
          p(11,3,5,'Find Median from Data Stream','Hard','https://leetcode.com/problems/find-median-from-data-stream/','Max heap + min heap'),
          p(11,3,6,'K Most Frequent Elements','Medium','https://leetcode.com/problems/top-k-frequent-elements/','Bucket sort or heap'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 12 — Greedy Algorithms
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's12', stepNo: 12, title: 'Greedy Algorithms',
    subSteps: [
      {
        id: 's12_1', title: '12.1 · Easy Problems',
        problems: [
          p(12,1,1,'Assign Cookies','Easy','https://leetcode.com/problems/assign-cookies/','Sort + two pointer'),
          p(12,1,2,'Fractional Knapsack Problem','Medium',undefined,'Sort by value/weight ratio'),
          p(12,1,3,'Minimum Number of Coins','Easy',undefined,'Greedy pick largest coin'),
          p(12,1,4,'Lemonade Change','Easy','https://leetcode.com/problems/lemonade-change/','Greedy prefer $10 for $15'),
          p(12,1,5,'Valid Parenthesis String','Medium','https://leetcode.com/problems/valid-parenthesis-string/','Greedy lo/hi range'),
        ],
      },
      {
        id: 's12_2', title: '12.2 · Medium / Hard Problems',
        problems: [
          p(12,2,1,'N Meetings in One Room','Medium',undefined,'Sort by end time'),
          p(12,2,2,'Jump Game I','Medium','https://leetcode.com/problems/jump-game/','Track max reachable'),
          p(12,2,3,'Jump Game II','Medium','https://leetcode.com/problems/jump-game-ii/','BFS levels'),
          p(12,2,4,'Minimum Number of Platforms for Railway','Medium',undefined,'Sort arrival/departure'),
          p(12,2,5,'Job Sequencing Problem','Medium',undefined,'Sort by profit, assign slots'),
          p(12,2,6,'Candy Distribution','Hard','https://leetcode.com/problems/candy/','Two-pass greedy'),
          p(12,2,7,'Shortest Job First (SJF) Scheduling','Medium',undefined,'Sort by burst time'),
          p(12,2,8,'Insert Interval','Medium','https://leetcode.com/problems/insert-interval/','Merge overlapping'),
          p(12,2,9,'Non-Overlapping Intervals','Medium','https://leetcode.com/problems/non-overlapping-intervals/','Sort by end, greedily keep'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 13 — Binary Trees
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's13', stepNo: 13, title: 'Binary Trees',
    subSteps: [
      {
        id: 's13_1', title: '13.1 · Traversals',
        problems: [
          p(13,1,1,'BFS / Level Order Traversal','Easy','https://leetcode.com/problems/binary-tree-level-order-traversal/','Queue'),
          p(13,1,2,'Inorder Traversal (DFS)','Easy','https://leetcode.com/problems/binary-tree-inorder-traversal/','Left → Root → Right'),
          p(13,1,3,'Preorder Traversal (DFS)','Easy','https://leetcode.com/problems/binary-tree-preorder-traversal/','Root → Left → Right'),
          p(13,1,4,'Postorder Traversal (DFS)','Easy','https://leetcode.com/problems/binary-tree-postorder-traversal/','Left → Right → Root'),
          p(13,1,5,'Morris Inorder Traversal','Medium',undefined,'O(1) space threading'),
          p(13,1,6,'Morris Preorder Traversal','Medium',undefined,'Threading variant'),
          p(13,1,7,'Left View of Binary Tree','Easy',undefined,'Level order, first per level'),
          p(13,1,8,'Right View of Binary Tree','Easy','https://leetcode.com/problems/binary-tree-right-side-view/','Last per level'),
          p(13,1,9,'Bottom View of Binary Tree','Medium',undefined,'Vertical order, bottommost'),
          p(13,1,10,'Top View of Binary Tree','Medium',undefined,'Vertical order, topmost'),
          p(13,1,11,'Pre/In/Post in a Single Traversal','Hard',undefined,'Three stacks with state'),
          p(13,1,12,'Vertical Order Traversal','Hard','https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/','Map col → sorted values'),
          p(13,1,13,'Root to Node Path','Medium',undefined,'DFS + backtracking'),
          p(13,1,14,'Max Width of Binary Tree','Medium','https://leetcode.com/problems/maximum-width-of-binary-tree/','Level order with indices'),
        ],
      },
      {
        id: 's13_2', title: '13.2 · Medium Problems',
        problems: [
          p(13,2,1,'Height of Binary Tree','Easy','https://leetcode.com/problems/maximum-depth-of-binary-tree/','1 + max(left, right)'),
          p(13,2,2,'Diameter of Binary Tree','Easy','https://leetcode.com/problems/diameter-of-binary-tree/','Max left+right heights'),
          p(13,2,3,'Check Height-Balanced Binary Tree','Easy','https://leetcode.com/problems/balanced-binary-tree/','Return -1 on imbalance'),
          p(13,2,4,'LCA in Binary Tree','Medium','https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/','Recurse, return when found'),
          p(13,2,5,'Check if Two Trees are Identical','Easy','https://leetcode.com/problems/same-tree/','Recursive structure check'),
          p(13,2,6,'Zigzag Level Order Traversal','Medium','https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/','Flip direction per level'),
          p(13,2,7,'Boundary Traversal of Binary Tree','Medium',undefined,'Left + leaves + right'),
          p(13,2,8,'Maximum Path Sum','Hard','https://leetcode.com/problems/binary-tree-maximum-path-sum/','Max gain per node'),
          p(13,2,9,'Construct Tree from Inorder + Preorder','Medium','https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/','Root = preorder[0]'),
          p(13,2,10,'Construct Tree from Inorder + Postorder','Medium','https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/','Root = postorder last'),
          p(13,2,11,'Symmetric Binary Tree','Easy','https://leetcode.com/problems/symmetric-tree/','Mirror check'),
          p(13,2,12,'Flatten Binary Tree to LinkedList','Medium','https://leetcode.com/problems/flatten-binary-tree-to-linked-list/','Reverse postorder'),
          p(13,2,13,'Count Total Nodes in Complete Binary Tree','Medium','https://leetcode.com/problems/count-complete-tree-nodes/','BS on last level'),
        ],
      },
      {
        id: 's13_3', title: '13.3 · Hard Problems',
        problems: [
          p(13,3,1,'Children Sum Property in Binary Tree','Medium',undefined,'Set node = sum of children'),
          p(13,3,2,'All Nodes Distance K from Target','Medium','https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/','Graph conversion + BFS'),
          p(13,3,3,'Minimum Time to Burn the Binary Tree','Hard',undefined,'BFS from burn node'),
          p(13,3,4,'Serialize and Deserialize Binary Tree','Hard','https://leetcode.com/problems/serialize-and-deserialize-binary-tree/','BFS with null markers'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 14 — Binary Search Trees
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's14', stepNo: 14, title: 'Binary Search Trees',
    subSteps: [
      {
        id: 's14_1', title: '14.1 · Concepts',
        problems: [
          p(14,1,1,'Introduction to BST (Theory)','Easy',undefined,'Left < root < right'),
          p(14,1,2,'Search in BST','Easy','https://leetcode.com/problems/search-in-a-binary-search-tree/','Go left or right'),
          p(14,1,3,'Find Min and Max in BST','Easy',undefined,'Leftmost / rightmost'),
        ],
      },
      {
        id: 's14_2', title: '14.2 · Problems',
        problems: [
          p(14,2,1,'Ceil in a BST','Medium',undefined,'Smallest node ≥ key'),
          p(14,2,2,'Floor in a BST','Medium',undefined,'Largest node ≤ key'),
          p(14,2,3,'Insert a Node in BST','Easy','https://leetcode.com/problems/insert-into-a-binary-search-tree/','Recurse left/right'),
          p(14,2,4,'Delete a Node in BST','Medium','https://leetcode.com/problems/delete-node-in-a-bst/','3 cases: leaf, one child, two'),
          p(14,2,5,'Kth Smallest Element in BST','Medium','https://leetcode.com/problems/kth-smallest-element-in-a-bst/','Inorder traversal'),
          p(14,2,6,'Kth Largest Element in BST','Medium',undefined,'Reverse inorder'),
          p(14,2,7,'Check if Tree is BST','Medium','https://leetcode.com/problems/validate-binary-search-tree/','Range [min, max] check'),
          p(14,2,8,'LCA in BST','Easy','https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/','Both in same subtree?'),
          p(14,2,9,'Construct BST from Preorder Traversal','Medium','https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/','Upper bound trick'),
          p(14,2,10,'Inorder Successor / Predecessor in BST','Medium','https://leetcode.com/problems/inorder-successor-in-bst/',''),
          p(14,2,11,'BST Iterator','Medium','https://leetcode.com/problems/binary-search-tree-iterator/','Controlled inorder stack'),
          p(14,2,12,'Size of the Largest BST in a Binary Tree','Hard',undefined,'Return (size, min, max, isBST)'),
          p(14,2,13,'Merge Two BSTs','Hard',undefined,'Inorder arrays + merge'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 15 — Graphs
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's15', stepNo: 15, title: 'Graphs [Concepts & Problems]',
    subSteps: [
      {
        id: 's15_1', title: '15.1 · Learning & Basic Traversals',
        problems: [
          p(15,1,1,'Graph Representation (Adjacency List / Matrix)','Easy',undefined,'Directed / Undirected / Weighted'),
          p(15,1,2,'BFS of Graph','Easy','https://leetcode.com/problems/number-of-islands/','Queue + visited'),
          p(15,1,3,'DFS of Graph','Easy',undefined,'Recursive + visited'),
          p(15,1,4,'Number of Connected Components','Easy',undefined,'BFS/DFS per unvisited node'),
          p(15,1,5,'Cycle Detection in Undirected Graph (BFS)','Medium',undefined,'Parent tracking'),
          p(15,1,6,'Cycle Detection in Undirected Graph (DFS)','Medium',undefined,'Parent tracking recursive'),
          p(15,1,7,'0/1 Matrix – Nearest 0','Medium','https://leetcode.com/problems/01-matrix/','Multi-source BFS from 0s'),
          p(15,1,8,'Surrounded Regions (DFS)','Medium','https://leetcode.com/problems/surrounded-regions/','Mark border-connected Os'),
          p(15,1,9,'Number of Enclaves','Easy','https://leetcode.com/problems/number-of-enclaves/','BFS from boundary'),
          p(15,1,10,'Word Ladder I','Hard','https://leetcode.com/problems/word-ladder/','BFS on word graph'),
          p(15,1,11,'Word Ladder II','Hard','https://leetcode.com/problems/word-ladder-ii/','BFS + backtrack paths'),
          p(15,1,12,'Number of Distinct Islands','Medium',undefined,'DFS path shapes as set'),
          p(15,1,13,'Bipartite Check (BFS)','Medium','https://leetcode.com/problems/is-graph-bipartite/','2-coloring'),
          p(15,1,14,'Bipartite Check (DFS)','Medium',undefined,'2-coloring recursive'),
        ],
      },
      {
        id: 's15_2', title: '15.2 · Topo Sort & DAG Problems',
        problems: [
          p(15,2,1,'Topological Sort (DFS)','Medium',undefined,'Post-order push to stack'),
          p(15,2,2,"Kahn's Algorithm (BFS Topo Sort)",'Medium',undefined,'In-degree + queue'),
          p(15,2,3,'Cycle Detection in Directed Graph (BFS)','Medium',undefined,'In-degree 0 queue'),
          p(15,2,4,'Cycle Detection in Directed Graph (DFS)','Medium',undefined,'Path visited set'),
          p(15,2,5,'Find Eventual Safe States','Medium','https://leetcode.com/problems/find-eventual-safe-states/','Reverse edges + Kahn'),
          p(15,2,6,'Alien Dictionary','Hard',undefined,'Topo sort of char precedence'),
          p(15,2,7,'Prerequisite Tasks / Course Schedule I','Medium','https://leetcode.com/problems/course-schedule/','Cycle in DAG'),
          p(15,2,8,'Course Schedule II','Medium','https://leetcode.com/problems/course-schedule-ii/','Topo order output'),
          p(15,2,9,'Find the City with Smallest Neighbour Count','Medium','https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/','Floyd-Warshall'),
        ],
      },
      {
        id: 's15_3', title: '15.3 · Shortest Path Algorithms',
        problems: [
          p(15,3,1,'Shortest Path in Unweighted Graph','Medium',undefined,'BFS level = distance'),
          p(15,3,2,'Shortest Path in DAG','Medium',undefined,'Topo sort + relax'),
          p(15,3,3,"Dijkstra's Algorithm",'Medium',undefined,'Min heap + dist array'),
          p(15,3,4,'Shortest Path in Weighted Undirected Graph','Medium',undefined,"Dijkstra's"),
          p(15,3,5,'Shortest Path in Binary Maze','Medium','https://leetcode.com/problems/shortest-path-in-binary-matrix/','BFS, 0-1 BFS'),
          p(15,3,6,'Path With Minimum Effort','Medium','https://leetcode.com/problems/path-with-minimum-effort/','Modified Dijkstra'),
          p(15,3,7,'Cheapest Flights Within K Stops','Medium','https://leetcode.com/problems/cheapest-flights-within-k-stops/','Bellman-Ford K iters'),
          p(15,3,8,'Network Delay Time','Medium','https://leetcode.com/problems/network-delay-time/','Dijkstra'),
          p(15,3,9,'Number of Ways to Arrive at Destination','Medium',undefined,'Dijkstra + count paths'),
          p(15,3,10,'Minimum Multiplications to Reach End','Medium',undefined,'BFS on mod values'),
          p(15,3,11,'Bellman-Ford Algorithm','Medium',undefined,'V-1 relaxations'),
          p(15,3,12,'Floyd-Warshall Algorithm','Medium',undefined,'All-pairs shortest path'),
        ],
      },
      {
        id: 's15_4', title: '15.4 · MST & Disjoint Set',
        problems: [
          p(15,4,1,"Prim's Algorithm",'Medium',undefined,'Min heap + key array'),
          p(15,4,2,"Kruskal's Algorithm",'Medium',undefined,'Sort edges + DSU'),
          p(15,4,3,'Disjoint Set Union (Union-Find)','Medium',undefined,'Path compression + rank'),
          p(15,4,4,'Number of Operations to Connect Network','Medium','https://leetcode.com/problems/number-of-operations-to-make-network-connected/','DSU'),
          p(15,4,5,'Most Stones Removed with Same Row/Col','Medium','https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/','DSU'),
          p(15,4,6,'Accounts Merge','Medium','https://leetcode.com/problems/accounts-merge/','DSU on emails'),
          p(15,4,7,'Number of Islands II (Online Queries)','Hard',undefined,'DSU incremental'),
          p(15,4,8,'Making a Large Island','Hard','https://leetcode.com/problems/making-a-large-island/','DSU + try flip 0'),
          p(15,4,9,'Swim in Rising Water','Hard','https://leetcode.com/problems/swim-in-rising-water/','Binary search + DSU'),
        ],
      },
      {
        id: 's15_5', title: '15.5 · Advanced Graph Algorithms',
        problems: [
          p(15,5,1,'Bridges in Graph (Tarjan)','Hard',undefined,'DFS + low values'),
          p(15,5,2,'Articulation Points','Hard',undefined,'DFS + low / disc time'),
          p(15,5,3,"Kosaraju's Algorithm (SCCs)",'Hard',undefined,'Two-pass DFS'),
          p(15,5,4,"Tarjan's SCC Algorithm",'Hard',undefined,'Low link + stack'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 16 — Dynamic Programming
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's16', stepNo: 16, title: 'Dynamic Programming [Patterns]',
    subSteps: [
      {
        id: 's16_1', title: '16.1 · Introduction to DP',
        problems: [
          p(16,1,1,'Fibonacci Number','Easy','https://leetcode.com/problems/fibonacci-number/','Memoisation / tabulation'),
          p(16,1,2,'Climbing Stairs','Easy','https://leetcode.com/problems/climbing-stairs/','Fibonacci variant'),
          p(16,1,3,'Frog Jump (Cost-based)','Medium',undefined,'Min cost 1 or 2 steps'),
          p(16,1,4,'Frog Jump with K Distances','Medium',undefined,'Min cost among k prev'),
          p(16,1,5,'Maximum Sum of Non-Adjacent Elements','Medium',undefined,'House robber logic'),
          p(16,1,6,'House Robber','Medium','https://leetcode.com/problems/house-robber/','DP take/skip'),
          p(16,1,7,'House Robber II (Circular)','Medium','https://leetcode.com/problems/house-robber-ii/','Run twice'),
        ],
      },
      {
        id: 's16_2', title: '16.2 · 2D / 3D DP and DP on Grids',
        problems: [
          p(16,2,1,"Ninja's Training (Maximize Points)",'Medium',undefined,'DP on days and activities'),
          p(16,2,2,'Unique Paths in Grid','Medium','https://leetcode.com/problems/unique-paths/','dp[i][j] = dp[i-1][j] + dp[i][j-1]'),
          p(16,2,3,'Unique Paths II (Obstacles)','Medium','https://leetcode.com/problems/unique-paths-ii/','0 on obstacle cell'),
          p(16,2,4,'Minimum Path Sum in Grid','Medium','https://leetcode.com/problems/minimum-path-sum/',''),
          p(16,2,5,'Minimum Path Sum in Triangle','Medium','https://leetcode.com/problems/triangle/','Bottom-up'),
          p(16,2,6,'Minimum Falling Path Sum','Medium','https://leetcode.com/problems/minimum-falling-path-sum/',''),
          p(16,2,7,'Chocolate Pickup (3D DP)','Hard',undefined,'Two people same grid'),
        ],
      },
      {
        id: 's16_3', title: '16.3 · DP on Subsequences',
        problems: [
          p(16,3,1,'Subset Sum Equal to Target','Medium',undefined,'dp[i][j] = can achieve j using first i'),
          p(16,3,2,'Partition Equal Subset Sum','Medium','https://leetcode.com/problems/partition-equal-subset-sum/','Sum/2 target'),
          p(16,3,3,'Partition Set Into 2 Subsets Min Abs Diff','Hard',undefined,'All achievable sums'),
          p(16,3,4,'Count Subsets with Sum K','Medium',undefined,'Count variant of subset sum'),
          p(16,3,5,'Count Partitions with Given Difference','Medium',undefined,'Transform to subset count'),
          p(16,3,6,'0/1 Knapsack','Medium',undefined,'Classic dp[n][W]'),
          p(16,3,7,'Minimum Coins','Medium','https://leetcode.com/problems/coin-change/','Infinite supply, min coins'),
          p(16,3,8,'Target Sum','Medium','https://leetcode.com/problems/target-sum/','Count subsets with diff'),
          p(16,3,9,'Coin Change 2 (Count Ways)','Medium','https://leetcode.com/problems/coin-change-ii/','Unbounded, count'),
          p(16,3,10,'Unbounded Knapsack','Medium',undefined,'Reuse items'),
          p(16,3,11,'Rod Cutting Problem','Medium',undefined,'Unbounded knapsack variant'),
        ],
      },
      {
        id: 's16_4', title: '16.4 · DP on Strings',
        problems: [
          p(16,4,1,'Longest Common Subsequence','Medium','https://leetcode.com/problems/longest-common-subsequence/','LCS dp[i][j]'),
          p(16,4,2,'Print LCS','Medium',undefined,'Backtrack dp table'),
          p(16,4,3,'Longest Common Substring','Medium',undefined,'Reset on mismatch'),
          p(16,4,4,'Longest Palindromic Subsequence','Medium','https://leetcode.com/problems/longest-palindromic-subsequence/','LCS(s, reverse(s))'),
          p(16,4,5,'Minimum Insertions to Make Palindrome','Medium','https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/','n - LPS'),
          p(16,4,6,'Minimum Insertions/Deletions to Convert String','Medium','https://leetcode.com/problems/delete-operation-for-two-strings/','n+m-2*LCS'),
          p(16,4,7,'Shortest Common Supersequence','Hard','https://leetcode.com/problems/shortest-common-supersequence/','LCS based'),
          p(16,4,8,'Number of Distinct Subsequences','Hard','https://leetcode.com/problems/distinct-subsequences/','Count matches'),
          p(16,4,9,'Edit Distance','Hard','https://leetcode.com/problems/edit-distance/','Insert/delete/replace'),
          p(16,4,10,'Wildcard Matching','Hard','https://leetcode.com/problems/wildcard-matching/','? matches any, * matches any seq'),
        ],
      },
      {
        id: 's16_5', title: '16.5 · DP on Stocks',
        problems: [
          p(16,5,1,'Best Time to Buy and Sell Stock I','Easy','https://leetcode.com/problems/best-time-to-buy-and-sell-stock/','Track min price'),
          p(16,5,2,'Buy and Sell Stock II (Infinite Tx)','Medium','https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/','Greedy or DP'),
          p(16,5,3,'Buy and Sell Stocks III (At Most 2 Tx)','Hard','https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/','4 state DP'),
          p(16,5,4,'Buy and Sell Stocks IV (At Most K Tx)','Hard','https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/','2k state DP'),
          p(16,5,5,'Buy and Sell Stocks with Cooldown','Medium','https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/','State: hold/sold/rest'),
          p(16,5,6,'Buy and Sell Stocks with Transaction Fee','Medium','https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/','Subtract fee on sell'),
        ],
      },
      {
        id: 's16_6', title: '16.6 · DP on LIS',
        problems: [
          p(16,6,1,'Longest Increasing Subsequence (O(n²))','Medium','https://leetcode.com/problems/longest-increasing-subsequence/','dp[i] = max LIS ending at i'),
          p(16,6,2,'Print LIS','Hard',undefined,'Backtrack parent array'),
          p(16,6,3,'LIS using Binary Search (O(n log n))','Medium',undefined,'Patience sorting'),
          p(16,6,4,'Longest Divisible Subset','Medium','https://leetcode.com/problems/largest-divisible-subset/','Sort + LIS with divisibility'),
          p(16,6,5,'Longest String Chain','Medium','https://leetcode.com/problems/longest-string-chain/','Sort by length + LIS'),
          p(16,6,6,'Longest Bitonic Subsequence','Medium',undefined,'LIS from left + LIS from right'),
          p(16,6,7,'Number of Longest Increasing Subsequences','Hard','https://leetcode.com/problems/number-of-longest-increasing-subsequences/','Count + length arrays'),
        ],
      },
      {
        id: 's16_7', title: '16.7 · MCM / Partition DP',
        problems: [
          p(16,7,1,'Matrix Chain Multiplication','Hard',undefined,'dp[i][j] = min cost to multiply i..j'),
          p(16,7,2,'Minimum Cost to Cut Stick','Hard','https://leetcode.com/problems/minimum-cost-to-cut-a-stick/','Partition DP'),
          p(16,7,3,'Burst Balloons','Hard','https://leetcode.com/problems/burst-balloons/','Interval DP, last balloon'),
          p(16,7,4,'Evaluate Boolean Expression to True','Hard',undefined,'Partition at each operator'),
          p(16,7,5,'Palindrome Partitioning II (Min Cuts)','Hard','https://leetcode.com/problems/palindrome-partitioning-ii/','DP + palindrome precomp'),
          p(16,7,6,'Partition Array for Maximum Sum','Medium','https://leetcode.com/problems/partition-array-for-maximum-sum/','Partition DP up to k'),
          p(16,7,7,'Maximum Rectangle of 1s','Hard','https://leetcode.com/problems/maximal-rectangle/','Histogram DP per row'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 17 — Tries
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's17', stepNo: 17, title: 'Tries',
    subSteps: [
      {
        id: 's17_1', title: '17.1 · Concepts',
        problems: [
          p(17,1,1,'Implement Trie I (Insert, Search, StartsWith)','Medium','https://leetcode.com/problems/implement-trie-prefix-tree/','26-child array node'),
          p(17,1,2,'Implement Trie II (Count Prefix, Count Words)','Medium',undefined,'countWord / countPrefix fields'),
          p(17,1,3,'Longest String with All Prefixes','Medium',undefined,'Insert + search every prefix'),
        ],
      },
      {
        id: 's17_2', title: '17.2 · Problems',
        problems: [
          p(17,2,1,'Number of Distinct Substrings in a String','Medium',undefined,'Insert all suffixes, count new nodes'),
          p(17,2,2,'Maximum XOR of Two Numbers in Array','Medium','https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/','Trie of bits, greedy opposite'),
          p(17,2,3,'Maximum XOR with Element from Array','Hard','https://leetcode.com/problems/maximum-xor-with-an-element-from-array/','Offline queries + sort'),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  STEP 18 — Strings [Hard]
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's18', stepNo: 18, title: 'Strings [Hard Problems]',
    subSteps: [
      {
        id: 's18_1', title: '18.1 · Hard String Problems',
        problems: [
          p(18,1,1,'Search a Word in 2D Grid','Medium','https://leetcode.com/problems/word-search/','DFS backtracking'),
          p(18,1,2,'Boyer-Moore Algorithm for Pattern Searching','Hard',undefined,'Bad char + good suffix heuristic'),
          p(18,1,3,'KMP Algorithm (Failure Function)','Hard',undefined,'LPS prefix array'),
          p(18,1,4,'Z-Algorithm','Hard',undefined,'Z-array for pattern matching'),
          p(18,1,5,'Shortest Palindrome (Add at Front)','Hard','https://leetcode.com/problems/shortest-palindrome/','KMP on s + rev(s)'),
          p(18,1,6,'Longest Happy Prefix','Hard','https://leetcode.com/problems/longest-happy-prefix/','KMP failure function'),
          p(18,1,7,'Minimum Characters to Add for Palindrome','Hard',undefined,'KMP LPS trick'),
          p(18,1,8,'Count Palindromes (Number of Palindromic Substrings)','Medium','https://leetcode.com/problems/palindromic-substrings/','Expand around center'),
          p(18,1,9,'Minimum Deletions to Make Character Frequencies Unique','Medium','https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/','Greedy with frequency set'),
          p(18,1,10,'Count and Reverse – Anagram Deletion Count','Hard',undefined,'Frequency comparison'),
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Derived helpers
// ─────────────────────────────────────────────────────────────────────────────
export const TOTAL_A2Z_PROBLEMS = A2Z_SHEET.reduce(
  (s, step) => s + step.subSteps.reduce((ss, sub) => ss + sub.problems.length, 0),
  0,
);

/** Flat list of all problems — useful for searching */
export const ALL_A2Z_PROBLEMS: (A2ZProblem & { stepId: string; subStepId: string; stepTitle: string; subStepTitle: string })[] =
  A2Z_SHEET.flatMap(step =>
    step.subSteps.flatMap(sub =>
      sub.problems.map(prob => ({
        ...prob,
        stepId: step.id,
        subStepId: sub.id,
        stepTitle: step.title,
        subStepTitle: sub.title,
      }))
    )
  );
