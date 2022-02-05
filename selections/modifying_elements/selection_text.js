// *******************************************
/*
Method5: selection.text(value)

If a value is specified, sets the text content to the specified value on all selected elements, replacing any existing child elements.

If the value is a constant, then all elements are given the same text content

If the value is a function, it is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).The function’s return value is then used to set each element’s text content. A null value will clear the content.

If a value is not specified, returns the text content for the first (non-null) element in the selection. This is generally useful only if you know the selection contains exactly one element.

*/
// *******************************************

// Case0: Select h1 and get the text of the element and then set the text value of the element using .text()
let h1Ele = d3.select('h1');
console.log(h1Ele.text());
h1Ele.text('Text');
console.log(h1Ele.text());
h1Ele.text(null); // removes the text content
h1Ele.text('Text');

// Case1: Select all the paras and set the text; try setting text on the div and notice that all child elements will be deleted
const paras = d3.selectAll('p');
paras.text('D3');
const divParas = d3.select('.paras').text('Removed');

// Case2: Select all the circles and set the text
const svgCircles = d3.select('.circles')
  .attr('width', '400')
  .attr('height', '400');
const circles = d3.selectAll('circle');
circles.filter((d, i, n) => {
  const d3Obj = d3.select(n[i]);
  d3Obj.attr('cx', `${100 + (i * 100)}`)
    .attr('cy', `${100 + (i * 100)}`)
    .attr('r', 70);
});
circles.text('SVG Circle Element'); // Does not work, text cannot be added inside SVG elements unless the element is <text>

// Case3: Select all the texts and set the text content
const content = ['D3', 'Is', 'Amazing!'];
const svgTexts = d3.select('.texts')
  .attr('width', '300')
  .attr('height', '100');
const texts = d3.selectAll('text');
texts.text(function (d, i) {
  const d3Obj = d3.select(this);
  d3Obj.attr('x', '5')
    .attr('y', `${30 + i * 30}`)
    .style('fill', 'red');

  return content[i];
});
