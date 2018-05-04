import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
	}

	render() {
		return(
			<h1 className="home">
				Hello World
			</h1>
		);
	}
}
