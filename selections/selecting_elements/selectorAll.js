// *******************************************
/*
Method8: d3.selectorAll(selector)
Given the specified selector, returns a function which returns all descendants of this element that match the specified selector. This method is used internally by selection.selectAll.
*/
// *******************************************

// Case0: Select the 'div' element, and create a selectorAll for 'p'. Then call the selector function on the element

// Only for me : http://using-d3js.com/01_01_creating_selections.html

let divEle = d3.select('div');
console.log(divEle);

let allPSelector = d3.selectorAll('p');
console.log(allPSelector);

console.log(allPSelector.call(divEle.node()));

// Same output, same job is getting done!
console.log(divEle.selectAll(allPSelector));
console.log(d3.select('div').selectAll('p'));

// Case1: Select the 'svg' element, and create a selectorAll for 'circle'. Then call the selector function on the svg element

// Only for me : http://using-d3js.com/01_01_creating_selections.html

let svgEle = d3.select('svg');
console.log(svgEle);

let allCircleSelector = d3.selectorAll('circle');
console.log(allCircleSelector);

console.log(allCircleSelector.call(svgEle.node()));

// Same output, same job is getting done!
console.log(svgEle.selectAll(allCircleSelector));
console.log(d3.select('svg').selectAll('circle'));