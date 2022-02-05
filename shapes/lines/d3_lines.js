// shapes module provides us with methods to create different types of shape generators (functions)

// lines are created using 2 points
// supoose we want to create a line
let point1 = [0, 10];
let point2 = [400, 10];

d3.select('svg')
  .selectAll('line')
  .data([point1, point2]) // cannot do like this as this will append a line element for each data point
  .join('line');

let linePoints = d3.merge([point1, point2]);

d3.select('svg')
  .append('g')
  .attr('id', 'line1')
  .selectAll('line')
  .data([linePoints])
  .join('line')
  .attr('x1', d => d[0])
  .attr('y1', d => d[1])
  .attr('x2', d => d[2])
  .attr('y2', d => d[3])
  .style('stroke', 'red')
  .style('stroke-width', '5')

linePoints = [[0, 40, 200, 40], [200, 40, 400, 40]];

d3.select('svg')
  .append('g')
  .attr('id', 'line2')
  .selectAll('line')
  .data(linePoints)
  .join('line')
  .attr('x1', d => d[0])
  .attr('y1', d => d[1])
  .attr('x2', d => d[2])
  .attr('y2', d => d[3])
  .style('stroke', d => `rgb(${d[0]},${d[1]},${d[2]})`)
  .style('stroke-width', '5')

let points = [
  [0, 80],
  [100, 100],
  [200, 60],
  [300, 80],
  [400, 70],
]; // binding this entire thing as data will not help as we will get 5 line elements for 5 points, if there are 5 points then we need only 4 line elements!

let modifiedPoints = d3.pairs(points);
console.log(modifiedPoints);

d3.select('svg')
  .append('g')
  .attr('id', 'lineElements')
  .selectAll('line')
  .data(modifiedPoints)
  .join('line')
  .attr('x1', d => d[0][0])
  .attr('y1', d => d[0][1])
  .attr('x2', d => d[1][0])
  .attr('y2', d => d[1][1])
  .style('stroke', (d, i) => d3.schemeCategory10[i])
  .style('stroke-width', '5')
  .style('stroke-linecap', 'round')
  .style('stroke-linejoin', 'round')

// if we want to setup as a single element and to have better control over the shape of the line; we have shapes module
// so shapes provides us with generators to create different shapes, so we have the line generator instead of using a line element, it uses a path element.... a path element can be used to create any shape we want ....

// d3.line(x(optional),y(optional))
// Constructs a new line generator. If x or y are specified, sets the corresponding accessors to the specified function and returns this line generator.
// console.log(d3.line()); and show

let data1 = [50, 100, 150, 200];
d3.select('svg')
  .append('g')
  .attr('id', 'path1')
  .selectAll('path')
  .data([data1]) // (data1) we get 4 path elements
  .join('path')
  // .attr('d', d3.line((d, i,n) => console.log(d, i,n), (d,i,n) => console.log(d,i,n)))
  .attr('d', d3.line(d => (d), d => (d))) // x, y as numbers
  // .style('stroke', (d, i) => console.log(d, i))
  .style('stroke', 'blue') // we will always get a single color
  .style('fill', 'none')
  .style('stroke-width', '5');

let data2 = [
  [0, 200],
  [70, 150],
  [190, 220],
  [230, 320],
  [320, 200],
  [400, 300]
];
d3.select('svg')
  .append('g')
  .attr('id', 'path2')
  .selectAll('path')
  .data([data2])
  .join('path')
  // .attr('d', d3.line((d, i) => console.log(d, i)))
  // .attr('d', d3.line((d, i) => console.log(d, i), (d, i) => console.log(d, i)))
  .attr('d', d3.line(d => d[0], d => d[1]))
  .style('stroke', 'magenta')
  .style('fill', 'none')
  .style('stroke-width', '5')
  .style('stroke-linecap', 'round')
  .style('stroke-linejoin', 'round')

// specifically set .x() and .y() // both are optional
d3.select('svg')
  .append('g')
  .attr('id', 'path3')
  .selectAll('path')
  .data([data2])
  .join('path')
  // .attr('d', d3.line((d, i) => console.log(d, i)))
  // .attr('d', d3.line((d, i) => console.log(d, i), (d, i) => console.log(d, i)))
  .attr('d', d3.line().x(d => d[0]).y(d => d[1]))
  .style('stroke', 'black')
  .style('fill', 'none')
  .style('stroke-width', '2')
  .style('stroke-linecap', 'round')
  .style('stroke-linejoin', 'round')

// use the output of d3.line()
point1 = [0, 230];
point2 = [400, 300];
let lineGenerator = d3.line();
console.log(lineGenerator); // returns a line generator
// it is just a function that accepts an array of co - ordinates and outputs a path data string.. show svg.html
let linePathData = lineGenerator([point1, point2]);
console.log(linePathData);

d3.select('svg #path1')
  .selectAll('path')
  .data([linePathData])
  .join('path')
  .attr('d', d => d)
  .style('stroke', 'orange');

lineGenerator.x(d => d[0] + 10)
  .y(d => d[1] + 5);
linePathData = lineGenerator([point1, point2]);
console.log(linePathData);
d3.select('svg #path1')
  .selectAll('path')
  .data([linePathData])
  .join('path')
  .attr('d', d => d)
  .style('stroke', 'khaki');

linePathData = lineGenerator(data2);
console.log(linePathData);

d3.select('svg')
  .append('g')
  .attr('id', 'path4')
  .selectAll('path')
  .data([linePathData])
  .join('path')
  .attr('d', d => d)
  .style('stroke', 'cyan')
  .style('fill', 'none')
  .style('stroke-width', '5')
  .style('stroke-linecap', 'round')
  .style('stroke-linejoin', 'round')

// .defined(defined(optional))
// If defined is specified, sets the defined accessor to the specified function or boolean and returns this line generator.If defined is not specified, returns the current defined accessor which assumes data is complete
console.log(lineGenerator.defined());
// the defined accessor will be invoked for each element in the input data array, being passed the element d, the index i, and the array data as three arguments.If the given element is defined(i.e., if the defined accessor returns a truthy value for this element), the x and y accessors will subsequently be evaluated and the point will be added to the current line segment.Otherwise, the element will be skipped, the current line segment will be ended, and a new line segment will be generated for the next defined point.As a result, the generated line may have several discrete segments.
lineGenerator.defined(d => d[0] > 50);
linePathData = lineGenerator(points);
console.log(linePathData);

d3.select('svg')
  .append('g')
  .attr('id', 'path5')
  .selectAll('path')
  .data([linePathData])
  .join('path')
  .attr('d', d => d)
  .style('stroke', 'lightgreen')
  .style('fill', 'none')
  .style('stroke-width', '5')
  .style('stroke-linecap', 'round')
  .style('stroke-linejoin', 'round')

// .curve(curve(optional))
// If curve is specified, sets the curve factory and returns this line generator. If curve is not specified, returns the current curve factory, which defaults to curveLinear.

let data3 = [
  [60, 200],
  [90, 120],
  [160, 200],
  [270, 270],
  [310, 200],
  [390, 350]
];

lineGenerator.curve(d3.curveBasis)
linePathData = lineGenerator(data3);

d3.select('svg')
  .append('g')
  .attr('id', 'path6')
  .selectAll('path')
  .data([linePathData])
  .join('path')
  .attr('d', d => d)
  .style('stroke', 'lightseagreen')
  .style('fill', 'none')
  .style('stroke-width', '5')
  .style('stroke-linecap', 'round')
  .style('stroke-linejoin', 'round');

// .context(context(optional)) // for canvas and not SVG!