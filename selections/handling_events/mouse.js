// *******************************************
/*
Method5: d3.mouse(container)

Returns the x and y coordinates of the current event relative to the specified container.

The container may be an HTML or SVG container element, such as a G element or an SVG element.

The coordinates are returned as a two-element array of numbers [x, y].

*/
// *******************************************

// Case0: Select body and add on() on the body to create an event. Use d3.mouse on body

const body = d3.select('body')
body.on('mouseenter', (d, i, n) => {
  // console.log(d3.mouse(body.node())); // OR
  // console.log(d3.mouse(n[i]));
});

// Case1: Select the svg, set dimensions. Append rect and set dimensions. Use d3.mouse on rect to change color based on x,y
const svg = d3.select('svg')
svg.attr('width', '100')
  .attr('height', '100')

svg.append('rect')
  .attr('width', '90')
  .attr('height', '90')
  .attr('x', '5')
  .attr('y', '5')

const rect = d3.select('rect')
rect.on('mousemove', (d, i, n) => {
  // console.log(d3.mouse(n[i]));
  const pos = d3.mouse(n[i]);
  if (pos[0] >= 50 && pos[1] >= 50) {
    d3.select(n[i]).style('fill', 'chocolate')
  } else {
    d3.select(n[i]).style('fill', 'black')
  }
});