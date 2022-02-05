// *******************************************
/*
Method1: selection.data(data,key)

Binds the specified array of data with the selected elements, returning a new selection that represents the update selection: the elements successfully bound to data. 

When data is assigned to an element, it is stored in the property __data__, thus making the data “sticky” and available on re-selection. Also defines the enter and exit selections on the returned selection, which can be used to add or remove elements to correspond to the new data.

The specified data is an array of arbitrary values (e.g., numbers or objects), or a function that returns an array of values for each group.

The data is specified for each group in the selection. If the selection has multiple groups (such as d3.selectAll followed by selection.selectAll), then data should typically be specified as a function.

This function will be evaluated for each group in order, being passed the group’s parent datum (d, which may be undefined), the group index (i), and the selection’s parent nodes (nodes), with this as the group’s parent element.

NOTE: We shall look at key arg at the end of this section

*/
// *******************************************

// Case0: Select div with id=paras1 and understand .data()
let divParas1 = d3.select('#paras1');
console.log(divParas1); // check the __data__
divParas1 = divParas1.data(['DIV1']); // has to be an array
console.log(divParas1); // check the __data__
// talk about the enter and exit properties
console.log(divParas1.data()); // to check the bound data
divParas1.select(function (d, i, n) {
  console.log(d, i, n, n[i], this);
}); // to finally see d,i,n
divParas1.data(function (d, i, n) {
  console.log(d, i, n, n[i], this);
  // error in console because there is no return value for the data method to bind to divParas1
  return ['DIV1 Section']; // add this line to remove the error
}); // gets the d,i,n of the parent when nothing is returned
divParas1.text(d => d);// this line will overwrite and remove all existing elements inside #paras1

// Case1: Select all p elements inside #paras2 and understand data() by binding one data point at a time
let allPParas2 = d3.select('#paras2').selectAll('p');
console.log(allPParas2);

allPParas2 = allPParas2.data([1]);
console.log(allPParas2);
console.log(allPParas2.data());
allPParas2.select(function (d, i, n) {
  console.log(d, i, n, n[i], this); // shows only the first p element as the other 2 are in exit selection
});
allPParas2.text(d => d);
// 
allPParas2 = d3.select('#paras2').selectAll('p'); // need to reselect to do a fresh binding of data
allPParas2 = allPParas2.data([2, 3]);
console.log(allPParas2);
console.log(allPParas2.data());
allPParas2.select(function (d, i, n) {
  console.log(d, i, n, n[i], this); // shows only the 1,2 p element as the other 1 is in exit selection
});
allPParas2.text(d => d);
// 
allPParas2 = d3.select('#paras2').selectAll('p'); // need to reselect to do a fresh binding of data
allPParas2 = allPParas2.data([4, 5, 6]);
console.log(allPParas2);
console.log(allPParas2.data());
allPParas2.select(function (d, i, n) {
  console.log(d, i, n, n[i], this); // shows all 3
});
allPParas2.text(d => d);
// 
console.log(allPParas2); // go through the object

// Case2: Understand .data() on a nested selection
let allPParas34 = d3.selectAll('#paras3,#paras4').selectAll('p');
console.log(allPParas34);
allPParas34 = allPParas34.data([7, 8, 9]);
console.log(allPParas34);
allPParas34.select(function (d, i, n) {
  console.log(d, i, n, n[i], this);
});
allPParas34.text(d => d);

// Case3: Understand passing a function as arg to .data()
allPParas34 = d3.selectAll('#paras3,#paras4').selectAll('p');
allPParas34.data(function () {
  return [Math.floor(Math.random() * 100),
  Math.floor(Math.random() * 100),
  Math.floor(Math.random() * 100)];
});
allPParas34.select(function (d, i, n) {
  console.log(d, i, n, n[i], this);
});
allPParas34.text(d => d);