// *******************************************
/*
Method3: selection.style(name,value,priority(optional))
Additional coverage: d3.style(node,name)

// selection.style()
If a value is specified, sets the style property with the specified name to the specified value on the selected elements and returns this selection.

If the value is a constant, then all elements are given the same style property value.

If the value is a function, it is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). The function’s return value is then used to set each element’s style property.

A null value will remove the style property.

An optional priority may also be specified, either as null or the string important (without the exclamation point).

If a value is not specified, returns the current value of the specified style property for the first (non-null) element in the selection. The current value is defined as the element’s inline value, if present, and otherwise its computed value. Accessing the current style value is generally useful only if you know the selection contains exactly one element.

// d3.style()
Returns the value of the style property with the specified name for the specified node.

If the node has an inline style with the specified name, its value is returned; otherwise, the computed property value is returned.

*/
// *******************************************

// Case0: Select the h1 and retrieve the style using d3.style(). Set the color of h1 using selection.style()
let h1Ele = d3.select('h1');
console.log(d3.style(h1Ele.node(), 'color')); // computed property
h1Ele = h1Ele.style('color', 'gray');
console.log(d3.style(h1Ele.node(), 'color'));

// Case1: Change the font-weight of h1 and then remove the style to set it back to default
h1Ele.style('font-weight', '100');
h1Ele.style('font-weight', null);

// Case2: Select the svg and set the width and height using attr(). Next set the background color and border of the svg
let svg = d3.select('svg');
svg.attr('width', '400').attr('height', '400');
svg.style('background-color', '#f7f7f7');
svg.style('border', '2px solid black');

// Case3: Apply style on the svg to see its effects on children
svg.style('fill', 'pink')
  .style('stroke', 'orange')
  .style('fill-opacity', '0.5');

// Case4: Select the ellipses and set the cx,cy,rx and ry properties and then set the fill dynamically
let ellipses = d3.selectAll('ellipse');
ellipses.filter(function (d, i) {

  const d3Obj = d3.select(this);

  d3Obj.attr('cx', `${i * 150 + 110}`);
  d3Obj.attr('cy', `${i * 150 + 100}`);
  d3Obj.attr('rx', `${i * 30 + 90}`);
  d3Obj.attr('ry', `${i * 30 + 50}`);

  d3Obj.style('fill', `rgb(
        ${Math.random() * 255}, 
        ${Math.random() * 255}, 
        ${Math.random() * 255}
        )`);
});
// Best adviced to use .css file to set the styles unless we a style dynamically