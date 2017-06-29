import React from 'react';
import VideoList from './video_list/video_list';
import { connect } from 'react-redux';

class SearchList extends React.Component {
	render() {
		return (
			<div className="container container-box" style={{padding: '15px'}}>
				<VideoList caller='SearchList' videosToRender={this.props.videosInSearchResults} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { videosInSearchResults: state.search_results };
}

export default connect(mapStateToProps,)(SearchList)