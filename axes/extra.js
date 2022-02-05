// X AXIS
const X_AXIS =
  d3.axisBottom(X_AXIS_SCALE)
    .tickSizeOuter(0)
    .tickSizeInner(3)
    .ticks(D3_JS_DATA.length, '%m/%d')
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

D3_JS_DATA.forEach(count => SVG.append('g')
  .attr('class', 'pair')
  .data([count]));

const PAIR_G = d3.selectAll('.pair');
console.log(PAIR_G);

PAIR_G.each((d, i, n) => {
  d3.select(n[i])
    .selectAll('rect')
    .data(d => [d])
    .join('rect')
    .attr('width', maxBarWidth)
    .attr('height', () => SVG_HEIGHT - BUFFER - Y_AXIS_SCALE(d) - 1)
    .attr('x', () => X_AXIS_SCALE(new Date(START_DATE.setDate(START_DATE.getDate() + 7))) - maxBarWidth / 2)
    .attr('y', () => Y_AXIS_SCALE(d))
    .attr('rx', '2')
    .attr('ry', '2')
    .style('fill', () => COLOR(d));
});

// RESET START DATE 
START_DATE = new Date(2019, 11, 29);

PAIR_G.each((d, i, n) => {
  d3.select(n[i])
    .selectAll('text')
    .data(() => [d])
    .join('text')
    .text(() => d)
    .attr('x', () => X_AXIS_SCALE(new Date(START_DATE.setDate(START_DATE.getDate() + 7))))
    .attr('y', () => Y_AXIS_SCALE(d) - 5)
    .style('fill', 'gray')
    .style('text-anchor', 'middle')
    .style('font-size', '12')
    .style('font-weight', '600');
});
// ADD NOTE
document.querySelector('#note p').innerHTML =
  `Note: Y-Axis is the count | X-Axis is the week | Average search count for the entire period was: <b>${Math.round(d3.mean(D3_JS_DATA))}</b>`;
// ADD LEGEND
document.querySelector('#below').style.backgroundColor = COLOR(Math.round(d3.mean(D3_JS_DATA)) - 1);
document.querySelector('#above').style.backgroundColor = COLOR(Math.round(d3.mean(D3_JS_DATA)));