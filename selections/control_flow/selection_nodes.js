// *******************************************
/*
Method4: selection.node()

Returns the first (non-null) element in this selection. If the selection is empty, returns null.

Method5: selection.nodes()

Returns an array of all (non-null) elements in this selection.

*/
// *******************************************
// Case0: Select svg and set dimensions, append circles and use nodes on the circles selection
d3.select('svg')
  .attr('width', '300')
  .attr('height', '100')

d3.select('svg')
  .selectAll('circle')
  .data([20, 20, 20])
  .join('circle')
  .attr('cx', (d, i) => d + i * 40)
  .attr('cy', '50')
  .attr('r', d => d)

console.log(d3.select('svg'));
// to convert to DOM related syntax
console.log(d3.select('svg').node());
// node is usually used for one element
console.log(d3.select('svg').selectAll('circle'));
// to convert to DOM related syntax
console.log(d3.select('svg').selectAll('circle').nodes());
// nodes is usually used for more than one element

// useful in accessing D3 and Vanilla JS based contexts or selections