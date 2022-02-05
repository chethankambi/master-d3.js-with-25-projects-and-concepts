// *******************************************
/*
Method7: d3.selector(selector)
Given the specified selector, returns a function which returns the first descendant of this element that matches the specified selector. This method is used internally by selection.select.
*/
// *******************************************

// Case0: Select the 'div' element, and create a selector for 'h1'. Then call the selector function on the div element

// Only for me : http://using-d3js.com/01_01_creating_selections.html


let divEle = d3.select('div');
console.log(divEle);

let h1Selector = d3.selector('h1');
console.log(h1Selector);

console.log(h1Selector.call(divEle.node()));

// Same output, same job is getting done!
console.log(divEle.select(h1Selector));
console.log(d3.select('div').select('h1'));

// Case1: Select the 'svg' element, and create a selector for 'rect'. Then call the selector function on the svg element

let svgEle = d3.select('svg');
console.log(svgEle);

let rectSelector = d3.selector('rect');
console.log(rectSelector);

console.log(rectSelector.call(svgEle.node()));

// Same output, same job is getting done!
console.log(svgEle.select(rectSelector));
console.log(d3.select('svg').select('rect'));