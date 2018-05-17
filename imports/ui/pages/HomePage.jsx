import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import * as d3 from "d3";
import MoviesList from "../components/MoviesList.jsx";
import { Link } from "react-router-dom";


export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			genres: []
		}
	}

	componentDidMount() {
		Meteor.call("movies.randomNowPlaying", (error, res) => {
			var movieGenres;
			console.log(res);
			console.log("https://image.tmdb.org/t/p/original/" + res.backdrop_path);
			this.setState({
				homeImg: "https://image.tmdb.org/t/p/original/" + res.backdrop_path,
				movieTitle: res.title,
				release_date: res.release_date,
				movieId: res.id
			});
			movieGenres = res.genre_ids;

			Meteor.call("movies.getGenres", (error, res2) => {
				var genres = res2.filter(function (genreObj) {
					return movieGenres.includes(genreObj.id);
				});

				this.setState({
					genres: genres
				});
			});
		});

	}

	render() {
		const style = {
			backgroundImage: "url(" + this.state.homeImg + ")"
		};

		return (
			<div>
				<div className="home-content" style={style}>
					<Container className="banner-img">
						<div className="movie_title">{this.state.movieTitle}</div>
						<div className="movie_genre">
							{this.state.genres.map((genre) => {
								return genre.name + " ";
							})}
						</div>
						<Link to={"/detail/" + this.state.movieId+"/"+this.state.movieTitle}>
							<button className="see_btn">See Movie</button>
						</Link> 
						<div className="sub_title">Release Date</div>
						<div className="movie_date">{this.state.release_date}</div>
					</Container>
				</div>
				<Container>
					<MoviesList type="top-rated" />
				</Container>
			</div>
		);
	}
}
