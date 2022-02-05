// *******************************************
/*
Method: selection.selectChild(selector)

Returns a new selection with the children of each element of the current selection matching the selector.

If no selector is specified, selects all the children.

If the selector is specified as a string, selects the children that match (if any).

If the selector is a function, it is evaluated for each of the children nodes, in order, being passed the child (child), the child’s index (i), and the list of children (children).

The method selects all children for which the selector returns truthy.
*/
// *******************************************

// Case0:Select the children of the first svg
let firstSvg = d3.select('svg').selectChildren();
console.log(firstSvg);

// Case1:Select the children of the second svg
let secondSvg = d3.select('svg:nth-of-type(2)').selectChildren();
console.log(secondSvg);

// Case2: Select all svg and select the children
let AllSvg = d3.selectAll('svg').selectChildren();
console.log(AllSvg);

// Case3: Select the first svg and pass a fn as selector into selectChildren
d3.select('svg').selectChildren((c, i, n) => console.log(c, i, n));

// Case4: Select all svg and pass a fn as selector into selectChildren
d3.selectAll('svg').selectChildren((c, i, n) => console.log(c, i, n));