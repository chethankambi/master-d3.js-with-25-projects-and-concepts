// store sales data across 4 regions, with top 4 categories of goods
const SALES_DATA = [
  {
    region: 'North',
    s_t: 325000, // sports and travel
    h_l: 550000, // home and lifestyle
    e_g: 350000, // electronics and gadgets
    h_b: 300000, // health and beauty
  },
  {
    region: 'East',
    s_t: 400000, // sports and travel
    h_l: 500000, // home and lifestyle
    e_g: 450000, // electronics and gadgets
    h_b: 350000, // health and beauty
  },
  {
    region: 'South',
    s_t: 350000, // sports and travel
    h_l: 400000, // home and lifestyle
    e_g: 500000, // electronics and gadgets
    h_b: 325000, // health and beauty
  },
  {
    region: 'West',
    s_t: 600000, // sports and travel
    h_l: 350000, // home and lifestyle
    e_g: 550000, // electronics and gadgets
    h_b: 500000, // health and beauty
  },
];

// A Map for abbreviations
const ABBR = new Map(
  [
    ['s_t', 'Sports and Travel'],
    ['h_l', 'Home and Lifestyle'],
    ['e_g', 'Electronics and Gadgets'],
    ['h_b', 'Health and Beauty']
  ]
);

//  width and height of svg elements in row 1 and row 2
const SVG_W_R1 = document.querySelector('#row1 svg').clientWidth;
const SVG_H_R1 = document.querySelector('#row1 svg').clientHeight;
const SVG_W_R2 = document.querySelector('#row2 svg').clientWidth;
const SVG_H_R2 = document.querySelector('#row2 svg').clientHeight;

// buffer area around the svg
const BUFFER = 25;
const DATA_LENGTH = SALES_DATA.length;

// svg references
const STAT_SVG = d3.select('#statistics svg');
const ITER_SVG = d3.select('#iterations svg');
const SEAR_SVG = d3.select('#search svg');
const TRAN_SVG = d3.select('#transformations svg');
const SETS_SVG = d3.select('#sets svg');

// linear scale helper function
function linearScale_helper(d_start, d_end, r_start, r_end) {
  const LINEAR_SCALE = d3.scaleLinear()
    .domain([d_start, d_end])
    .range([r_start, r_end]);
  return LINEAR_SCALE;
}
// axis creation helper function
function axis_helper(type, ticks, scale) {
  let AXIS;
  if (type == 'left') {
    AXIS = d3.axisLeft(scale);
  }
  if (type == 'right') {
    AXIS = d3.axisRight(scale);
  }
  if (type == 'top') {
    AXIS = d3.axisTop(scale);
  }
  if (type == 'bottom') {
    AXIS = d3.axisBottom(scale);
  }
  AXIS.ticks(ticks);
  return AXIS;
}
// axis group creation helper function
function group_helper(context, id, x, y) {
  const GROUP = context.append('g')
    .attr('id', id)
    .attr('transform', `translate(${x},${y})`)
  return GROUP;
}
// category color scale
const CAT_COLOR_SCALE = d3.scaleOrdinal()
  .domain([...Object.keys(SALES_DATA[0])])
  .range(d3.schemePastel1)
// transition
const T1 = d3.transition().duration(2500);

// Statistics
// helper functions
// minimum or maximum helper function
/*
status = 'min' or 'max'
r_status = 0 or 1 or 2;
0 = returns only value
1 = returns only key
2 = returns key values pair as an object 
*/
function minOrMax_helper(obj, status, r_status) {
  let value, valueKey;
  for (key in obj) {
    if (Number.isInteger(obj[key])) {
      if (status == 'min') {
        value = d3.min([obj[key], value]);
      }
      if (status == 'max') {
        value = d3.max([obj[key], value]);
      }
    }
    valueKey = obj[key] === value ? key : valueKey;
  }
  if (r_status == 0) {
    return value;
  }
  if (r_status == 1) {
    return valueKey;
  }
  if (r_status == 2) {
    return {
      [valueKey]: value,
    };
  }
}
// max values
let max_value = [];
for (let i = 0; i < SALES_DATA.length; i++) {
  max_value.push(minOrMax_helper(SALES_DATA[i], 'max', 0))
}
// min values
let min_value = [];
for (let i = 0; i < SALES_DATA.length; i++) {
  min_value.push(minOrMax_helper(SALES_DATA[i], 'min', 0))
}
// y axis
const STAT_Y_AXIS_SCALE =
  linearScale_helper(0,
    DATA_LENGTH - 1,
    BUFFER,
    SVG_H_R1 - BUFFER);
