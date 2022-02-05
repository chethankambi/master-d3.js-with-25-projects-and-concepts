// *******************************************
/*
Method1: selection.each(function)

Invokes the specified function for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).

Not only can .each enable reusable components but it also allows computations to be shared across calls to .style, .attr etc.

This method can be used to invoke arbitrary code for each selected element.

*/
// *******************************************

// Case0: Select the svg and set dimensions. Add data and use join().Create a vertical bar chart using each() method and also add values to the bar using each()
d3.select('svg')
  .attr('width', '300')
  .attr('height', '300')
  .attr('viewBox', '0 -300 300 300') // talk about this line
// helper functions
function updatebars(d, i, n) {
  const element = d3.select(n[i]);
  element.attr('x', 5 + 35 * i)
  element.attr('y', -d)
  element.attr('width', '30')
  element.attr('height', d)
  element.style('fill', `rgb(${d * 0.5},${d * 0.6},${d / 0.7})`)
}
function updatetext(d, i, n) {
  const element = d3.select(n[i]);
  element.attr('x', 5 + 35 * i)
  element.attr('y', -d - 10)
  element.text(d)
  element.style('fill', `rgb(${d * 0.5},${d * 0.6},${d / 0.7})`)
}
// 
let allRects = d3.select('svg').selectAll('rect');
let allTexts = d3.select('svg').selectAll('text');

allRects = allRects.data([43, 67, 121, 220, 95, 150]) // data < 300
  .join('rect')
  // .each((d, i, n) => updatebars(d, i, n))
  .each(updatebars) // d,i,n are passed automatically
console.log(allRects); // returns the rect selection

allTexts = allTexts.data([43, 67, 121, 220, 95, 150])
  .join('text')
  //   .each((d, i, n) => updatetext(d, i, n));
  .each(updatetext) // d,i,n are passed automatically
console.log(allTexts); // returns the text selection

//  suppose data changes
allRects = allRects.data([98, 130, 100, 230]) // data < 300
  .join('rect')
  // .each((d, i, n) => updatebars(d, i, n));
  .each(updatebars) // d,i,n are passed automatically
console.log(allRects); // returns the rect selection

allTexts = allTexts.data([98, 130, 100, 230])
  .join('text')
  // .each((d, i, n) => updatetext(d, i, n));
  .each(updatetext) // d,i,n are passed automatically
console.log(allTexts); // returns the text selection