import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import CommentList from "../components/CommentList.jsx";
import TweetList from "../components/TweetList.jsx";
import { FavoriteMovies } from "../../api/FavoriteMovies";
import * as d3 from "d3";
import { Tweets } from "../../api/Tweets.js";

const actualDate = new Date();


function calculateData(tweets) {
	var datesData = {};
	for (let index = 0; index < tweets.length; index++) {
		var month = (new Date(tweets[index].created_at)).getMonth(); //months from 1-12
		var day = (new Date(tweets[index].created_at)).getDate();
		var year = (new Date(tweets[index].created_at)).getFullYear();
		var hour = (new Date(tweets[index].created_at)).getHours();
		var minutes = (new Date(tweets[index].created_at)).getMinutes();
		var weekDay = (new Date()).getDay();

		var newDate = new Date(year, month, 0, hour, minutes, 0, 0);

		if (!datesData[newDate])
			datesData[newDate] = 0;
		console.log(actualDate.getHours());
		console.log(actualDate .getHours()+ "-" + (hour));
		console.log(actualDate.getHours() === (hour))
		console.log(actualDate.getMinutes() <= newDate.getMinutes())

		if (actualDate.getHours() == hour)
			if (actualDate.getMinutes() <= newDate.getMinutes())
				datesData[newDate] = ++datesData[newDate];
	}

	var finalData = [];

	for (var property in datesData) {
		if (datesData.hasOwnProperty(property)) {
			finalData = finalData.concat({ date: new Date(property + ""), close: datesData[property] })
		}
	}
	finalData.sort(function (a, b) {
		// Turn your strings into dates, and then subtract them
		// to get a value that is either negative, positive, or zero.
		return b.date - a.date;
	});

	return finalData;
}


// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 50 },
	width = 400 - margin.left - margin.right,
	height = 250 - margin.top - margin.bottom;
var svg
var parseTime
var x
var y
var valueline

class MoviePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			// data: [
			// 	{
			// 		date: "1-May-12", close: "58.13"
			// 	},
			// 	{
			// 		date: "30-Apr-12", close: "53.98"
			// 	},
			// 	{
			// 		date: "27-Apr-12", close: "67.00"
			// 	},
			// 	{
			// 		date: "25-Apr-12", close: "99.00"
			// 	},
			// 	{
			// 		date: "24-Apr-12", close: "130.28"
			// 	}]
		}
		//this.calculateData.bind(this);

		console.log(this.props.id);
		Meteor.call('movies.getSpecificMovie', this.props.id, (error, res) => {
			this.setState({
				poster_path: res.poster_path,
				title: res.original_title,
				language: res.original_language,
				rating: res.vote_average,
				release_date: res.release_date + "",
				description: res.overview,
				genres: res.genres.map((g) => {
					return g.name + " "
				}),
				loaded: true,
			});
		});
	}

	componentDidMount() {
		// parse the date / time
		parseTime = d3.timeParse("%d-%b-%y");

		// set the ranges
		x = d3.scaleTime().range([0, width]);
		y = d3.scaleLinear().range([height, 0]);

		// define the line
		valueline = d3.line()
			.x(function (d) { return x(d.date); })
			.y(function (d) { return y(d.close); });

		// append the svg obgect to the body of the page
		// appends a 'group' element to 'svg'
		// moves the 'group' element to the top left margin
		svg = d3.select("#line-graph").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");

		svg.append("g")
			.attr("class", "x-axis")

		svg.append("g")
			.attr("class", "y-axis")

	}

	// calculateData() {
	// 	var tweets = Tweets.find({ query: this.state.title }, { created_at: 1, _id: 0 }).fetch();
	// 	var datesData = {};
	// 	for (let index = 0; index < tweets.length; index++) {
	// 		var month = (new Date(tweets[index].created_at)).getUTCMonth() + 1; //months from 1-12
	// 		var day = (new Date(tweets[index].created_at)).getUTCDate();
	// 		var year = (new Date(tweets[index].created_at)).getUTCFullYear();

	// 		var newDate = year + "/" + month + "/" + day;
	// 		if (!datesData[newDate])
	// 			datesData[newDate] = 0;
	// 		datesData[newDate] = ++datesData[newDate];
	// 	}

	// 	var finalData = [];

	// 	for (var property in datesData) {
	// 		if (datesData.hasOwnProperty(property)) {
	// 			finalData = finalData.concat({ date: new Date(property + ""), close: datesData[property] })
	// 		}
	// 	}
	// 	finalData.sort(function (a, b) {
	// 		// Turn your strings into dates, and then subtract them
	// 		// to get a value that is either negative, positive, or zero.
	// 		return b.date - a.date;
	// 	});

	// 	this.setState({
	// 		data: finalData,
	// 	})
	// 	console.log(this.state.data);
	//}

	componentWillUpdate(props) {
		console.log(this.props.data);
		console.log("Updatiando");
		if (!this.props.data) return
		this.props.data.forEach(function (d) {
			d.date = d.date;
			d.close = +d.close;
		});

		// Scale the range of the data
		x.domain(d3.extent(this.props.data, function (d) { return d.date; }));
		y.domain([0, d3.max(this.props.data, function (d) { return d.close; })]);

		// Add the valueline path.
		var binder = svg.selectAll(".line")
			.data([this.props.data]);

		binder.exit()
			.remove();

		binder.enter()
			.append("path")
			.merge(binder)
			.attr("class", "line")
			.attr("d", valueline);

		// Add the X Axis
		svg.select(".x-axis")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

		// Add the Y Axis
		svg.select(".y-axis")
			.call(d3.axisLeft(y));
	}

	renderGenres() {
		if (!this.state.genres) return
		this.state.genres.map((genre) => {
			return genre.name + " ";
		})
	}

	addToFavorites() {
		Meteor.call('favoriteMovies.addFavorite', this.props.id);
	}

	deleteFromFavorites() {
		Meteor.call("favoriteMovies.deleteFromFavorites", this.props.id);
	}

	render() {
		return (
			<Container className="movie-content">
				<Row>
					<Col md="8">
						<Col md="5">
							<img className="movie_img" src={this.state.poster_path ? "https://image.tmdb.org/t/p/w500" + this.state.poster_path : "http://www.pngmart.com/files/5/Snow-PNG-Transparent-Image.png"} alt="movie" />
						</Col>
						<Col md="7">
							<Row className="movie_name">{this.state.title}</Row>
							<Row className="sub_title_movie">Genre</Row>
							{this.state.genres}
							<Row className="sub_title_movie">Language</Row>
							{this.state.language}
							<Row className="sub_title_movie">Rating</Row>
							{this.state.rating}
							<Row className="sub_title_movie">Release Date</Row>
							{this.state.release_date}
							<Row className="sub_title_movie">Descripton</Row>
							{this.state.description}
							{
								this.props.userId ? <Row className="sub_title_movie">
									<button onClick={this.props.favorite ? this.deleteFromFavorites.bind(this) : this.addToFavorites.bind(this)}>
										{this.props.favorite ? "Remove from favorites" : "Add to favorites"}
									</button>
								</Row> : <div></div>
							}
						</Col>
					</Col>
					<Col md="4">
						<TweetList query={this.state.title} start={this.state.loaded} />
					</Col>
				</Row>
				<Row>
					<Col md="8">
						<CommentList userId={this.props.userId} movieId={this.props.id} poster_path={this.state.poster_path} />
					</Col>
					<Col md={4}>
						<div id="line-graph"></div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe('favoriteMovies');
	Meteor.subscribe('tweets');

	var tweets = Tweets.find({ query: props.match.params.name }, { created_at: 1, _id: 0 }).fetch();
	var data = calculateData(tweets);
	console.log(props.match.params.name);
	console.log(data);

	return {
		id: props.match.params.id,
		userId: Meteor.userId(),
		favorite: FavoriteMovies.findOne({ movieId: props.match.params.id, userId: Meteor.userId() }) ? true : false,
		data: data
	};
})(MoviePage);