const STAT_Y_AXIS = axis_helper('left', 0, STAT_Y_AXIS_SCALE);
const STAT_Y_AXIS_G = group_helper(STAT_SVG, 'statYAxis', BUFFER, 0);
STAT_Y_AXIS(STAT_Y_AXIS_G);
// x axis
const STAT_X_AXIS_SCALE =
  linearScale_helper(0,
    d3.max(max_value),
    BUFFER,
    SVG_W_R1 - BUFFER);
const STAT_X_AXIS = axis_helper('bottom', 4, STAT_X_AXIS_SCALE);
const STAT_X_AXIS_G = group_helper(STAT_SVG, 'statXAxis', 0, SVG_H_R1 - BUFFER);
STAT_X_AXIS(STAT_X_AXIS_G);
// create a group for each data point
SALES_DATA.forEach((obj, index) => STAT_SVG.append('g')
  .attr('id', `stat${index}`));
// render bars
const MAX_HEIGHT = (SVG_H_R1 - 2 * BUFFER) / DATA_LENGTH;
SALES_DATA.forEach((obj, index) => {
  d3.select(`#stat${index}`)
    .selectAll('rect')
    .data([minOrMax_helper(SALES_DATA[index], 'min', 0),
    minOrMax_helper(SALES_DATA[index], 'max', 0)])
    .join('rect')
    .attr('height', MAX_HEIGHT / 2 - 2)
    .attr('x', BUFFER + 2)
    .attr('y', (d, i) => i == 0 ?
      linearScale_helper(0,
        DATA_LENGTH - 1,
        BUFFER,
        SVG_H_R1 - BUFFER - MAX_HEIGHT)(index) :
      linearScale_helper(0,
        DATA_LENGTH - 1,
        BUFFER,
        SVG_H_R1 - BUFFER - MAX_HEIGHT)(index) + MAX_HEIGHT / 2 - 2)
    .style('fill', (d, i) => i == 0 ?
      CAT_COLOR_SCALE(minOrMax_helper(SALES_DATA[index], 'min', 1)) :
      CAT_COLOR_SCALE(minOrMax_helper(SALES_DATA[index], 'max', 1)))
    .attr('rx', '3')
    .attr('ry', '3');
});
SALES_DATA.forEach((obj, index) => {
  d3.select(`#stat${index}`)
    .selectAll('rect')
    .transition(T1)
    .attr('width', d => STAT_X_AXIS_SCALE(d) - BUFFER)
});
SALES_DATA.forEach((obj, index) => {
  d3.select(`#stat${index}`)
    .selectAll('text')
    .data([SALES_DATA[index].region])
    .join('text')
    .text(d => d[0])
    .attr('x', '1')
    .attr('y', linearScale_helper(0,
      DATA_LENGTH - 1,
      BUFFER + MAX_HEIGHT / 2,
      SVG_H_R1 - BUFFER - MAX_HEIGHT / 2)(index))
    .style('fill', 'gray')
    .style('font-size', '11')
});
// Iterations
function meanAndMap_helper(obj) {
  let value = [], newObj = {}, i = 0;
  for (key in obj) {
    if (Number.isInteger(obj[key])) {
      value.push(obj[key]);
    }
  }
  let meanOutput = d3.map(value, d => d >= d3.mean(value));

  for (key in obj) {
    if (Number.isInteger(obj[key])) {
      if (meanOutput[i]) {
        newObj[key] = obj[key];
      }
      i++;
    }
  }
  return Object.entries(newObj);
}
// y axis
const ITER_Y_AXIS_G = group_helper(ITER_SVG, 'iterYAxis', BUFFER, 0);
STAT_Y_AXIS(ITER_Y_AXIS_G);
// x axis
const ITER_X_AXIS_G = group_helper(ITER_SVG, 'iterXAxis', 0, SVG_H_R1 - BUFFER);
STAT_X_AXIS(ITER_X_AXIS_G);
// create a group for each data point
SALES_DATA.forEach((obj, index) => ITER_SVG.append('g')
  .attr('id', `iter${index}`));
