// *******************************************
/*
Method1: selection.attr(name,value)
The attr() method is used to get or set an attribute of the selected elements. If the selected attribute does not exist , null is returned

If a value is specified, sets the attribute with the specified name to the specified value on the selected elements and returns this selection. If the value is a constant, all elements are given the same attribute value; otherwise, if the value is a function, it is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). The function’s return value is then used to set each element’s attribute. A null value will remove the specified attribute.

If a value is not specified, returns the current value of the specified attribute for the first (non-null) element in the selection. This is generally useful only if you know that the selection contains exactly one element.
*/
// *******************************************

// Case0: Select the first svg and get the class,width and height attributes
let svg1 = d3.select('svg');
console.log(svg1);
console.log(svg1.attr('class')); // returns a null
console.log(svg1.attr('width')); // NOTE: the value is in string
console.log(svg1.attr('height')); // NOTE: the value is in string

// Case1: To the first svg selection add a class attribute
svg1 = svg1.selectChildren().attr('class', 'mycircle'); // See the output in the console
// If we try to add another class, the current class name is overwritten
svg1 = svg1.selectChildren().attr('class', 'newcircle');
svg1 = svg1.selectChildren().attr('class', 'mycircle');

// Case2: Select all the circles from the second svg and change the fill color, by passing a function as value to the attr()
let svg2 = d3.select('svg:nth-of-type(2)');
console.log(svg2);
let circles = svg2.selectAll('circle');
console.log(circles);
circles.attr('style', 'fill:peachpuff');
circles.attr('style', function () {
  return `fill:rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
});
console.log(circles);

// Case3: Select all the circles and store the attributes in an array of objects
const allCircles = d3.selectAll('circle');
console.log(allCircles);

let allCirclesAttrs = [];

allCircles.select(function () {
  const circle = d3.select(this);
  const cx = circle.attr('cx');
  const cy = circle.attr('cy');
  const r = circle.attr('r');
  const style = circle.attr('style');
  const circleObj = {
    cx: cx,
    cy: cy,
    r: r,
    style: style
  }
  allCirclesAttrs.push(circleObj); // push() is an array method
});
console.log(allCirclesAttrs);
