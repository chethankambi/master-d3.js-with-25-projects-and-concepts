document.querySelector('button')
  .addEventListener('click', () => {
    let cost = document.querySelector('#cost').value;
    let rate = document.querySelector('#rate').value;
    // console.log(cost, rate);
    cost = Number(cost);
    rate = Number(rate);

    console.log(cost, rate);

    const SVG_WIDTH = d3.select('svg').node().clientWidth;
    const SVG_HEIGHT = d3.select('svg').node().clientHeight;

    let powerScale =
      d3.scalePow()
        .exponent(`${1 - rate / 100}`)
        .domain([`${cost}`, 0])
        .range([SVG_WIDTH, 0]);

    let colorScale =
      d3.scalePow()
        .exponent(`${1 - rate / 100}`)
        .domain([`${cost}`, 0])
        .range(['green', 'pink']);

    // const MIN_PAYMENT = Math.round(0.1 * cost);
    let yearlyValue = [];
    while (cost > 1000) {
      cost = Math.pow(cost, 1 - (rate / 100));
      yearlyValue.push(Math.round(cost));
    }
    console.log(yearlyValue);

    d3.select('svg')
      .selectAll('rect')
      .data(yearlyValue)
      .join('rect')
      .attr('width', d => powerScale(d))
      .attr('height', SVG_HEIGHT / yearlyValue.length - 5)
      .attr('x', '0')
      .attr('y', (d, i) => i * SVG_HEIGHT / yearlyValue.length + 2)
      .style('fill', d => colorScale(d));

    d3.select('svg')
      .selectAll('text')
      .data(yearlyValue)
      .join('text')
      .text((d, i) => `At the end of year ${i + 1}, $${d}`)
      .attr('x', d => powerScale(d) + 10)
      .attr('y', (d, i) => i * SVG_HEIGHT / yearlyValue.length + SVG_HEIGHT / yearlyValue.length / 2)
      .style('fill', d => colorScale(d))
      .style('font-size', '12')
      .style('font-weight', '500');
  });