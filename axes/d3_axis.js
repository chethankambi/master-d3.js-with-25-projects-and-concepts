let SVG = d3.select('svg')
  .attr('width', '500')
  .attr('height', '500');

// for reference
SVG.style('background-color', 'pink');

const SVG_WIDTH = document.querySelector('svg').clientWidth;
const SVG_HEIGHT = document.querySelector('svg').clientHeight;

// -----
let DATA = [23, 36, 67, 55, 49];

// to create an axis we need a scale
let dataScale =
  d3.scaleLinear()
    .domain([0, Math.max(...DATA)])
    .range([0, SVG_HEIGHT]);

// create left y-axis
let yAxisLeft =
  d3.axisLeft(dataScale);

// Another way of creating a type of axis
// let left = d3.axisLeft();
// let yAxisLeft = left.scale(dataScale);

// render the left y-axis
let yAxisLeftG = SVG.append('g')
  .attr('id', 'yAxisLeftG');

// yAxisLeftG.call(yAxisLeft); // either this line or the next line
// yAxisLeft(); // show the error in console, context needed
yAxisLeft(yAxisLeftG); // better to use this line

yAxisLeftG.attr('transform', 'translate(25,0)');

// fix the left y-axis
dataScale =
  d3.scaleLinear()
    .domain([0, Math.max(...DATA)])
    .range([25, SVG_HEIGHT - 25]);

yAxisLeft =
  d3.axisLeft(dataScale);

// to re-render left y-axis
yAxisLeftG =
  d3.select('#yAxisLeftG');

// yAxisLeftG.call(yAxisLeft);
yAxisLeft(yAxisLeftG)

// create y-axis on the right
let yAxisRight =
  d3.axisRight(dataScale);

// to render right y-axis
let yAxisRightG =
  SVG.append('g')
    .attr('id', 'yAxisRightG');

// yAxisRightG.call(yAxisRight); // see the overlap
yAxisRight(yAxisRightG);

yAxisRightG.attr('transform', `translate(${SVG_WIDTH - 25},0)`);
// show difference without 25

// create x-axis on the top
let xAxisTop =
  d3.axisTop(dataScale);

//  to render top x-axis
let xAxisTopG =
  SVG.append('g')
    .attr('id', 'xAxisTopG');

// xAxisTopG.call(xAxisTop); // see the black line at top
xAxisTop(xAxisTopG);

xAxisTopG.attr('transform', 'translate(0,25)');

// create x-axis on the bottom
let xAxisBottom =
  d3.axisBottom(dataScale);

//  to render top x-axis
let xAxisBottomG =
  SVG.append('g')
    .attr('id', 'xAxisBottomG');

// xAxisBottomG.call(xAxisBottom); // see the overlap
xAxisBottom(xAxisBottomG);

xAxisBottomG.attr('transform', `translate(0,${SVG_HEIGHT - 25})`);
// show the difference without 25

// ************
// axis.ticks(arguments...) same as 
// axis.tickArguments([]) where need to pass the args inside an array
// arguments will be passed to scale.ticks() and scale.tickFormat()
// This method has no effect if the scale does not implement scale.ticks, as with band and point scales

yAxisLeft.ticks(6);
yAxisLeft(yAxisLeftG);
xAxisBottom.ticks(4, '%');
xAxisBottom(xAxisBottomG);

yAxisLeft.tickArguments([4]);
yAxisLeft(yAxisLeftG);
xAxisBottom.tickArguments([6, '%']);
xAxisBottom(xAxisBottomG);

// axis.ticks(interval,specifier(optional)) // only on time scale
// axis.ticks(d3.timeMinute.every(15)); // every 15 minutes

// axis.tickValues - to set the tick values explicitly
console.log(yAxisLeft.tickValues());
yAxisLeft.tickValues(DATA);
yAxisLeft(yAxisLeftG);

// axis.tickFormat - to set the tick format explicitly
console.log(xAxisBottom.tickFormat());
xAxisBottom.tickFormat(d3.format(",.0"));
xAxisBottom(xAxisBottomG);

// axis.tickPadding - gap between the number and the tick
console.log(yAxisLeft.tickPadding());
yAxisLeft.tickPadding(0);
yAxisLeft(yAxisLeftG);
yAxisLeft.tickPadding(1.5);
yAxisLeft(yAxisLeftG);

// axis.tickSizeInner - length of the inner tick line
console.log(yAxisLeft.tickSizeInner());
yAxisLeft.tickSizeInner(3);
yAxisLeft(yAxisLeftG);
yAxisLeft.tickSizeInner(0);
yAxisLeft(yAxisLeftG);
yAxisLeft.tickSizeInner(-6);
yAxisLeft(yAxisLeftG);

// axis.tickSizeOuter - length of the outer tick line
console.log(yAxisLeft.tickSizeOuter());
yAxisLeft.tickSizeOuter(3);
yAxisLeft(yAxisLeftG);
yAxisLeft.tickSizeOuter(0);
yAxisLeft(yAxisLeftG);
yAxisLeft.tickSizeOuter(-3);
yAxisLeft(yAxisLeftG);

// axis.tickSize - sets both the inner tick and outer tick
console.log(yAxisLeft.tickSize()); // returns current inner tick size
yAxisLeft.tickSize(6);
yAxisLeft(yAxisLeftG);