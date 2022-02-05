d3.csv('prj_atlantaAirport.csv', d => {
  return {
    // year: new Date(`${d.Year}`),
    year: Number(d.Year),
    passengers: Number(d.Passengers)
  }
}).then(data => {
  console.log(data)
  const SVG = d3.select('#chart svg');
  const SVG_WIDTH = SVG.node().clientWidth;
  const SVG_HEIGHT = SVG.node().clientHeight;
  const BUFFER = 35;

  const MAX_PASSENGERS = d3.max(data, d => d.passengers);
  const MIN_PASSENGERS = d3.min(data, d => d.passengers);
  // console.log(MAX_PASSENGERS);

  const Y_SCALE = d3.scaleLinear()
    .domain([MAX_PASSENGERS, MIN_PASSENGERS])
    .range([BUFFER, SVG_HEIGHT - BUFFER])
    .nice();

  const X_SCALE = d3.scaleLinear()
    .domain([data[0].year, data[data.length - 1].year])
    .range([BUFFER, SVG_WIDTH - BUFFER])
    .nice();

  // console.log((data[0]))
  // console.log((data[0].year))
  // console.log(X_SCALE(data[1].year))

  const Y_AXIS = d3.axisLeft(Y_SCALE).ticks(5);
  const Y_AXIS_G = SVG.append('g')
    .attr('id', 'yAxis')
    .attr('transform', `translate(${BUFFER},0)`);
  Y_AXIS(Y_AXIS_G);

  const X_AXIS = d3.axisBottom(X_SCALE).ticks(10, '.0f');
  const X_AXIS_G = SVG.append('g')
    .attr('id', 'xAxis')
    .attr('transform', `translate(0,${SVG_HEIGHT - BUFFER})`);
  X_AXIS(X_AXIS_G);

  SVG.append('g')
    .attr('id', 'areaChart')
    .attr('transform', `translate(0,${SVG_HEIGHT})`);

  d3.select('#areaChart')
    .selectAll('path')
    .data([data])
    .join('path')
    .attr('d', d3.area(
      d => X_SCALE(d.year),
      -BUFFER,
      d => -(SVG_HEIGHT - Y_SCALE(d.passengers))
    )
      // .curve(d3.curveNatural)
    )
    .style('fill', 'tomato')
    .style('fill-opacity', '0.25')
    .style('stroke', 'tomato');

  data.forEach((year, index) => {
    d3.select('#areaChart')
      .append('text')
      .data([year])
      .join('text')
      .text(d => d.passengers)
      .attr('x', d => X_SCALE(d.year))
      .attr('y', d => -(SVG_HEIGHT - Y_SCALE(d.passengers)) - 10)
      .style('fill', 'tomato')
      .style('text-anchor', 'middle')
      .style('font-size', '11')
      .style('font-weight', '600');
  });

  data.forEach((year, index) => {
    d3.select('#areaChart')
      .append('circle')
      .data([year])
      .join('circle')
      .attr('cx', d => X_SCALE(d.year))
      .attr('cy', d => -(SVG_HEIGHT - Y_SCALE(d.passengers)))
      .attr('r', '3')
      .style('fill', 'tomato');
  });
});