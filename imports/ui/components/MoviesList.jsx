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
	}

	render() {
		return(
			<Row>
				<MovieCard/>
				<MovieCard/>
				<MovieCard/>
				<MovieCard/>
				<MovieCard/>
				<MovieCard/>
				<MovieCard/>
				<MovieCard/>
			</Row>
		);			
	}
}

export default withTracker((props) => {
	return {
	};
})(MoviesList);
