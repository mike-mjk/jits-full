import React from 'react';
import { getUsernameDisplayNameObj, getUser } from '../../app_stuff';
import VideoList from '../video_list/video_list';
import { connect } from 'react-redux';
import { fetchVideos } from '../../actions';
import _ from 'lodash';

class UserProfile extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			usernameDisplayNameObj: {},
			videosLikedByUser: {}
		}
	}

	componentDidMount() {
		this.props.fetchVideos();

		getUsernameDisplayNameObj()
		.then(users => {
			this.setState({
				usernameDisplayNameObj: users
			});
		});
		getUser(this.props.match.params.userid)
		.then(user => {
			//remove the starter entry that is only in there because I was getting "undefined" errors with an empty object
			// const videos = _.pickBy(user.likedVideos, function(value, key) {
				// console.log('value', value);
				// return user.likedVideos[key] !== 'so obj is defined';
			// });
			let videos = _.mapKeys(user.likedVideos, 'id');
			this.setState({ videosLikedByUser: videos });
		});
	}


	render() {
		const { userid } = this.props.match.params;
		const name = this.state.usernameDisplayNameObj[userid];
		const allVideos = this.props.videosInDatabase;
		const videosAddedByUser = _.pickBy(allVideos, function(value, key) {
			return (allVideos[key].addedBy === userid)
		})

		return (
			<div className="container container-box">
				<h2>Videos added by {name}</h2>
				<VideoList 
					caller='HomeList'
					videosToRender={videosAddedByUser}
					watchScreenCol5=''
					watchScreenCol7=''
					video='big-video'
					columns='col-md-3'
					category='category'
				/>
				<h2>Videos liked by {name}</h2>
				<VideoList
					caller='HomeList' 
					videosToRender={this.state.videosLikedByUser} 
					watchScreenCol5=''
					watchScreenCol7=''
					video='big-video'
					columns='col-md-3'
					category='category'
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { videosInDatabase: state.videos };
}

export default connect(mapStateToProps, { fetchVideos })(UserProfile)