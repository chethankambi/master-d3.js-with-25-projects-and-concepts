document.querySelector('button')
  .addEventListener('click', () => {

    const onePt = Number(document.getElementById('one').value);
    const twoPt = Number(document.getElementById('two').value);
    const threePt = Number(document.getElementById('three').value);

    console.log(onePt, twoPt, threePt);

    if (onePt == 0 && twoPt == 0 && threePt == 0) {

      d3.select('svg')
        .selectAll('circle')
        .remove();

      d3.select('svg')
        .selectAll('text')
        .data(['You did not play a game!'])
        .join('text')
        .text(d => d)
        .attr('x', '300')
        .attr('y', '100')
        .style('text-anchor', 'middle')
        .style('fill', 'orange')
    }
    else {
      d3.select('svg')
        .selectAll('text')
        .remove();

      const colorScale = d3.scaleOrdinal()
        .domain([0, 1, 2])
        .range(['#FFF176', '#FFD54F', '#FFB74D']);

      const radiusScale = d3.scaleLinear()
        .domain([0, Math.max(onePt * 1, twoPt * 2, threePt * 3)])
        .range([0, 100]);

      // console.log(radiusScale(0));

      d3.select('svg')
        .selectAll('circle')
        .data([onePt * 1, twoPt * 2, threePt * 3])
        .join('circle')
        .attr('cx', (d, i) => 100 + (i * 200))
        .attr('cy', '100')
        .attr('r', d => radiusScale(d))
        .style('fill', (d, i) => colorScale(i));
    }
  });
