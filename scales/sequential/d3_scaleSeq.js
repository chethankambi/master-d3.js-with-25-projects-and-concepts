// d3.scaleSequential()

let seqScale = d3.scaleSequential();

// default domain [0,1]
// map cont numeric input domain to a cont output range
// both domain and range has exactly 2 elements
// usually a range is not specified but an interpolater is specified
// if range is specified then it will be converted to an interpolater using the default d3.interpolate
// invert and interpolate methods dont work on sequential scales!