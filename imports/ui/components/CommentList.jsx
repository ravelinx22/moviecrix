import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import CommentDetail from "./CommentDetail.jsx";
import AskLogin from "./AskLogin.jsx";
import {Reviews} from "../../api/Reviews"; 

class CommentList extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}	
	}

	componentDidMount() {
	}

	reviewMovie(){
		Meteor.call('reviews.reviewMovie', this.props.movieId, document.getElementById("comment").value)
	}

	renderComments(){
		return this.props.comments.map((c) => {
			return	<CommentDetail key={Math.random()} comment={c.comment} owner={c.owner}/>
		})
	}

	handleKeyPress = (event) => {
        if(event.key == 'Enter'){
            this.reviewMovie()
            document.getElementById("comment").value = "";
        }
      }

	render() {
		return(
			<Container className="comment-content">
				<h1>Leave a comment</h1>
				{ this.props.userId ?
				    <span>
					<textarea id="comment" type="text" className="comment_input" onKeyPress={this.handleKeyPress.bind(this)}/>
					<button className="ml-auto comment_submit" onClick={this.reviewMovie.bind(this)}>Submit</button>
				</span>:
					<AskLogin/>
				}
				<h1>Previous comments</h1>
				{this.renderComments()}
			</Container>
		);			
	}
}

export default withTracker((props) => {
	Meteor.subscribe("reviews");
	return {
		comments: Reviews.find({movieId: props.movieId}).fetch()
	};
})(CommentList);
