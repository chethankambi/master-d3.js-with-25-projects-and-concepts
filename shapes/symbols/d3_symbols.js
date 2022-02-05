// d3.symbol()
let symbolGen = d3.symbol();
console.log(symbolGen);

let symbolGenData = symbolGen(); // what do we pass
console.log(symbolGenData);

d3.select('svg')
  .append('g')
  .attr('id', 'symbol1')
  .selectAll('path')
  .data([symbolGenData])
  .join('path')
  .attr('d', d => d)
  .style('fill', 'red');

d3.select('#symbol1').attr('transform', 'translate(200,200)');

// default is circle, 64 square pixels as area
symbolGen = d3.symbol(d3.symbolCircle, 64);
symbolGenData = symbolGen();
console.log(symbolGenData);

// change the size
symbolGen = d3.symbol(d3.symbolCircle, 1000);
symbolGenData = symbolGen();
console.log(symbolGenData);

// change to cross and size
symbolGen = d3.symbol(d3.symbolCross, 1000);
symbolGenData = symbolGen();
console.log(symbolGenData);

// change to diamond and size
symbolGen = d3.symbol(d3.symbolDiamond, 1000);
symbolGenData = symbolGen();
console.log(symbolGenData);

// change to square and size
symbolGen = d3.symbol(d3.symbolSquare, 1000);
symbolGenData = symbolGen();
console.log(symbolGenData);

// change to star and size
symbolGen = d3.symbol(d3.symbolStar, 1000);
symbolGenData = symbolGen();
console.log(symbolGenData);

// change to triangle and size
symbolGen = d3.symbol(d3.symbolTriangle, 1000);
symbolGenData = symbolGen();
console.log(symbolGenData);

// change to wye and size
symbolGen = d3.symbol(d3.symbolWye, 1000);
symbolGenData = symbolGen();
console.log(symbolGenData);

// d3.symbols is an array f symbols
console.log(d3.symbols);
symbolGen = d3.symbol(d3.symbols[0], 3000);
symbolGenData = symbolGen();
console.log(symbolGenData);

symbolGen = d3.symbol(d3.symbols[6], 3000);
symbolGenData = symbolGen();
console.log(symbolGenData);

// .type and .size
symbolGen = d3.symbol().type(d3.symbolTriangle).size(4000);
symbolGenData = symbolGen();
console.log(symbolGenData);

symbolGen = d3.symbol().type(d3.symbols[4]).size(4000);
symbolGenData = symbolGen();
console.log(symbolGenData);

d3.select('#symbol1')
  .selectAll('path')
  .data([symbolGenData])
  .join('path')
  .attr('d', d => d)
  .style('fill', 'salmon');

// move or position the symbol without group
// d3.select('svg')
//   .append('path')
//   .attr('id', 'path1')
//   .attr('transform', 'translate(20,20)')
//   .attr('d', d3.symbol().type(d3.symbols[2]).size(500));

// small deviation  
// method to help get the x,y position for radial charts
console.log(d3.pointRadial(0, 10))

// let max_area = 

symbolGen = d3.symbol().type(d3.symbols[0]).size(40000);
symbolGenData = symbolGen();
console.log(symbolGenData);

d3.select('#symbol1')
  .selectAll('path')
  .data([symbolGenData])
  .join('path')
  .attr('d', d => d)

d3.select('#symbol1')
  .append('path')
  .attr('id', 'line1')
  .attr('d', d3.line()([[0, 0], d3.pointRadial(4.71, 100)]))
  .style('stroke', 'black');