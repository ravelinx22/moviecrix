import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import MoviesList from "../components/MoviesList.jsx";

class MoviesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}	
	}

	componentDidMount() {
	}

	render() {
		return(
			<Container className="theaters_title">
				<h1>In theaters</h1>
				<MoviesList type="in-theaters" />
			</Container>
		);			
	}
}

export default withTracker((props) => {
	return {
	};
})(MoviesPage);
