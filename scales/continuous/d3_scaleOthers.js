let logScale = d3.scaleLog();

logScale.unknown('CANNOT BE ZERO');

let identityScale = d3.scaleIdentity();

let radialScale = d3.scaleRadial();