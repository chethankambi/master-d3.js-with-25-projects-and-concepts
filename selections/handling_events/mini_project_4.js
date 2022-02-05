// Data
let fordData = [
  {
    quarter: 'Q1',
    year: 2018,
    truck: 109276,
    suv: 82395,
    car: 52635
  },
  {
    quarter: 'Q2',
    year: 2018,
    truck: 100683,
    suv: 84617,
    car: 45335
  },
  {
    quarter: 'Q3',
    year: 2018,
    truck: 93408,
    suv: 66884,
    car: 37112
  },
  {
    quarter: 'Q4',
    year: 2018,
    truck: 106599,
    suv: 79225,
    car: 34950
  },
  {
    quarter: 'Q1',
    year: 2019,
    truck: 278898,
    suv: 213086,
    car: 98265
  },
  {
    quarter: 'Q2',
    year: 2019,
    truck: 324243,
    suv: 215898,
    car: 110195
  },
  {
    quarter: 'Q3',
    year: 2019,
    truck: 309920,
    suv: 193100,
    car: 77231
  },
  {
    quarter: 'Q4',
    year: 2019,
    truck: 330075,
    suv: 208387,
    car: 63400
  }
];

// Structure the data for years
let years = new Set();
fordData.forEach(d => {
  years.add(d.year);
});
years = Array.from(years);
// Yearly Data
let yearlyData = [];
years.forEach(year => {
  let yearSum = 0;
  fordData.forEach(d => {
    if (d.year == year) {
      yearSum += d.truck + d.suv + d.car;
    }
  })
  yearlyData.push(yearSum);
})

// Reset function
function resetCharts() {
  document.querySelector('#years svg').innerHTML = '';
  document.querySelector('#quarters svg').innerHTML = '';
  document.querySelector('#vehicles svg').innerHTML = '';
  d3.select('#quarters p')
    .text('Click on a year bar for more details');
  d3.select('#vehicles p').text(null);
}

