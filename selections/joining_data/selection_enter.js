// *******************************************
/*
Method2: selection.enter()

Returns the enter selection: placeholder nodes for each datum that had no corresponding DOM element in the selection.

NOTE: The enter selection is empty for selections not returned by selection.data. Only when we bind data do we get an enter selection

The enter selection is typically used to create “missing” elements corresponding to new data.

*/
// *******************************************

// Case0: Select #paras1 and bind data, use enter() to append new elements for pending data
let divParas1 = d3.select('#paras1')
divParas1 = divParas1.data([3, 4, 5]);
divParas1.text(d => d);
console.log(divParas1);
//
divParas1 = divParas1.enter() // notice how the enter and exit vanish
  .append('div') // puts at the end as siblings of body as the parent is html
  .text(d => d);

// Case1: Select #paras1 and create the right insertion context for the binding the data
divParas1 = d3.select('#paras1')
divParas1 = divParas1.selectAll('p')
console.log(divParas1) // creates a context for placement
divParas1 = divParas1.data(['One', 'Two', 'Three'])
console.log(divParas1)
divParas1 = divParas1.enter()
  .append('p') // see the elements in devtools
  .text(d => d);

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
console.log(svgCircles1)
svgCircles1.selectAll('circle')
  .data(circleData)
  .enter()
  .append('circle')
  .attr('cx', d => d.cx)
  .attr('cy', d => d.cy)
  .attr('r', d => d.r)