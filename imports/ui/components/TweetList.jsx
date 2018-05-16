import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import TweetDetail from "../components/TweetDetail.jsx";

class TweetList extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}	
	}

	componentDidMount() {
	}

	render() {
		return(
			<div>
				<Row className="latest_tweets justify-content-center">
					Latest Tweets
				</Row>
				<TweetDetail/>
				<TweetDetail/>
				<TweetDetail/>
				<TweetDetail/>
			</div>
		);			
	}
}

export default withTracker((props) => {
	return {
	};
})(TweetList);
