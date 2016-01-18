var readline = require('readline');
var fs = require('fs');
var csvrow = require('csvrow');

var percentData = {};
var hectares = {};
var hectaresPP = {};


var rInterface = readline.createInterface({
  input: fs.createReadStream('/vagrant/data/WDI_Data.csv')
});

rInterface.on('line', function(line) {
  var res = line.match(/Arable/g);
  if (res) {
    data = csvrow.parse(line);
    countryCode = data[1]
    dataCode = data[3]
    data.splice(0, 4);

    if (dataCode == "AG.LND.ARBL.HA") {
      hectares[countryCode] = data;
    } else if(dataCode == "AG.LND.ARBL.HA.PC") {
      hectaresPP[countryCode] = data;
    } else if(dataCode == "AG.LND.ARBL.HA.ZA" ) {
      percentData[countryCode] = data;
    }
  }
});

rInterface.on('close', function() {
    fs.writeFile("percent.json", JSON.stringify(hectares, null, 2));
    fs.writeFile("hectares.json", JSON.stringify(hectares, null, 2));
    fs.writeFile("hectaresPP.json", JSON.stringify(hectares, null, 2));
});
