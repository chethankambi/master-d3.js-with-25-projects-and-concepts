
// 
let divParasPart1 = d3.select('#paras')
  .selectAll('p')
  .data([3, 4, 5])
console.log(divParasPart1);

let divParasPart2 = d3.select('#paras')
  .selectAll('p')
  .data([6, 7, 8])
console.log(divParasPart2);

divParasPart1.enter() // see elements and seln in devtools
  .append('p') // see elements and seln in devtools
  .merge(divParasPart2) // see elements and seln in devtools; merge sees that part1 and part2 are pointing to the same selection indexes. Since part1 is completely empty, part2 data is pushed to the DOM, i.e 6,7,8
  .text(d => d);

// 
divParasPart1 = d3.select('#paras')
  .selectAll('p')
  .data([11, 12, 13, 14, 15])
console.log(divParasPart1);

divParasPart2 = d3.select('#paras')
  .selectAll('p')
  .data([16, 17, 18])
console.log(divParasPart2);

divParasPart1.enter() // see elements and seln in devtools
  .append('p') // see elements and seln in devtools
  .merge(divParasPart2) // see elements and seln in devtools; merge sees that part1 and part2 are pointing to the same selection indexes. Since part1 now has 14,15 as extra part2 data is pushed to the DOM, i.e 16,17,18 and then 14,15
  .text(d => d);
// 
divParasPart1 = d3.select('#paras')
  .selectAll('p')
  .data([23, 24, 25])
console.log(divParasPart1);

divParasPart2 = d3.select('#paras')
  .selectAll('p')
  .data([26, 27, 28, 29, 30])
console.log(divParasPart2);

divParasPart1.enter() // see elements and seln in devtools
  .append('p') // see elements and seln in devtools
  .merge(divParasPart2) // see elements and seln in devtools; merge sees that part1 and part2 are pointing to the same selection indexes. Since part1 is completely empty, part2 data is pushed to the DOM, i.e 26,27,28. 29 and 30 remain in the __data__
  .text(d => d);

divParasPart2.text(d => d);