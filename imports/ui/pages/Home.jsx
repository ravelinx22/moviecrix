import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";

import { getUpc, getImg } from "../../data.js";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		console.log(getUpc());
		console.log(getImg(getUpc()[0]));
	}

	render() {
		return(
			<h1 className="home">
				Hello World
			</h1>
		);
	}
}
