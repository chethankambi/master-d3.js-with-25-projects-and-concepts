/*
A transition is a selection-like interface for animating changes to the DOM. Instead of applying changes instantaneously, transitions smoothly interpolate the DOM from its current state to the desired target state over a given duration.
*/

const SVG_WIDTH = document.querySelector('svg').clientWidth;
const SVG_HEIGHT = document.querySelector('svg').clientHeight;

const rectData =
  [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130];

let allRect =
  d3.select('svg')
    .selectAll('rect')
    .data(rectData)
    .join('rect')
    .attr('x', (d, i) => (i * SVG_WIDTH / rectData.length))
    .attr('y', d => SVG_HEIGHT - d * 3)
    .attr('width', SVG_WIDTH / rectData.length - 2)
    // .attr('height', d => d * 3)
    .attr('rx', '5')
    .attr('ry', '5')

// CREATE A TRANSITION ON RECT ELEMENTS

// There are 2 ways to set transitions
// A. using the selection.transition(), followed by other transition methods (delay, ease and duration)
// B. create a transition object using d3.transition(), followed by other transition methods and then call the transition() method on the selection and then pass the transition object into the transition() method

// Just duration is enough to see the transitions
// If delay needed then delay --> duration
// If duartion and ease needed then ease --> duration
// If all three needed then delay --> ease --> duration

// Process A
// 1. Just duration
// allRect
//   .transition()
//   .duration(2000)
//   .attr('height', d => d * 3)
//   .transition()
//   .duration(2000)
//   .style('fill', 'pink');

// 2. duartion and delay
// allRect
//   .transition()
//   .delay(1000)
//   .duration(2000)
//   .attr('height', d => d * 3)
//   .transition()
//   .delay(1000)
//   .duration(2000)
//   .style('fill', 'salmon');

// 3. duartion and ease
// allRect
//   .transition()
//   .ease(d3.easeBounce)
//   .duration(2000)
//   .attr('height', d => d * 3)
//   .transition()
//   .ease(d3.easeBounce)
//   .duration(5000)
//   .style('fill', 'crimson');

// 4. all 3
// allRect
//   .transition()
//   .delay(1000)
//   .ease(d3.easeBounce)
//   .duration(2000)
//   .attr('height', d => d * 3)
//   .transition()
//   .delay(1000)
//   .ease(d3.easeBounce)
//   .duration(5000)
//   .style('fill', 'slategrey');

// Process B
// 1. only duration
// let T1 = d3.transition()
//   .duration(2000);
// console.log(T1);
// allRect.transition(T1)
//   .attr('height', d => d * 3)
//   .attr('fill', 'khaki');

// 2. duration and delay
// let T1 = d3.transition()
//   .delay(1000)
//   .duration(2000);
// let T2 = d3.transition()
//   .delay(1000)
//   .duration(2000);
// allRect
//   .transition(T1)
//   .attr('height', d => d * 3)
//   //.transition(T2) // can comment this
//   .style('fill', 'khaki');

// 3. duration and ease
// let T1 = d3.transition()
//   .ease(d3.easeExp)
//   .duration(2000);
// let T2 = d3.transition()
//   .ease(d3.easeSinOut)
//   .duration(2000);
// allRect
//   .transition(T1)
//   .attr('height', d => d * 3)
//   //.transition(T2) // can comment this
//   .style('fill', 'khaki');

// 4. all 3
// let T1 = d3.transition()
//   .delay(1000)
//   .ease(d3.easeCircleIn)
//   .duration(2000);
// let T2 = d3.transition()
//   .delay(1000)
//   .ease(d3.easeSinOut)
//   .duration(2000);
// allRect
//   .transition(T1)
//   .attr('height', d => d * 3)
//   .transition(T2) // can comment this
//   .style('fill', 'khaki');

// to control elements individually
allRect.each((d, i, n) => {
  d3.select(n[i])
    .transition()
    .delay(i * d)
    .duration(i * d)
    .attr('height', d => d * 3)
    .transition()
    .delay(i * d)
    .duration(i * d)
    .style('fill', d3.interpolateBlues((i + 1) / rectData.length))
})