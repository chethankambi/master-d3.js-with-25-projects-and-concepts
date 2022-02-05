const top10PopDensity = [
  {
    country: "Macao",
    density: 20777.5
  },
  {
    country: "Singapore",
    density: 7952.9
  },
  {
    country: "Hong Kong",
    density: 7096.1
  },
  {
    country: "Gibraltar",
    density: 3371.8
  },
  {
    country: "Baharain",
    density: 2017.2
  },
  {
    country: "Maldives",
    density: 1718.9
  },
  {
    country: "Malta",
    density: 1514.4
  },
  {
    country: "Bangladesh",
    density: 1239.5
  },
  {
    country: "Bermuda",
    density: 1183.7
  },
  {
    country: "Channel Islands",
    density: 861.1
  }
];

const SVG_WIDTH = d3.select('svg').node().clientWidth;
const SVG_HEIGHT = d3.select('svg').node().clientHeight;
const DATA_LENGTH = top10PopDensity.length;
const POP_DEN_MIN = 0;

let densityList = [];
top10PopDensity.forEach(country => densityList.push(country.density));
const POP_DEN_MAX = Math.max(...densityList);

const POP_DEN_LIN_SCALE =
  d3.scaleLinear()
    .domain([POP_DEN_MIN, POP_DEN_MAX])
    .range([0, SVG_WIDTH]);

const POP_DEN_COLOR_LIN_SCALE =
  d3.scaleLinear()
    .domain([POP_DEN_MIN, POP_DEN_MAX])
    .range(['antiquewhite', 'tomato']);

const Y_SCALE =
  d3.scaleLinear()
    .domain([0, DATA_LENGTH - 1])
    .range([0, SVG_HEIGHT - 50]);

d3.select('svg')
  .selectAll('rect')
  .data(top10PopDensity)
  .join('rect')
  .attr('width', d => POP_DEN_LIN_SCALE(d.density))
  .attr('height', SVG_HEIGHT / DATA_LENGTH - 5)
  .attr('x', '0')
  .attr('y', (d, i) => 5 + Y_SCALE(i))
  .attr('rx', '5')
  .attr('ry', '5')
  .attr('fill', d => POP_DEN_COLOR_LIN_SCALE(d.density));

d3.select('svg')
  .selectAll('text')
  .data(top10PopDensity)
  .join('text')
  .text(d => `${d.country}, ${d.density}`)
  .attr('x', '10')
  .attr('y', (d, i) => (5 + Y_SCALE(i)) + 27)
  .style('fill', 'black')
  .style('text-anchor', 'start')
  .style('font-size', '12')
  .style('font-weight', '600')
  .style('letter-spacing', '0.5')

document.querySelector('#scalesubmit')
  .addEventListener('click', function (e) {
    const INPUT = document.querySelector('#scaleinput').value;
    // console.log(INPUT);
    if (INPUT >= 0 && INPUT <= 100) {
      document.querySelector('#scaleoutput').innerText =
        POP_DEN_LIN_SCALE.invert(INPUT / 100 * SVG_WIDTH).toFixed(2);
    }
  })


