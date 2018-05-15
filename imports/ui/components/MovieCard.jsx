import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

class MovieCard extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}	
	}

	componentDidMount() {
	}

	render() {
		return(
			<Col md="3" className="movie_card">
				<img src="https://image.tmdb.org/t/p/w500/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg" alt="movie"/>
				<Container className="card_desc">
					<Row className="card_title">
						TITLE
					</Row>
					<Row className="card_genre">
						Genre
					</Row>
					<Row className="card_rating">
						8.9
					</Row>
				</Container>
			</Col>
		);			
	}
}

export default withTracker((props) => {
	return {
	};
})(MovieCard);
