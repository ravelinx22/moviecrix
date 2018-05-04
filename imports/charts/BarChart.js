import { getNowP, getUpc, getImg, getLine, getBar } from "../data.js";
import * as d3 from "d3";

export function barChart() {
	var svg = d3.select("body")
		.append("svg")
		.attr("width", 905)
		.attr("height", 600);

	var data = getNowP();
	data = data.slice(0,36);

	var rects = svg.selectAll("rect")
		.data(data)
		.enter()
		.append("rect");

	rects.attr("x", 105)
		.attr("y", function(d, i) {
			return i * 15;

		})
		.attr("width", function(d) {
			return + d.vote_count * 800/35000 ;

		})
		.attr("height", 13)
		.append("title")
		.text(function(d) {
			return d.title;
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
			return d.title
		});
}
