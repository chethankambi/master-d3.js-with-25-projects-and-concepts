// *******************************************
/*
Method6: selection.html(value)

NOTE: selection.html is only supported on HTML elements. SVG elements and other non-HTML elements do not support the innerHTML property, and thus are incompatible with selection.html. This method is intended for when you want a little bit of HTML, say for rich formatting.

If a value is specified, sets the inner HTML to the specified value on all selected elements, replacing any existing child elements.

If the value is a constant, then all elements are given the same inner HTML.

If the value is a function, it is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). The function’s return value is then used to set each element’s inner HTML. A null value will clear the content.

If a value is not specified, returns the inner HTML for the first (non-null) element in the selection. This is generally useful only if you know the selection contains exactly one element.

*/
// *******************************************

// Case0: Select the div element and access the p element
let divInnerHtml = d3.select('div').html();
console.log(divInnerHtml); // returns as a string
console.log(typeof divInnerHtml);

// Case1: Upgrade the innerHTML of div to h3 tag
d3.select('div').html('<h3>Upgraded to H3</h3>');

// Case2: Clear the innerHTML of the div
d3.select('div').html(null);

// Case3: Insert 5 'p' tags insdie the div
d3.select('div').html(function () {
  let content = '';
  for (let i = 0; i < 5; i++) {
    content += `<p>Para with index: ${i}</p>`;
  }
  return content;
});