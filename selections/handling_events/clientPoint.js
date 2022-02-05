// *******************************************
/*
Method6: d3.clientPoint(container,event)

Returns the x and y coordinates of the specified event relative to the specified container. **FOR ME**(The event may also be a touch.)

The container may be an HTML or SVG container element, such as a G element or an SVG element.

The coordinates are returned as a two-element array of numbers [x, y].

*/
// *******************************************

// Case0: Select svg and set dimensions. Select svg and add on() on the svg, inside the svg listener add on() on the body to create an event. Use the click event on svg inside the listener of the body. Use d3.clientPoint

const body = d3.select('body')

const svg = d3.select('svg')
svg.attr('width', '300')
  .attr('height', '300')

let svgClick;

d3.select('svg').on('click', () => {
  svgClick = d3.event;
  body.on('mouseenter', (d, i, n) => {
    // console.log(d3.event);
    // console.log(d3.mouse(body.node())); // OR
    console.log(d3.mouse(n[i]));
    console.log(d3.clientPoint(n[i], d3.event))

    const bodySvg = d3.clientPoint(n[i], svgClick);
    console.log(bodySvg);
  });
});