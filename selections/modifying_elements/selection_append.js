// *******************************************
/*
Method7: selection.append(type)

If the specified type is a string, appends a new element of this type (tag name) as the last child of each selected element, returning a new selection containing the appended elements.

OR

// **** NOTE: Cover this feature under Joining Data section ****
before the next following sibling in the update selection if this is an enter selection. The latter behavior for enter selections allows you to insert elements into the DOM in an order consistent with the new bound data; however, note that selection.order may still be required if updating elements change order (i.e., if the order of new data is inconsistent with old data).

If the specified type is a function, it is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).

This function should return a DOM element to be appended. (The function typically creates a new element, but it may instead return an existing element.)

In both cases, this method returns a new selection containing the appended elements. 

// **** Each new element inherits the data of the current elements, if any, in the same manner as selection.select.

*/
// *******************************************

// Case0: Select the first div, append a p element and insert text
const divParas1 = d3.select('.paras1')
  .append('p')
  .text('First para appended');
console.log(divParas1);

// Case1: Select the second div, append a p element and insert text
const divParas2 = d3.select('.paras2')
  .append('h6')
  .text('First h6 element appended');
console.log(divParas1);

// Case2: Select both the div and appeng a p element and insert another text
const divParas = d3.selectAll('div')
  .append('p')
  .text('Second para in the div')
  .style('color', 'green'); // just to see the difference
console.log(divParas1);

// Case3: Select the svg element and append 2 rects; set the attributes of the rect elements
const rectsData = [
  {
    x: '10',
    y: '10',
    width: '50',
    height: '30'
  },
  {
    x: '10',
    y: '50',
    width: '50',
    height: '30'
  }
];

const svgRects = d3.select('.rects');
svgRects.attr('width', '300')
  .attr('height', '300');

// This line is same as below 3 lines w/o for loop: svgRects.append('rect'); NS URI(Uniform Resource Identifier) - A string that specifies the namespace URI to associate with the element
for (let i = 0; i < rectsData.length; i++) {
  svgRects.append(function () {
    return document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  });
}
svgRects.selectAll('rect')
  .select(function (d, i) {
    const d3Obj = d3.select(this);
    d3Obj.attr('x', rectsData[i].x)
    d3Obj.attr('y', rectsData[i].y)
    d3Obj.attr('width', rectsData[i].width)
    d3Obj.attr('height', rectsData[i].height)
    d3Obj.style('fill', 'gold');
    console.log(this);
  });