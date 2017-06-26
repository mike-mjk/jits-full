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

		this.onClick = this.onClick.bind(this);
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

		incOrDec() {
			this.state.liked
			? decrementLikes(this.props.id)
				.then(data => this.setState({ numberOfLikes: data, liked: false }), removeFromLiked(this.props.id))
			: incrementLikes(this.props.id)
				.then(data => this.setState({ numberOfLikes: data, liked: true }), addToLiked(this.props.id));
		} 

	onClick() {
		authCheck()
		.then(data => {
			if (data === 'logged in') {
				this.incOrDec();
			}
		})
		.catch(data => {
			alert('You must be logged in to like a video');
		});
	}
		// false ? this.incOrDec() : alert('you must be logged in');

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