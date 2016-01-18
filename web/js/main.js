var m = [80, 80, 80, 80]; // margins
var w = 1000 - m[1] - m[3]; // width
var h = 400 - m[0] - m[2]; // height

// create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
var data = [];
var countriesInAsia = [];
var sums = _.map(_.range(56), function(){return 0});
console.log(sums);

d3.json("countriesInAsia.json", function(error, json){
  if (error) return console.warn(error);

  countriesInAsia = json;

  d3.json("percent.json", function(error, json) {
    if (error) return console.warn(error);

    for(var i in json) {
      if(countriesInAsia.indexOf(i) > -1) {
        for(var k in sums) {
          if (json[i][k]) {
            sums[k] = sums[k] + parseFloat(json[i][k]);
          }
        }
      }
    }
    sums.splice(0, 1);
    sums.splice(53, 2);
    data = sums;
    visualizeit();
    console.log(data);
  });
});

var visualizeit = function () {
  var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
  var y = d3.scale.linear().domain([4.0e+8, 5.1e+8]).range([h, 0]);
  	// automatically determining max range can work something like this
  	// var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);
  // create a line function that can convert data[] into x and y points
  var line = d3.svg.line()
  	// assign the X function to plot our line as we wish
  	.x(function(d,i) {
    	return x(i);
  	})
  	.y(function(d) {
        return y(d);
  	})
  	// Add an SVG element with the desired dimensions and margin.
  	var graph = d3.select("#graph").append("svg:svg")
  	      .attr("width", w + m[1] + m[3])
  	      .attr("height", h + m[0] + m[2])
  	    .append("svg:g")
  	      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
  	// create yAxis
  	var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
    xAxis.tickFormat(function(d, i) {
      return d + 1961;
    });
  	// Add the x-axis.
  	graph.append("svg:g")
  	      .attr("class", "x axis")
  	      .attr("transform", "translate(0," + h + ")")
  	      .call(xAxis);
  	// create left yAxis
  	var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
    yAxisLeft.tickFormat(function(d, i){
      console.log(d, i);
      return d.toExponential();
    });
  	// Add the y-axis to the left
  	graph.append("svg:g")
  	      .attr("class", "y axis")
  	      .attr("transform", "translate(-25,0)")
  	      .call(yAxisLeft);

  		// Add the line by appending an svg:path element with the data line we created above
  	// do this AFTER the axes above so that the line is above the tick-lines
  		graph.append("svg:path").attr("d", line(data));
};
