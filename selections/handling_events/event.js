// *******************************************
/*
Method3: d3.event

The current event, if any.

This is set during the invocation of an event listener, and is reset after the listener terminates.

*/
// *******************************************

// Case0: Select the svg and set its dimensions, append 3 rect elements. Set the attributes of the rect elements. Add event listeners on all and check the event
const svg = d3.select('svg')
  .attr('width', '100')
  .attr('height', '200')

svg.append('rect')
svg.append('rect')
svg.append('rect')

d3.selectAll('rect')
  .attr('width', '80')
  .attr('height', '50')
  .attr('x', '10')
  .attr('y', (d, i, n) => {
    return (i * 60) + 10
  });

d3.selectAll('rect')
  .on('click', () => {
    d3.event.preventDefault(); // see this value in the console (true)
    console.log(d3.event)
  }); // each and every element has an event listener now

// Case1: Remove all the individual listeners and set up a listener on the svg and use event bubbling
d3.selectAll('rect').on('click', null);

d3.select('svg').on('click', (d, i, n) => {
  // console.log(d3.event); // bubbles is true
  const eventTarget = d3.event.target;
  if (eventTarget.nodeName === 'rect') {
    // console.log(eventTarget);
    // console.log(d3.select(eventTarget));
    d3.select(eventTarget).style('fill', 'orange');
  }
})