// Listener on the 'generate' button
d3.select('#gen-info').on('click', () => {

  // Reset function call
  resetCharts();

  // Create yearly chart
  d3.select('#years p')
    .text('Number of vehicles');
  // Insert year bars
  const yearsSvg = d3.select('#years svg')
    .selectAll('rect');

  yearsSvg.data(yearlyData)
    .join('rect')
    .attr('x', '0')
    .attr('y', (d, i) => {
      return document.querySelector('#years')
        .clientHeight / 4 * (i + 1);
    })
    .attr('height', (d, i) => {
      return document.querySelector('#years')
        .clientHeight / 4 - 5;
    })
    .attr('width', d => d / 10000)
    .attr('id', (d, i) => `${years[i]}`)
    .style('fill', (d, i) => {
      const color = new Map()
      color.set(0, 'steelblue');
      color.set(1, 'dodgerblue');
      return color.get(i);
    })
    .style('cursor', 'pointer');
  // Insert text for year bars
  yearsSvg.data(yearlyData)
    .join('text')
    .attr('x', d => d / 10000 + 10)
    .attr('y', (d, i) => {
      return (
        document.querySelector('#years')
          .clientHeight / 4 * (i + 1) +
        (document.querySelector('#years')
          .clientHeight / 4) / 2
      );
    })
    .text((d, i) => `${years[i]} - ${d}`)
    .style('font-size', '12')
    .style('font-weight', '500')
    .style('fill', 'gray');
  // Status message for quarter bars
  d3.select('#quarters p')
    .text('Click on a year bar for more details');

  // Create quarterly chart
  d3.select('#years').selectAll('rect')
    .on('click', (d, i, n) => {
      console.log(n[i]);
      // reset
      document.querySelector('#vehicles svg').innerHTML = '';
      d3.select('#vehicles p').text(null);

      // Update status message to chart title for quarters

      d3.select('#quarters p')
        .text(`${n[i].id} : Quarterly break up`);

      let quarterlyData = [];
      fordData.forEach(d => {
        if (d3.event.target.id == d.year) {
          quarterlyData.push(d);
        }
      });
      const colorDispatch = d3.select(n[i]).style('fill'); // data for dispatch
      const quartersSvg = d3.select('#quarters svg');

      quartersSvg.on('intheyear', (d, i, n) => {
        // console.log(d3.event.detail);
        // console.log(d, i, n);
        // d3.select(n) or quartersSvg can be used

        // Insert quarters bars
        quartersSvg.selectAll('rect')
          .data(quarterlyData)
          .join('rect')
          .attr('x', '0')
          .attr('y', (d, i) => {
            return document.querySelector('#quarters')
              .clientHeight / 6 * (i + 1);
          })
          .attr('height', () => {
            return document.querySelector('#quarters')
              .clientHeight / 6 - 5;
          })
          .attr('width', d => {
            // console.log((d.truck + d.suv + d.car))
            return (d.truck + d.suv + d.car) / 1500;
          })
          .attr('id', d => `${d.quarter}`)
          .style('fill', d3.event.detail)
          .style('cursor', 'pointer');
        // Insert text for quarters bars
        quartersSvg.selectAll('text')
          .data(quarterlyData)
          .join('text')
          .attr('x', d => (d.truck + d.suv + d.car) / 1500 + 10)
          .attr('y', (d, i) => {
            return (
              document.querySelector('#quarters')
                .clientHeight / 6 * (i + 1) +
              (document.querySelector('#quarters')
                .clientHeight / 6) / 2
            );
          })
          .text((d, i) => `${d.quarter} - ${(d.truck + d.suv + d.car)}`)
          .style('font-size', '12')
          .style('font-weight', '500')
          .style('fill', 'gray');

        // Status message for vehicle type breakup
        d3.select('#vehicles p')
          .text('Hover on a quarter bar for vehicle types');

        // Insert vehicle breakup chart
        quartersSvg.selectAll('rect')
          .on('mouseenter', (d, i, n) => {
            // console.log(d, i);
            d3.customEvent(d3.event,
              function (...arguments) {
                // console.log(arguments);
                // console.log(Object.keys(arguments[0])[0])
                // Update status message for vehicle type break up
                d3.select('#vehicles p')
                  .text(`${arguments[0].year} | ${arguments[0].quarter} : Vehicle type break up`);
                // Insert vehicle type bars
                d3.select('#vehicles svg')
                  .selectAll('rect')
                  .data([arguments[0].truck, arguments[0].suv, arguments[0].car])
                  .join('rect')
                  .attr('width', d => d / 1000)
                  .attr('height', () => {
                    return document.querySelector('#vehicles')
                      .clientHeight / 5 - 5;
                  })
                  .attr('x', '0')
                  .attr('y', (d, i) => {
                    return document.querySelector('#vehicles')
                      .clientHeight / 5 * (i + 1);
                  })
                  .attr('fill', (d, i) => {
                    const color = new Map()
                    color.set(0, '#38ACEC');
                    color.set(1, '#5CB3FF');
                    color.set(2, '#79BAEC');
                    return color.get(i);
                  });
                // Insert text for vehicle type bars
                d3.select('#vehicles svg')
                  .selectAll('text')
                  .data([arguments[0].truck, arguments[0].suv, arguments[0].car])
                  .join('text')
                  .attr('x', d => d / 1000 + 10)
                  .attr('y', (d, i) => {
                    return (
                      document.querySelector('#vehicles')
                        .clientHeight / 5 * (i + 1) +
                      (document.querySelector('#vehicles')
                        .clientHeight / 5) / 2
                    );
                  })
                  .text((d, i) =>
                    `${Object.keys(arguments[0])[i + 2].toUpperCase()} - ${d}`)
                  .style('font-size', '12')
                  .style('font-weight', '500')
                  .style('fill', 'gray');

              }, n[i], [d]);
          });
      });
      quartersSvg.dispatch('intheyear', { detail: colorDispatch });
    });
});