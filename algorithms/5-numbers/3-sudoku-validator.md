[Slides](https://slides.com/seemaullal/reacto-3-8/)

[Updates Slides](https://slides.com/pat310/reacto-3-8/)

---

# Prompt

Write a function that determines if a Sudoku solution is valid. Your input will be a 2-D array that represents a 9x9 matrix. Sudoku has three rules:

- Every row must contain the numbers from 1-9 (no repeats)
- Every column must also contain every number from 1-9
- Every 3x3 subgroup/square must contain each number from 1-9

# Representing the Data

Your input is a 2-D array that represents a 9x9 matrix. For example:

```js
var solution = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];
```

# Examples

```js
sudokuValidator([
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
]);
//should return true
sudokuValidator([
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [2, 3, 1, 5, 6, 4, 8, 9, 7],
  [3, 1, 2, 6, 4, 5, 9, 7, 8],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [5, 6, 4, 8, 9, 7, 2, 3, 1],
  [6, 4, 5, 9, 7, 8, 3, 1, 2],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [8, 9, 7, 2, 3, 1, 5, 6, 4],
  [9, 7, 8, 3, 1, 2, 6, 4, 5]
]);
//should return false
```

# Solution

To approach this problem in general, we could loop collect each "column", each "row" and each "square" and confirm that it contains all numbers 1–9. That confirmation function could simply sort the incoming array of values, and check that every value is equal to its index plus one, like:

```js
function check (arr) {
  return arr.sort()
  .every(function (val, index) {
    return val === index + 1;
  });
}
```

Accumulating each column and row could be down with two nested loops going through indexes 0-8.

```js
// ...
for (let i = 0; i < 9; i++) {
  const col = [];
  const row = [];
  for (let j = 0; j < 9; j++) {
    col.push(solution[j][i]);
    row.push(solution[i][j]);
  }
}
// ...
```

Accumulating each square is tougher. We can do it pretty effectively in the same loop as above. Just as we can use `i` to represent which column we are on, and `j` to represent which cell in that column we are on, we can use `i` to represent "which square we are on" and `j` to represent which cell inside that square we are on. We will need to label the squares in some way. Let's consider the top left position the "0th" square, the one below that as the "1st" square, and so on. Like the diagram below.

```
Ordering the squares (i)

+-0-+-3-+-6-+
|   |   |   |
|   |   |   |
|   |   |   |
+-1-+-4-+-7-+
|   |   |   |
|   |   |   |
|   |   |   |
+-2-+-5-+-8-+
|   |   |   |
|   |   |   |
|   |   |   |
+---+---+---+

Ordering the cells inside a square (j)

+---+
|036|
|147|
|258|
+---+

Combined
+-0-+-3-+-6-+
|036|036|036|
|147|147|147|
|258|258|258|
+-1-+-4-+-7-+
|036|036|036|
|147|147|147|
|258|258|258|
+-2-+-5-+-8-+
|036|036|036|
|147|147|147|
|258|258|258|
+---+---+---+
```

We can choose any consistent ordering scheme we see fit. Once chosen, we now have to figure out a way to transform `i` and `j` into x, y coordinates (for our 2-D array). For example, when `i` is 1 and `j` is 7, our x, y coordinates should be 2, 4. See the diagram below:

```
                (x)
           ......:......
           |           |
            012 345 678
              v 
              v
              v
    ,-     +---+---+---+
    : 0    |   |   |   |
    : 1    |   |   |   |
    : 2    |(i)|   |   |
    :      +-1-+---+---+
    : 3    | (j)   |   |
(y)-: 4 >>>|  7|   |   |
    : 5    |   |   |   |
    :      +---+---+---+
    : 6    |   |   |   |
    : 7    |   |   |   |
    : 8    |   |   |   |
    '-     +---+---+---+
```

Another way of thinking about it is that `i` will contribute to an x and y "origin", pointing to the top left coordinate of a particular square, whereas `j` will contribute to an x and y "offset", pointing to a particular cell inside that square (offset from its top left coordinate). To determine the complete x coordinate we can add the `xOrigin` and `xOffset`; to determine the complete y coordinate we can add the `yOrigin` and `yOffset`.

```
              (x)
         ......:......
         |           |
          0   3   6

    ,-   +-0-+-3-+-6-+
    : 0  |*  |*  |*  |
    :    |   |   |   |
    :    |   |   |   |
    :    +-1-+-4-+-7-+
    : 3  |*  |*  |*  |
(y)-:    |   |   |   |
    :    |   |   |   |
    :    +-2-+-5-+-8-+
    : 6  |*  |*  |*  |
    :    |   |   |   |
    :    |   |   |   |
    '-   +---+---+---+
```

If so, here's the conversion table we need for `xOrigin`:

i|xOrigin
-|-------
0|0
1|0
2|0
3|3
4|3
5|3
6|6
7|6
8|6

When we see "slow-stepping" pattern that should tell us that `Math.floor` division will be useful. The length of each repeating sequence tells us what we want to divide by, so we want something like `Math.floor(i / 3)`. Except that would give us:

i|xOrigin
-|-------
0|0
1|0
2|0
3|1
4|1
5|1
6|2
7|2
8|2

...those outputs are off by a factor of 3, so we can just do `Math.floor(i / 3) * 3`.

The conversion table for our `yOrigin`:

i|yOrigin
-|-------
0|0
1|3
2|6
3|0
4|3
5|6
6|0
7|3
8|6

When we see a "cyclic" pattern that should tell us that modulus will be involved. The length of the cycle tells us what we mod by, so we want something like `i % 3`. Except that would give us:

i|yOrigin
-|-------
0|0
1|1
2|2
3|0
4|1
5|2
6|0
7|1
8|2

...which is a gain off by a factor of 3, so instead it would be `(i % 3) * 3`.

Which brings us to `j` and the offsets. Here's a diagram corresponding x and y to j.

```
          (x)
         ..:..
         |   |
          012
         
    ,-   +---+
    : 0  |036|
(y)-: 1  |147|
    : 2  |258|
    '-   +---+
```


Our `xOffset` conversion table:

j|xOffset
-|-------
0|0
1|0
2|0
3|1
4|1
5|1
6|2
7|2
8|2

Similar to before, we have a "slow-stepping" pattern of length 3, meaning `xOffset` is `Math.floor(j / 3)`.

Our `yOffset` conversion table:

j|yOffset
-|-------
0|0
1|1
2|2
3|0
4|1
5|2
6|0
7|1
8|2

Also similar to before, we have a "cycling" pattern of length 3, meaning `yOffset` is `j % 3`.

With the various origins and offsets put together, the snippet would be:

```js
// ...
const xOrigin = Math.floor(i / 3) * 3;
const xOffset = j % 3;
const yOrigin = (i % 3) * 3;
const yOffset = Math.floor(j / 3);
// ...
```

...or...

```js
// ...
const x = (Math.floor(i / 3) * 3) + (j % 3);
const y = ((i % 3) * 3) + Math.floor(j / 3);
// ...
```

Now ***everything** pieced together would look like:

```js
function check (arr) {
  return arr.sort()
  .every(function (val, index) {
    return val === index + 1;
  });
}

function validSolution (solution) {
  for (let i = 0; i < 9; i++) {
    const col = [];
    const row = [];
    const square = [];
    for (let j = 0; j < 9; j++) {
      col.push(solution[j][i]);
      row.push(solution[i][j]);
      const x = (Math.floor(i / 3) * 3) + (j % 3);
      const y = ((i % 3) * 3) + Math.floor(j / 3);
      square.push(solution[y][x]);
    }
    if (!check(col) || !check(row) || !check(square)) return false;
  }
  return true;
}
```

In terms of time / space complexity, this is technically constant—sudoku puzzles have a constant number of elements.

