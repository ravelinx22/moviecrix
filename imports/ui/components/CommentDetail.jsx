import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

class CommentDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}	
	}

	componentDidMount() {
	}

	render() {
		return(
			<Container className="comment-detail">
				<Row>
					<img src="https://image.tmdb.org/t/p/w500/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg" alt="profile pic" className="img-circle comment-img" width="40" height="40"/>
					<h3 className="comment_title">Algo</h3>
				</Row>
				<Row>
					<div className="comment-desc">
						asfkljasflkjasflkjalkfjalkj
					</div>
				</Row>
			</Container>
		);			
	}
}

export default withTracker((props) => {
	return {
	};
})(CommentDetail);
