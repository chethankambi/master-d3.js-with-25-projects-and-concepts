// *******************************************
/*
Method2: selection.classed(name,value)

If a 'value' is specified, assigns or unassigns the specified CSS class 'names' on the selected elements by setting the 'class' attribute or modifying the 'classList' property (maybe in html) and returns this selection. The specified 'names' is a string of space-separated class names.

If the value is truthy, then all elements are assigned the specified classes; otherwise, the classes are unassigned.

If the value is a function, it is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).

The function’s return value is then used to assign or unassign classes on each element.

If a value is not specified, returns true if and only if the first (non-null) selected element has the specified classes. This is generally useful only if you know the selection contains exactly one element.

*/
// *******************************************

// Case0: Select the h1 tag and check if the .gray class exists
let h1Ele = d3.select('h1').classed('gray');
console.log(h1Ele); // returns false

// Case1: Add the class of .gray using attr() and then check if the class exists
h1Ele = d3.select('h1').attr('class', 'gray'); // OR
console.log(h1Ele);
h1Ele = d3.select('h1').classed('gray', true);
console.log(h1Ele);
console.log(d3.select('h1').classed('gray')); // returns true

// Case2: Remove the .gray class and observe the output, then toggle back
h1Ele = d3.select('h1').classed('gray', 0);
h1Ele = d3.select('h1').classed('gray', 1);

// Case3: Add another class called .underline to h1 and get the class names
d3.select('h1').classed('underline', true); // using attr to deal with class messes the entire class attribute
console.log(d3.select('h1').attr('class'));

// Case4: Remove all the classes from h1 and assign classes together and then remove only the class .underline
d3.select('h1').attr('class', null);
d3.select('h1').classed('gray underline', true);
d3.select('h1').classed('underline', false);

// Case5: Select all the lines add classes = .linecolor and .linewidth
let lines = d3.selectAll('line');
console.log(lines);
lines.classed('linecolor linewidth', true);

// Case6: Select all lines and add classes = .linecap and .linedasharray
lines.classed('linecap', true); // try butt, square and round; default is butt, retain butt to see the dasharray effect clearly
lines.classed('linedasharray', true);

// Case7: Select all the lines and change the opacity of odd numbered lines by passing a function to the classed() method
lines.classed('lineopacity', function (d, i) {
  return i % 2 === 0 ? true : false;
});
console.log(lines.attr('class')); // to see all the classes