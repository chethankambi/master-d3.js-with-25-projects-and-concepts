// Methods for transforming arrays and for generating new arrays.
let data1 = [45, 35, 25];
let data2 = [
  {
    name: 'Jack',
    score: 40
  },
  {
    name: 'Jill',
    score: 60
  },
  {
    name: 'Jack',
    score: 20
  }
];

// Disclaimer: Some of these methods are redundant,and its hard to think of efficient or frequent use cases for these methods

// d3.group(iterable,...keys)
// create a new map using the elements of the array
let groupOutput = d3.group(data1, d => d);
console.log(groupOutput);
// this method is more useful on array of objects
groupOutput = d3.group(data2, d => d.name);
console.log(groupOutput);
//  We are able to get the map from the iterable where the key is an element and the value as an array.
console.log(groupOutput.get('Jack')); // without index but using the key
console.log(groupOutput.get('Jane')); // without index but using the key
// if more than one key is specified then it returns a nested Map
groupOutput = d3.group(data2, d => d.name, d => d.name);
console.log(groupOutput);

// d3.groups(iterables,...keys)
// Equivalent to group, but returns nested arrays instead of nested maps.
let groupsOutput = d3.groups(data2, d => d.name);
console.log(groupsOutput);

// d3.index(iterable,...keys)
// Equivalent to group but returns a map with unique value as key instead of an array, throwing an error if the key is not unique
let indexOutput = d3.index(data2, d => d.score);
console.log(indexOutput);
console.log(indexOutput.get(40));
console.log(indexOutput.get(20));
// indexOutput = d3.index(data2, d => d.name);
// console.log(indexOutput); // error

// d3.indexes(iterable,...keys)
// Equivalent to index, but returns nested arrays instead of nested maps.
let indexesOutput = d3.indexes(data2, d => d.score);
console.log(indexesOutput);

// d3.rollup(iterable,reduce,...keys)
// Groups the iterable and reduces the specified iterable into a Map with keys of the Map set to what we specify as keys in the method. The values will be what the reduce part is specified to be
let rollupOutput = d3.rollup(data2, v => v.length, d => d.name);
console.log(rollupOutput);
rollupOutput = d3.rollup(data2, v => v.length, d => d.score);
console.log(rollupOutput);

// d3.rollups(iterable,reduce,...keys)
// Equivalent to rollup, but returns nested arrays instead of nested maps.
let rollupsOutput = d3.rollups(data2, v => v.length, d => d.name);
console.log(rollupsOutput);
rollupsOutput = d3.rollups(data2, v => v.length, d => d.score);
console.log(rollupsOutput);

// d3.count(iterable,accessor(optional))
// Returns the number of valid number values(i.e., not null, NaN, or undefined) in the specified iterable; accepts an accessor.
let countOutput = d3.count(data2, d => d.score);
console.log(countOutput);
countOutput = d3.count(data2, d => d.name);
console.log(countOutput);

// d3.cross(...iterables, reducer(optional))
// Returns the Catesian product of the specified iterables. For example, if two iterables a and b are specified, for each element i in the iterable a and each element j in the iterable b, in order, invokes the specified reducer function passing the element i and element j. If a reducer is not specified, it defaults to a function which creates a two-element array for each pair.
let crossOutput = d3.cross([1, 2], [3, 4]);
console.log(crossOutput);
crossOutput = d3.cross([1, 2], [3, 4], (a, b) => a + b);
console.log(crossOutput);

// d3.merge(iterables)
// Merges the specified iterable of iterables into a single array. This method is similar to the built-in array concat method; the only difference is that it is more convenient when you have an array of arrays.
let mergeOutput = d3.merge([[2, 3], [4]]);
console.log(mergeOutput);

