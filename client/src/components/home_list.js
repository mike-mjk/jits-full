import React from 'react';
import VideoList from './video_list/video_list';
import { connect } from 'react-redux';
import { fetchVideos } from '../actions';

class HomeList extends React.Component {
	componentDidMount() {
		this.props.fetchVideos();
	}
	render() {
		return <VideoList videosToRender={this.props.videosInDatabase} />
	}
}

function mapStateToProps(state) {
	return { videosInDatabase: state.videos };
}

export default connect(mapStateToProps, { fetchVideos })(HomeList)