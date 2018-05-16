import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import CommentList from "../components/CommentList.jsx";
import TweetList from "../components/TweetList.jsx";

class MoviePage extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}	
	}

	componentDidMount() {
	}

	render() {
		return(
			<Container className="movie-content">
				<Row>
					<Col md="8">
						<Col md="5">
							<img  className="movie_img" src="https://image.tmdb.org/t/p/w500/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg" alt="movie"/>
						</Col>
						<Col md="7">
							<Row className="movie_name">Title</Row>
							<Row className="sub_title_movie">Genre</Row>
							Comedia
							<Row className="sub_title_movie">Language</Row>
							EN
							<Row className="sub_title_movie">Rating</Row>
							8.8
							<Row className="sub_title_movie">Release Date</Row>
							1997-208-202
							<Row className="sub_title_movie">Descripton</Row>
							asflksafas f asf asf asf asf asf 
						</Col>
					</Col>
					<Col md="4">
						<TweetList/>
					</Col>
				</Row>
				<Row>
					<Col md="8">
						<CommentList/>		
					</Col>
				</Row>
			</Container>
		);			
	}
}

export default withTracker((props) => {
	return {
	};
})(MoviePage);
