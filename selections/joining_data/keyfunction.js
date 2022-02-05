// *******************************************
/*

Key Function: An optional arguement into the .data() method

If a key function is not specified, then the first datum in data is assigned to the first selected element, the second datum to the second selected element, and so on.

A key function may be specified to control which datum is assigned to which element, replacing the default join-by-index, by computing a "string" identifier for each datum and element.

This key function is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]); the returned string is the element’s key.

The key function is then also evaluated for each new datum in data, being passed the current datum (d), the current index (i), and the group’s new data, with this as the group’s parent DOM element; the returned string is the datum’s key. The datum for a given key is assigned to the element with the matching key. If multiple elements have the same key, the duplicate elements are put into the exit selection; if multiple data have the same key, the duplicate data are put into the enter selection.

The update and enter selections are returned in data order, while the exit selection preserves the selection order prior to the join.

If a key function is specified, the order of elements in the selection may not match their order in the document; use selection.order or selection.sort as needed.

*/
// *******************************************

// Case0: Select the div paras1 and bind data, use key function to generate the key for the data elements, later use join()
let keyData = [1, 2, 3];

let selnP = d3.select('#paras1')
  .selectAll('p')
  .data(keyData, (d, i, n) => {
    // d = d3.select(n[i]).text() !== undefined ? d3.select(n[i]).text() : d = d.toString();
    d = d.toString();
    console.log(d, i, n, n[i]);
    return d; // the returned string is the element's key
  })
  .join('p')
  .text(d => d);

// Case1: Select the div paras1 and bind data (a new data , increase the data points), use key function to generate the key for the data elements, later use join()
keyData = [1, 5, 7, 2, 8, 3];
selnP = d3.select('#paras1')
  .selectAll('p')
  .data(keyData, (d, i, n) => {
    d = d.toString();
    console.log(d, i, n, n[i]);
    return d;
  })
  .join('p')
  .text(d => d);
// Case2: // Case1: Select the div paras1 and bind data (a new data , decrease the data points), use key function to generate the key for the data elements, later use join()
keyData = [1, 5, 7, 8, 3];
selnP = d3.select('#paras1')
  .selectAll('p')
  .data(keyData, (d, i, n) => {
    d = d.toString();
    console.log(d, i, n, n[i]);
    return d;
  })
  .join('p')
  .text(d => d);
// Case3: // Case1: Select the div paras1 and bind data (a new data , repeat the data points), use key function to generate the key for the data elements, later use join()
keyData = [1, 5, 7, 8, 3, 7, 8];
selnP = d3.select('#paras1')
  .selectAll('p')
  .data(keyData, (d, i, n) => {
    d = d.toString();
    console.log(d, i, n, n[i]);
    return d;
  })
  .join('p')
  .text(d => d);
// Case4: // Case1: Select the div paras1 and bind data (a new data , remove the duplicate data points and add new), use key function to generate the key for the data elements, later use join()
keyData = [1, 5, 7, 3, 8, 9];
selnP = d3.select('#paras1')
  .selectAll('p')
  .data(keyData, (d, i, n) => {
    d = d.toString();
    console.log(d, i, n, n[i]);
    return d;
  })
  .join('p')
  .text(d => d);

// NOTE: We might not use key function often but in some cases its the best option