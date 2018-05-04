import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import * as d3 from "d3";

import { getUpc, getImg, getLine, getBar } from "../../data.js";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		var chart = this.bubbleChart().width(900).height(900).showTitleOnCircle(true).title("");
		d3.select('#chart').datum(getUpc()).call(chart);

		this.lineChart();
		this.barChart();
	}

	barChart() {
		var svg = d3.select("body")
			.append("svg")
			.attr("width", 905)
			.attr("height", 600);

		var data = getBar();
		data = data.slice(0,36);
		console.log(data);

		var rects = svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect");

		rects.attr("x", 105)
			.attr("y", function(d, i) {
				return i * 15;

			})
			.attr("width", function(d) {
				return +d.Aid_MUSD * 800/35000 ;

			})
			.attr("height", 13)
			.append("title")
			.text(function(d) {
				return d.Country_Name + "'s aid spending is " + d.Aid_MUSD + " million USD";
			});

		var countries = svg.selectAll("text")
			.data(data)
			.enter()
			.append("text");

		countries.attr("x", 100)
			.attr("y", function(d,i) {
				return i * 15 + 11; 
			})
			.attr("fill", "black")
			.attr("font-size", "10px")
			.attr("font-weight", "normal")
			.attr("font-family", "sans-serif")
			.attr("text-anchor", "end")
			.text(function(d) {
				return d.Country_Name
			});
	}


	lineChart() {
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

		const data = getLine();
		// Get the data
		data.forEach(function(d) {
			d.date = parseDate(d.date);
			d.price = +d.price;

		});

		// Scale the range of the data
		x.domain(d3.extent(data, function(d) { return d.date;  }));
		y.domain([0, d3.max(data, function(d) { return d.price;  })]);

		// Nest the entries by symbol
		var dataNest = d3.nest()
			.key(function(d) {return d.symbol;})
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

	bubbleChart() {
		var width = 960,
			height = 960,
			marginTop = 96,
			minRadius = 50,
			maxRadius = 70,
			columnForColors = "genre_ids",
			columnForTitle = "title",
			columnForRadius = "vote_count",
			forceApart = -2800,
			unitName="hearts",
			customColors=false,
			customRange,
			customDomain,
			chartSelection,
			chartSVG,
			showTitleOnCircle=false;

		function chart(selection) {
			var data = selection.datum();
			chartSelection=selection;
			var div = selection,
				svg = div.selectAll('svg');
			svg.attr('width', width).attr('height', height);
			chartSVG=svg;

			var tooltip = selection
				.append("div")
				.style("position", "absolute")
				.style("visibility", "hidden")
				.style("color", "white")
				.style("padding", "8px")
				.style("background-color", "#626D71")
				.style("border-radius", "6px")
				.style("text-align", "center")
				.style("font-family", "monospace")
				.style("width", "400px")
				.text("");


			var simulation = d3.forceSimulation(data)
				.force("charge", d3.forceManyBody().strength([forceApart]))
				.force("x", d3.forceX(function(d) {return d[columnForColors][0]*3;}).strength(0.7))
				.force("y", d3.forceY(function(d) {return d[columnForColors][0]*3;}).strength(0.7))
				.on("tick", ticked);

			function ticked(e) {
				node.attr("transform",function(d) {
					return "translate(" + [d.x+(width / 2), d.y+((height+marginTop) / 2)] +")";

				});

			}

			var colorCircles;
			if (!customColors) {
				colorCircles = d3.scaleOrdinal(d3.schemeCategory10);

			} 
			else {
				colorCircles = d3.scaleOrdinal()
					.domain(customDomain)
					.range(customRange);

			}

			var minRadiusDomain = d3.min(data, function(d) {
				return +d[columnForRadius];

			});
			var maxRadiusDomain = d3.max(data, function(d) {
				return +d[columnForRadius];

			});
			var scaleRadius = d3.scaleLinear()
				.domain([minRadiusDomain, maxRadiusDomain])
				.range([minRadius, maxRadius])

			var node = svg.selectAll("circle")
				.data(data)
				.enter()
				.append("g")
				.attr('transform', 'translate(' + [width / 2, height / 2] + ')')
				.style('opacity',1);

			node.append("circle")
				.attr("id",function(d,i) {
					return i;

				})
				.attr('r', function(d) {
					return scaleRadius(d[columnForRadius]);

				})
				.style("fill", function(d) {
					return colorCircles(d[columnForColors][0]);

				})
				.on("mouseover", function(d) {
					tooltip.html(d[columnForTitle] + "<br/>" + d[columnForColors][0] + "<br/>" + d[columnForRadius] + " "+ unitName);
					return tooltip.style("visibility", "visible");

				})
				.on("mousemove", function() {
					return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");

				})
				.on("mouseout", function() {
					return tooltip.style("visibility", "hidden");

				});
			node.append("clipPath")
				.attr("id",function(d,i) {
					return "clip-"+i;

				})
				.append("use")
				.attr("xlink:href",function(d,i) {
					return "#" + i;

				});
			if (showTitleOnCircle) {
				node.append("text")
					.attr("clip-path",function(d,i) {
						return "url(#clip-" + i + ")"

					})
					.attr("text-anchor", "middle")
					.append("tspan")
					.attr("x",function(d) {
						return 0;//-1*scaleRadius(d[columnForRadius])/3;

					})
					.attr("y",function(d) {
						return ".3em";//scaleRadius(d[columnForRadius])/4;

					})
					.text(function(d) {
						return d[columnForTitle];

					})
					.on("mouseover", function(d) {
						tooltip.html(d[columnForTitle] + "<br/>" + d[columnForColors] + "<br/>" + d[columnForRadius] + " "+ unitName);
						return tooltip.style("visibility", "visible");

					})
					.on("mousemove", function() {
						return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");

					})
					.on("mouseout", function() {
						return tooltip.style("visibility", "hidden");

					});

			}

			svg.append('text')
				.attr('x',width/2).attr('y',marginTop)
				.attr("text-anchor", "middle")
				.attr("font-size","1.8em")
				.text(title);

		}


		chart.width = chartWidth;
		chart.height = chartHeight;
		chart.columnForColors = chartColForColors;
		chart.columnForRadius = chartColForRadius;
		chart.columnForTitle = chartColForTitle;
		chart.minRadius = chartMinRadius;
		chart.maxRadius = chartMaxRadius;
		chart.forceApart = chartForceApart;
		chart.unitName = chartUnitName;
		chart.customColors = chartCustomColors;
		chart.showTitleOnCircle = chartShowTitleOnCircle;
		chart.title=chartTitle;
		chart.remove = chartRemove;
		function chartWidth(value) {
			if (!arguments.length) {
				return width;

			}
			width = value;
			return chart;

		};

		function chartHeight(value) {
			if (!arguments.length) {
				return height;

			}
			height = value;
			marginTop=0.05*height;
			return chart;

		};


		function chartColForColors(value) {
			if (!arguments.length) {
				return columnForColors;

			}
			columnForColors = value;
			return chart;

		};
		function chartColForTitle(value) {
			if (!arguments.length) {
				return columnForTitle;

			}
			columnForTitle = value;
			return chart;

		};

		function chartColForRadius (value) {
			if (!arguments.length) {
				return columnForRadius;

			}
			columnForRadius = value;
			return chart;

		};

		function chartMinRadius(value) {
			if (!arguments.length) {
				return minRadius;

			}
			minRadius = value;
			return chart;

		};
		function chartMaxRadius(value) {
			if (!arguments.length) {
				return maxRadius;

			}
			maxRadius = value;
			return chart;

		};
		function chartUnitName(value) {
			if (!arguments.length) {
				return unitName;

			}
			unitName = value;
			return chart;

		};
		function chartForceApart(value) {
			if (!arguments.length) {
				return forceApart;

			}
			forceApart = value;
			return chart;

		};

		function chartShowTitleOnCircle(value) {
			if (!arguments.length) {
				return showTitleOnCircle;

			}
			showTitleOnCircle = value;
			return chart;

		};

		function chartCustomColors(domain,range) {
			customColors=true;
			customDomain=domain;
			customRange=range;
			return chart;

		};

		function chartTitle(value) {
			if (!arguments.length) {
				return title;

			}
			title = value;
			return chart;

		}

		function chartRemove(callback) {
			chartSVG.selectAll("text")
				.style("opacity",1)
				.transition()
				.duration(500)
				.style("opacity", "0")
				.remove();	
			if (!arguments.length) {	
				chartSVG.selectAll("g")
					.style("opacity",1)
					.transition()
					.duration(500)
					.style("opacity", "0")
					.remove();		
			}
			else {			
				chartSVG.selectAll("g")
					.style("opacity",1)
					.duration(500)
					.style("opacity", "0")
					.remove()
					.on("end", callback);
			}
			return chart;

		}

		return chart;

	}

	render() {
		return(
			<div className="chart-example" id="chart"><svg></svg></div>
		);
	}
}
