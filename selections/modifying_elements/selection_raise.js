// *******************************************
/*
Method: selection.raise()

Re-inserts each selected element, in order, as the last child of its parent.

*/
// *******************************************

// Case0: Select the h3 tag with Indian Red and send it to the last
d3.select('h3:nth-of-type(1)').raise();

// Case1: Select the rect tag with Indian Red color  and send it to the last
d3.select('rect:nth-of-type(1)').raise();
d3.select('rect:nth-of-type(1)').raise();