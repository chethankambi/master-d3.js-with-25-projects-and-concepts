// *******************************************
/*
Method3: selection.empty()

Returns true if this selection contains no (non-null) elements.

*/
// *******************************************
// Case0: Select svg and use empty
console.log(d3.select('svg').empty());
// Case1: Select svg and select all rect inside and then use empty
console.log(d3.select('svg').select('rect').empty());

// Use this to check for confirmation of selections in large applications