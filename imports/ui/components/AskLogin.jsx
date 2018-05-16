import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter, Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

class AskLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}	
	}

	componentDidMount() {
	}

	render() {
		return(
			<Container className="ask_login">
				<Row className="justify-content-center">Please log in before</Row>
				<Link to="/sign">Log In</Link>
			</Container>
		);			
	}
}

export default withTracker((props) => {
	return {
	};
})(AskLogin);
