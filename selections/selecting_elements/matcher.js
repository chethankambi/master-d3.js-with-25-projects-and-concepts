// *******************************************
/*
Method6: d3.matcher(selector)
Given the specified selector, returns a function which returns true if 'this' element matches the specified selector. This method is used internally by selection.filter. We do not use this method directly
*/
// *******************************************

// Case0: Select the 'h1' element, and create a matcher for 'h1'. Then call the matcher function on the element

// Only for me : http://using-d3js.com/01_01_creating_selections.html

let h1Ele = d3.select('h1');
console.log(h1Ele);

let h1Matcher = d3.matcher('h1');
console.log(h1Matcher);

console.log(h1Matcher.call(h1Ele.node()));

console.log(h1Ele.filter(h1Matcher));

// Case1: Select the 'circle' element, and create a matcher for 'circle'. Then call the matcher function on the element

// Only for me : http://using-d3js.com/01_01_creating_selections.html

let circleEle = d3.select('circle');
console.log(circleEle);

let circleMatcher = d3.matcher('circle');
console.log(circleMatcher);

console.log(circleMatcher.call(circleEle.node()));

console.log(circleEle.filter(circleMatcher));