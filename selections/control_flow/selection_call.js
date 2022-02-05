// *******************************************
/*
Method2: selection.call(function,arguments(optional))

Invokes the specified function exactly once, passing in this selection along with any optional arguments.

Returns this selection. This is equivalent to invoking the function by hand but facilitates method chaining.

*/
// *******************************************

// Case0: Select svg and add dimensions. Bind data to circles inside svg and use each() and call() to render graphics
d3.select('svg')
  .attr('width', '300')
  .attr('height', '300')
  .attr('viewBox', '0 -300 300 300')

let dataArray = [15, 25, 35];
// 
function updatecircles(d, i, n) {
  const element = d3.select(n[i]);
  element.attr('cx', i < 1
    ? 5 + d
    : (5 + +n[i - 1].getAttribute('cx') +
      +n[i - 1].getAttribute('r') + d))
  element.attr('cy', '-150')
  element.attr('r', d)
  element.style('fill', `rgba(${d / 2}, ${d / 3}, ${d * 7},0.7)`)
}
function display(seln, rad) {
  // console.log(seln, rad, count);
  seln.selectAll('circle')
    .data(rad)
    .join('circle')
    .each(updatecircles);
}
// 
const circles = d3.select('svg').call(display, dataArray);
console.log(circles); // we get back the selection, here its svg