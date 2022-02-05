const revenues = [1857, 2169, 1615, 1511, 1434];
const SVG_WIDTH = document.querySelector('svg').clientWidth;
const SVG_HEIGHT = document.querySelector('svg').clientHeight;

const growthFactor =
  d3.scaleQuantize()
    .domain([Math.min(...revenues), Math.max(...revenues)])
    .range(['#87CEFA', '#ADD8E6', '#4682B4']);

d3.select('svg')
  .selectAll('rect')
  .data(revenues)
  .join('rect')
  .attr('height', d => d / 5)
  .attr('width', SVG_WIDTH / revenues.length - 10)
  .attr('x', (d, i) => i * SVG_WIDTH / revenues.length)
  .attr('y', d => (SVG_HEIGHT - d / 5) - 25)
  .attr('fill', d => growthFactor(d))
  .attr('rx', '5')
  .attr('ry', '5')

d3.select('svg')
  .selectAll('text')
  .data(revenues)
  .join('text')
  .text(d => d)
  .attr('x', (d, i) => i * SVG_WIDTH / revenues.length + 40)
  .attr('y', SVG_HEIGHT)
  .style('text-anchor', 'start')
  .style('fill', 'darkgrey')
  .style('font-weight', '600')

console.log(growthFactor.thresholds());