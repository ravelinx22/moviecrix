import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import MovieCard from "./MovieCard.jsx";
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';


class MoviesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1
		}
	}

	componentDidMount() {
		if (this.props.type == "top-rated")
			Meteor.call("movies.getTopRated", this.state.page, (error, res) => {
				this.setState({
					movies: res
				});
			});
		else if (this.props.type == "popular")
			Meteor.call("movies.getPopular", this.state.page, (error, res) => {
				this.setState({
					movies: res
				});
			});
		else if (this.props.type == "in-theaters")
			Meteor.call("movies.nowPlaying", this.state.page, (error, res) => {
				this.setState({
					movies: res
				});
			});
		else if (this.props.type == "coming-soon")
			Meteor.call("movies.getUpcoming", this.state.page, (error, res) => {
				this.setState({
					movies: res
				});
			});
		else if (this.props.type == "favorites")
			Meteor.call("favoriteMovies.getFavorites", this.state.page, (error, res) => {
				this.setState({
					movies: res
				});
			});

		Meteor.call("movies.getGenres", this.state.page, (error, res) => {
			this.setState({
				genres: res
			});
		});
	}

	fetchMoreData() {
		this.setState({
			page: this.state.page + 1
		})
		if (this.props.type == "top-rated")
			Meteor.call("movies.getTopRated", this.state.page, (error, res) => {
				this.setState({
					movies: this.state.movies.concat(res)
				});
			});
		else if (this.props.type == "popular")
			Meteor.call("movies.getPopular", this.state.page, (error, res) => {
				this.setState({
					movies: this.state.movies.concat(res)
				});
			});
		else if (this.props.type == "in-theaters")
			Meteor.call("movies.nowPlaying", this.state.page, (error, res) => {
				this.setState({
					movies: this.state.movies.concat(res)
				});
			});
		else if (this.props.type == "coming-soon")
			Meteor.call("movies.getUpcoming", this.state.page, (error, res) => {
				this.setState({
					movies: this.state.movies.concat(res)
				});
			});

	}

	renderMovies() {
		if (!this.state.movies || !this.state.genres) return

		return this.state.movies.map((m) => {
			var genres = this.state.genres.filter(function (genreObj) {
				return (m.genre_ids ? m.genre_ids : m.genres).includes(genreObj.id);
			});
			return <MovieCard key={m.id} title={m.title} vote_average={m.vote_average} poster_path={m.poster_path} genres={genres} id={m.id} />
		});
	}

	render() {
		return (
			<Row>
				<InfiniteScroll
					dataLength={this.state.movies ? this.state.movies.length : 0}
					next={this.fetchMoreData.bind(this)}
					hasMore={true}
					loader={<h4 className = "loading">Loading...</h4>}
				>
					{this.renderMovies()}
				</InfiniteScroll>
			</Row>
		);
	}
}

export default withTracker((props) => {
	return props;
})(MoviesList);
