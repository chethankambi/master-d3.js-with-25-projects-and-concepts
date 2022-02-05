// *******************************************
/*
Method11: selection.sort(compare)

Returns a new selection that contains a copy of each group in this selection sorted according to the compare function.

After sorting, re-inserts elements to match the resulting order (per selection.order).

The compare function, which defaults to ascending, is passed two elements’ data a and b to compare. It should return either a negative, positive, or zero value. If negative, then a should be before b; if positive, then a should be after b; otherwise, a and b are considered equal and the order is arbitrary.

Note that sort, only repositions the elements in the DOM.  If the elements need to be repositioned on the screen, based on their new order in the DOM, then the attr method should be called after sort.

*** Note that sorting is not guaranteed to be stable; however, it is guaranteed to have the same behavior as your browser’s built-in sort method on arrays.

*/
// *******************************************

// Case0: Select all the p elements and sort them
d3.selectAll('p')
  .datum(function () { // we will learn more about datum later
    return this.innerText;
  })
  .sort((a, b) => b - a) // descending
  .sort((a, b) => a - b); // ascending

// Case1: Select all the circle elements and sort them
d3.selectAll('circle')
  .datum(function () {
    return this.getAttribute('r');
  })
  .sort((a, b) => b - a)
  .attr('cx', (d, i) => 50 + (i * 80))
  .sort((a, b) => a - b)
  .attr('cx', (d, i) => 20 + (i * 80));

  // NOTE: If the data is already sorted, i.e the data bound to the elements, then we can use selection.order() instead of selection.sort(). Re-inserts elements into the document such that the document order of each group matches the selection order.