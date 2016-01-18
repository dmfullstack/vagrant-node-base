var fs = require('fs');

var obj = JSON.parse(fs.readFileSync('../data/countries.json', 'utf8'));
var countriesInAsia = [];

for(country in obj) {
  if (obj[country].region == "Asia") {
    countriesInAsia.push(obj[country].cca3);
  }
}

console.log(JSON.stringify(countriesInAsia));
