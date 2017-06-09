import React from 'react';
import YoutubePlayer from './youtube_player';
import VideoList from './video_list/video_list';
import VideoInfoBox from './video_info_box';
import { connect } from 'react-redux';
import { fetchVideos } from '../actions';


class WatchScreen extends React.Component {
	componentDidMount() {
		//Make sure state is populated with videos in database
		this.props.fetchVideos();
	}

	render() {
		//get id from url
		const { id } = this.props.match.params;
		const { videosInDatabase } = this.props;
		let title = '';
		let channelTitle = '';
		let idInDatabase = null;
		if (videosInDatabase[id]) {
			idInDatabase = true;
			title = videosInDatabase[id].title;
			channelTitle = videosInDatabase[id].channelTitle;
		}
		return (
			<div className="container">
		    <div className="row">
					<div className="col-md-8">
						<YoutubePlayer id={id} />
						<VideoInfoBox 
							id={id}
							title={title}
							channelTitle={channelTitle}
							idInDatabase={idInDatabase}
						/>
					</div>
					<div className="col-md-4">
						<VideoList videosToRender={videosInDatabase} />
					</div>
				</div>
			</div>
		)

	}
}

function mapStateToProps(state) {
	return { videosInDatabase: state.videos };
}

export default connect(mapStateToProps, { fetchVideos })(WatchScreen);