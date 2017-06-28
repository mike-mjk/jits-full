import React from 'react';
import { getDisplayName } from '../app_stuff';
import { Link } from 'react-router-dom';

class UserWelcome extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			displayName: '',
			username: ''
		}
	}
	componentWillMount() {

		getDisplayName()
		.then(data => {
			this.setState({
				displayName: data.displayName,
				username: data.username
			})
		})
	}

	render() {
		return <li className="navbar-text">Welcome, <Link to={`/profile/${this.state.username}`}>{this.state.displayName}!</Link> </li>
	}
}

export default UserWelcome;