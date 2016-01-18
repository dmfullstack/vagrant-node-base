fs = require('fs')
fs.readFile('datajson.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  //console.log(data);
  var json = JSON.parse(data);
  //console.log(json);


  var xColumn="Country Name";
  var yColumn1="Population (Millions) - 2010";
  var yColumn2="Population (Millions) - 2011";
  var yColumn3="Population (Millions) - 2012";
  var yColumn4="Population (Millions) - 2013";
   var results,
       data = [],

   results = json;
   //console.log(results);

   results.forEach( function( val, key ) {

       var result = {};

       result.country = val[xColumn];
       result.growth1 = val[yColumn2]-val[yColumn1];
       result.growth2 = val[yColumn3]-val[yColumn2];
       result.growth3 = val[yColumn4]-val[yColumn3];
       data.push( result );
      // console.log(result);
   } );

  console.log(JSON.stringify(data, null, 2));
});



function visualize(data) {
//use data
 }
