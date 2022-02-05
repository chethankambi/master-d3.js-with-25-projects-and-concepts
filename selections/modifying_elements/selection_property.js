// *******************************************
/*
Method4: selection.property(name,value)

Some 'HTML' elements have special properties that are not addressable using attributes or styles, such as a form field’s text value and a checkbox’s checked boolean. Use this method to get or set these properties.

If a value is specified, sets the property with the specified name to the specified value on selected elements. If the value is a constant, then all elements are given the same property value.

If the value is a function, it is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). The function’s return value is then used to set each element’s property. A null value will delete the specified property.

If a value is not specified, returns the value of the specified property for the first (non-null) element in the selection. This is generally useful only if you know the selection contains exactly one element.

*/
// *******************************************

// Case0: Select all the labels and assign the 'for' attribute and verify that .property() does not add the attribute
const labelsFor = ['fname', 'lname', 'gender', 'male', 'female', 'nomention'];
const labels = d3.selectAll('label');
labels.filter(function (d, i) {
  const d3Obj = d3.select(this);
  d3Obj.attr('for', labelsFor[i]); // property does not work here!
});

// Case1: Select the fname and assign type and placeholder using .property()
d3.select('#fname')
  .property('type', 'text') // works
  .property('placeholder', 'John'); // works
console.log(d3.select('#fname').property('placeholder'));

// Case2: Select the lname and assign type and placeholder using .property()
d3.select('#lname')
  .property('type', 'text') // works
  .property('placeholder', 'Doe'); // works  
console.log(d3.select('#lname').property('type'));

// Case3: Select the submit and assign type and value using .property()
d3.select('#submit')
  .property('type', 'submit') // works
  .property('value', 'Submit'); // works  
console.log(d3.select('#submit').property('value'));

// Case4: Select all the gender inputs and set the type and value attributes
const genderInputs = d3.selectAll('div input');
genderInputs.property('type', 'checkbox');

const genderValues = ['male', 'female', 'nomention'];
genderInputs.property('value', function (d, i) {
  return genderValues[i];
});

// Case5: Select the no mention checkbox and set it to true by default
const nomention = d3.select('#nomention');
nomention.property('checked', 'true');
// nomention.attr('checked', 'true'); // notice the difference
console.log(nomention.property('checked'));
console.log(nomention.attr('checked'));

// Case6: Submit the form and check the values of the input fields; .attr() does not get help in this situation
document.querySelector('#formsubmit')
  .addEventListener('submit', e => {
    e.preventDefault();
    console.log(d3.select('#fname').property('value'));
    console.log(d3.select('#lname').property('value'));
    console.log(d3.select('#male').property('checked'));
    console.log(d3.select('#female').property('checked'));
    console.log(d3.select('#nomention').property('checked'));
  });