SALES_DATA.forEach((obj, index) => {
  d3.select(`#iter${index}`)
    .selectAll('rect')
    .data(meanAndMap_helper(obj))
    .join('rect')
    .attr('height', MAX_HEIGHT / 4 - 2)
    .attr('x', BUFFER + 2)
    .attr('y', (d, i) =>
      linearScale_helper(0,
        DATA_LENGTH - 1,
        BUFFER,
        SVG_H_R1 - BUFFER - MAX_HEIGHT)(index) +
      (MAX_HEIGHT / 4 - 2) * i)
    .style('fill', (d, i) =>
      CAT_COLOR_SCALE(meanAndMap_helper(SALES_DATA[index])[i][0]))
    .attr('rx', '3')
    .attr('ry', '3');
});
SALES_DATA.forEach((obj, index) => {
  d3.select(`#iter${index}`)
    .selectAll('rect')
    .transition(T1)
    .attr('width', d => STAT_X_AXIS_SCALE(d[1]) - BUFFER)
});
SALES_DATA.forEach((obj, index) => {
  d3.select(`#iter${index}`)
    .selectAll('text')
    .data([SALES_DATA[index].region])
    .join('text')
    .text(d => d[0])
    .attr('x', '1')
    .attr('y', linearScale_helper(0,
      DATA_LENGTH - 1,
      BUFFER + MAX_HEIGHT / 2,
      SVG_H_R1 - BUFFER - MAX_HEIGHT / 2)(index))
    .style('fill', 'gray')
    .style('font-size', '11')
});
// Search
let entries = [];
SALES_DATA.forEach((obj, index) => {
  for (key in obj) {
    if (Number.isInteger(obj[key])) {
      entries.push([index, key, obj[key]])
    }
  }
});
// y axis
const SEAR_Y_AXIS_SCALE =
  linearScale_helper(d3.max(max_value),
    0,
    BUFFER,
    SVG_H_R2 - BUFFER);
const SEAR_Y_AXIS = axis_helper('left', 4, SEAR_Y_AXIS_SCALE);
SEAR_Y_AXIS.ticks(4, "~s")
  .tickPadding(0)
  .tickSize(1);
const SEAR_Y_AXIS_G = group_helper(SEAR_SVG, 'searYAxis', BUFFER, 0);
SEAR_Y_AXIS(SEAR_Y_AXIS_G);
// x axis
const SEAR_X_AXIS_SCALE =
  linearScale_helper(0,
    entries.length - 1,
    BUFFER,
    SVG_W_R2 - BUFFER);
const SEAR_X_AXIS = axis_helper('bottom', 0, SEAR_X_AXIS_SCALE);
const SEAR_X_AXIS_G = group_helper(SEAR_SVG, 'searXAxis', 0, SVG_W_R2 - BUFFER);
SEAR_X_AXIS(SEAR_X_AXIS_G);
// render circles
SEAR_SVG.selectAll('circle')
  .data(d3.sort(entries, (a, b) => d3.ascending(a[2], b[2])))
  .join('circle')
  .attr('cx', (d, i) => SEAR_X_AXIS_SCALE(i))
  .attr('cy', d => SEAR_Y_AXIS_SCALE(d[2]))
  .style('fill', d => CAT_COLOR_SCALE(d[1]))
