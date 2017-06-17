import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signinOrSignupUser } from '../actions';
import { withRouter } from 'react-router';


class Signup extends React.Component {

	renderField(field) {
		const { meta: {touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-error' : ''}`;
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input
					className="form-control"
					type={field.type}
					{...field.input}
				/>
				<div className="text-danger">
					{field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		const history = this.props.history;
		console.log('values', values);
		this.props.signinOrSignupUser(values, history, 'signup');
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					{this.props.errorMessage}
				</div>
			);
		}
	}
	
	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label="Username"
					type="text"
					name="username"
					component={this.renderField}
				/>
				<Field
					label="Display Name (This will be the name displayed to other users on all videos you submit)"
					type="text"
					name="displayName"
					component={this.renderField}
				/>
				<Field
					label="Password"
					type="password"
					name="password"
					component={this.renderField}
				/>
				<Field
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					component={this.renderField}
				/>
				{this.renderAlert()}
				<button type="submit">Submit</button>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};
	if (values.username) {
		// console.log('values.username', values.username);
		if (values.username.length < 4) {
			errors.username = "Username must be at least 4 characters";
		}	
	}
	if (!values.displayName) {
		errors.displayName = "Please enter a Display Name"
	}
	//putting password length min as 3 for dev purposes. will increase later
	if (values.password) {
		if (values.password.length < 3) {
			errors.password = "Password must be at least 3 characters";
		}
	}

	if (values.password !== values.confirmPassword) {
		errors.confirmPassword = "Passwords must match";
	}

	return errors;
}

const SignupWithRouter = withRouter(Signup);

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default reduxForm ({
	validate,
	form: 'signup'
})(
connect(mapStateToProps, { signinOrSignupUser })(SignupWithRouter)
);