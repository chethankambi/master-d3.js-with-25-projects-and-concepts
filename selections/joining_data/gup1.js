// *******************************************
/*
General Update Pattern (GUP)

The process of adding, removing and updating DOM elements in a single function. Takes care of all three possible scenarios: More Data Than DOM elements, Less Data Than DOM elements, or the same number of Data and DOM elements

*/
// *******************************************

// Case0: Select div #paras0 and bind data to the existing p elements. 

// # of data points = # of p elements
let ref1 = d3.select('#paras0')
  .selectAll('p')
  .data([1, 2, 3])
  .text(d => d);
// # of data points > # of p elements
let ref2 = d3.select('#paras0')
  .selectAll('p')
  .data([4, 5])
  .text(d => d)
  .exit()
  .remove();
// # of data points < # of p elements
let ref3 = d3.select('#paras0')
  .selectAll('p')
  .data([6, 7, 8, 9])
  .enter()
  .append('p')
  .text(d => d);

// Case1: Select div #paras1, bind data to the p elements to be appended inside the div. 

// No 'p' elements inside the div to start off with
let seln1 = d3.select('#paras1')
  .selectAll('p')
  .data([1, 2, 3])
  .enter()
  .append('p')
  .text(d => d);
// # of data points > # of p elements
let seln2 = d3.select('#paras1')
  .selectAll('p')
  .data([4, 5, 6, 7])
  .enter()
  .append('p')
  .merge(seln1)
  .text(d => d);
// # of data points < # of p elements
let seln3 = d3.select('#paras1')
  .selectAll('p')
  .data([8, 9])
  .text(d => d)
  .exit()
  .remove();

// Case2: Access div #paras2 and implement both enter() and exit() using a function, for an array of any length

let bindData = [45, 56, 78, 43]; // assume that this data changes
// In practical cases keeping track of data points and elements is tough, so...
function updateData(data) {
  // Create a base selection with bound data
  let selection = d3.select('#paras2')
    .selectAll('p')
    .data(data);

  selection.enter()
    .append('p')
    .merge(selection)
    .text(d => d);

  selection.exit()
    .remove();
}

updateData(bindData);

bindData = [34, 67, 98, 12, 45, 2];
updateData(bindData);

bindData = [55, 87, 55];
updateData(bindData);