// transition on circles
SEAR_SVG.selectAll('circle')
  .each((d, i, n) => {
    d3.select(n[i])
      .transition()
      .delay(100 * (i + 1))
      .duration(500)
      .attr('r', '6')
  })
// text on x axis
SEAR_SVG.append('g')
  .attr('id', 'regions')
  .selectAll('text')
  .data(d3.sort(entries, (a, b) => d3.ascending(a[2], b[2])))
  .join('text')
  .text(d => {
    if (d[0] == 0) return 'N'
    if (d[0] == 1) return 'E'
    if (d[0] == 2) return 'S'
    if (d[0] == 3) return 'W'
  })
  .attr('x', (d, i) => SEAR_X_AXIS_SCALE(i) - 3)
  .attr('y', SVG_H_R2 - 5)
  .style('fill', 'gray')
  .style('font-size', '10')
  .style('font-weight', '500')
//
// Transformations
const grouped = d3.groups(entries, d => d[0]);
// y axis
let sum = 0;
d3.max(grouped)[1].forEach(d => {
  sum = sum + d[2];
  return sum;
})
const TRAN_Y_AXIS_SCALE =
  linearScale_helper(sum,
    0,
    BUFFER,
    SVG_H_R2 - BUFFER);
const TRAN_Y_AXIS = axis_helper('left', 4, TRAN_Y_AXIS_SCALE);
TRAN_Y_AXIS.ticks(4, "~s")
  .tickPadding(0)
  .tickSize(1);
const TRAN_Y_AXIS_G = group_helper(TRAN_SVG, 'tranYAxis', BUFFER, 0);
TRAN_Y_AXIS(TRAN_Y_AXIS_G);
//
const groupedWidth = (SVG_W_R2 - 2 * BUFFER) / grouped.length;
// x axis
const TRAN_X_AXIS_SCALE =
  linearScale_helper(0,
    grouped.length - 1,
    BUFFER,
    SVG_W_R2 - BUFFER);
const TRAN_X_AXIS = axis_helper('bottom', 0, TRAN_X_AXIS_SCALE);
const TRAN_X_AXIS_G = group_helper(TRAN_SVG, 'tranXAxis', 0, SVG_W_R2 - BUFFER);
SEAR_X_AXIS(TRAN_X_AXIS_G);
//
function grouped_helper(region) {
  // console.log(region);
  let eachRegion = [];
  region[1].forEach(d => eachRegion.push([d[2]]));
  // console.log(d3.sum(d3.merge(eachRegion)));
  return d3.sum(d3.merge(eachRegion));
}
TRAN_SVG.selectAll('rect')
  .data(grouped)
  .join('rect')
  .attr('x', (d, i) => linearScale_helper(0,
    grouped.length - 1,
    BUFFER,
    SVG_W_R2 - BUFFER - groupedWidth)(i) + 5)
  .attr('y', (d, i) =>
    linearScale_helper(sum,
      0,
      BUFFER,
      SVG_H_R2 - 2 * BUFFER)(grouped_helper(d)))
  .attr('width', groupedWidth - 5)
  .attr('rx', '3')
  .attr('ry', '3')
  .style('fill', (d, i) => d3.schemePastel1[i + 5]);
//
TRAN_SVG.selectAll('rect')
  .each((d, i, n) => {
    d3.select(n[i])
      .transition()
      .delay(200 * (i + 1))
      .duration(1500)
      .attr('height', (d, i) => SVG_H_R2 - BUFFER - 2 -
        linearScale_helper(sum,
          0,
          BUFFER,
          SVG_H_R2 - 2 * BUFFER)(grouped_helper(d)))
  });
//
TRAN_SVG.append('g')
  .attr('id', 'region')
  .selectAll('text')
  .data(grouped)
  .join('text')
  .text((d, i) => {
    if (d[0] == 0) return 'North'
    if (d[0] == 1) return 'East'
    if (d[0] == 2) return 'South'
    if (d[0] == 3) return 'West'

  })
  .attr('x', (d, i) => linearScale_helper(0,
    grouped.length - 1,
    BUFFER,
    SVG_W_R2 - BUFFER - groupedWidth)(i) + groupedWidth / 2)
  .attr('y', SVG_H_R2 - 5)
  .style('text-anchor', 'middle')
  .style('fill', 'gray')
  .style('font-size', '11')
  .style('font-weight', '500')
