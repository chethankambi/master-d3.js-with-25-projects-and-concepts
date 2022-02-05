// <line></line>
// d3.line() - line generator OR use the x and y accessor functions OR .x() and .y() to get the x and y values

// d3.lineRadial()
let radialLine = d3.lineRadial();
console.log(radialLine);

let data1 = [
  [0, 50],
  [35, 100],
  [80, 150],
  [150, 110],
  [210, 170],
  [270, 90],
  [320, 180],
  [360, 50]
];

let radialPathData = radialLine(data1);
console.log(radialPathData);

d3.select('svg')
  .append('g')
  .attr('id', 'chart1')
  .selectAll('path')
  .data([radialPathData])
  .join('path')
  .attr('d', d => d)
  .style('fill', 'none')
  .style('stroke', 'black');

// x=angle and y=radius
// .x() and .y() functions become the .angle() and .radius() accessor functions; x value has to be in radians
// .angle() returns the angle in radians, with 0 at -y (12 o’clock)
// .radius() returns the radius: the distance from the origin ⟨0,0⟩
// Radial lines are always positioned relative to ⟨0,0⟩; we need to use transform
// .curve() - default is d3.curveLinear, Note that curveMonotoneX or curveMonotoneY are not recommended for radial lines

let data2 = [
  [0, 50],
  [30, 100],
  [60, 150],
  [90, 80],
  [120, 40],
  [150, 110],
  [180, 70],
  [210, 170],
  [240, 120],
  [270, 90],
  [300, 150],
  [330, 200],
  [360, 50]
];

d3.select('svg')
  .append('g')
  .attr('id', 'chart2')
  .attr('transform', 'translate(200,200)')
  .selectAll('path')
  .data([data2])
  .join('path')
  .attr('d', d3.lineRadial()
    // .angle((d,i,n) => console.log(d[0],i,n)))
    // .radius((d,i,n) => console.log(d[1],i,n)))
    // .angle(d => console.log(d[0] * (Math.PI / 180))))
    .angle(d => d[0] * (Math.PI / 180))
    .curve(d3.curveLinear) // default
    // .curve(d3.curveNatural)
    // .defined((d, i, n) => console.log(d, i, n))
  )
  .style('fill', 'none')
  .style('stroke', 'dodgerblue')
  .style('stroke-width', '2')

d3.select('#chart2')
  .append('circle')
  .attr('cx', '0')
  .attr('cy', '0')
  .attr('r', '5')
