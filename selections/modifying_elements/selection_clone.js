// *******************************************
/*
Method10: selection.clone(deep)

Inserts clones of the selected elements immediately following the selected elements and returns a selection of the newly added clones.

If deep is truthy, the descendant nodes of the selected elements will be cloned as well. Otherwise, only the elements themselves will be cloned.

*/
// *******************************************

// Case0: Create a clone of the svg
const newSvg = d3.select('svg').clone();
console.log(newSvg);

// Case1: Select both the svg elements and clone them
d3.selectAll('svg').clone();

// Case2: Select the first svg and clone it while passing 'true' as an argument or a function or expression that evaluates to true
d3.select('svg')
  .append('text')
  .text('Added in first svg')
  .attr('y', '20');

d3.select('svg').clone(function () {
  return true;
});