// sets
let commonValue = 0;
let regionArray = [], allArray = [];
SALES_DATA.forEach((d, i) => {
  let region = Object.values(d);
  region.forEach(d => {
    if (Number.isInteger(d)) {
      regionArray.push(d);
    }
  })
  allArray.push(regionArray);
  regionArray = [];
})
commonValue = d3.intersection(...allArray);
let commonArray = [];
entries.forEach(d => {
  // console.log(d[2]);
  if (d[2] == Array.from(commonValue)) {
    commonArray.push(d);
    // console.log(d);
  }
});
//
const SETS_Y_AXIS_SCALE =
  linearScale_helper(Array.from(commonValue),
    0,
    BUFFER,
    SVG_H_R2 - BUFFER);
const SETS_Y_AXIS = axis_helper('left', 5, SETS_Y_AXIS_SCALE);
SETS_Y_AXIS.ticks(5, "~s")
  .tickPadding(0)
  .tickSize(1);
const SETS_Y_AXIS_G = group_helper(SETS_SVG, 'setsYAxis', BUFFER, 0);
SETS_Y_AXIS(SETS_Y_AXIS_G);
//
// x axis
const SETS_X_AXIS_SCALE =
  linearScale_helper(0,
    commonArray.length - 1,
    BUFFER,
    SVG_W_R2 - BUFFER);
const SETS_X_AXIS = axis_helper('bottom', 0, SETS_X_AXIS_SCALE);
const SETS_X_AXIS_G = group_helper(SETS_SVG, 'setsXAxis', 0, SVG_W_R2 - BUFFER);
SETS_X_AXIS(SETS_X_AXIS_G);
//
SETS_SVG.selectAll('rect')
  .data(commonArray)
  .join('rect')
  .attr('x', (d, i) => linearScale_helper(0,
    commonArray.length - 1,
    BUFFER,
    SVG_W_R2 - BUFFER - groupedWidth)(i) + 5)
  .attr('y', (d, i) =>
    linearScale_helper(Array.from(commonValue),
      0,
      BUFFER,
      SVG_H_R2 - 2 * BUFFER)(d[2]))
  .attr('width', groupedWidth - 5)
  .attr('rx', '3')
  .attr('ry', '3')
  .style('fill', (d, i) => CAT_COLOR_SCALE(d[1]));
//
SETS_SVG.selectAll('rect')
  .each((d, i, n) => {
    d3.select(n[i])
      .transition()
      .delay(200 * (i + 1))
      .duration(1500)
      .attr('height', (d, i) => SVG_H_R2 - BUFFER - 2 -
        linearScale_helper(Array.from(commonValue),
          0,
          BUFFER,
          SVG_H_R2 - 2 * BUFFER)(d[2]))
  });
SETS_SVG.append('g')
  .attr('id', 'common')
  .selectAll('text')
  .data(commonArray)
  .join('text')
  .text((d, i) => {
    if (d[0] == 0) return 'North'
    if (d[0] == 1) return 'East'
    if (d[0] == 2) return 'South'
    if (d[0] == 3) return 'West'
  })
  .attr('x', (d, i) => linearScale_helper(0,
    grouped.length - 1,
    BUFFER,
    SVG_W_R2 - BUFFER - groupedWidth)(i) + groupedWidth / 2)
  .attr('y', SVG_H_R2 - 5)
  .style('text-anchor', 'middle')
  .style('fill', 'gray')
  .style('font-size', '11')
  .style('font-weight', '500')
// Legend
d3.select('#legend')
  .selectAll('p')
  .data(commonArray)
  .join('p')
  .text(d => ABBR.get(d[1]))
  .style('background-color', d => CAT_COLOR_SCALE(d[1]));