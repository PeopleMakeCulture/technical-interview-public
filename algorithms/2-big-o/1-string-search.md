class: center, middle

# String Search
### (ie indexOf)

---

# Interviewer Prompt

You are attempting to find the index of the first appearance of one string (the needle) inside of another (the haystack). If the needle isn't found, return -1.

---

# Example Output

``` javascript
indexOf('or', 'hello world'); // should return 7
indexOf('hello world', 'or'); // should return -1
indexOf('howdy', 'hello world'); // should return -1
indexOf('oox', 'ooboxoooxo'); // should return 6
```
---

class: center middle
## Interviewer Guide

---

### RE (Repeat and Examples)

* Prompt your interviewee to ask questions about any edge cases. For example, should `indexOf('hello', '')` return `0` or `-1`? This isn't stated in the prompt and should come out during this phase. (It's up to you which it should be. The native JS `.indexOf` will return 0)

* Most students' first instincts will be to use built-in string methods like `indexOf()`, `includes()` or `substring()`. `indexOf()` is, of course, explicitly forbidden; steer them away from methods like `includes()` and `substring()`.

---

### AC (Approach and Code)

* The solution to this problem involves a nested for loop--the outer loop will loop through the haystack (the word we are searching in) and the inner loop will run through the characters in the needle (the string we are searching for).

* Many students will move to split the haystack and/or needle into an array of characters, and then loop through.

* This approach would work, but you would be introducing another O(n) dimension in time and space, where n is the length of the haystack.  If they're in a groove, have them finish out this approach and ask them how they would do this without generating a second copy of the haystack during the optimization phase.

---

### TO (Test and Optimize)

* If the interviewee doesn't offer the information, ask about the time and space complexity of their solution.

* Can it be improved? If they used split, or another built in method, is that method adding hidden complexity?

---


# A possible solution

```javascript
function indexOf (needle, haystack) {
  for (let hIdx = 0; hIdx <= haystack.length - needle.length; hIdx++) {
    for (let nIdx = 0; nIdx < needle.length; nIdx++) {
      if (haystack[hIdx + nIdx] !== needle[nIdx]) break;
      if (nIdx + 1 === needle.length) return hIdx;
    }
  }
  return -1;
}
```
---

# Big O

Where n is the haystack size and m the needle size, the time complexity of the solution is O(n&#42;m).

**Why?**
```javascript
function indexOf (needle, haystack) {
  for (let hIdx = 0; hIdx <= haystack.length - needle.length; hIdx++) {
    //O(n * ...) where n is the number of letters in haystack
    for (let nIdx = 0; nIdx < needle.length; nIdx++) {
      //O(m * ...) where m is the number of letters in needle
      if (haystack[hIdx + nIdx] !== needle[nIdx]) break;
      //O(1) constant
      if (nIdx + 1 === needle.length) return hIdx;
      //O(1) constant
    }
  }
  return -1; O(1) constant
}
```

So, O(n \* (m \* (1 + 1))) => O(n \* m)

---
# Discussion: Can we do better?

There are [other algorithms](https://en.wikipedia.org/wiki/String_searching_algorithm#Single_pattern_algorithms), such as [Boyer-Moore](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm) (well, [modified slightly](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm#The_Galil_Rule)), that can perform at O(n+m) time—or even faster.

The idea behind this approach is that the string being searched (haystack) will be preprocessed, finding certain alignments that can be skipped, so that we aren't brute forcing every possible match.

The interviewee isn't expected to know that, but it's fun trivia.



