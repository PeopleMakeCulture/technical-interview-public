class: center middle
## Clock Minute Adder

---

## Interviewer Prompt

__Given:__  
  - a time in string format HH:MM
  - a number of minutes

__Return:__  
  - The time given those minutes added to the base time
 
__Assumptions:__
  - You're working with a standard 12-hour clock
  - Output needs to match input format HH:MM

---

## Example Output

```js
addMinutes('1:30', 30);     // 2:00
addMinutes('12:30', 40);    // 1:10
addMinutes('11:59', 1);     // 12:00
addMinutes('1:59', 240);    // 5:59
addMinutes('1:23', 456789); // 6:32
```

---

class: center middle
## Interviewer Guide

---

### RE

The interviewee should mention modular math in their approach. If they come up with a solution that does not account for the edge cases, you may choose to bring these up now, or add them on when a basic solution is reached.

Edge cases like what if the minutes go over 60, what if the hours increase past 12.

---

### AC

There may be many solutions to transforming the data. If the approach will correctly calculate the total hours/minutes allow them to implement. If it's less efficient, focus on this for your optimization step.

That said, make sure each of the calculations is correct before moving on.

---

### TO

There is not a lot of room for optimization, as most of the operations they'll use are O(1). That said keep prototype method time complexity in mind. `[string].split()`, for example, is an O(n) operation. With that said, consider the input; as it is finite (length of 5 at all times), then our split function can be considered constant.

---

## Solution and Explanation (a)


One valid solution uses modular math. We can calculate the total minutes by adding the current minute hand value to the given minutes to add. From there, if we mod by 60 we'll get the remainder, which tells us where the minute hand would end up.

If we then take the floor of dividing by 60 we will have the hours that we need to add. Once we add these new hours to the old ones we can mod by 12.

There's an edge case to consider with this approach. The hours are "one-indexed" not "zero-indexed", i.e. there's no such time as `0:40` (well for non-military clocks), instead it's `12:40`. Also, when returning the string if the minutes are single digits we will want to add a `0` in front. Both of these can be solved by using ternaries in our return statement.

---

## Solution Code
```js
function addMinutes (oldTime, minLater) {
  const [oldHrs, oldMins] = oldTime.split(':').map(str => Number(str));
  const combinedMins = minLater + oldMins;
  // Find new minutes with mod 60
  const newMins = combinedMins % 60;
  // Find hours to add dividing by 60 and round down for hours to add
  const hrsToAdd = Math.floor(combinedMins / 60)
  // Find new hours with mod 12
  // What if we had 12 hours? 
  // Is `0` hours something we want?
  const newHrs = (hrsToAdd + oldHrs) % 12;
  // Use string interpolation to properly display hour and single digit minutes
  return `${newHrs ? newHrs : 12}:${newMins > 9 ? newMins : `0${newMins}`}`;
}
```

---

## Solution and Explanation (b)


A similar solution starts the same; however, we start by adding the current hours and minutes to find the total number of new minutes. From there if we add the given minutes to add and then mod by 60 we'll get the remainder, which tells us where the minute hand would end up.

For hours, we take the total new minutes and divide by 60 (rounding down) to get the number of hours to add. Once we add all hours, we mod by 12 and are in the same situation as before with hours being "one-indexed" not "zero-indexed", i.e. there's no such time as `0:40` (well for non-military clocks), instead it's `12:40`. An alternate solution shown here is to subtract 1 then mod by 12 then add 1.

---

## Alternate Solution Code
```js
function addMinutes (oldTime, minLater) {
  const [oldHrs, oldMins] = oldTime.split(':').map(str => Number(str));
  // get old minutes by converting old hours to minutes
  // then adding old minutes
  const oldTotalMins = (oldHrs * 60) + oldMins;
  // Add the new minutes
  const newTotalMins = oldTotalMins + minLater;
  // Using new total minutes, calculate the hours by dividing by 60
  const totalHrs = Math.floor(newTotalMins / 60);
  // Why subtract and add 1 here?
  const newHrs = ((totalHrs - 1) % 12) + 1;
  // Find minutes by determining how many are left over after dividing by 60
  const newMins = newTotalMins % 60;
  // Create return string using interpolation that properly displays single digit minutes
  return `${newHrs}:${newMins > 9 ? newMins : `0${newMins}`}`;
}
```