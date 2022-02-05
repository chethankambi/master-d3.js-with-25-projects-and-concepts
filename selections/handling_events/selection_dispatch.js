// *******************************************
/*
Method2: selection.dispatch(type,parameters(optional))

Dispatches a custom event of the specified type to each selected element, in order. type is a string.

An optional parameters map may be specified to set additional properties of the event. It may contain the following fields:
  bubbles - if true, the event is dispatched to ancestors in reverse tree order.
  cancelable - if true, event.preventDefault is allowed.
  detail - any custom data associated with the event.

If parameters is a function, it is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). It must return the parameters map for the current element.

NOTE: Custom events help run different scripts as they can be put outside of the callbacks. Also all elements in the selection will receive the same event type and details if any
*/
// *******************************************
// https://www.fabiofranchino.com/blog/dispatch-custom-event-with-parameter/

// https://stackoverflow.com/questions/40415144/how-to-externally-trigger-d3-events

// *******************************************

// Case0: Select the svg, set the dimensions, append circle with 'cx' and 'cy'. Use dispatch to create a custom event to set the value of 'r'
let svgCircles = d3.select('#circles')
  .attr('width', '400')
  .attr('height', '300');

const circle1 = svgCircles.append('circle')
  .attr('cx', '200')
  .attr('cy', '150')

console.log(circle1);

circle1.on('rad', (d, i, n) => {
  // console.log(d3.event);
  d3.select(n[i]).attr('r', d3.event.detail);
});
// dispatch should be called only after we have an event listner ready i.e on()
circle1.dispatch('rad', {
  detail: '100', // detail can be an object too
  cancelable: true,
  bubbles: true
});

// Case1: Select the svg, use dispatch to create a custom event to set the value of 'r' by passing as fn as arg
circle1.on('rad', (d, i, n) => {
  // console.log(d3.event);
  d3.select(n[i]).attr('r', d3.event.detail);
});

circle1.dispatch('rad', function (d, i, n) {
  return {
    detail: '50', // detail can be an object too
    cancelable: true,
    bubbles: true
  }
});

// var userLoginEvent = new CustomEvent("userLogin", {
//   detail: 100,
//   bubbles: true,
//   cancelable: true
// });

// // userLogin = d3.select(userLogin);

let event = new CustomEvent('userLogin', {
  detail: 100,
  bubbles: true,
  cancelable: true
});

d3.select('div').on("userLogin", function () {
  console.log("Event is: ", d3.event);
  console.log("Custom data is: ", d3.event.detail);
});

// document.querySelector('div').dispatchEvent(event) // works
d3.select('div').dispatch(event) // does NOT work