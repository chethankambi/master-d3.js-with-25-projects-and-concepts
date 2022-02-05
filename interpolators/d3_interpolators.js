// interpolate means to insert in between
// this module deals with creating in between slabs of values
// so it could be between 2 numbers, colors, strings, arrays or even deeply nested objects
// This module provides a variety of interpolation methods for blending between two values.

// the basic method is d3.interpolate(a,b)
/*
The returned function is called an interpolator. Given a starting value a and an ending value b, it takes a parameter t in the domain [0, 1] and returns the corresponding interpolated value between a and b. An interpolator typically returns a value equivalent to a at t = 0 and a value equivalent to b at t = 1.

this basic or generic interpolator detects not only nested objects and arrays, but also color strings and numbers embedded in strings!
*/

// d3.interpolate(a,b)
// a,b = 2 arbitrary values
// b = null, undefined or boolean, or when a cannot be coerced into the type of b, then use b
let interpolate = d3.interpolate(1, null);
console.log(interpolate); // called as interpolator
console.log(interpolate(0));
console.log(interpolate(1));
console.log(interpolate(0.5));

interpolate = d3.interpolate(1, undefined);
console.log(interpolate(0));
console.log(interpolate(1));
console.log(interpolate(0.5))

interpolate = d3.interpolate(1, true);
console.log(interpolate(0));
console.log(interpolate(1));
console.log(interpolate(0.5))

interpolate = d3.interpolate('', false);
console.log(interpolate(0));
console.log(interpolate(1));
console.log(interpolate(0.5))

// d3.interpolate(a,b)
// If b is number, a is coerced to number then
// equivalent to
// d3.interpolateNumber(a,b)
// Returns an interpolator between the two numbers a and b.

interpolate = d3.interpolate('1', 10);
let interpolateNumber = d3.interpolateNumber(1, 10);

console.log(interpolate(0));
console.log(interpolate(1));
console.log(interpolate(0.5));
console.log(interpolateNumber(0));
console.log(interpolateNumber(1));
console.log(interpolateNumber(0.5));

// d3.interpolate(a,b)
// If b is string, a is coerced to string then
// equivalent to
// d3.interpolateString(a,b)
// Returns an interpolator between the two strings a and b. The string interpolator finds numbers embedded in a and b, where each number is of the form understood by JavaScript.

interpolate = d3.interpolate(1, '10');
let interpolateString = d3.interpolateString('1', '10');

console.log(interpolate(0));
console.log(interpolate(1));
console.log(interpolate(0.5));
console.log(interpolateString(0));
console.log(interpolateString(1));
console.log(interpolateString(0.5));

interpolateString = d3.interpolateString('I am A', 'You are E');
console.log(interpolateString(0));
console.log(interpolateString(1));
console.log(interpolateString(0.5));

interpolateString = d3.interpolateString('I am A1', 'You are E5');
console.log(interpolateString(0));
console.log(interpolateString(1));
console.log(interpolateString(0.5));

// d3.interpolate(a,b)
// If b is a date, then
// equivalent to
// d3.interpolateDate(a,b)
// Returns an interpolator between the two dates a and b.

interpolate = d3.interpolate('567255', new Date(2020, 0, 31));
let interpolateDate = d3.interpolateDate(new Date(2010, 5, 31), new Date(2020, 0, 31));

console.log(interpolate(0));
console.log(interpolate(1));
console.log(interpolate(0.5));
console.log(interpolateDate(0));
console.log(interpolateDate(1));
console.log(interpolateDate(0.5));

// d3.interpolate(a,b)
// If b is generic array, then
// equivalent to
// d3.interpolateArray(a,b)
// Returns an interpolator between the two arrays of numbers a and b.

interpolate = d3.interpolate('567255', [10, 20, 30]);
let interpolateArray = d3.interpolateArray([56, 72, 55], [10, 20, 30]);

console.log(interpolate(0));
console.log(interpolate(1));
console.log(interpolate(0.5));
console.log(interpolateArray(0));
console.log(interpolateArray(1));
console.log(interpolateArray(0.5));

// d3.interpolate(a,b)
// if a and b are 2 objects
// Returns an interpolator between the two objects a and b. Internally, an object template is created that has the same properties as b. For each property in b, if there exists a corresponding property in a, a generic interpolator is created for the two elements using interpolate. If there is no such property, the static value from b is used in the template.
interpolate = d3.interpolate({ value: 10 }, { value: 20 });
let interpolateObject = d3.interpolateObject({ value: 10 }, { value: 20 });

console.log(interpolate(0));
console.log(interpolate(1));
console.log(interpolate(0.5));
console.log(interpolateObject(0));
console.log(interpolateObject(1));
console.log(interpolateObject(0.5));

// d3.interpolate(a,b)
// If b is a color, or a string coercible to color then
// equivalent to
// d3.interpolateRgb(a,b)
// Returns an RGB color space interpolator between the two colors a and b. The colors a and b need not be in RGB; they will be converted to RGB. Output is RGB string

interpolate = d3.interpolate('#255', 'Blue');
let interpolateRgb = d3.interpolateRgb('Red', 'Blue');

console.log(interpolate(0));
console.log(interpolate(1));
console.log(interpolate(0.5));
console.log(interpolateRgb(0));
console.log(interpolateRgb(1));
console.log(interpolateRgb(0.5));

// d3.interpolateHsl(a,b)
// Returns an HSL color space interpolator between the two colors a and b. The colors a and b need not be in HSL; they will be converted to HSL
let interpolateHsl = d3.interpolateHsl('Red', 'Blue');

console.log(interpolateHsl(0));
console.log(interpolateHsl(1));
console.log(interpolateHsl(0.5));

// d3.interpolateLab(a, b)
// Returns an Lab color space interpolator between the two colors a and b. The colors a and b need not be in Lab; they will be converted to Lab
let interpolateLab = d3.interpolateLab('Red', 'Blue');

console.log(interpolateLab(0));
console.log(interpolateLab(1));
console.log(interpolateLab(0.5));

// d3.interpolateRound(a,b)
// Returns an interpolator between the two numbers a and b; the interpolator is similar to interpolateNumber, except it will round the resulting value to the nearest integer.
interpolate = d3.interpolate('1', 10);
let interpolateRound = d3.interpolateRound(1, 10);

console.log(interpolate(0.1));
console.log(interpolate(0.99));
console.log(interpolate(0.54));
console.log(interpolateRound(0.1));
console.log(interpolateRound(0.99));
console.log(interpolateRound(0.54));