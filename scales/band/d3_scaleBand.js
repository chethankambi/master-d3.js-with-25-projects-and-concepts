// d3.scaleband()
let bandScale = d3.scaleBand();

/*

<--------------------range------------------------>
<-op->                <--ip-->               <-op->
      |---------------|      |---------------|
      0               1      1               2
      <---bandwidth--->      <---bandwidth--->

      <---------step--------->

op = outer padding
ip = inner padding
step = distance between starts of adjacent bands
bandwidth = width of each band

*/

console.log(bandScale.paddingOuter());
bandScale.paddingOuter(0.1);

console.log(bandScale(0));
console.log(bandScale(1));
console.log(bandScale.bandwidth());
console.log(bandScale.step());

console.log(bandScale.paddingOuter());
console.log(bandScale.step() + bandScale.paddingOuter());
console.log(bandScale(1));

console.log(bandScale.padding());

console.log(bandScale.align());