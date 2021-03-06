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
					<img src={this.props.poster_path? "https://image.tmdb.org/t/p/w500/"+this.props.poster_path: "http://www.pngmart.com/files/5/Snow-PNG-Transparent-Image.png"} alt="profile pic" className="img-circle comment-img" width="40" height="40"/>
					<h3 className="comment_title">{this.props.owner}</h3>
				</Row>
				<Row>
					<div className="comment-desc">
						{this.props.comment}
					</div>
				</Row>
			</Container>
		);			
	}
}

export default withTracker((props) => {
	return props;
})(CommentDetail);
