// areas are just like lines except that the region under the line is covered or filled. So there is a top line (just like the line chart)  but there is also a bottom line, which usually runs along the x-axis. And the region between the lines depicts some sort of measure or indication

// d3.area(x(optional),y0(optional),y1(optional))
let areaGenerator = d3.area();

// The area generator produces an area, as in an area chart. 


let data1 = [
  // show these one after the other
  [0, 100],
  [200, 130],
  [240, 80],
  // [0, 50],
  // [50, 60],
];
areaPathData = areaGenerator(data1);
console.log(areaPathData);
d3.select('svg')
  .append('g')
  .attr('id', 'group1')
  .selectAll('path')
  .data([areaPathData])
  .join('path')
  .attr('id', 'path1')
  .attr('d', areaPathData)
  .attr('fill', 'none')
  .attr('stroke', 'black');

d3.select('svg')
  .append('g')
  .attr('id', 'group2')
  .selectAll('path')
  .data([data1])
  .join('path')
  .attr('id', 'path2')
  //   .attr('d', d3.area( // d,i,n
  //     d => console.log(d), // both x0 and x1 are same
  //     d => console.log(d), // y0
  //     d => console.log(d)) // y1
  // )
  .attr('d', d3.area(
    d => d[0] + 10,
    d => 10,
    d => d[1] + 10)
    // .defined(d => console.log(d))
    .curve(d3.curveBasis)
  )
  //   .style('stroke', 'red')
  // .attr('d', d3.area()
  //   .x0(d => d[0] + 10)
  //   // .x1(d => 10)
  //   .y0(d => 10)
  //   .y1(d => d[1] + 10)
  // )
  .style('stroke', 'blue')
  .style('fill', 'none')

d3.select('svg')
  .append('g')
  .attr('id', 'group3')
  .attr('transform', 'translate(0,400)')
  .selectAll('path')
  .data([data1])
  .join('path')
  .attr('id', 'path2')
  .attr('d', d3.area(
    d => d[0] + 10,
    d => -10,
    d => -(d[1] + 10))
    // .curve(d3.curveBasis)
  )
  .style('stroke', 'green')
  .style('fill', 'none')