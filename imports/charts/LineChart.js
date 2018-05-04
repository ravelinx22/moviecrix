import * as d3 from "d3";
import { getUpc, getImg, getLine, getBar, getTweet } from "../data.js";

export function lineChart() {
	var margin = {top: 30, right: 20, bottom: 30, left: 50},
		width = 600 - margin.left - margin.right,
		height = 270 - margin.top - margin.bottom;

	// Parse the date / time
	var parseDate = d3.timeParse("%b %Y");

	// Set the ranges
	var x = d3.scaleTime().range([0, width]);  
	var y = d3.scaleLinear().range([height, 0]);

	// Define the line
	var priceline = d3.line()    
		.x(function(d) { return x(d.date);  })
		.y(function(d) { return y(d.price);  });

	// Adds the svg canvas
	var svg = d3.select("body")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", 
			"translate(" + margin.left + "," + margin.top + ")");

	const data = getTweet();
	console.log(getTweet());
	// Get the data
	data.forEach(function(d) {
		d.date = new Date(d.created_at);
		d.price = +d.movie[d.movie.length-1];

	});

	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.date;  }));
	y.domain([0, d3.max(data, function(d) { return d.price;  })]);

	// Nest the entries by symbol
	var dataNest = d3.nest()
		.key(function(d) {return d.movie;})
		.entries(data);

	// set the colour scale
	var color = d3.scaleOrdinal(d3.schemeCategory10);

	// Loop through each symbol / key
	dataNest.forEach(function(d) { 

		svg.append("path")
			.attr("class", "line")
			.style("stroke", function() { // Add the colours dynamically
				return d.color = color(d.key); })
			.attr("d", priceline(d.values));

	});

	// Add the X Axis
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	// Add the Y Axis
	svg.append("g")
		.attr("class", "axis")
		.call(d3.axisLeft(y));
}


