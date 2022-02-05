d3.csv('prj_best5Countries.csv', d => {
  return {
    country: d.Country.toUpperCase(),
    gdp: Number(d.GDP),
    adv: Number(d.Adventure),
    ci: Number(d['Cultural Influence']),
    ent: Number(d.Entrepreneurship),
    her: Number(d.Heritage),
    pow: Number(d.Power)
  }
}).then(data => {
  // console.log(data);

  const SVG = d3.select('svg');
  const SVG_WIDTH = SVG.node().clientWidth;
  const SVG_HEIGHT = SVG.node().clientHeight;
  const BUFFER = 30;

  // y scale and axis
  const Y_SCALE = d3.scaleLinear()
    .domain([100, 0])
    .range([BUFFER, SVG_HEIGHT - BUFFER]);
  const Y_AXIS = d3.axisLeft(Y_SCALE);
  const Y_AXIS_G = SVG.append('g')
    .attr('id', 'yAxis')
    .attr('transform', `translate(${BUFFER},0)`);
  Y_AXIS(Y_AXIS_G);

  // x scale and axis
  const X_SCALE = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.gdp)])
    .range([BUFFER, SVG_WIDTH - BUFFER]);
  const X_AXIS = d3.axisBottom(X_SCALE);
  const X_AXIS_G = SVG.append('g')
    .attr('id', 'xAxis')
    .attr('transform', `translate(0,${SVG_HEIGHT - BUFFER})`);
  X_AXIS(X_AXIS_G);

  // minor y axis
  SVG.append('g')
    .attr('id', 'minorYAxis')
    .attr('transform', `translate(${BUFFER},${SVG_HEIGHT - BUFFER})`);
  for (let i = 0; i <= 5000; i += 500) {
    d3.select('#minorYAxis')
      .append('line')
      .attr('x1', X_SCALE(i) - BUFFER)
      .attr('y1', '0')
      .attr('x2', X_SCALE(i) - BUFFER)
      .attr('y2', -(SVG_HEIGHT - 2 * BUFFER))
      .style('stroke', 'gray')
      .style('stroke-width', '0.1');
  }

  // minor x axis
  SVG.append('g')
    .attr('id', 'minorXAxis')
    .attr('transform', `translate(${BUFFER},${SVG_HEIGHT})`);
  for (let i = 0; i <= 100; i += 10) {
    d3.select('#minorXAxis')
      .append('line')
      .attr('x1', '0')
      .attr('y1', -Y_SCALE(i))
      .attr('x2', SVG_WIDTH - 2 * BUFFER)
      .attr('y2', -Y_SCALE(i))
      .style('stroke', 'gray')
      .style('stroke-width', '0.1');
  }

  const CHART = SVG.append('g')
    .attr('id', 'chart')
    .attr('transform', `translate(${BUFFER},${SVG_HEIGHT - BUFFER})`);

  data.forEach((obj, index) => {

    CHART.append('g')
      .attr('id', `${obj.country}`);

    d3.select(`#${obj.country}`)
      .selectAll('path')
      .data([obj.adv, obj.ci, obj.ent, obj.her, obj.pow])
      .join('path')
      .each((d, i, n) => {
        d3.select(n[i])
          .attr('transform', `translate(${X_SCALE(obj.gdp) - BUFFER},${-(SVG_HEIGHT - BUFFER - Y_SCALE(d))})`)
          .attr('d', d3.symbol().type(d3.symbols[i]))
          .style('fill', d3.schemeDark2[index]);
      });

    d3.select(`#${obj.country}`)
      .selectAll('text')
      .data([obj.adv, obj.ci, obj.ent, obj.her, obj.pow])
      .join('text')
      .each((d, i, n) => {
        d3.select(n[i])
          .text(d => d)
          .attr('x', X_SCALE(obj.gdp) - BUFFER - 10)
          .attr('y', d => -(SVG_HEIGHT - BUFFER - Y_SCALE(d)) + 5)
          .style('text-anchor', 'end')
          .style('font-size', '10')
          .style('font-weight', '600')
          .style('fill', d3.schemeDark2[index]);
      });
  });

  data.forEach((obj, index) => {
    d3.select('#legend1')
      .append('p')
      .text(obj.country)
      .style('color', d3.schemeDark2[index]);
  });

  data.columns.forEach((col, index) => {
    if (index == 0 || index == 1) { }
    else {
      d3.select('#legend2')
        .append('div')
        .append('svg')
        .attr('id', `symbol${index - 2}`)
        .attr('width', '15')
        .attr('height', '15')
        .append('path')
        .attr('transform', 'translate(7.5,7.5)')
        .attr('d', d3.symbol().type(d3.symbols[index - 2]))
        .style('fill', 'gray');
    }
  });

  d3.select('#legend2')
    .selectAll('div')
    .each((d, i, n) => {
      d3.select(n[i])
        .append('p')
        .text(data.columns[i + 2]);
    });
});