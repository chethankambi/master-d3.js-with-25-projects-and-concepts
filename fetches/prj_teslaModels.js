// access the data
const SVG = d3.select('svg');
const BUFFER = 50;
const ACTUAL_SVG_W = SVG.node().clientWidth - BUFFER;
const ACTUAL_SVG_H = SVG.node().clientHeight - BUFFER;

const RAW_DATA = d3.csv('teslaData.csv', d => {
  return {
    model: d['Model'],
    price: Number(d['Price']),
    range: Number(d['Range']),
    power: Number(d['Power']),
    cargoSpace: Number(d['Cargo Space']),
    id: 'm' + Array.from(d['Model'])[6]
  }
});

RAW_DATA.then(data => {

  const DATA = [...data];
  const COLUMNS = data.columns;

  const COLOR = d3.interpolate('#00bbf9', '#f07167');

  let BUTTONS = document.querySelectorAll('button');
  BUTTONS.forEach((button, index) =>
    button.style.backgroundColor = COLOR((index + 1) / DATA.length));


  document.querySelector('#mButtons')
    .addEventListener('click', e => {

      let TARGET_ID;

      if (e.target.localName == 'button') {
        TARGET_ID = e.target.id;
        // console.log(TARGET_ID)
      }

      for (car of DATA) {
        if (car.id == TARGET_ID) {
          // console.log(car, DATA.indexOf(car));
          displayInfo(car, DATA.indexOf(car));
        }
      }
    });

  function model(model) {
    return model.toUpperCase();
  }
  function price(price) {
    d3.formatDefaultLocale({
      currency: ['$', '']
    });
    return d3.format('$,.2f')(price);
  }
  function range(range) {
    d3.formatDefaultLocale({
      currency: ['', ' Miles']
    });
    return d3.format('~>$')(range);
  }
  function power(power) {
    d3.formatDefaultLocale({
      currency: ['', ' Hp']
    });
    return d3.format('~>$')(power);
  }
  function space(space) {
    d3.formatDefaultLocale({
      currency: ['', ' Cu.Ft']
    });
    return d3.format('~>$')(space);
  }
  let FN_CALL = [model, price, range, power, space];
  function displayInfo(car, colorIndex) {

    document.querySelector('#mInfo').innerHTML = '';

    COLUMNS.forEach((col, index) => {
      document.querySelector('#mInfo').innerHTML +=
        `<p>${col}: ${FN_CALL[index](Object.values(car)[index])}</p>`;
    });
    // console.log(d3.selectAll('#mInfo p'));
    d3.selectAll('#mInfo p').style('color', COLOR((colorIndex + 1) / DATA.length))
  }

  let MAX_RANGE = (d3.greatest(DATA, car => car.range)).range;
  let MAX_POWER = (d3.greatest(DATA, car => car.power)).power;
  let MAX_PRICE = (d3.greatest(DATA, car => car.price)).price;

  // left y axis
  const Y_AXIS_LS = d3.scaleLinear()
    .domain([MAX_RANGE, 0])
    .range([BUFFER, ACTUAL_SVG_H])
    .nice();
  const Y_AXIS_L = d3.axisLeft(Y_AXIS_LS);
  d3.formatDefaultLocale({
    currency: ['', ' Mi']
  });
  Y_AXIS_L.ticks(10, d3.format('$.0f'));
  const Y_AXIS_LG = SVG.append('g').attr('id', 'yAxisLG');
  Y_AXIS_LG.transition()
    .duration(1000)
    .attr('transform', `translate(${BUFFER},0)`)
  Y_AXIS_L(Y_AXIS_LG);

  // right y axis
  const Y_AXIS_RS = d3.scaleLinear()
    .domain([MAX_POWER, 0])
    .range([BUFFER, ACTUAL_SVG_H])
    .nice();
  const Y_AXIS_R = d3.axisRight(Y_AXIS_RS);
  d3.formatDefaultLocale({
    currency: ['', ' Hp']
  });
  Y_AXIS_R.ticks(15, d3.format('$.0f'));
  const Y_AXIS_RG = SVG.append('g').attr('id', 'yAxisRG');
  Y_AXIS_RG.transition()
    .duration(1000)
    .attr('transform', `translate(${ACTUAL_SVG_W},0)`)
  Y_AXIS_R(Y_AXIS_RG);

  // bottom x axis
  const X_AXIS_BS = d3.scaleLinear()
    .domain([0, MAX_PRICE])
    .range([BUFFER, ACTUAL_SVG_W])
    .nice();
  const X_AXIS_B = d3.axisBottom(X_AXIS_BS);
  d3.formatDefaultLocale({
    currency: ['$', '']
  });
  X_AXIS_B.ticks(20, d3.format('$.0s'));
  const X_AXIS_BG = SVG.append('g').attr('id', 'xAxisBG');
  X_AXIS_BG.transition()
    .duration(1000)
    .attr('transform', `translate(0,${ACTUAL_SVG_H})`);
  X_AXIS_B(X_AXIS_BG);

  // render circles for range vs price
  SVG.append('g')
    .attr('id', 'circles')
    .selectAll('circle')
    .data(DATA)
    .join('circle')
    .attr('cx', d => X_AXIS_BS(d.price))
    .attr('cy', d => Y_AXIS_LS(d.range))
    .style('fill', (d, i) => COLOR((i + 1) / DATA.length))
    .style('fill-opacity', '0.80')
    .style('stroke', (d, i) => COLOR((i + 1) / DATA.length))
    .style('stroke-width', '2')

  d3.select('#circles')
    .selectAll('circle')
    .transition()
    .duration(1200)
    .attr('r', d => d.cargoSpace / 1.75);

  SVG.append('g')
    .attr('id', 'circlesDots')
    .selectAll('circle')
    .data(DATA)
    .join('circle')
    .attr('cx', d => X_AXIS_BS(d.price))
    .attr('cy', d => Y_AXIS_LS(d.range))
    .attr('r', '2')
    .style('fill', 'black');

  // render rects for power vs price
  SVG.append('g')
    .attr('id', 'rects')
    .selectAll('rect')
    .data(DATA)
    .join('rect')
    .attr('x', d => X_AXIS_BS(d.price))
    .attr('y', d => Y_AXIS_RS(d.power))
    .attr('width', '3')
    .attr('rx', '3')
    .style('fill', (d, i) => COLOR((i + 1) / DATA.length));

  d3.select('#rects')
    .selectAll('rect')
    .transition()
    .duration(1200)
    .attr('height', d => ACTUAL_SVG_H - Y_AXIS_RS(d.power));
});