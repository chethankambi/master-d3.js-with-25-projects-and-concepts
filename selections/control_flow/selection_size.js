// *******************************************
/*
Method6: selection.size()

Returns the total number of elements in this selection.

*/
// *******************************************
// Case0: Select svg and set dimensions, append circles and use size
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

console.log(d3.select('svg').size());
console.log(d3.select('svg').selectAll('circle').size());

// useful in looping operations