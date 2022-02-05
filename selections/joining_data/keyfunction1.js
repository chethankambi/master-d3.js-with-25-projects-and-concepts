// selection.data(data,key)

let svg = d3.select('svg');

let allCircles = svg.selectAll('circle')
console.log(allCircles);

let dataArray = [10, 20, 30];
allCircles = allCircles.data(dataArray, function (d, i, n) {
  console.log(d)
  console.log(i)
  console.log(n)
  console.log(this)
  console.log(n[i])
  d = d.toString();
  console.log(d);
  return d;
})
console.log(allCircles);

allCircles = allCircles.join('circle')
  .attr('cx', function (d, i) {
    return d + i * 50;
  })
  .attr('cy', '100')
  .attr('r', d => d);
console.log(allCircles);

dataArray = [20, 30];
allCircles = allCircles.data(dataArray, function (d, i, n) {
  console.log(d)
  console.log(i)
  console.log(n)
  console.log(this)
  console.log(n[i])
  d = d.toString();
  console.log(d);
  return d;
})

console.log(allCircles);