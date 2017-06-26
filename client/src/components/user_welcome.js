import React from 'react';
import { getDisplayName } from '../app_stuff';

class UserWelcome extends React.Component {
	constructor(props) {
		super(props);

		this.state = { displayName: '' }
	}
	componentWillMount() {

		getDisplayName().then((data) => {
				this.setState({ displayName: data })
			})
	}

	render() {
		return <li className="navbar-text">Welcome, {this.state.displayName}!</li>
	}
}

export default UserWelcome;