/*
TYPE:

D3 global object is available as 'd3' in the browser (SHOW:d3 object)

D3 Selections Module:
Transform the DOM by selecting elements and joining to data. 'Selections' module is part of the BASE D3 library or you can import it as a stand-alone module

SPEAK:
Selections allow powerful data - driven transformation of the document object model(DOM): set attributes, styles, properties, HTML or text content, and more. Using the data join’s enter and exit selections, you can also add or remove elements to correspond to data.

Selection methods typically return the current selection, or a new selection, allowing the concise application of multiple operations on a given selection via method chaining.
*/

// *******************************************
// Method1: d3.selection()
// Selects the root element
// *******************************************
// Case0: Select the root document element
let rootDocElement = d3.selection();
// no arguments inside the ()
// even if you pass arguments, it does not work!

/*
SPEAK:
Explain the output object that has '_groups' and '_parents'.
Whenever a selections method is used we get these 2.

1. '_groups': Is the first property of this object. This holds the reference to the DOM or the elements in the DOM to which we would want to attach data eventually or do some modifications. Will always be an ARRAY so that we can iterate and bind data. This ARRAY has arrays as its elements.
=> rootDocElement._groups === rootDocElement['_groups']
=> rootDocElement._groups[0]
=> rootDocElement._groups[0][0]

2. '_parents': Is the second property of this object. This holds reference to the parent of the current selection
*/

console.log(rootDocElement);
// observe that the parents = null in developer console
/*
This method can also be used to test for selection(var instanceof d3.selection) or to extend the selection prototype (rarely done, some developers do when looking to extend the module functionality)
*/
console.log(rootDocElement instanceof d3.selection);
// d3.selection() method returns a d3.selection object
// typeof d3.selection
// typeof d3.selection()
// d3.selection() instanceof d3.selection - true

// Case1: Changing the background color
rootDocElement.style('background-color', 'red');
// returns the same object back i.e 'rootDocElement'
// TYPE in Browser 'rootDocElement.style('color', 'red');'
// No need to worry about .style() here, we'll get to it later

// CaseX: Method Chaining Concept
rootDocElement
  .style('background-color', 'red')
  .style('background-color', 'green');
// We will see elaborate cases of method chaining further