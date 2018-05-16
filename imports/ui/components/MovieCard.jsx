import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";

class MovieCard extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}	
	}

	componentDidMount() {
	}

	render() {
		return(
			<Link to={"/detail/"+this.props.id} className="col-md-3">
				<div className="movie_card">
					<img src={"http://image.tmdb.org/t/p/w500"+ this.props.poster_path} alt="movie"/>
					<Container className="card_desc">
						<Row className="card_title">
							{this.props.title}
						</Row>
						<Row className="card_genre">
							{this.props.genres.map((genre)=>{
								return genre.name + " ";
							})}
						</Row>
						<Row className="card_rating">
							<i className="fa fa-heart"/> {this.props.vote_average}
						</Row>
					</Container>
				</div>
			</Link>
		);			
	}
}

export default withTracker((props) => {
	return {
	};	
})(MovieCard);
