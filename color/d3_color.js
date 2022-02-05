let rect = d3.select('rect');

// specifier as strings
let c1 = d3.color('rgb(134, 55, 67)');
console.log(c1);
rect.style('fill', c1);

c1 = d3.color('rgba(134, 55, 67, 0.3)');
console.log(c1);
rect.style('fill', c1);

c1 = d3.color('rgb(14%, 65%, 7%)');
console.log(c1);
rect.style('fill', c1);

c1 = d3.color('rgba(14%, 65%, 7%, 0.4)');
console.log(c1);
rect.style('fill', c1);

c1 = d3.color('hsl(35, 55%, 43%)');
console.log(c1);
rect.style('fill', c1);

c1 = d3.color('hsla(35, 55%, 43%,0.2)');
console.log(c1);
rect.style('fill', c1);

c1 = d3.color('#ffef2c');
console.log(c1);
rect.style('fill', c1);

c1 = d3.color('salmon'); // any named color can be used
console.log(c1);
rect.style('fill', c1);

c1.r = 34;
console.log(c1);
rect.style('fill', c1);

c1.g = 13;
console.log(c1);
rect.style('fill', c1);

c1.b = 174;
console.log(c1);
rect.style('fill', c1);

c1.opacity = 0.5;
console.log(c1);
rect.style('fill', c1);

rect.style('fill', c1.brighter()); // pass avalue

rect.style('fill', c1.darker()); // pass avalue

console.log(c1.displayable()); // Returns true if and only if the color is displayable on standard hardware

console.log(c1.formatHex()); // hexadec string

console.log(c1.formatHsl()); // hsl or hsla string

console.log(c1.formatRgb()); // hexadec string

console.log(c1.toString());

c1 = d3.rgb('navy'); // any known format
console.log(c1);
rect.style('fill', c1);
// r,g,b,opacity,brighter(),darker(),displayable(),formatHex(),formatHsl(),formatRgb(),toString(),hsl(),lab()

c1 = d3.hsl('#bbceda'); // any known format
console.log(c1);
rect.style('fill', c1);

c1 = d3.lab(44, -8, 151); //  L* indicates lightness, a* is the red/green coordinate, and b* is the yellow/blue coordinate.
// The value of l is typically in the range[0, 100], while a and b are typically in [-160, +160].
console.log(c1);
rect.style('fill', c1);

c1 = d3.gray(54); // color with the specified l value and a = b = 0.
console.log(c1);
rect.style('fill', c1);

// Hue(0-360) - Chroma(0-230) - Luminance(0-100)
c1 = d3.hcl(54, 54, 54);
console.log(c1);
rect.style('fill', c1);

// Luminance(0-100) - Chroma(0-230) - Hue(0-360)
c1 = d3.lch(154, 54, 254);
console.log(c1);
rect.style('fill', c1);

// HSL
c1 = d3.cubehelix(154, 54, 254);
console.log(c1);
rect.style('fill', c1);