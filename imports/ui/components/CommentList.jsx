import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import CommentDetail from "./CommentDetail.jsx";

class CommentList extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}	
	}

	componentDidMount() {
	}

	render() {
		return(
			<Container className="comment-content">
				<h1>Leave a comment</h1>
				<textarea type="text" className="comment_input"/>
				<button className="ml-auto comment_submit">Submit</button>
				<h1>Previous comments</h1>
				<CommentDetail/>
				<CommentDetail/>
				<CommentDetail/>
				<CommentDetail/>
			</Container>
		);			
	}
}

export default withTracker((props) => {
	return {
	};
})(CommentList);
