// data
const ugEnroll = {
  1970: {
    female: 3118,
    male: 4249
  },
  1975: {
    female: 4422,
    male: 5257
  },
  1980: {
    female: 5474,
    male: 5000
  },
  1985: {
    female: 5634,
    male: 4962
  },
  1990: {
    female: 6579,
    male: 5379
  }
};

const SVG_WIDTH = d3.select('#chart svg').node().clientWidth;
const SVG_HEIGHT = d3.select('#chart svg').node().clientHeight;

const years = Object.keys(ugEnroll);
const female = [];
Object.values(ugEnroll).forEach(d => female.push(d.female));
const male = [];
Object.values(ugEnroll).forEach(d => male.push(d.male));

// color scale
const scaleColor = d3.scaleOrdinal()
  .domain(['female', 'male'])
  .range(['#F48FB1', '#90CAF9']);

// Y scale
const scaleY = d3.scaleLinear()
  .domain([0, Math.max(...female, ...male)])
  .range([0, SVG_HEIGHT - 60]);

// X scale
const scaleX = d3.scaleLinear()
  .domain([0, years.length - 1])
  .range([SVG_WIDTH / years.length, SVG_WIDTH]);

// years
const yearsG = d3.select('#chart svg')
  .append('g')
  .attr('id', 'years')
  .style('fill', 'gray')
  .style('font-weight', '600')
  .style('font-size', '14');

yearsG.selectAll('text')
  .data(years)
  .join('text')
  .text(d => d)
  .attr('x', (d, i) => scaleX(i) - scaleX(0) / 2)
  .attr('y', SVG_HEIGHT - 8)
  .style('text-anchor', 'middle');

// female bars/text
const femaleG = d3.select('#chart svg')
  .append('g')
  .attr('id', 'female');

femaleG.selectAll('rect')
  .data(female)
  .join('rect')
  .attr('width', '50')
  .attr('height', d => scaleY(d))
  .attr('x', (d, i) => scaleX(i) - scaleX(0) / 2 - 50)
  .attr('y', d => SVG_HEIGHT - scaleY(d) - 25)
  .attr('rx', '5')
  .attr('ry', '5')
  .style('fill', () => scaleColor('female'));

femaleG.selectAll('text')
  .data(female)
  .join('text')
  .text(d => d)
  .attr('x', (d, i) => scaleX(i) - scaleX(0) / 2 - 25)
  .attr('y', d => SVG_HEIGHT - scaleY(d) - 30)
  .style('fill', () => scaleColor('female'))
  .style('font-size', '12')
  .style('font-weight', '500')
  .style('text-anchor', 'middle');

// male bars/text
const maleG = d3.select('#chart svg')
  .append('g')
  .attr('id', 'male');

maleG.selectAll('rect')
  .data(male)
  .join('rect')
  .attr('width', '50')
  .attr('height', d => d / 15)
  .attr('x', (d, i) => scaleX(i) - scaleX(0) / 2 + 2)
  .attr('y', d => SVG_HEIGHT - scaleY(d) - 25)
  .attr('rx', '5')
  .attr('ry', '5')
  .style('fill', () => scaleColor('male'));

maleG.selectAll('text')
  .data(male)
  .join('text')
  .text(d => d)
  .attr('x', (d, i) => scaleX(i) - scaleX(0) / 2 + 27)
  .attr('y', d => SVG_HEIGHT - scaleY(d) - 30)
  .style('fill', () => scaleColor('male'))
  .style('font-size', '12')
  .style('font-weight', '500')
  .style('text-anchor', 'middle');

// legend
document.getElementById('legend').querySelector('p').style.color = scaleColor(document.getElementById('legend').querySelector('p').innerText);
document.getElementById('legend').querySelector('p:nth-of-type(2)').style.color = scaleColor(document.getElementById('legend').querySelector('p:nth-of-type(2)').innerText);