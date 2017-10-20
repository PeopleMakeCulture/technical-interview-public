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

* If your interviewee continues without asking questions, stop them and ask, "Do you have any questions about the result?" In your prompt, you don't specify things like the order the strings need to be in, or whether there can be duplicates - these are the sorts of things that should come out in questioning.

---

### AC

Coaching for the interviewer for how to help the interviewee while they're forming their approach and coding

#### Example:
* If your interviee struggles with an iterative approach, suggest that they think about the problem recursively. Make sure that they don't start coding until they've come up with an approach that they believe will work - otherwise, they'll likely run into a lot of pain points.

---

### TO

Coaching on what to do if interviewees finish, or additional questions/optimization prompts

#### Example:
* If your interviewee finishes, ask them:
  * What if duplicates are no longer allowed?
  * What if the strings need to be in alphabetical order?
  * How would you solve this problem for a very long string?

---

### Answers to Common Questions

#### Example:
* Do the strings in the array need to be in alphabetical order?
  * _No, they do not need to be in any order._
* Can the result array contain duplicates?
  * _Yes, there can be logical duplicates, if two characters at different indicies are the same._

---

## Solution and Explanation

---

### 1. Create the SpyOn function

```javascript
function spyOn (func) {

  // keep track of function call count,
  // initialize arrays to store results & arguments
  let [callCount, calledWith, returnVals] = [0, [], []];

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

### 2. Figure out how to access function arguments

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

### 3. Save the returned and called values in the proper arrays and increment call count

```javascript
function spyOn (func) {

  let callCount = 0;
  const calledWith = new Set(); // Use ES6 sets because
  const returnVals = new Set(); // they're awesome.

  function spy (...args) {

    // call func with passed-in args
    let returnVal = func(...args);    

    // increment function call count by 1
    callCount++;

    // add arguments array values to called values set
    args.forEach(arg => calledWith.add(arg));

    // store result of applying function
    returnVals.add(returnVal);

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

### 4. Implement the  'wasCalledWith' and 'returned' methods

```javascript
// The 'indexOf' method of an Array returns '-1' if a value is not found
// We can use this to return a boolean value for the two search methods

spy.wasCalledWith = function (val) {
  return calledWith.has(val);
};

spy.returned = function (val) {
  return returnVals.has(val);
};

```

---

## Full Solution Code

[Repl](https://repl.it/CkaZ/6)

```javascript
function spyOn (func) {
  let callCount = 0;
  const calledWith = new Set();
  const returnVals = new Set();

  function spy (...args) {
    const result = func(...args);
    callCount++;
    args.forEach(arg => calledWith.add(arg));
    returnVals.add(result);
    return result;
  }

  spy.getCallCount = function () {
    return callCount;
  };

  spy.wasCalledWith = function (argument) {
    return calledWith.has(argument);
  };

  spy.returned = function (result) {
    return returnVals.has(result);
  };

  return spy;
}

module.exports = spyOn;
```

---

## Summary

Summary goes here

---







# Legacy Stuff below...

[Slides](http://slides.com/bryangergen/reacto_spy#/)


[ES6 Repl](https://repl.it/CkaY/2)

---

# Prompt


# Example
