// d3.scaleBand()
let pointScale = d3.scalePoint();

console.log(pointScale.domain())
console.log(pointScale.range())

console.log(pointScale(0));
console.log(pointScale(1));
console.log(pointScale(2));
console.log(pointScale(-1));

pointScale.domain([0, 1]);

console.log(pointScale(0));
console.log(pointScale(1));
console.log(pointScale(2));
console.log(pointScale(-1));

console.log(pointScale.bandwidth());
console.log(pointScale.step());

/*

<--------------------range----------------->
<-op->                                <-op->
      |                              |
      0                              2

      <--------------step------------>

op = outer padding
step = distance between starts of adjacent bands
bandwidth = 0

*/

console.log(pointScale.padding() + pointScale.step() + pointScale.padding());

pointScale.range([0, 2]);

console.log(pointScale(0));
console.log(pointScale(1));
console.log(pointScale(2));
console.log(pointScale(-1));

console.log(pointScale.bandwidth());
console.log(pointScale.step());

console.log(pointScale.padding() + pointScale.step() + pointScale.padding());

console.log(pointScale.padding());
pointScale.padding(0.1);
console.log(pointScale.padding());

console.log(pointScale(0));
console.log(pointScale(1));
console.log(pointScale(2));
console.log(pointScale(-1));

console.log(pointScale.bandwidth());
console.log(pointScale.step());

console.log(pointScale.padding() + pointScale.step() + pointScale.padding());

console.log(pointScale.align());