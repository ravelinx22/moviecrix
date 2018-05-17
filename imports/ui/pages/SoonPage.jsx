import React, {	 Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import TweetList from "../components/TweetList.jsx";
import MoviesList from "../components/MoviesList.jsx";
import { timelines } from "d3-timelines";
import * as d3 from "d3";

class SoonPage extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {	
		Meteor.call("movies.getUpcoming", 1, (error, res) => {
			var dat = this.formatData(res.slice(0,10));
			this.renderTimeLine(dat);
		});
	}

	renderTimeLine(data) {
		const that = this;
		var chart = timelines()
			.beginning(this.getMinDate(data)) 
			.ending(this.getMaxDate(data))
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
				const id = d.movie_id;
				that.setState({
					selected_movie: d.title + " - " + d.starting_time
				})
			})
			.click(function (d, i, datum) {
				const id = d.movie_id;
				that.props.history.push("/detail/" + id+"/"+d.title);
			})

		var svg = d3.select("#timeline1")
			.append("svg")
			.attr("width", "100%")
			.attr("height", (30*data.length)+"px")
			.datum(data)
			.call(chart);
	}

	formatData(data) {
		return data.map((d) => {
			console.log(d);
			return {
				class: d.title,
				icon: "http://image.tmdb.org/t/p/w500" + d.poster_path,
				times: [
					{
						starting_time: new Date(d.release_date),
						display: "circle",
						movie_id: d.id,
						title: d.title
					}
				]
			}
		});
	}

	getMinDate(data) {
		var min = new Date();
		for(var i = 0; i < data.length; i++) {
			if(min > data[i].times[0].starting_time) {
				min = data[i].times[0].starting_time;
			}
		}
		return min;
	}

	getMaxDate(data) {
		var max = new Date();
		for(var i = 0; i < data.length; i++) {
			if(max < data[i].times[0].starting_time) {
				max = data[i].times[0].starting_time;
			}
		}
		return max;
	}


	render() {
		const style = {
			textAlign: "center"
		}

		return (
			<Container>
				<h1>Coming Soon</h1>
				<Row className="timeline_row">
					<Col md="12">
						<div id="timeline1"></div>
						<h3 ref="movie_title" style={style}>{this.state.selected_movie ? this.state.selected_movie : "Select a movie from the chart"}</h3>
					</Col>
				</Row>
				<Row>
					<MoviesList type="coming-soon" />
				</Row>
			</Container>
		);
	}
}

export default withTracker((props) => {
	return {
	};
})(SoonPage);
