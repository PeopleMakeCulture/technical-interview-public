class: center middle
## Longest Increasing Subsequence

---

## Interviewer Prompt

Given an an array of numbers, find the length of the longest possible subsequence that is increasing. This subsequence can "jump" over numbers in the array. For example in `[3, 10, 4, 5]` the longest increasing subsequence is `[3, 4, 5]`.

???

Presenter notes here

---

## Example Output

```javascript
longestIncreasingSubsequence([3, 4, 2, 1, 10, 6]);
// should return 3, the length of the longest increasing subsequence:
// 3, 4, 6
longestIncreasingSubsequence([10, 22, 9, 33, 20, 50, 41, 60, 80]);
// should return 6, the length of the maximum increasing subsequence:
// 10, 22, 33, 41, 60, 80 (or 10, 22, 33, 50, 60, 80)
longestIncreasingSubsequence([10, 22, 9, 33, 20, 50, 41, 60, 80, 21, 23, 24, 25, 26, 27, 28]);
// should return 9, the length of the maximum increasing subsequence:
// 10, 20, 21, 23, 24, 25, 26, 27, 28
```

---

class: center middle
## Interviewer Guide

---

### RE

Coaching advice for the interviewer to make sure that their interviewee is asking the right questions

#### Example:
* Make sure that your interviewee is clear on what is meant by an increasing subsequence.

* Your interviewee should be asking questions about the types of inputs they should be expecting; will the passed in arrays only contain integers? Will they possibly contain negative numbers? Will they need to handle non-number elements in the array? (they can expect only positive integers)

---

### AC

Coaching for the interviewer for how to help the interviewee while they're forming their approach and coding

* There are two basic approaches to this problem - either an approach that generates all subsequences and then figures out which is longest (this type of a approach is sometimes called a "backtrack"), or a recursive/dynamic approach.

* If your interviewee comes up with the brute force rather than recursive approach, then let them code that out, rather than guiding them towards the recursive approach.

---

### TO

Coaching on what to do if interviewees finish, or additional questions/optimization prompts

* If your interviewee used the brute force approach, see if you can get them to consider a recursive approach. Some hints in this case:
  * The function may take in more information than just the array. In order to check for increasing subsequences in the array, what other things might you want to pass along to other function calls?

* If your interviewee finishes a recursive solution but doesn't include memoization, ask then about the solution's time complexity. You may prompt the to them draw out the call tree for their un-memoized solution, to see what calls are being repeated. Then ask them to write in an optimization that will avoid those repeated calls.

---

### Answers to Common Questions

* What kind of repeated work does the memoized solution eliminate?
  * _[Here's a repl.it](https://repl.it/NVR0) which will illustrate how many repeated calls occur_

* Why do we have to pass the whole array in every call, instead of passing along subarrays with the first index sliced off instead?
  * _Passing along a reference to the whole array conserves space, but is less "functional"; passing along a copy of a subarray protects you from accidentally mutating the original array, but takes up more space in memory._

---

## Recursive Solution and Explanation (b)

Below is a recursive solution that steps through each number, considering two possibilities: excluding it from the subsequence and including in the subsequence. Thus each element generates two possible paths, both of which continue on to the next element, which generates two possible paths, etc. Therefore, without memoization we would expect this to be `O(2^n)` time complexity. We'd definitely want to add memoization!

Additionally, the space complexity for the unmemoized recursive approach would also be worse - remember that when we're determining the extra space that an algorithm uses, we want to also include any space that's taken up in the call stack.

---

## Recursive Solution Code

```javascript
function longestIncreasingSubsequence (nums, idx = 0, base = -Infinity) {
  if (idx === nums.length) return 0;
  const num = nums[idx];
  const whenExcluded = longestIncreasingSubsequence(nums, idx + 1, base);
  if (num <= base) return whenExcluded;
  const whenIncluded = 1 + longestIncreasingSubsequence(nums, idx + 1, num);
  return Math.max(whenIncluded, whenExcluded);
}
```

---

## Optimized Recursive Solution and Explanation (c)

We can further optimize this solution by adding memoization. Notice that we're only memoizing the `whenIncluded` results. That's because we can have very different possibilities for the `whenExcluded` branches—they're not straightforward to cache.

---

## Solution Code

```javascript
function memoizedLIS (nums, idx = 0, base = -Infinity, memo = {}) {
  if (idx === nums.length) return 0;
  const num = nums[idx];
  const whenExcluded = memoizedLIS(nums, idx + 1, base, memo);
  if (num <= base) return whenExcluded;
  let whenIncluded;
  if (memo.hasOwnProperty(idx)) {
    whenIncluded = memo[idx];
  } else {
    whenIncluded = 1 + memoizedLIS(nums, idx + 1, num, memo);
    memo[idx] = whenIncluded;
  }
  return Math.max(whenIncluded, whenExcluded);
}
```

---

