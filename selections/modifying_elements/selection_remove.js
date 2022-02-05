// *******************************************
/*
Method9: selection.remove()

Removes the selected elements from the document.

Returns this selection (the removed elements) which are now detached from the DOM.

*** Extra - There is not currently a dedicated API to add removed elements back to the document; however, you can pass a function to selection.append or selection.insert to re-add elements.

*/
// *******************************************

// Case0: Select the div with paras and then remove the div, using insert add the div back just before the script tag
const div = d3.select('div');
const removedDiv = div.remove();
d3.select('body').insert(function () {
  return removedDiv.node();
}, 'script');

// Case1: Select all the rect elements and remove the selection, using append add the rect elements back into the svg
const rects = d3.selectAll('rect');
const removedRects = rects.remove();

for (let i = 0; i < removedRects.size(); i++) {
  d3.select('svg').append(function () {
    // console.log(removedRects.nodes()[i]);
    return removedRects.nodes()[i];
  });
}