import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import TweetDetail from "../components/TweetDetail.jsx";
import { Tweets } from "../../api/Tweets.js";

class TweetList extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
	}

	componentDidUpdate() {
		if (this.props.start) {
			console.log("Started stream");
			Meteor.call("twitter.stream", this.props.query);
		}
	}

	componentWillUnmount() {
		Meteor.call("twitter.stop");
		console.log("Stopped stream");
	}

	renderTweets() {
		return this.props.tweets.map((t) => {
			console.log(t);
			return <TweetDetail tweet={t} key={t._id} />
		});
	}

	render() {
		return (
			<div>
				<Row className="latest_tweets justify-content-center">
					Latest Tweets
				</Row>
				<div className="tweet-scroller">
					{this.renderTweets()}
				</div>
			</div>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe("tweets");
	return {
		tweets: Tweets.find({ query: props.query }).fetch(),
	};
})(TweetList);
