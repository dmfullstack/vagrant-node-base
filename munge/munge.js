csv = require('csv');
fs = require('fs');

var parser = csv.parse({}, function(err, data) {
  console.log(data);
});

var readStream = fs.createReadStream('/vagrant/data/WDI_Data.csv');

readStream.on('data', function (chunk){
  console.log(chunk)
});
