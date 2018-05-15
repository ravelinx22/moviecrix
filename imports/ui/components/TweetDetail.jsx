import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

class TweetDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}	
	}

	componentDidMount() {
	}

	render() {
		return(
			<Row className="tweet_detail">
				<Col md="12" className="tweet_name">@Nombre <span className="tweet_date">Apr 25</span></Col>
				<Col md="12" className="tweet_body">Tasflkjasf asf as fsaf asf asf </Col>
			</Row>
		);			
	}
}

export default withTracker((props) => {
	return {
	};
})(TweetDetail);
