class: center middle
## SPY

---

## Interviewer Prompt

Testing and assertion libraries like Jasmine, Mocha, Chai, Sinon etc. have a special feature called *spies*. Spies allow test specs to track how specific functions of interest are used: whether they are called, how many times, what they are called with, what they return, if they throw errors, etc.

For this REACTO problem, implement a `spyOn` function which does the following:

* Takes a function `func` as its parameter
* Returns a spy function `spy` that takes any number of arguments
* `spy` calls `func` with the given arguments and returns what `func` returns
* `spy` has the following methods:
  - `.getCallCount()`: returns the number of times `spy` has been called
  - `.wasCalledWith(val)`: returns `true` if `spy` was ever called with `val`, else returns `false`
  - `.returned(val)`: returns `true` if `spy` ever returned `val`, else returns `false`

???

Any presenter notes can go after the three question marks

---

## Example Output

Below is a specific example of how `spyOn` might work in the wild. Keep in mind that not all functions take only two arguments…

```javascript
function adder(n1, n2) { return n1 + n2; }

const adderSpy = spyOn( adder );

adderSpy.getCallCount(); // 0

adderSpy(2, 4); // returns 6
adderSpy.getCallCount(); // 1

adderSpy(3, 5); // returns 8
adderSpy.getCallCount(); // 2
adderSpy.wasCalledWith(2); // true
adderSpy.wasCalledWith(0); // false
adderSpy.returned(6); // true
adderSpy.returned(9); // false
```

---

class: center middle
## Interviewer Guide

---

### RE

Coaching advice for the interviewer to make sure that their interviewee is asking the right questions

A good question would be whether the saved arguments and results need to be correlated to individual calls of the spy (they don't). For instance, given the following three calls of a spy:

```javascript
mySpy(1)
mySpy(1, 2)
mySpy(2)
```

The internal `calledWith` array/set needs only be [1, 2].



---

### AC

* It's important that the interviewee recalls that javascript functions can maintain internal state by closing over internal variables.

---

### TO

* When your interviewee finishes, ensure that they check that the spy is reusable (ie. one spy can be called multiple times and saves all the results) and that the spy can handle an arbitrary number of arguments.

---

### Answers to Common Questions

* Does the spy take a fixed number of arguments?
  * _No, the spy should be able to take any number of arguments_
* Do I need to track which arguments produced which return values?
  * _No, you simply need to verify that a specific argument was supplied or return value was returned._

---

## Solution and Explanation (a)

### Create the SpyOn function

```javascript
function spyOn (func) {

  // keep track of function call count,
  // initialize arrays to store results & arguments
  let callCount = 0;
  let calledWith = [];
  let returnVals = [];

  // function to be returned
  function spy (...args) {
    // code will go here
  };

  // create required methods on spy
  spy.getCallCount = function() {
    return callCount;
  };

  spy.wasCalledWith = function (val) {
    // search through returnedVals array for val
  };

  spy.returned = function (val) {
    // search through calledWithVals array for val
  };

  return spy;

}
```

---
## Solution and Explanation (b)

### Figure out how to access function arguments

```javascript
// Remember that function arguments are an array-like object?
// Turn arguments into an actual array  
// Array.prototype.slice.call(arguments)

// Then we can use the resulting array to call .apply() on our function

function spy () {
  let args = [].slice.call(arguments);
  let returnVal = func.apply(this, args);

  // more code to follow
}


// We can also do this without using the 'arguments' object
// by using ES6's 'rest' and 'spread' operators.

function spy (...args) { // rest operator
  let returnVal = func(...args); // spread operator

  // more code to follow
}
```

---

## Solution and Explanation (c)

### Save the returned and called values in the proper arrays and increment call count

```javascript
function spyOn (func) {

  let callCount = 0;
  let calledWith = [];
  let returnVals = [];

  function spy (...args) {

    // call func with passed-in args
    let args = [].slice.call(arguments);
		let returnVal = func.apply(this, args);

    // increment function call count by 1
    callCount++;

    // add arguments array values to a one-dimensional array
    calledWith = calledWith.concat(calledWith)

    // store result of applying function
    returnVals.push(returnVal);

    // return the result of the function call
    return returnVal;
  };

  spy.getCallCount;
  spy.wasCalledWith;
  spy.returned;

  return spy;

};
```

---

## Solution and Explanation (d)

### Implement the  'wasCalledWith' and 'returned' methods

```javascript
// The 'indexOf' method of an Array returns '-1' if a value is not found
// We can use this to return a boolean value for the two search methods

spy.wasCalledWith = function (val) {
  return calledWith.indexOf(val) !== -1;
};

spy.returned = function (val) {
  return returnVals.indexOf(val) !== -1;
};

```

---

## Solution and Explanation (e)

### Full Solution Code

[Repl](https://repl.it/CkaZ/)
[Repl: ES6](https://repl.it/CkaZ/6)

```javascript
function spyOn (func) {

	let callCount = 0;
	let calledWith = [];
	let returnVals = [];

	function spy () {

		let args = [].slice.call(arguments);
		let returnVal = func.apply(this, args);

		callCount++;
		calledWith = calledWith.concat(args);
		returnVals.push(returnVal);

		return returnVal;

	}

	spy.getCallCount = function () {
		return callCount;
	};

	spy.wasCalledWith = function (val) {
		return calledWith.indexOf(val) !== -1;
	};

	spy.returned = function (val) {
		return returnVals.indexOf(val) !== -1;
	};

	return spy;

}
module.exports = spyOn;
```

---

## Summary



---
