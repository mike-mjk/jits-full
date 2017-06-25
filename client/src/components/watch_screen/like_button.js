import React from 'react';
import { connect } from 'react-redux';
import { authCheck, isLikedByMe, getNumberOfLikes, incrementLikes, decrementLikes, addToLiked, removeFromLiked } from '../../app_stuff';

class LikeButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			liked: null,
			numberOfLikes: null
		};
	}

	componentDidMount() {
		authCheck().then(data => {
			if (data === 'logged in') {
				isLikedByMe(this.props.id)
					.then(isLiked => {
						this.setState({ liked: isLiked })
					})
			}
		}).catch(data => {
			this.setState({ liked: false })
		});

		getNumberOfLikes(this.props.id)
			.then(numberOfLikes => {
				this.setState({ numberOfLikes: numberOfLikes });
			});
	}

	onClick() {
		this.state.liked
		? decrementLikes(this.props.id)
			.then(data => this.setState({ numberOfLikes: data, liked: false }), removeFromLiked(this.props.id))
		: incrementLikes(this.props.id)
			.then(data => this.setState({ numberOfLikes: data, liked: true }), addToLiked(this.props.id));
	}

	render() {
		return (
			<button onClick={this.onClick.bind(this)}>{this.state.liked ? 'Unlike' : 'Like'} {this.state.numberOfLikes}</button>
		)
	}
}

function mapStateToProps(state) {
	return { 
		videosInDatabase: state.videos
		};
}

export default connect(mapStateToProps)(LikeButton);