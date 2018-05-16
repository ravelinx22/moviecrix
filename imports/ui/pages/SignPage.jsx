import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import "../css/EnterForm.css";

class SignPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signUpMode: false,
		}
	}

	componentDidMount() {
	}

	changeLog(e) {
		e.preventDefault();
		this.setState({
			signUpMode: !this.state.signUpMode,
		});
	}

	signUpWithPassword(e) {
		e.preventDefault();
		Accounts.createUser({
			username: this.refs.sign_username.value,
			name: this.refs.sign_username.value,
			email: this.refs.sign_email.value,
			password: this.refs.sign_password.value,
		}, (error) => {
			if(error) throw error;
			this.props.history.push("/");
		});
	}

	enterWithPassword(e) {
		e.preventDefault();
		Meteor.loginWithPassword(this.refs.log_username.value, this.refs.log_password.value , (error) => {
			if(error) throw error;
			this.props.history.push("/");
		});

	} 

	renderForm() {
		if(this.state.signUpMode) {
			return(			
				<form>
					<div className="change_log">
						<button className="change_log_login" onClick={this.changeLog.bind(this)}>
							Log In							
						</button>
						<button className="change_log_sign change_active" onClick={this.changeLog.bind(this)}>
							Sign Up
						</button>
					</div>
					<input type="text" placeholder="Username" ref="sign_username" className="enter_input" aria-label="Username input field"/>
					<input type="email" placeholder="Email" ref="sign_email" className="enter_input" aria-label="Email input field"/>
					<input type="password" placeholder="Password" ref="sign_password" className="enter_input" aria-label="Password input field"/>
					<button className="enter_submit" onClick={this.signUpWithPassword.bind(this)}>Sign Up</button>
					<div className="privacy_terms_title">By clicking I Accept, you confirm that we can monitor user activity for analytic purposes.</div>
				</form>
			);
		} else {
			return(
				<form>
					<div className="change_log">
						<button className="change_log_login change_active" onClick={this.changeLog.bind(this)}>
							Log In							
						</button>
						<button className="change_log_sign" onClick={this.changeLog.bind(this)}>
							Sign Up
						</button>
					</div>
					<input type="text" placeholder="Username" ref="log_username" className="enter_input" aria-label="Username input field"/>
					<input type="password" placeholder="Password" ref="log_password" className="enter_input" aria-label="Password input field"/>
					<button className="enter_submit" onClick={this.enterWithPassword.bind(this)}>Log In</button>
					<div className="privacy_terms_title">By clicking I Accept, you confirm that we can monitor user activity for analytic purposes.</div>
				</form>
			);
		}
	}

	render() {
		return(
			<Row className="enter_form justify-content-center">
				<div className="enter_form_title">CoderHunt</div>
				{this.renderForm()}
			</Row>
		);
	}
}

export default withTracker((props) => {
	return {
	};
})(SignPage);
