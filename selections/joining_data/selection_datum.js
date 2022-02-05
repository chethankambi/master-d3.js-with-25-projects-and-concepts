// *******************************************
/*
Method5: selection.datum(value)

Gets or sets the bound data for each selected element.

Unlike selection.data, this method does not compute a join and does not affect indexes or the enter and exit selections. So, working on appended elements is useful with datum().

If a value is specified, sets the element’s bound data to the specified value on all selected elements.

If the value is a constant, all elements are given the same datum.

If the value is a function, it is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). The function is then used to set each element’s new data.

A null value will delete the bound data.

If a value is not specified, returns the bound datum for the first (non-null) element in the selection. This is generally useful only if you know the selection contains exactly one element.

*/
// *******************************************

// Case0: Select the div #paras1 and set the value of p elements using datum()
d3.select('#paras1')
  .selectAll('p')
  .datum('Only one data') // single value
  .text(d => d)

// Case1: Select the div #paras1 and set the value of p elements using datum() with a fun as arg
d3.select('#paras1')
  .selectAll('p')
  .datum(function (d, i, n) {
    return i + 1;
  })
  .text(d => d);

// Case2: Get the data bound to the p elements
let boundData = d3.select('#paras1')
  .selectAll('p')
  .datum();
console.log(boundData); // only one data; the first element's
// 
boundData = d3.select('#paras1')
  .selectAll('p')
  .datum(function (d, i, n) {
    console.log(`Data at ${i} is ${d}`);
    return `Data at ${i} is ${d}`;
  })
  .text(d => d);

// Case3: Remove all the bound data using null as arg
d3.select('#paras1')
  .selectAll('p')
  .datum(null)
  .text(d => d);