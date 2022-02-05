// d3.scaleLinear()
let xScale = d3.scaleLinear([0, 1], [0, 1]);
xScale = d3.scaleLinear([0, 100], [0, 25]);

// .domain()
xScale = d3.scaleLinear()
  .domain([50, 100]);

// .range()  
xScale = d3.scaleLinear()
  .domain([20, 80])
  .range([30, 50]);

const svgWidth = d3.select('svg').attr('width');

d3.select('svg')
  .selectAll('rect')
  .data([75])
  .join('rect')
  .attr('width', d => xScale(d))
  .attr('height', '20')
  .attr('x', '0')
  .attr('y', '10');

xScale = d3.scaleLinear()
  .domain([20, 80])
  .range([0, svgWidth]);

d3.select('svg')
  .selectAll('rect')
  .data([75])
  .join('rect')
  .attr('width', d => xScale(d))
  .attr('height', '20')
  .attr('x', '0')
  .attr('y', '10');

xScale = d3.scaleLinear()
  .domain([20, 80, 140])
  .range([0, 150, svgWidth]);

d3.select('svg')
  .selectAll('rect')
  .data([140])
  .join('rect')
  .attr('width', d => xScale(d))
  .attr('height', '20')
  .attr('x', '0')
  .attr('y', '10');

let color = d3.scaleLinear()
  .domain([20, 80, 140])
  .range(['red', 'green', 'blue']);

d3.select('svg')
  .selectAll('rect')
  .data([49])
  .join('rect')
  .attr('width', d => xScale(d))
  .attr('height', '20')
  .attr('x', '0')
  .attr('y', '10')
  .style('fill', d => color(d));

// .invert()
console.log(xScale.invert(300));
console.log(xScale.invert(0));
console.log(xScale.invert(150));
console.log(xScale.invert(134.678));

// .rangeRound()
let x1Scale = d3.scaleLinear()
  .domain([10, 100])
  .rangeRound([40, 50]);

// .clamp(boolean)
xScale = d3.scaleLinear()
  .domain([20, 40, 60])
  .range([0, 150, svgWidth]);

xScale.clamp(true);

// .unknown()
xScale.unknown('THINK AGAIN!');

// .interpolate(interpolate_variable)
color = d3.scaleLinear()
  .domain([20, 80, 140])
  .range(['red', 'green', 'blue'])
  .interpolate(d3.interpolateHcl);

d3.select('svg')
  .selectAll('rect')
  .data([49])
  .join('rect')
  .attr('width', d => xScale(d))
  .attr('height', '20')
  .attr('x', '0')
  .attr('y', '10')
  .style('fill', d => color(d));

//  .ticks(count)
xScale.ticks();
console.log(xScale.ticks());

xScale = d3.scaleLinear()
  .domain([20, 120])
  .range([0, svgWidth]);

console.log(xScale.ticks());

console.log(xScale.ticks(20));

// .tickFormat(count,specifier(optional))
let xTicks = xScale.ticks(6);
let xTickFormat = xScale.tickFormat(6, "+");

xTicks.map(xTickFormat);
console.log(xTicks.map(xTickFormat));

// d3.tickFormat(start,stop,count,specifier(optional))
let d3TickFormat = d3.tickFormat(-10, 10, 6, '-');
console.log(d3TickFormat(-0.5));
console.log(d3TickFormat(0.5));
console.log(d3TickFormat(-6.5));

xTicks.map(d3TickFormat);
console.log(xTicks.map(d3TickFormat));

// .nice(count(optional))
let x2Scale = d3.scaleLinear()
  .domain([1.256, 7.345])
  .range([20, 40]);

x2Scale.nice();

console.log(x2Scale.ticks());

// .copy()
let x3scale = xScale;
