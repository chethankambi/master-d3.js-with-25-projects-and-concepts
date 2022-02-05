// *******************************************
/*
Method4: selection.join(enter,update,exit)

Appends, removes and reorders elements as necessary to match the data that was previously bound by selection.data, returning a merged enter and update selection.

This method is a convenient alternative to the explicit general update pattern.

The enter function may be specified as a string shorthand, as above, which is equivalent to selection.append with the given element name.

Likewise, optional update and exit functions may be specified, which default to the identity(update seln) function and calling selection.remove, respectively.

The selections returned by the enter and update functions are merged and then returned by selection.join.

By passing separate functions on enter, update and exit, you have greater control over what happens. 

And by specifying a key function to selection.data, you can minimize changes to the DOM to optimize performance.

NOTE: You also animate enter, update and exit by creating transitions inside the enter, update and exit functions. To avoid breaking the method chain, use selection.call to create transitions, or return an undefined enter or update selection to prevent merging: the return value of the enter and update functions specifies the two selections to merge and return by selection.join.

*/
// *******************************************

// Case0: Select div #paras1 and bind data, then use .join()
let pData = [1, 2, "three"];
d3.select('#paras1')
  .selectAll('p')
  .data(pData)
  .join('p')
  .text(d => d);

pData = ['3', 56, 'D3', 'App', 95];
d3.select('#paras1')
  .selectAll('p')
  .data(pData)
  .join('p')
  .text(d => d);

// Case1: Select div #paras2 and bind data, then use functions as parameters to .join() to see the GUP in action
pData = [1, 2];
d3.select('#paras2')
  .selectAll('p')
  .data(pData)
  .join(
    enter => console.log(enter), // _enter selected from the update seln
    update => console.log(update), // the traditional update seln
    exit => console.log(exit) // _exit selected from the update seln
    // .join() is doing the 'General Update Patter' behind the scenes
  );

pData = [1, 2];
d3.select('#paras2')
  .selectAll('p')
  .data(pData)
  .join(
    enter => enter.append('p').style('color', 'red'), // _enter selected from the update seln
    update => update.style('color', 'blue'), // the traditional update seln
    exit => exit.remove() // _exit selected from the update seln
    // .join() is doing the 'General Update Patter' behind the scenes
  )
  .text(d => d);

pData = ['One', 'Big', 'Program'];
d3.select('#paras2')
  .selectAll('p')
  .data(pData)
  .join(
    enter => enter.append('p').style('color', 'red'), // _enter selected from the update seln
    update => update.style('color', 'blue'), // the traditional update seln
    exit => exit.remove() // _exit selected from the update seln
    // .join() is doing the 'General Update Patter' behind the scenes
  )
  .text(d => d);

// Case2: Select the svg #circles1 and bind data for circle elements and then use .join() to see the results
let circleData = [
  {
    cx: '50',
    cy: '50',
    r: '45'
  },
  {
    cx: '150',
    cy: '50',
    r: '35'
  }
];
d3.select('#circles')
  .selectAll('circle')
  .data(circleData)
  .join('circle') // recommended alternative for GUP fn
  .attr('cx', d => d.cx)
  .attr('cy', d => d.cy)
  .attr('r', d => d.r);
//
circleData = [
  {
    cx: '50',
    cy: '45',
    r: '25'
  },
  {
    cx: '150',
    cy: '55',
    r: '25'
  }
];
d3.select('#circles')
  .selectAll('circle')
  .data(circleData)
  .join('circle') // recommended alternative for GUP fn
  .attr('cx', d => d.cx)
  .attr('cy', d => d.cy)
  .attr('r', d => d.r);