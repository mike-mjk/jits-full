import React from 'react';

class LikeButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			liked: false
		};
	}

	render() {
		return (
			<button>Like</button>
		)
	}
}

export default LikeButton;