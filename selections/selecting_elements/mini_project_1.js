// Mini Project-1: Coloring Elements
const buttons = document.querySelector('.buttons')
  .addEventListener('click', event => {
    const buttonPressed = event.target.value;
    if (buttonPressed === undefined) { } // do nothing
    else { selectingElements(buttonPressed) }
  });

function rgbCodes() {
  return [Math.random() * 255, Math.random() * 255, Math.random() * 255];
}

function selectingElements(buttonPressed) {
  document.querySelector('div#output').firstElementChild.innerText = `Pressed Button: ${buttonPressed}`;

  const [red, green, blue] = rgbCodes(); // array destrucuring
  let elements, circles, squares, rectangles;

  if (buttonPressed === 'select') {
    circles = d3.select('.circle');
    squares = d3.select('.square');
    rectangles = d3.select('.rectangle');
  } else {
    circles = d3.selectAll('.circle');
    squares = d3.selectAll('.square');
    rectangles = d3.selectAll('.rectangle');
  }

  elements = [circles, squares, rectangles]; // destructuring

  elements.forEach(function (element) {
    element.filter(function (d, i) {
      if (buttonPressed === 'filterodd') {
        if (i % 2 === 0) {
          this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.25})`;
        }
      }
      else if (buttonPressed === 'filtereven') {
        if (i % 2 !== 0) {
          this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.25})`;
        }
      }
      else {
        this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.25})`;
      }
    });
  });
}
  // circles.filter(function (d, i) {
  //   if (buttonPressed === 'filterodd') {
  //     if (i % 2 === 0) {
  //       this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
  //     }
  //   }
  //   else if (buttonPressed === 'filtereven') {
  //     if (i % 2 !== 0) {
  //       this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
  //     }
  //   }
  //   else {
  //     this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
  //   }
  // });

  // squares.filter(function (d, i) {
  //   if (buttonPressed === 'filterodd') {
  //     if (i % 2 === 0) {
  //       this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
  //     }
  //   }
  //   else if (buttonPressed === 'filtereven') {
  //     if (i % 2 !== 0) {
  //       this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
  //     }
  //   }
  //   else {
  //     this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
  //   }
  // });

  // rectangles.filter(function (d, i) {
  //   if (buttonPressed === 'filterodd') {
  //     if (i % 2 === 0) {
  //       this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
  //     }
  //   }
  //   else if (buttonPressed === 'filtereven') {
  //     if (i % 2 !== 0) {
  //       this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
  //     }
  //   }
  //   else {
  //     this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
  //   }
  // });

  // squares.filter(function (d, i) {
  //   this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
  // });

  // rectangles.filter(function (d, i, n) {
  //   this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
  // });

// function selectFn() {
//   let [red, green, blue] = rgbCodes(); // array destrucuring

//   const circle = d3.select('.circle');
//   const square = d3.select('.square');
//   const rectangle = d3.select('.rectangle');

//   circle.select(function (d, i) {
//     this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
//   });

//   square.select(function (d, i) {
//     this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
//   });

//   rectangle.select(function (d, i, n) {
//     this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
//   });
// }

// function selectAllFn() {
//   let [red, green, blue] = rgbCodes(); // array destrucuring

//   const circles = d3.selectAll('.circle');
//   const squares = d3.selectAll('.square');
//   const rectangles = d3.selectAll('.rectangle');

//   circles.select(function (d, i) {
//     this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
//   });

//   squares.select(function (d, i) {
//     this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
//   });

//   rectangles.select(function (d, i, n) {
//     this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
//   });
// }

// function filterOddFn() {
//   let [red, green, blue] = rgbCodes(); // array destrucuring

//   const circles = d3.selectAll('.circle');
//   const squares = d3.selectAll('.square');
//   const rectangles = d3.selectAll('.rectangle');

//   circles.filter(function (d, i) {
//     if (i % 2 === 0) {
//       this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
//     }
//   });

//   squares.filter(function (d, i) {
//     if (i % 2 === 0) {
//       this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
//     }
//   });

//   rectangles.filter(function (d, i) {
//     if (i % 2 === 0) {
//       this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
//     }
//   });
// }

// function filterEvenFn() {
//   let [red, green, blue] = rgbCodes(); // array destrucuring

//   const circles = d3.selectAll('.circle');
//   const squares = d3.selectAll('.square');
//   const rectangles = d3.selectAll('.rectangle');

//   circles.filter(function (d, i) {
//     if (i % 2 !== 0) {
//       this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
//     }
//   });

//   squares.filter(function (d, i) {
//     if (i % 2 !== 0) {
//       this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
//     }
//   });

//   rectangles.filter(function (d, i) {
//     if (i % 2 !== 0) {
//       this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.3})`;
//     }
//   });
// }