// *******************************************
/*
Method5: selection.merge(other)
Returns a new selection merging this selection with the specified other selection. The returned selection has the same number of groups and the same parents as this selection. Any missing (null) elements in this selection are filled with the corresponding element, if present (not null), from the specified selection. (If the other selection has additional groups or parents, they are ignored.)

This method is used internally by selection.join to merge the enter and update selections after binding data.We can also merge explicitly, although note that since merging is based on element index, you should use operations that preserve index, such as selection.select

This method is not intended for concatenating arbitrary selections, however: if both this selection and the specified other selection have (non-null) elements at the same index, this selection’s element is returned in the merge and the other selection’s element is ignored.
*/
// *******************************************



// Case0: Select all p elements and separate out the odd and even elements using select(). And then merge the two using merge()

let allPs = d3.selectAll('p');
console.log(allPs);

let oddPs = allPs.select(function (d, i) {
  return (i % 2 === 0) ? this : null;
});
console.log(oddPs);

let evenPs = allPs.select(function (d, i) {
  return (i % 2 === 0) ? null : this;
});
console.log(evenPs);

let mergeOddEvenPs = oddPs.merge(evenPs);
console.log(mergeOddEvenPs);

let mergeEvenOddPs = evenPs.merge(oddPs);
console.log(mergeEvenOddPs);

// Case1: Select all circle elements and separate out the odd and even elements using select(). And then merge the two using merge()

let allCircles = d3.selectAll('circle');
console.log(allCircles);

let oddCircles = allCircles.select(function (d, i) {
  return (i % 2 === 0) ? this : null;
});
console.log(oddCircles);

let evenCircles = allCircles.select(function (d, i) {
  return (i % 2 === 0) ? null : this;
});
console.log(evenCircles);

let mergeOddEvenCircles = oddCircles.merge(evenCircles);
console.log(mergeOddEvenCircles);

let mergeEvenOddCircles = evenCircles.merge(oddCircles);
console.log(mergeEvenOddCircles);

