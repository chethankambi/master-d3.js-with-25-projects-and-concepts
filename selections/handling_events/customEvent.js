// *******************************************
/*
Method4: d3.customEvent(event,listener,that,arguments)

Invokes the specified listener, using the specified that 'this' (default) context and passing the specified arguments(as an array), if any.

During the invocation, d3.event is set to the specified event; after the listener returns (or throws an error), d3.event is restored to its previous value.

Returns the value returned by the listener.

**FOR ME** In addition, sets event.sourceEvent to the prior value of d3.event, allowing custom events to retain a reference to the originating native event.
*/
// *******************************************

// Case0: Select svg, set dimensions, append 2 rect and set dimensions. Use click on first circle and thenuse d3.customEvent to drive changes on both 1st and 2nd circle elements
const svg = d3.select('svg')
  .attr('width', '200')
  .attr('height', '100')

svg.append('circle')
  .attr('cx', '50')
  .attr('cy', '50')
  .attr('r', '50')
  .style('fill', 'red')

svg.append('circle')
  .attr('cx', '150')
  .attr('cy', '50')
  .attr('r', '50')
  .style('fill', 'gray')

// d3.select('circle:nth-of-type(1)').on('click', (d, i, n) => {
//   d3.select(n[i]).style('fill', 'green');
//   d3.customEvent(d3.event,
//     function (...arguments) {
//       // console.log(arguments);
//       d3.select('circle:nth-of-type(2)').style('fill', arguments[1]);
//       d3.select(n[i]).style('fill', arguments[0]);
//     }, n[i], ['purple', 'green']);
// });

let customEventReturn;

d3.select('circle:nth-of-type(1)').on('click', function (d, i, n) {
  console.log(d3.event);
  d3.select(n[i]).style('fill', 'green');
  customEventReturn = d3.customEvent(d3.event, // any valid event can be passed here
    function (...arguments) {
      console.log(d3.event);
      const locArray = arguments;
      setTimeout(function () {
        console.log(locArray);
        d3.select('circle:nth-of-type(2)').style('fill', locArray[1]);
        d3.select(n[i]).style('fill', locArray[0]);
      }, 1000)
      return 'Success!';
    }, n[i], ['purple', 'green']);
  console.log(customEventReturn);
});

