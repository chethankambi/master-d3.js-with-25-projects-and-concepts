// *******************************************
/*
Method3: d3.selectAll()
Selects all elements that matches the specified selector string. If no elements in the document match the selector, or if the selector is null or undefined, returns an empty selection. The elements will be selected in document order (top-to-bottom).
*/
// *******************************************
// Case0: Select the body
let d3Body = d3.selectAll('body');
console.log(d3Body);
// Talk about the object and the '_groups' and '_parents'
/*
'_parents' remians the same (Array), but the '_groups' is a 'NodeList' instead of an array. A NodeList object is basically a collection of DOM nodes extracted from the HTML document. An array is a special data-type in JavaScript, that can store a collection of arbitrary elements, including a NodeList if needed. NodeLists are actually not a JavaScript API, but a browser API. A NodeList can be converted into an Array but not the other way around
*/

// Case1: Select all the divs
let d3AllDivs = d3.selectAll('div');
console.log(d3AllDivs);
let d3AllDivsArray = Array.from(d3AllDivs._groups[0]);
console.log(d3AllDivsArray);

// Case2: Select all the circles
let d3AllCircles = d3.selectAll('circle');
console.log(d3AllCircles);
let d3AllCirclesArray = Array.from(d3AllCircles._groups[0]);
console.log(d3AllCirclesArray);

// Case3: Select the container div and then select the remaining divs
let d3DivClCont = d3.select('.container');
console.log(d3DivClCont);
let d3AllDivsContDiv = d3DivClCont.selectAll('div');
console.log(d3AllDivsContDiv);
// Notice how the '_parents' changes to div.container

// Case4: Select only the divs with class = 'content'
let d3AllDivClContent = d3DivClCont.selectAll('div.content');
console.log(d3AllDivClContent);

// Case5: Select only the first div with class = 'content' using the variable obtained in Case1 and Case3
let firstDivClContent = d3AllDivs.select('div.content');
console.log(firstDivClContent); // OR
firstDivClContent = d3DivClCont.select('div.content');
console.log(firstDivClContent);

// Case6: Select all p elements that are inside the div with class = 'content'
let allPs = d3.selectAll('div.content').selectAll('p');
console.log(allPs); // OR
allPs = d3.selectAll('p');
console.log(allPs);
// For each selected element, selects the descendant elements that match the specified selector string. The elements in the returned selection are grouped by their corresponding parent node in this selection. If no element matches the specified selector for the current element, or if the selector is null, the group at the current index will be empty.

// Case7: Select all circle elements that are inside the svg with class = 'svgcontainer'
let allCircles = d3.selectAll('svg.svgcontainer').selectAll('circle');
console.log(allCircles); // OR
allCircles = d3.selectAll('circle');
console.log(allCircles);

// Feature Case: Function as the selection criteria
let d3EleClCont = d3.selectAll('.content')
  .select(function (d, i, n) {
    console.log(d, i, n);
    console.log(n[i]);
    console.log(this);
    return this;
  });
console.log(d3EleClCont);

// Feature Case: Function as the selection criteria
let d3EleClSvgCont = d3.selectAll('.svgcontainer')
  .select(function (d, i, n) {
    console.log(d, i, n);
    console.log(n[i]);
    console.log(this);
    return this;
  });
console.log(d3EleClSvgCont);

// If the selector is a function, it is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). It must return an array of elements (or a pseudo-array, such as a NodeList), or the empty array if there are no matching elements. 


// Case8: Select all the divs with class = 'content' and then pass a function for the next select(); comment out case 9 while running this case
let d3AllDivClContFn =
  d3.selectAll('div.content')
    .select(function () { // later on we will see a better method .each()
      this.style.backgroundColor =
        `rgb(
          ${Math.random() * 255}, 
          ${Math.random() * 255}, 
          ${Math.random() * 255}
        )`;
      console.log(this);
      return this; // may or may not want to return
    });
console.log(d3AllDivClContFn);

// Case9: Change the colors of each 'p' element; comment out case 8 to see the effects
let allPsColor =
  d3.selectAll('div.content')
    .selectAll('p')
    .select(function () { // later on we will see a better method .each()
      this.style.color =
        `rgb(
        ${Math.random() * 255}, 
        ${Math.random() * 255}, 
        ${Math.random() * 255}
        )`;
      console.log(this);
      return this; // may or may not want to return
    });
console.log(allPsColor);
// same as above code
// allPs.select(function () {
//   this.style.color =
//     `rgb(
//         ${Math.random() * 255}, 
//         ${Math.random() * 255}, 
//         ${Math.random() * 255}
//         )`;
//   console.log(this);
// });

// Case10: Access the circles only in the 2nd svg and run access each circle via select(function); Changing colors works differently with svg that we will see later
let allCirclesSecSvg = d3.select('svg:nth-of-type(2)')
  .selectAll('circle')
  .select(function (d, i, n) {
    console.log(d);
    console.log(i);
    console.log(n);
    console.log(n[i]);
    console.log(this)
  });
console.log(allCirclesSecSvg);

/*
For each selected element, selects the descendant elements that match the specified selector string. The elements in the returned selection are grouped by their corresponding parent node in this selection.

Talk about '_groups' and '_parents'

In general, we can have selection.select() or selection.selectAll(), where selection is either d3.select() or d3.selectAll(); the chaining can be longer too but not recommended to have deep levels

Additionally, we can also have nested selections, but we will get to it when we come across such a situation.
*/