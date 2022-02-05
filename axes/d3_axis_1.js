let ALLOT_WIDTH = SVG_WIDTH / DATA.length;
console.log(SVG_WIDTH);
console.log(ALLOT_WIDTH);

let xScale =
  d3.scaleLinear()
    .domain([0, DATA.length - 1])
    .range([0, SVG_WIDTH - ALLOT_WIDTH]);

let yScale =
  d3.scaleLinear()
    .domain([0, Math.max(...DATA)])
    .range([0, SVG_HEIGHT]);

let dataG = SVG.append('g')
  .attr('id', 'data');

dataG.selectAll('rect')
  .data(DATA)
  .join('rect')
  .attr('x', (d, i) => xScale(i))
  .attr('y', d => SVG_HEIGHT - yScale(d))
  .attr('width', ALLOT_WIDTH - 10)
  .attr('height', d => yScale(d))

// set equal gap on either side of the bar
let TOTAL_GAP = 10;
let BAR_WIDTH = ALLOT_WIDTH - TOTAL_GAP;

dataG.selectAll('rect')
  .data(DATA)
  .join('rect')
  .attr('x', (d, i) => xScale(i) + TOTAL_GAP / 2)
  .attr('y', d => SVG_HEIGHT - yScale(d))
  .attr('width', BAR_WIDTH)
  .attr('height', d => yScale(d));

dataG.selectAll('text')
  .data(DATA)
  .join('text')
  .text((d, i) => `Day ${i + 1}`)
  .attr('x', (d, i) => xScale(i) + TOTAL_GAP / 2 + BAR_WIDTH / 2)
  .attr('y', d => SVG_HEIGHT)
  .style('fill', 'white')
  .style('text-anchor', 'middle');

// Add axis on the left
let yAxis = d3.axisLeft(); // returns a function
// console.log(yAxis()); // needs a scale as input
console.log(yAxis); // needs a scale as input

yAxis = d3.axisLeft(yScale);
// console.log(yAxis()); // needs a selection to render
console.log(yAxis);

let yAxisG = SVG.append('g')
  .attr('id', 'yAxis')
  .call(yAxis);

yAxisG = yAxisG.attr('transform', 'translate(25,0)');

let CHART_WIDTH = SVG_WIDTH - 25;

// redo the chart