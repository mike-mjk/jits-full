import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signinOrSignupUser } from '../actions';
import { withRouter } from 'react-router';

class Signin extends React.Component {
	
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
		this.props.signinOrSignupUser(values, history, 'signin');
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
					label="Password"
					type="password"
					name="password"
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
	console.log('values in validate in sign in', values);

	if (!values.username) {
		errors.username = "Enter a username";
	}
	if (!values.password) {
		errors.password = "Enter a password";
	}

	return errors;
}

const SigninWithRouter = withRouter(Signin);

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default reduxForm ({
	validate,
	form: 'signin'
})(
connect(mapStateToProps, { signinOrSignupUser })(SigninWithRouter)
);