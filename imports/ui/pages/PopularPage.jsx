import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";import { withRouter } from "react-router-dom";
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
		var myChart = barChart()
		myChart.chartTitle("Popularity")
				.chartType("popularity");

		var rankedAlbums = [
			{
				popularity: 25.526805,
				vote_average: 8.3,
				poster_path:  "adw6Lq9FiC9zjYEpOqfq03ituwp",
				title: "Fight Club"
			},
			{
				popularity: 25.526805,
				vote_average: 8.3,
				poster_path:  "adw6Lq9FiC9zjYEpOqfq03ituwp",
				title: "Fight Club"
			},
			{
				popularity: 25.526805,
				vote_average: 8.3,
				poster_path:  "adw6Lq9FiC9zjYEpOqfq03ituwp",
				title: "Fight Club"
			}
		];
		d3.select('#chart')
			.datum(rankedAlbums)
			.call(myChart);
	}

	render() {
		return (
			<Container>
				<Row className="graph_container bar_chart">
					<svg id="chart" className="movieChart">
						<defs>
							<linearGradient id="coolGradient" x1="0" x2="100%" y1="0" y2="0" gradientUnits="userSpaceOnUse">
								<stop stopColor="#3DAFD5" offset="0%"/>
								<stop stopColor="#8AF2B3" offset="100%"/>
							</linearGradient>
						</defs>
					</svg>
				</Row>
				<Row>
					<MoviesList type="popular" />
				</Row>

			</Container>

		);
	}
}

export default withTracker((props) => {
	return {
	};
})(PopularPage);
