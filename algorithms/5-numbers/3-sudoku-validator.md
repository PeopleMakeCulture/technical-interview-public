class: center middle

## Sudoku Validator

---

# Prompt

Write a function that determines if a Sudoku solution is valid. Your input will be a 2-D array that represents a 9x9 matrix. Sudoku has three rules:
 - Every row must contain the numbers from 1-9 (no repeats)
 - Every column must also contain every number from 1-9
 - Every 3x3 subgroup/square must contain each number from 1-9

---

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

---

# Examples

## Should be true:

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
```
---

# Examples

## Should be false

```js
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
```

---

# One Solution

```js
function validSolution(solution){
  function check(arr){
    return arr.sort()
    .filter(function(val, index){
      return val===index+1;
    })
    .length===9;
  }

  for(let i=0;i<9;i++){
    var col=[ ];
    var row=[ ];
    var square=[ ];
    for(var j=0;j<9;j++){
      col.push(solution[j][i]);
      row.push(solution[i][j]);
      square.push(solution[Math.floor(j/3)+(i%3)*3][j%3+Math.floor(i/3)*3]);
    }

    if(!check(col) || !check(row) || !check(square)) return false;
  }
  return true;
}
```


---

# Another Solution

```js
function sudokuValidator(solution) {
    for (var i=0; i < 9; i++) { //check the rows
        var curRow = [ ];
        for (var j =0; j < 9; j++)  {
            if (curRow.indexOf(solution[i][j]) > -1)
                return false;
            curRow.push(solution[i][j])
        }
    }
    for (var k=0; k < 9; k++) { //check the columns
        var curCol = [ ];
        for (var m =0; m < 9; m++)  {
            if (curCol.indexOf(solution[m][k]) > -1)
                return false;
            curCol.push(solution[m][k])
        }
    }
    for(var p=0; p<9; p+=3){ //check the squares
        for(var q=0; q<9; q+=3){
            var curSquare = [ ];
                for(var l=p; l<p+3; l++){
                    for(var n=q; n<q+3; n++){
                        if (curSquare.indexOf(solution[l][n]) > -1)
                            return false;
                        curSquare.push(solution[l][n]);
                    }
                }
        }
    }
    return true;
}
```

---


# Efficiency

* O(n^2) at best since you need to check every space of the board in the worst case
* Even with multiple for loops (the first solution), you check the board 3 times which is O(3n^2) which is still O(n^2)


---

# Conclusion

* Be creative and show you can think of a problem in different ways
* Be able to discuss efficiency in terms of Big-O notation
* Know how to represent matrices in 2D arrays

[Solution 1](http://repl.it/ukz/1)
[Solution 1](https://repl.it/B08e/1)

