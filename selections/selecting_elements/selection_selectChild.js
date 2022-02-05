// *******************************************
/*
Method: selection.selectChild(selector)

Returns a new selection with the (first) child of each element of the current selection matching the selector.

If no selector is specified, selects the first child (if any).

If the selector is specified as a string, selects the first child that matches (if any).

If the selector is a function, it is evaluated for each of the children nodes, in order, being passed the child (child), the child’s index (i), and the list of children (children).

The method selects the first child for which the selector returns truthy, if any.
*/
// *******************************************

// Case0:Select the first child of the first svg
let firstCircle = d3.select('svg').selectChild();
console.log(firstCircle);

// Case1:Select the second child of the first svg
let secondCircle = d3.select('svg').selectChild(':nth-child(2)');
console.log(secondCircle);

// Case2:Select the first child of the second svg
let firstRectangle = d3.select('svg:nth-of-type(2)').selectChild();
console.log(firstRectangle);

// Case3:Select the second child of the second svg
let secondRectangle = d3.select('svg:nth-of-type(2)')
  .selectChild(':nth-child(2)');
console.log(secondRectangle);

// Case4: Select all svg and select the first child of each svg
let firstChild = d3.selectAll('svg').selectChild();
console.log(firstChild);

// Case5: Select all svg and select the second child of each svg
let secondChild = d3.selectAll('svg').selectChild(':nth-of-type(2)');
console.log(secondChild);

// Case6: Select the first svg and pass a fn as selector into selectChild
d3.select('svg').selectChild((c, i, cn) => console.log(c, i, cn));

// Case7: Select the all svg and pass a fn as selector into selectChild
d3.selectAll('svg').selectChild((c, i, cn) => console.log(c, i, cn));