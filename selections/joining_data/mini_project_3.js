// https://mdn.github.io/learning-area/html/tables/assessment-finished/planets-data.html
// Mini-Project3: Joining Data
let planetData = [
  {
    name: 'Mercury',
    diameter: 4879,
    density: 5427,
    color: 'green'
  },
  {
    name: 'Venus',
    diameter: 12104,
    density: 5243,
    color: 'purple'
  },
  {
    name: 'Earth',
    diameter: 12756,
    density: 5514,
    color: 'dodgerblue'
  },
  {
    name: 'Mars',
    diameter: 6792,
    density: 3933,
    color: 'indianred'
  },
  {
    name: 'Jupiter',
    diameter: 142984,
    density: 1326,
    color: 'gold'
  },
  {
    name: 'Saturn',
    diameter: 120536,
    density: 687,
    color: 'navy'
  },
  {
    name: 'Uranus',
    diameter: 51118,
    density: 1271,
    color: 'thistle'
  },
  {
    name: 'Neptune',
    diameter: 49528,
    density: 1638,
    color: 'pink'
  },
  {
    name: 'Pluto',
    diameter: 2370,
    density: 2095,
    color: 'brown'
  }
];
// Set the svg dimensions
d3.select('#diameter svg')
  .attr('width', '100%')
  .attr('height', '350');
d3.select('#density svg')
  .attr('width', '100%')
  .attr('height', '350');
// Button activity
let selOrder = 'ascending';
document.querySelector('#btn')
  .addEventListener('click', function () {
    if (selOrder === 'ascending') {
      document.getElementById('msg').innerText = `${selOrder.toUpperCase()} ORDER SELECTED`;
      setTimeout(() => {
        document.getElementById('msg').innerText = '';
      }, 1500);
      genDiameterChart(selOrder);
      genDensityChart(selOrder);
      selOrder = 'descending';
    } else if (selOrder === 'descending') {
      document.getElementById('msg').innerText = `${selOrder.toUpperCase()} ORDER SELECTED`;
      setTimeout(() => {
        document.getElementById('msg').innerText = '';
      }, 1500);
      genDiameterChart(selOrder);
      genDensityChart(selOrder);
      selOrder = 'ascending';
    }
  });
// for circles
function genDiameterChart(order) {
  let cxValue = 0;

  const diaP = d3.select('#diameter p')
    .text(`Diameter of the planets in kilometer, sorted in ${order} order`)
    // .attr('x', '10')
    // .attr('y', '10')
    .attr('class', 'text');

  const diaSvg = d3.select('#diameter svg')
    .selectAll('circle')
    .data(planetData, function (d) {
      return d.name;
    })
    .join('circle')
    .sort((a, b) => {
      return order === 'ascending' ?
        a.diameter - b.diameter :
        b.diameter - a.diameter;
    })
    .attr('r', d => d.diameter / 1000)
    .attr('cy', '150')
    .attr('cx', (d, i, n) => {
      if (i === 0) {
        cxValue = d.diameter / 1000; // for the first circle
        // console.log(cxValue);
      } else {
        prevRadius = Number(d3.select(n[i - 1]).attr('r')); // getting the radius value of the previous circle element
        // console.log(prevRadius);
        cxValue = cxValue + prevRadius + d.diameter / 1000;
        // console.log(cxValue);
      }
      return (75 * (i + 1)) + cxValue;
    })
    .style('fill', d => d.color);

  const diaText = d3.select('#diameter svg')
    .selectAll('text')
    .data(planetData, function (d) {
      return d.name;
    })
    .join('text')
    // .sort((a, b) => a.diameter - b.diameter)
    .sort((a, b) => {
      return order === 'ascending' ?
        a.diameter - b.diameter :
        b.diameter - a.diameter;
    })
    .attr('x', (d, i, n) => {
      return document.querySelectorAll('svg circle')[i].getAttribute('cx');
    })
    .attr('y', function (d, i) {
      return i % 2 === 0 ? '330' : '15';
    })
    .text(d => (`${d.name}, ${d.diameter}`))
    .style('text-anchor', 'middle')
    .style('fill', 'rgb(63,63,63)')
    .style('font-size', '13')
    .style('font-weight', 'bold');
}
// for bars
function genDensityChart(order) {
  d3.select('#density p')
    .text(`Density of the planets in kilogram per meter cube, sorted in ${order} order`)
    // .attr('x', '10')
    // .attr('y', '10')
    .attr('class', 'text');

  const denSvg = d3.select('#density svg')
    .selectAll('rect')
    .data(planetData, function (d) {
      return d.name;
    })
    .join('rect')
    .sort((a, b) => {
      return order === 'ascending' ?
        a.density - b.density :
        b.density - a.density;
    })
    .attr('width', d => d.density / 10)
    .attr('height', '30')
    .attr('y', (d, i) => {
      return i * 40;
    })
    .attr('x', '10')
    .style('fill', d => d.color);

  const denText = d3.select('#density svg')
    .selectAll('text')
    .data(planetData, function (d) {
      return d.name;
    })
    .join('text')
    .sort((a, b) => {
      return order === 'ascending' ?
        a.density - b.density :
        b.density - a.density;
    })
    .attr('x', d => d.density / 10 + 20)
    .attr('y', function (d, i) {
      return (i * 40) + 20;
    })
    .text(d => (`${d.name}, ${d.density}`))
    .style('text-anchor', 'start')
    .style('fill', 'rgb(63,63,63)')
    .style('font-size', '13')
    .style('font-weight', 'bold');
}