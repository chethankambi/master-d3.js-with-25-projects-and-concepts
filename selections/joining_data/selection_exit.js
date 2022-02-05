// *******************************************
/*
Method3: selection.exit()

Returns the exit selection: existing DOM elements in the selection for which no new data was found.

The exit selection is empty for selections not returned by selection.data. Without data binding exit selection is not created

The exit selection is typically used to remove elements for which corresponding data does not exist.

*/
// *******************************************

// Case0: Select #paras1 and bind data, use exit() to remove elements for which there is no data
let divParas1 = d3.select('#paras1')
divParas1 = d3.selectAll('p')
  .data([45, 67]) // observe the 4 selections in console
  .text(d => d)
  .exit()
  .remove(); // notice the elements in devtools

// Case2: Select the svg and and bind data to create 2 circles
circleData = [
  {
    'cx': '50',
    'cy': '50',
    'r': '50'
  },
  {
    'cx': '150',
    'cy': '50',
    'r': '50'
  }
];
let svgCircles1 = d3.select('#circles1')
svgCircles1.attr('width', '200')
  .attr('height', '100')
svgCircles1 = svgCircles1.selectAll('circle')
  .data(circleData)
  .attr('cx', d => d.cx)
  .attr('cy', d => d.cy)
  .attr('r', d => d.r)
  .exit()
  .remove();