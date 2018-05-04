import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import * as d3 from "d3";

import { getUpc, getImg, getLine, getBar } from "../../data.js";
import { barChart } from "../../charts/BarChart.js";
import { lineChart } from "../../charts/LineChart.js";
import { bubbleChart } from "../../charts/Bubble.js";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		var chart = bubbleChart().width(900).height(900).showTitleOnCircle(true).title("");
		d3.select('#chart').datum(getUpc()).call(chart);

		lineChart();
		barChart();
	}

	render() {
		return(
			<div className="chart-example" id="chart"><svg></svg></div>
		);
	}
}
