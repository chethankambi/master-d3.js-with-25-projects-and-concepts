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

      const SVG_WIDTH = d3.select('svg').node().clientWidth;
      const SVG_HEIGHT = d3.select('svg').node().clientHeight;

      const colorScale = d3.scaleOrdinal()
        .domain([0, 1, 2])
        .range(['#FFF176', '#FFD54F', '#FFB74D']);

      const heightScale = d3.scaleLinear()
        .domain([0, Math.max(onePt * 1, twoPt * 2, threePt * 3)])
        .range([0, SVG_HEIGHT]);

      const widthScale = d3.scalePoint()
        .domain([0, 1, 2])
        .range([0, SVG_WIDTH - SVG_WIDTH / 3]);

      console.log(SVG_WIDTH);
      console.log(widthScale(0));
      console.log(widthScale(1));
      console.log(widthScale(2));

      // console.log(radiusScale(0));

      d3.select('svg')
        .selectAll('rect')
        .data([onePt * 1, twoPt * 2, threePt * 3])
        .join('rect')
        .attr('height', (d, i) => heightScale(d))
        .attr('width', SVG_WIDTH / 3)
        .attr('x', (d, i) => widthScale(i))
        .attr('y', '0')
        .style('fill', (d, i) => colorScale(i));
    }
  });
