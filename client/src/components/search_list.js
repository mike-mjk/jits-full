import React from 'react';
import VideoList from './video_list/video_list';
import { connect } from 'react-redux';

class SearchList extends React.Component {
	render() {
		return <VideoList videosToRender={this.props.videosInSearchResults} />
	}
}

function mapStateToProps(state) {
	return { videosInSearchResults: state.search_results };
}

export default connect(mapStateToProps,)(SearchList)