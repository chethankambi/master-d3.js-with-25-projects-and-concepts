d3.csv('prj_businessOutreach.csv', d => {
  return {
    month: d['Month'].substring(0, 3).toUpperCase(),
    mktg: Number(d.Marketing),
    sales: Number(d.Sales),
    dMktg: Number(d['Digital Marketing']),
  }
}).then(data => {
  console.log(data)

  const MAX_MKTG = d3.max(data, d => d.mktg);
  const MAX_SALES = d3.max(data, d => d.sales);
  const MAX_DMKTG = d3.max(data, d => d.dMktg);
  // console.log(MAX_MKTG, MAX_SALES, MAX_DMKTG);

  const MAX_VALUE = d3.max([MAX_MKTG, MAX_SALES, MAX_DMKTG]);
  // console.log(MAX_VALUE);

  const SVG = d3.select('#chart svg');
  const BUFFER = 35;
  const SVG_WIDTH = SVG.node().clientWidth;
  const MAX_RADIUS = SVG_WIDTH / 2 - BUFFER;

  SVG.append('g')
    .attr('id', 'radialChart')
    .attr('transform', `translate(${SVG_WIDTH / 2},${SVG_WIDTH / 2})`);

  const RADIAL_SCALE = d3.scaleLinear()
    .domain([0, MAX_VALUE])
    .range([0, MAX_RADIUS]);

  const RADIAL_LINE =
    d3.lineRadial()
      .angle((d) => d[0] * (Math.PI / 180))
      .radius((d) => RADIAL_SCALE(d[1]));

  const ANGLE = 360 / data.length;

  // major axis and axis name
  data.forEach((spend, index) => {
    SVG.select('#radialChart')
      .append('path')
      .attr('id', `axisMonth${index}`)
      .attr('d', RADIAL_LINE(
        [
          [index * ANGLE, 0],
          [index * ANGLE, MAX_VALUE]
        ]
      ))
      .style('fill', 'none')
      .style('stroke-width', '0.5');

    const PATH_LENGTH = SVG.select(`#axisMonth${index}`).node().getTotalLength();

    SVG.selectAll(`#axisMonth${index}`)
      .style('stroke-dasharray', PATH_LENGTH)
      .style('stroke-dashoffset', PATH_LENGTH)
      .transition()
      .duration(2000)
      .style('stroke-dashoffset', 0)
      .style('stroke', 'lightgray')

    const PATH = RADIAL_LINE(
      [
        [index * ANGLE, 0],
        [index * ANGLE, MAX_VALUE]
      ]
    );
    console.log(PATH);
    const SELECT_INDEX = PATH.indexOf('L');
    const SELECT_POSITION = PATH.slice(SELECT_INDEX + 1);
    let [X, Y] = [...SELECT_POSITION.split(',')];
    X = Number(X) + 10;
    Y = Number(Y) + 10;

    SVG.select('#radialChart')
      .append('text')
      .attr('class', 'axisMonthText')
      .text(() => spend.month)
      .attr('x', X)
      .attr('y', Y)
      .style('text-anchor', 'middle')
      .style('font-size', '9')
      .style('fill', 'white')
      .transition()
      .duration(2000)
      .style('fill', 'gray')

  });

  // minor axis
  function createMinorAxis(rad) {
    SVG.select('#radialChart')
      .append('g')
      .attr('class', 'minorAxis')
      .selectAll('path')
      .data([data])
      .join('path')
      .attr('d', d3.lineRadial()
        .angle((d, i) => (i * ANGLE) * (Math.PI / 180))
        .radius(d => RADIAL_SCALE(MAX_VALUE / rad))
        .curve(d3.curveLinearClosed)
      )
      .style('fill', 'none')
      .style('stroke', 'lightgray')
      .style('stroke-width', '0.5');
  }
  createMinorAxis(2);
  createMinorAxis(1);

  // radial line
  function createRadialLine(dept, color) {
    SVG.select('#radialChart')
      .append('g')
      .attr('id', dept)
      .selectAll('path')
      .data([data])
      .join('path')
      .attr('d', d3.lineRadial()
        .angle((d, i) => (i * ANGLE) * (Math.PI / 180))
        .radius(d => RADIAL_SCALE(d[dept]))
        .curve(d3.curveLinearClosed)

      )
      .style('fill', 'none')
      .style('stroke-width', '2')
      .style('stroke-opacity', '0.65');

    const PATH_LENGTH = d3.select(`#${dept} path`).node().getTotalLength();

    SVG.select(`#${dept} path`)
      .style('stroke-dasharray', PATH_LENGTH)
      .style('stroke-dashoffset', PATH_LENGTH)
      .transition()
      .delay(2000)
      .duration(2000)
      .style('stroke-dashoffset', 0)
      .style('stroke', color);

  }
  createRadialLine('mktg', 'orange');
  createRadialLine('sales', 'chocolate');
  createRadialLine('dMktg', 'saddlebrown');

  // 
  function createValues(dept, color) {
    let DATA_ATTRIBUTE =
      d3.select(`#${dept}`)
        .select('path')
        .attr('d');
    // console.log(DATA_ATTRIBUTE);

    DATA_ATTRIBUTE = DATA_ATTRIBUTE.slice(1);
    // console.log(DATA_ATTRIBUTE);

    DATA_ATTRIBUTE =
      DATA_ATTRIBUTE.substring(0, DATA_ATTRIBUTE.length - 1);
    // console.log(DATA_ATTRIBUTE);

    DATA_ATTRIBUTE = DATA_ATTRIBUTE.split('L');
    // console.log(DATA_ATTRIBUTE);

    DATA_ATTRIBUTE.forEach(function (point, index) {

      let SPLIT_POINTS = point.split(',');
      // console.log(SPLIT_POINTS);
      d3.select(`#${dept}`)
        .append('text')
        .text(d3.format('$.2s')(data[index][dept]))
        .attr('x', Math.round(Number(SPLIT_POINTS[0])))
        .attr('y', Math.round(Number(SPLIT_POINTS[1])))
        .style('font-size', '11')
        .style('font-weight', '600')
        .style('fill', 'white')
        .transition()
        .delay(2000)
        .duration(3000)
        .style('fill', color)
    })
  }
  createValues('mktg', 'orange');
  createValues('sales', 'chocolate');
  createValues('dMktg', 'saddlebrown');
});