// data from Google Trends on D3.js search for Jan 2020 to March 2020
// Not sure about the units
// -----
const D3_JS_DATA =
  [64, 71, 21, 62, 62, 83, 41, 40, 60, 60, 49, 38, 84];
let START_DATE = new Date(2020, 0, 5);
const END_DATE = new Date(2020, 2, 29);

const SVG = d3.select('svg');
const SVG_WIDTH = SVG.node().clientWidth;
const SVG_HEIGHT = SVG.node().clientHeight;

const BUFFER = 25;
// -----
// COLOR SCALE
const COLOR = d3.scaleThreshold()
  .domain([Math.round(d3.mean(D3_JS_DATA))])
  .range(["#AED6F1", "#2874A6"]);
// Y AXIS SCALE
const Y_AXIS_SCALE =
  d3.scaleLinear()
    .domain([Math.max(...D3_JS_DATA), 0]) // inverted to change the axis accordingly
    .range([BUFFER, SVG_HEIGHT - BUFFER]);
// Y AXIS
const Y_AXIS =
  d3.axisLeft(Y_AXIS_SCALE)
    .tickSizeOuter(0)
    .tickSizeInner(3)
    .ticks(12);
// Y AXIS GROUP
const Y_AXIS_G = SVG.append('g').attr('id', 'yAxisG');
// RENDER Y AXIS
Y_AXIS(Y_AXIS_G);
// TRANSFORM Y AXIS GROUP
Y_AXIS_G.attr('transform', `translate(${BUFFER},0)`)
// -----
// X AXIS SCALE
const X_AXIS_SCALE =
  d3.scaleTime()
    .domain([new Date(START_DATE.setDate(START_DATE.getDate() - 7)),
    new Date(END_DATE.setDate(END_DATE.getDate() + 7))])
    .range([BUFFER, SVG_WIDTH - BUFFER]);

// X AXIS
const X_AXIS =
  d3.axisBottom(X_AXIS_SCALE)
    .tickSizeOuter(0)
    .tickSizeInner(3)
    .ticks(D3_JS_DATA.length, "%m/%d")
    .tickPadding(8);

// X AXIS GROUP
const X_AXIS_G = SVG.append('g').attr('id', 'xAxisG');
// RENDER X AXIS
X_AXIS(X_AXIS_G);
// TRANSFORM X AXIS GROUP
X_AXIS_G.attr('transform', `translate(0,${SVG_HEIGHT - BUFFER})`);
// -----
// RENDER BARS
let maxBarWidth =
  X_AXIS_SCALE(END_DATE) -
  X_AXIS_SCALE(new Date(2020, 2, 29));
maxBarWidth = Math.floor(maxBarWidth) - 2;
// console.log(maxBarWidth);

D3_JS_DATA.forEach((count) => SVG.append('g').attr('class', 'pair').data([count]));

const PAIR_G = d3.selectAll('.pair');

PAIR_G.each((d, i, n) => {
  // console.log(d3.select(n[i]).selectAll('rect').data(d => [d]));
  d3.select(n[i])
    .selectAll('rect')
    .data(d => [d])
    .join('rect')
    .attr('width', maxBarWidth)
    .attr('height', () => SVG_HEIGHT - BUFFER - Y_AXIS_SCALE(d) - 1)
    .attr('x', () =>
      X_AXIS_SCALE(new Date(START_DATE.setDate(START_DATE.getDate() + 7))) - maxBarWidth / 2)
    .attr('y', () => Y_AXIS_SCALE(d))
    .attr('rx', '2')
    .attr('ry', '2')
    .style('fill', d => COLOR(d))
});

// RESET START DATE TO BEGIN
START_DATE = new Date(2019, 11, 29);

PAIR_G.each((d, i, n) => {
  // console.log(d3.select(n[i]).selectAll('rect').data(d => [d]));
  d3.select(n[i])
    .selectAll('text')
    .data(d => [d])
    .join('text')
    .text(d => d)
    .attr('x', () =>
      X_AXIS_SCALE(new Date(START_DATE.setDate(START_DATE.getDate() + 7))))
    .attr('y', () => Y_AXIS_SCALE(d) - 5)
    .style('fill', 'gray')
    .style('text-anchor', 'middle')
    .style('font-size', '12')
    .style('font-weight', '600')
});
// ADD THE NOTE
document.querySelector('#note p').innerHTML =
  `Note: Y-Axis is the count | X-Axis is the week | Average search count for the period was: <b>${Math.round(d3.mean(D3_JS_DATA))}</b>`;

// ADD THE LEGEND
document.querySelector('#below').style.backgroundColor = COLOR(56);
document.querySelector('#above').style.backgroundColor = COLOR(57);