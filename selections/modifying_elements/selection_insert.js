// *******************************************
/*
Method8: selection.insert(type,before)

If the specified type is a string, inserts a new element of this type (tag name) before the first element matching the specified before selector for each selected element.

For example, a before selector :first-child will prepend nodes before the first child. If before is not specified, it defaults to null.

To append elements in an order consistent with bound data, use selection.append; will see this after the data section

Both type and before may instead be specified as functions which are evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).

The type function should return an element to be inserted; the before function should return the child element before which the element should be inserted.

In both cases, this method returns a new selection containing the appended elements. Each new element inherits the data of the current elements, if any, in the same manner as selection.select.

*/
// *******************************************

// Case0: Same functionality as .append() without the before selector
d3.select('.paras1')
  .insert('p')
  .text('Added using insert');

// Case1: Insert a p element before the first p element
d3.select('.paras1')
  .insert('p', 'p')
  .text('Added using insert but before the first p tag');

// Case2: Insert p element into both the div elements
d3.selectAll('div')
  .insert('p', 'p')
  .text('Added as part of the selectAll using insert');

// Case3: Insert a p element only in the 2nd div but before the last p element
d3.select('.paras2')
  .insert('p', 'p:last-of-type')
  .text('Added only in the 2nd div');

// Case4: Insert 2 p elements inside the 2nd div, by passing a function as type for insert(), and 'p' as the before selector
for (let i = 0; i < 2; i++) {
  d3.select('.paras2').insert(function () {
    return document.createElement('p');
  }, 'p').text(`Inserted as ${i + 1} p using function`);
}

// Case5: Insert a text element inside the svg using insert, while passing function for both type and before parameters respectively
const svg = d3.select('svg') //or can use .texts
  .attr('width', '400')
  .attr('height', '200');
const initialText = d3.select('svg text')
  .attr('x', '0')
  .attr('y', '20');
svg.insert(function () {
  return document.createElementNS('http://www.w3.org/2000/svg', 'text')
}, function () {
  // console.log(this);
  return this.firstElementChild;
})
  .text('Added using insert(), with both type and before as functions')
  .attr('x', '0')
  .attr('y', '40');