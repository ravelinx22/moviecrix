import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import MovieCard from "./MovieCard.jsx";
import { Link } from "react-router-dom";

class MoviesList extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		if (this.props.type == "top-rated")
			Meteor.call("movies.getTopRated", (error, res) => {
				this.setState({
					movies: res
				});
			});
		else if (this.props.type == "popular")
			Meteor.call("movies.getPopular", (error, res) => {
				this.setState({
					movies: res
				});
			});
		else if (this.props.type == "in-theaters")
			Meteor.call("movies.nowPlaying", (error, res) => {
				this.setState({
					movies: res
				});
			});
		else if (this.props.type == "coming-soon")
			Meteor.call("movies.getUpcoming", (error, res) => {
				this.setState({
					movies: res
				});
			});

		Meteor.call("movies.getGenres", (error, res) => {
			this.setState({
				genres: res
			});
		});
	}

	renderMovies() {
		if (!this.state.movies || !this.state.genres) return

		return this.state.movies.map((m) => {
			var genres = this.state.genres.filter(function (genreObj) {
				return m.genre_ids.includes(genreObj.id);
			});
			return <MovieCard key={m.id} title={m.title} vote_average={m.vote_average} poster_path={m.poster_path} genres={genres} id={m.id} />
		});
	}

	render() {
		return (
			<Row>
				{this.renderMovies()}
			</Row>
		);
	}
}

export default withTracker((props) => {
	return props;
})(MoviesList);
