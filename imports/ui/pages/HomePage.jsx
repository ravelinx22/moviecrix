import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import * as d3 from "d3";
import MoviesList from "../components/MoviesList.jsx";

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
	}

	render() {
		const url = "https://www.space.ca/wp-content/uploads/2016/06/The-Martian.jpg";	
		const style = {
			backgroundImage: "url(" + url + ")"
		};

		return(
			<div>
			<div className="home-content" style={style}>
				<Container className="banner-img">
					<div className="movie_title">The Martian</div>
					<div className="movie_genre">Drama</div>
					<button className="see_btn">See Movie</button>
					<div className="sub_title">Relase Date</div>
					<div className="movie_date">1997-04-19</div>
				</Container>		
			</div>
			<Container>
				<MoviesList type="top-rated"/>
			</Container>
		</div>
		);
	}
}
