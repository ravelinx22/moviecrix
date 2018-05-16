import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import TweetList from "../components/TweetList.jsx";
import MoviesList from "../components/MoviesList.jsx";


class PopularPage extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
	}

	render() {
		return (
			<Container>
				<Row>
					<Col md="8">
						<MoviesList type="popular" />
					</Col>
					<Col md="4">
					</Col>
				</Row>

			</Container>

		);
	}
}

export default withTracker((props) => {
	return {
	};
})(PopularPage);
