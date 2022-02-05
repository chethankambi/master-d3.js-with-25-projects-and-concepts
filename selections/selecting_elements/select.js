// *******************************************
/*
Method2: d3.select(selector)
Selects only the first matching element that matches the specified selector string. If no elements match the selector, an empty selection is returned. If multiple elements match the selector, only the first matching element (in document order) will be selected.
*/
// *******************************************
// Case0: Select the html
let d3Html = d3.select('html');
console.log(d3Html);
// Talk about the object and the '_groups' and '_parents'

// Case1: Select the head
let d3Head = d3.select('head');
console.log(d3Head);

// Case2: Select the body
let d3Body = d3.select('body');
console.log(d3Body);

// Case3: Select the div
let d3Div = d3.select('div');
console.log(d3Div);
// '_parents' points to the initial context from which the referencing happened. The _parents property contains an array of Nodes, which correspond to the elements from which the search for selected elements takes place.
// In case of select(), '_parents' will always point to html as the context; even in cases of nesting, the parents' base reference is to html, as select() preserves the existing group structure and indexes, and propagates data (if any) to selected children.

// Case4: Select the svg
let d3Svg = d3.select('svg');
console.log(d3Svg);

// Case5: Select the element with a class of container
let d3EleCont = d3.select('.container');
console.log(d3EleCont);

// Case6: Select the element with a class of svgcontainer
let d3EleSvgCont = d3.select('.svgcontainer');
console.log(d3EleSvgCont);

// Case7: Select the div with a class of container
let d3DivCont = d3.select('div.container');
console.log(d3DivCont);

// Case7: Select the first element with class = 'content'
// Selects the first occurence
let firstEleClContent = d3.select('.content');
console.log(firstEleClContent); // selects h1

// Case8: Select the first div with class = 'content'
let firstDivClContent = d3.select('div.content:nth-of-type(1)');
console.log(firstDivClContent);
firstDivClContent = d3.select('div.content');
console.log(firstDivClContent);

// Case9: Select the second div with class = 'content'
let secondDivClContent = d3.select('div.content:nth-of-type(2)');
console.log(secondDivClContent);

// Case10: Select the element with the id = 'empty'
// Ids are unique so this is simple and easy to reference
let dividempty = d3.select('#empty');
console.log(dividempty);

// Case11: Select container div and then select the h1; a bit of method chaining here
// We also see here selection.select(selector) format, selector can be a selector string or a function
let d3H3 = d3.select('.container').select('.content');
console.log(d3H3);

// Case12: Select container svg and then select the first circle
let d3SvgContCircle1 = d3.select('.svgcontainer').select('circle');
console.log(d3SvgContCircle1);

// Case13: Select container svg and then select the second circle
let d3SvgContCircle2 = d3.select('.svgcontainer').select('circle:nth-child(2)');
console.log(d3SvgContCircle2);

// NOTE: For a complete list of CSS selectors
// https://www.w3schools.com/cssref/css_selectors.asp

// Feature Case1: Function as the selection criteria
// If the selector is a function, it is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). It must return an element, or null if there is no matching element.
let d3H1Fn = d3.select('.content')
  .select(function (d, i, n) {
    console.log(d, i, n);
    console.log(n[i]);
    console.log(this);
    return this;
  });
console.log(d3H1Fn);

// Feature Case2: Function as the selection criteria
// If the selector is a function, it is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). It must return an element, or null if there is no matching element.
let d3CircleFn = d3.select('circle')
  .select(function (d, i, n) {
    console.log(d, i, n);
    console.log(n[i]);
    console.log(this);
    return this;
  });
console.log(d3CircleFn);

// CaseX: Instance of
console.log(d3DivCont instanceof d3.selection); // true
console.log(d3DivCont instanceof d3.select); // false
/*
d3.select() method returns a d3.selection object containing zero or more element nodes from the DOM
typeof d3.selection
typeof d3.select()
d3.select() instanceof d3.selection - true
*/

// Special Case: Analogy between Vanilla JS and D3
let vanillaCont = document.querySelector('.container');
let d3Cont = d3.select('.container');

console.log(vanillaCont);
console.log(d3Cont); // kind of an intermediate state

// Get the equivalent of vanillaCont
let d3ContEqVanCont = d3Cont.node(); // or d3.select('container').node(); // we will talk about node() and nodes() when we get to control flow

console.log(vanillaCont);
console.log(d3ContEqVanCont);