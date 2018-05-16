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

	getDate() {
		var d = new Date(this.props.tweet.created_at).toISOString().slice(0, 10);
		return d;
	}

	render() {
		return(
			<Row className="tweet_detail">
				<Col md="12" className="tweet_name">@{this.props.tweet.user.screen_name} <span className="tweet_date">{this.getDate()}</span></Col>
				<Col md="12" className="tweet_body">{this.props.tweet.text}</Col>
			</Row>
		);			
	}
}

export default withTracker((props) => {
	return {
	};
})(TweetDetail);
