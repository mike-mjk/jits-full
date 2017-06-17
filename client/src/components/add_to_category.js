import React from 'react';
import { categories } from '../app_stuff';
import { Field, reduxForm } from 'redux-form';
import { addVideoToDatabase } from '../actions';

class AddToCategory extends React.Component {
	renderField(field) {
		return (
			<input type={field.type}{...field.input}  name={field.input.name} value={field.input.value}/>
		)
	}

	renderCategories() {
		return categories.map( (category) => {
			return (
				<label key={category}>
					<Field 
						name="category" 
						component={this.renderField} 
						type="radio" 
						value={category}
					/>
					{category}
				</label>
			)
		})
	}

	onSubmit(values) {
		addVideoToDatabase(this.props.id, values.category)
		// console.log('values.category',values.category);

	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
				{this.renderCategories()}
				<button type="submit">Add Video</button>
			</form>
		)
	}
}

function validate(values) {
	const errors = {};
	return errors;
}

// export default AddToCategory;

export default reduxForm ({
	validate,
	form: 'addToCategory'
})(AddToCategory);