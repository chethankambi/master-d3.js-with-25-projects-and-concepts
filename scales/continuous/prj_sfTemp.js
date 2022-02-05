const yearSFTempData = [66, 67, 64, 63, 62, 60, 57, 68, 70, 69, 63, 57];

const SVG_WIDTH = d3.select('#chart svg').node().clientWidth;
const SVG_HEIGHT = d3.select('#chart svg').node().clientHeight;

const DATA_LENGTH = yearSFTempData.length;

d3.select('#chart svg').attr('viewBox', `0 -${SVG_HEIGHT} ${SVG_WIDTH} ${SVG_HEIGHT}`);

const COLOR_SCALE =
  d3.scaleLinear()
    .domain([Math.min(...yearSFTempData), Math.max(...yearSFTempData)])
    .range(['skyblue', 'orange']);

const X_TIME_SCALE =
  d3.scaleTime()
    .domain([new Date(2019, 0), new Date(2019, `${DATA_LENGTH - 1}`)])
    .range([30, SVG_WIDTH - 30]);

const Y_SCALE =
  d3.scaleLinear()
    .domain([Math.min(...yearSFTempData), Math.max(...yearSFTempData)])
    .range([50, SVG_HEIGHT - 50]);

d3.select('#chart svg')
  .selectAll('cicrle')
  .data(yearSFTempData)
  .join('circle')
  .attr('cx', (d, i) => X_TIME_SCALE(new Date(2019, i)))
  .attr('cy', d => -Y_SCALE(d))
  .attr('r', d => d / 5)
  .attr('fill', d => COLOR_SCALE(d))
// .attr('fill-opacity', '70%')
// .attr('stroke', d => COLOR_SCALE(d))
// .attr('stroke-width', '3')

const monthNames = X_TIME_SCALE.ticks(12).map(X_TIME_SCALE.tickFormat(12, '%b'));

d3.select('#chart svg')
  .selectAll('text')
  .data(yearSFTempData)
  .join('text')
  .text((d, i) => monthNames[i] + '~' + d)
  .attr('x', (d, i) => X_TIME_SCALE(new Date(2019, i)))
  .attr('y', -SVG_HEIGHT + 15)
  .attr('fill', d => COLOR_SCALE(d))
  .style('text-anchor', 'middle')
  .style('font-size', '13')
  .style('font-weight', '500')



// console.log(X_TIME_SCALE.ticks(12).map(X_TIME_SCALE.tickFormat(12, '%b')));

// monthNames.forEach(month => {
//   // console.log(monthNames.indexOf(month));
//   d3.select('#chart svg')
//     .append('text')
//     .data(month)
//     // .join('text')
//     .text(d => d)
//     .attr('x', () => X_TIME_SCALE(new Date(2019, monthNames.indexOf(month))))
//     .attr('y', 20)
//     .attr('fill', () => COLOR_SCALE(monthNames.indexOf(month)))
//     .style('text-anchor', 'middle')
// })

