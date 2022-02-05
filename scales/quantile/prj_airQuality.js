const airQualityScale =
  d3.scaleQuantile()
    .domain([10, 12, 35.4, 55.4, 150.4, 250.4])
    .range(['dodgerblue', 'mediumseagreen', 'yellow', 'orange', 'tomato', 'violet', 'lightgrey']);

const legend = new Map();

legend.set("dodgerblue", "WHO Target");
legend.set("mediumseagreen", "Good");
legend.set("yellow", "Moderate");
legend.set("orange", "Unhealthy For Sensitive Groups");
legend.set("tomato", "Unhealthy");
legend.set("violet", "Very Unhealthy");
legend.set("lightgrey", "Hazardous");

document.querySelector('button')
  .addEventListener('click', () => {
    const value = Number(document.querySelector('input').value);
    console.log(value);
    if (value >= 0 && value != null) {
      d3.select('#output svg')
        .selectAll('rect')
        .attr('width', '320')
        .attr('height', '50')
        .attr('rx', '5')
        .attr('ry', '5')
        .attr('x', '10')
        .attr('y', '30')
        .attr('fill', () => airQualityScale(value));

      console.log(legend.get(airQualityScale(value)))

      document.querySelector('#output p').innerText = legend.get(airQualityScale(value));
      document.querySelector('#output p').style.color = airQualityScale(value);
    }
    else {
      d3.select('#output svg')
        .selectAll('rect')
        .attr('fill', '#ffffff00');
      document.querySelector('#output p').innerText = '';
    }
  })