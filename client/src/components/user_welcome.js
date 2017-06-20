import React from 'react';
import { getDisplayName } from '../app_stuff';

class UserWelcome extends React.Component {
	constructor(props) {
		super(props);

		this.state = { displayName: '' }
	}
	componentWillMount() {
		// console.log('this.getDisplayName()', this.getDisplayName);

		getDisplayName().then((data) => {
				this.setState({ displayName: data })
			})
		// this.getDisplayName();
	}
	
	// getDisplayName() {
	// 	const config = {
	// 		headers: { 'authorization': localStorage.getItem('token') }
	// 	};

	// 	return new Promise((resolve, reject) => {
	// 		axios.get('/api/displayName', config)
	// 			.then(response => {
	// 				console.log('response.data', response.data);
	// 				resolve(response.data)
	// 			});
	// 	});
	// }

	render() {
		return <li className="navbar-text">Welcome, {this.state.displayName}!</li>
	}
}

export default UserWelcome;




//saving to change code refer back to if it breaks
// import React from 'react';
// import axios from 'axios';

// class UserWelcome extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = { displayName: '' }
// 	}
// 	componentWillMount() {
// 		this.getDisplayName();
// 	}
	
// 	getDisplayName() {
// 		const config = {
// 			headers: { 'authorization': localStorage.getItem('token') }
// 		};

// 		axios.get('/api/welcome', config)
// 			.then(response => {
// 				console.log(response);
// 				this.setState({ displayName: response.data });
// 			});
// 	}

// 	render() {
// 		return <li className="navbar-text">Welcome, {this.state.displayName}!</li>
// 	}
// }

// export default UserWelcome;