// d3.pairs(iterable,reducer(optional))
// For each adjacent pair of elements in the specified iterable, in order, invokes the specified reducer function passing the element i and element i - 1. If a reducer is not specified, it defaults to a function which creates a two-element array for each pair. If the specified iterable has fewer than two elements, returns the empty array.
let pairsOutput = d3.pairs([1, 2, 3, 4]);
console.log(pairsOutput);
pairsOutput = d3.pairs([1, 2, 3, 4], (a, b) => a + b);
console.log(pairsOutput);

// d3.permute(source,keys)
// Returns a permutation of the specified source object (or array) using the specified iterable of keys. The returned array contains the corresponding property of the source object for each key in keys, in order.
let permuteOutput = d3.permute(['a', 'b', 'c'], [1, 2, 0]);
console.log(permuteOutput);
permuteOutput = d3.permute(['a', 'b', 'c'], [2, 0, 1]);
console.log(permuteOutput);
permuteOutput = d3.permute(data2, [1, 2, 0]);
console.log(permuteOutput);

// d3.shuffle(array,start(optional),stop(optional))
// Randomizes the order of the specified array in-place and returns the array. If start is specified, it is the starting index (inclusive) of the array to shuffle; if start is not specified, it defaults to zero. If stop is specified, it is the ending index (exclusive) of the array to shuffle; if stop is not specified, it defaults to array.length.
let shuffleOutput = d3.shuffle([2, 5, 8, 3]);
console.log(shuffleOutput); // refersh the page to see new combos
shuffleOutput = d3.shuffle([2, 5, 8, 3], 1, 3);
console.log(shuffleOutput);

// d3.ticks(start,stop,count)
// Returns an array of approximately count + 1, uniformly - spaced, nicely - rounded values between start and stop(inclusive).Each value is a power of ten multiplied by 1, 2 or 5
let ticksOutput = d3.ticks(1, 10, 4);
console.log(ticksOutput);
ticksOutput = d3.ticks(1, -9, 4);
console.log(ticksOutput);

// d3.tickStep(start,stop,count)
// Returns the difference between adjacent tick values if the same arguments were passed to d3.ticks
let tickStepOutput = d3.tickStep(1, 10, 4);
console.log(tickStepOutput);

// d3.tickIncrement(start,stop,count)
// Like d3.tickStep, except requires that start is always less than or equal to stop, and if the tick step for the given start, stop and count would be less than one, returns the negative inverse tick step instead.
let tickIncrementOutput = d3.tickStep(-9.81, 1.023, 4);
console.log(tickIncrementOutput);
tickIncrementOutput = d3.tickStep(1.023, -9.81, 4);
console.log(tickIncrementOutput);
tickIncrementOutput = d3.tickStep(1, 9, 4);
console.log(tickIncrementOutput);

// d3.nice(start,stop,count)
// Returns a new interval [niceStart, niceStop] covering the given interval [start, stop] and where niceStart and niceStop are guaranteed to align with the corresponding tick step. Start has to be less than or equal to stop
let niceOutput = d3.nice(1.023, -9.81, 4);
console.log(niceOutput);
niceOutput = d3.nice(1.023, 9.81, 4);
console.log(niceOutput);

// d3.range(start(optional),stop,step(optional))
// Returns an array containing an arithmetic progression
// If step is omitted, it defaults to 1. If start is omitted, it defaults to 0.
let rangeOutput = d3.range(1, 8, 2);
console.log(rangeOutput);

// d3.zip(...arrays)
// Returns an array of arrays. The returned array is truncated in length to the shortest array in arrays. If arrays contains only a single array, the returned array contains one-element arrays. With no arguments, the returned array is empty.
let zipOutput = d3.zip([1, 2, 3], [4, 5]);
console.log(zipOutput);

// d3.transpose(matrix)
// Uses the zip operator as a two-dimensional matrix transpose.
// Array have to be of equal length
let transposeOutput = d3.transpose([[1, 2, 5]]);
console.log(transposeOutput);
transposeOutput = d3.transpose([[1, 2, 5], [3, 4, 6]]);
console.log(transposeOutput);