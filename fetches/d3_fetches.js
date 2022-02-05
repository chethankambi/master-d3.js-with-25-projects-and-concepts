// fetches
// this module has methods on top of the Fetch API.
// This module has built-in support for parsing JSON, CSV, and TSV. You can parse additional formats by using text directly.

// csv - comma separated values
// d3.csv(input,init(optional),row(optional))
// input = path to where the file is located
// init = object containing any custom settings that you want to apply to the request
// row = conversion function that may be specified to map and filter row objects to a more-specific representation
// If only one of init and row is specified, it is interpreted as the row conversion function if it is a function, and otherwise an init object.

let csvOutput = d3.csv('username.csv');
// console.log(csvOutput);
csvOutput.then(data => console.log(data));
csvOutput.then(data => console.log(data.length));
csvOutput.then(data => console.log(data.columns));

let details = [];
csvOutput = d3.csv('username.csv', d => {
  return {
    username: d.Username,
    identifier: d.Identifier,
    firstName: d['First name'],
    lastName: d['Last name']
  };
  // }).then(data => console.log(data));
  // }).then(data => console.log(data.length));
  // }).then(data => console.log(data.columns));
}).then(data => details = [...data])
  .catch((err) => console.log('Something went wrong'));

// tsv - tab separated values
// d3.tsv(input,init(optional),row(optional))
// input = path to where the file is located
// init = object containing any custom settings that you want to apply to the request
// row = conversion function that may be specified to map and filter row objects to a more-specific representation
// If only one of init and row is specified, it is interpreted as the row conversion function if it is a function, and otherwise an init object.

let tsvOutput = d3.tsv('username.tsv');
// console.log(tsvOutput);
tsvOutput.then(data => console.log(data));
tsvOutput.then(data => console.log(data.length));
tsvOutput.then(data => console.log(data.columns));

details = [];
tsvOutput = d3.tsv('username.tsv', d => {
  return {
    username: d.Username,
    identifier: d.Identifier,
    firstName: d['First name'],
    lastName: d['Last name']
  };
  // }).then(data => console.log(data));
  // }).then(data => console.log(data.length));
  // }).then(data => console.log(data.columns));
}).then(data => details = [...data])
  .catch((err) => console.log('Something went wrong'));

// dsv - delimiter separated values
// d3.tsv(delimiter,input,init(optional),row(optional))
// delimiter - type of delimiter(,.*)
// input = path to where the file is located
// init = object containing any custom settings that you want to apply to the request
// row = conversion function that may be specified to map and filter row objects to a more-specific representation
// If only one of init and row is specified, it is interpreted as the row conversion function if it is a function, and otherwise an init object.

let dsvOutput = d3.dsv(';', 'username.dsv');
// console.log(dsvOutput);
dsvOutput.then(data => console.log(data));
dsvOutput.then(data => console.log(data.length));
dsvOutput.then(data => console.log(data.columns));

details = [];
dsvOutput = d3.dsv(';', 'username.dsv', d => {
  return {
    username: d.Username,
    identifier: d.Identifier,
    firstName: d['First name'],
    lastName: d['Last name']
  };
  // }).then(data => console.log(data));
  // }).then(data => console.log(data.length));
  // }).then(data => console.log(data.columns));
}).then(data => details = [...data])
  .catch((err) => console.log('Something went wrong'));

// text
// d3.text(input,init(optional))
// input = path to where the file is located
// init = object containing any custom settings that you want to apply to the request

let textOutput = d3.text('text.txt');
// console.log(textOutput);
textOutput.then(data => console.log(data));
textOutput.then(data => console.log(data.length))
  .catch((err) => console.log('Something went wrong'));

// json
// d3.json(input,init(optional))
// input = path to where the file is located
// init = object containing any custom settings that you want to apply to the request

let jsonOutput = d3.json('username.json');
// console.log(jsonOutput);
jsonOutput.then(data => console.log(data));
jsonOutput.then(data => console.log(data.length))
  .catch((err) => console.log('Something went wrong'));

// html
// d3.html(input,init(optional))
// input = path to where the file is located
// init = object containing any custom settings that you want to apply to the request

let htmlOutput = d3.html('d3_fetches.html');
// console.log(htmlOutput);
htmlOutput.then(data => console.log(data))
  .catch((err) => console.log('Something went wrong'));

// xml
// d3.xml(input,init(optional))
// input = path to where the file is located
// init = object containing any custom settings that you want to apply to the request

let xmlOutput = d3.xml('note.xml');
// console.log(xmlOutput);
xmlOutput.then(data => console.log(data))
  .catch((err) => console.log('Something went wrong'));

// image
// d3.image(input,init(optional))
// input = path to where the file is located
// init = object containing any custom settings that you want to apply to the request

let imageOutput = d3.image('sample.png');
// console.log(imageOutput);
imageOutput.then(data => console.log(data))
  .catch((err) => console.log('Something went wrong'));

// svg
// d3.svg(input,init(optional))
// input = path to where the file is located
// init = object containing any custom settings that you want to apply to the request

let svgOutput = d3.svg('sample.svg');
// console.log(svgOutput);
svgOutput.then(data => console.log(data))
  .catch((err) => console.log('Something went wrong'));