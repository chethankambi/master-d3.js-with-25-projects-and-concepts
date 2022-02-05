// d3.arc()
// pie chart or donut chart
let arcGen = d3.arc();
console.log(arcGen);

arcGen = arcGen({
  startAngle: 0,
  endAngle: Math.PI * 2,
  innerRadius: 50,
  outerRadius: 100
})
console.log(arcGen);

d3.select('svg')
  .append('g', 'path1')
  .selectAll('path')
  .data([arcGen])
  .join('path')
  .attr('d', d => d);

let data = [
  {
    startAngle: 0,
    endAngle: Math.PI / 2,
    innerRadius: 50,
    outerRadius: 100
  },
  {
    startAngle: Math.PI / 2,
    endAngle: Math.PI,
    innerRadius: 50,
    outerRadius: 100
  },
  {
    startAngle: Math.PI,
    endAngle: Math.PI * 1.5,
    innerRadius: 50,
    outerRadius: 100
  },
  {
    startAngle: Math.PI * 1.5,
    endAngle: Math.PI * 2,
    innerRadius: 50,
    outerRadius: 100
  }
];

let path2 = d3.select('svg')
  .append('g')
  .attr('id', 'path2')
  .attr('transform', 'translate(200,200)');

path2.append('circle')
  .attr('cx', '0')
  .attr('cy', '0')
  .attr('r', '3')

path2.selectAll('path')
  .data(data)
  .join('path')
  // .attr('d', d3.arc() // d,i,n
  //   .innerRadius(d => console.log(d))
  //   .outerRadius(d => console.log(d))
  //   .startAngle(d => console.log(d))
  //   .endAngle(d => console.log(d))
  // )
  .attr('d', d3.arc()
    .innerRadius(d => d.innerRadius)
    .outerRadius(d => d.outerRadius)
    .startAngle(d => d.startAngle)
    .endAngle(d => d.endAngle)
    .padAngle(0.03)
    .padRadius(100)
    // .cornerRadius(5)
  )
  .style('fill', (d, i) => d3.schemeTableau10[i])

// path2.selectAll('text')
//   .data(data)
//   .join('text')
//   .text(d => d.endAngle)
// .
// let centroid = d3.arc().centroid({
//   innerRadius: 50,
//   outerRadius: 100,
//   startAngle: 0,
//   endAngle: Math.PI * 2,
// })
data.forEach((arc, index) => {
  let [x, y] = d3.arc().centroid({
    innerRadius: arc.innerRadius,
    outerRadius: arc.outerRadius,
    startAngle: arc.startAngle,
    endAngle: arc.endAngle
  });
  console.log(x, y);
  path2.append('text')
    .text(Math.round(arc.startAngle))
    .attr('x', x)
    .attr('y', y)
    .style('text-anchor', 'middle')
})