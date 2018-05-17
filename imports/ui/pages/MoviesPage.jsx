import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import MoviesList from "../components/MoviesList.jsx";
import { timelines } from "d3-timelines";
import * as d3 from "d3";

class MoviesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}	
	}

	componentDidMount() {
		var serverData = [
			{
				vote_count: 3504,
				id: 299536,
				video: false,
				vote_average: 8.5,
				title: "Avengers: Infinity War",
				popularity: 703.53968,
				poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
				original_language: "en",
				original_title: "Avengers: Infinity War",
				genre_ids: [
					12,
					878,
					14,
					28

				],
				backdrop_path: "/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
				adult: false,
				overview: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
				release_date: "2018-07-25"
			},
			{
				vote_count: 552,
				id: 427641,
				video: false,
				vote_average: 5.9,
				title: "Rampage",
				popularity: 169.383611,
				poster_path: "/30oXQKwibh0uANGMs0Sytw3uN22.jpg",
				original_language: "en",
				original_title: "Rampage",
				genre_ids: [
					28,
					12,
					878

				],
				backdrop_path: "/wrqUiMXttHE4UBFMhLHlN601MZh.jpg",
				adult: false,
				overview: "Primatologist Davis Okoye shares an unshakable bond with George, the extraordinarily intelligent, silverback gorilla who has been in his care since birth. But a rogue genetic experiment gone awry mutates this gentle ape into a raging creature of enormous size. To make matters worse, it’s soon discovered there are other similarly altered animals. As these newly created alpha predators tear across North America, destroying everything in their path, Okoye teams with a discredited genetic engineer to secure an antidote, fighting his way through an ever-changing battlefield, not only to halt a global catastrophe but to save the fearsome creature that was once his friend.",
				release_date: "2018-06-12"
			}
		]
		var dat = this.formatData(serverData);
		this.renderTimeLine(dat);
	}

	renderTimeLine(data) {
		var chart = timelines()
			.beginning(new Date()) 
			.ending(new Date(new Date().setFullYear(new Date().getFullYear() + 1)))
			.showTimeAxisTick() 
			.stack() 
			.margin({left:70, right:30, top:0, bottom:0})
			.tickFormat({
				format: d3.timeFormat("%b %d %Y"),
				tickTime: d3.timeMonth,
				tickInterval: 1,
				tickSize: 6,
				tickValues: null
			}).hover(function (d, i, datum) {
				const title = d.title;
			})
			.click(function (d, i, datum) {
				const title = d.title;
				alert(title);
			})

		var svg = d3.select("#timeline1")
			.append("svg")
			.attr("width", "100%")
			.datum(data)
			.call(chart);
	}

	formatData(data) {
		return data.map((d) => {
			return {
				class: d.title,
				icon: "http://image.tmdb.org/t/p/w500" + d.poster_path,
				times: [
					{
						starting_time: new Date(d.release_date),
						display: "circle",
						title: d.title
					}
				]
			}
		});
	}

	render() {
		return(
			<Container className="theaters_title">
			<h1>In theaters</h1>
			<div id="timeline1"></div>
			<MoviesList type="in-theaters" />
			</Container>
		);			
	}
}

export default withTracker((props) => {
	return {
	};
})(MoviesPage);
