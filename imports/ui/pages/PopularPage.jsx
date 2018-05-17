import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor"; import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import TweetList from "../components/TweetList.jsx";
import MoviesList from "../components/MoviesList.jsx";
import { barChart } from "../../charts/BarChart.js";
import * as d3 from "d3";
import "../css/BarChart.css";

class PopularPage extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		Meteor.call("movies.getPopular", 1, (error, res) => {
			var myChart = barChart("popularity")
			myChart.chartTitle("Popularity")
				.chartType("popularity");

			var rankedAlbums = res.slice(0, 12);
			d3.select('#chart')
				.datum(rankedAlbums)
				.call(myChart);
		});
	}

	render() {
		return (
			<Container>
				<Row className="graph_container bar_chart">
					<Col md={8}>
						<Row>
							<h1>Most popular</h1>
							<MoviesList type="popular" />
						</Row>
					</Col>
					<Col md={4}>
						<svg id="chart" className="movieChart" className="graph">
							<defs>
								<linearGradient id="coolGradient" x1="0" x2="100%" y1="0" y2="0" gradientUnits="userSpaceOnUse">
									<stop stopColor="#3DAFD5" offset="0%" />
									<stop stopColor="#8AF2B3" offset="100%" />
								</linearGradient>
							</defs>
						</svg>
					</Col>
				</Row>
			</Container>

		);
	}
}

export default withTracker((props) => {
	return {
	};
})(PopularPage);
