// *******************************************
/*
Method4: selection.filter(filter)
Filters the selection, returning a new selection that contains only the elements for which the specified filter is true. The filter may be specified either as a selector string or a function. If the filter is a function, it is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
*/
// *******************************************

// Case0: Select all the p elements and use filter to select the odd elements
const oddPs = d3.select('.paras')
  // .selectAll('p:nth-child(odd)') // we get a NodeList
  .selectAll('p')
  .filter(':nth-child(odd)'); // we get an Array
console.log(oddPs);

// Case1: Select all the rect elements and use filter to select odd elements
const oddCircles = d3.select('.rects')
  // .selectAll('rect:nth-child(odd)') // we get a NodeList
  .selectAll('rect')
  .filter(':nth-child(odd)')
console.log(oddCircles);

// Case2: Select all the p elements and use filter to select the even elements
const evenPs = d3.select('.paras')
  // .selectAll('p:nth-child(even)') // we get a NodeList
  .selectAll('p')
  .filter(':nth-child(even)'); // we get an Array
console.log(evenPs);

// Case3: Select all the rect elements and use filter to select the even elements
const evenCircles = d3.select('.rects')
  // .selectAll('rect:nth-child(even)') // we get a NodeList
  .selectAll('rect')
  .filter(':nth-child(even)'); // we get an Array
console.log(evenCircles);

// Case4: Select all p elements and filter using the class = 'odd'
const oddPsClOdd = d3.select('.paras') // notice the difference in '_parents' if this line is not used
  .selectAll('p')
  .filter('.odd');
console.log(oddPsClOdd);

// Case5: Select all rect elements and filter using the class = 'odd'
const oddRectsClOdd = d3.select('.rects') // notice the difference in '_parents' if this line is not used
  .selectAll('rect')
  .filter('.odd');
console.log(oddRectsClOdd);

// Case6: Select all p elements and filter using the class = 'even'
const evenPsClEven = d3.select('.paras') // notice the difference in '_parents' if this line is not used
  .selectAll('p')
  .filter('.even');
console.log(evenPsClEven);

// Case6: Select all rect elements and filter using the class = 'even'
const evenRectsClEven = d3.select('.rects') // notice the difference in '_parents' if this line is not used
  .selectAll('rect')
  .filter('.even');
console.log(evenRectsClEven);

// Case7: Select all p elements and use a function as a filter argument to sellect the odd p elements
const oddPsFilFn = d3.selectAll('p')
  .filter(function (d, i, n) {
    return i % 2 === 0;
  });
console.log(oddPsFilFn);

// Case8: Select all rect elements and use a function as a filter argument to select the odd rect elements
const oddRectsFilFn = d3.selectAll('rect')
  .filter(function (d, i, n) {
    return i % 2 === 0;
  });
console.log(oddRectsFilFn);

// Case9: Select all p elements and use a function as a filter argument to sellect the even p elements
const evenPsFilFn = d3.selectAll('p')
  .filter(function (d, i, n) {
    return i % 2 === 1;
  });
console.log(evenPsFilFn);

// Case10: Select all rect elements and use a function as a filter argument to select the even rect elements
const evenRectsFilFn = d3.selectAll('rect')
  .filter(function (d, i, n) {
    return i % 2 === 1;
  });
console.log(evenRectsFilFn);