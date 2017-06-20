import React from 'react';
import { categories } from '../../app_stuff';
import { Field, reduxForm } from 'redux-form';
import { addVideoToDatabase } from '../../actions';
import { authCheck } from '../../app_stuff';
import { fetchVideos } from '../../actions';
import { connect } from 'react-redux';

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

	onClick() {
		this.props.fetchVideos();
	}

	onSubmit(values) {
		authCheck().then(data => {
			if (data === 'logged in') {
				console.log('data === logged in')
				addVideoToDatabase(this.props.id, values.category)
			}
		}).catch(data => {
			alert('You must be logged in to add videos');
		});
		// console.log('values.category',values.category);

	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
					{this.renderCategories()}
					<button type="submit">Add Video</button>
				</form>
				<button onClick={this.onClick.bind(this)}>Fetch Videos button</button>
			</div>
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
})(
connect(null, {fetchVideos })(AddToCategory)
);
