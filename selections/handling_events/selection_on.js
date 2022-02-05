// *******************************************
/*
Method1: selection.on(typenames,listener,options(optional))

Adds or removes a listener to each selected element for the specified event typenames.

The typenames is a string event type, such as click, mouseover, or submit; any DOM event type supported by your browser may be used.

To specify multiple typenames, separate typenames with spaces, such as input change or click.foo click.bar.

The type may be optionally followed by a period (.) and a name; the optional name allows multiple callbacks to be registered to receive events of the same type, such as click.1 and click.2. 

When a specified event is dispatched on a selected element, the specified listener will be evaluated for the element, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).

**FOR ME** Listeners always see the latest datum for their element, but the index is a property of the selection and is fixed when the listener is assigned; to update the index, re-assign the listener. 

If an event listener was previously registered for the same typename on a selected element, the old listener is removed before the new listener is added.

If a listener is not specified, returns the currently-assigned listener for the specified event typename on the first (non-null) selected element, if any. If multiple typenames are specified, the first matching listener is returned.

*/
// *******************************************

// // Case0: Select svg #toggle-color, set width and height, append a rect, set its width and height and add a on() on the rect element
// let svgToggleColor =
//   d3.select('#toggle-color')
//     .attr('width', '300')
//     .attr('height', '400');

// let rect1 =
//   svgToggleColor.append('rect')
//     .attr('x', '50')
//     .attr('y', '20')
//     .attr('width', '200')
//     .attr('height', '100');

// rect1.on('click', (d, i, n) => {
//   n[i].style.fill = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
// });

// // Case1: Select svg #toggle-color, append another rect, set its width and height and add a on() on the rect element with 2 different events
// let rect2 =
//   svgToggleColor.append('rect')
//     .attr('x', '50')
//     .attr('y', '130')
//     .attr('width', '200')
//     .attr('height', '100');

// rect2.on('mouseenter click', (d, i, n) => {
//   d3.select(n[i]).style('fill', `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`);
// });

// // Case2: Select svg #toggle-color, append another rect, set its width and height and add a on() on the rect element with 2 events of the same type to see multiple callbacks
// let rect3 =
//   svgToggleColor.append('rect')
//     .attr('x', '50')
//     .attr('y', '240')
//     .attr('width', '200')
//     .attr('height', '100');

// let t = 1;

// rect3.on('click.1 click.2', (d, i, n) => {
//   console.log('called click:', `${t} time(s)`);
//   if (t == 1) {
//     d3.select(n[i]).style('fill', `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`);
//   }
//   else {
//     setTimeout(() => {
//       d3.select(n[i])
//         .attr('rx', '20')
//         .attr('ry', '20')
//     }, 2000);
//   }
//   t++;
// });

// // Case3: Get the current assigned listener for 'click'
// console.log(rect1.on('click')); // returns the handler function
// console.log(rect2.on('click')); // returns the handler function
// console.log(rect2.on('mouseenter')); // returns the handler function
// console.log(rect3.on('click')); // returns undefined
// console.log(rect3.on('click.1')); // returns handler function
// console.log(rect3.on('click.2')); // returns handler function
// console.log(rect3.on('click.1 click.2')) // returns handler function

// // Case4: Remove the click events on the rect elements
// rect1.on('click', null);
// rect2.on('click', null);
// rect2.on('mouseenter', null);
// rect3.on('click.1', null);
// rect3.on('click.2', null);

// // Case5: Adding on on an existing selection
// d3.select('#paras1')
//   .selectAll('p')
//   .on('click', (d, i, n) => n[i].style.fontWeight = 'bold');


//
let t = 0;
let svgListener = d3.select('svg')
  .on('click.red click.blue', function (e, d) {

    // console.log(e, d, this);

    console.log(t);
    // t++;

    const svg = d3.select(this);

    if (t == 0) {
      svg.style('background-color', 'red');
    }
    if (t == 1) {
      setTimeout(() => {
        svg.style('background-color', 'blue');
      }, 2000);
    }

    t++;
    // console.log(e, d, this);
    // color(e);
    // this.backgroundColor = 'red';
    // console.log(this.backgroundColor);
    // console.log(e.target.__on[1].name);
    // console.log(this);
    // if (e.target.__on[0].name == 'red') {
    //   console.log('inside red');
    //   // e.target.backgroundColor = 'red';
    //   d3.select(this).style('background-color', 'red');
    // }
    // if (e.target.__on[1].name == 'blue') {
    //   setTimeout(function () {
    //     console.log('inside blue');
    //     // e.target.backgroundColor = 'blue';
    //     d3.select(this).style('background-color', 'blue');
    //   }, 2000)
    // }
  });

function color(e) {
  console.log(this);
  console.log('COLOR:', e);
}



// console.log(svgListener);