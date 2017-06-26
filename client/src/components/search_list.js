// import React from 'react';
// import VideoList from './video_list/video_list';
// import { connect } from 'react-redux';

// class SearchList extends React.Component {
// 	render() {
// 		return (
// 			<div className="container" style={{backgroundColor: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.1)', padding: '15px'}}>
// 				<VideoList caller='SearchList' videosToRender={this.props.videosInSearchResults} />
// 			</div>
// 		)
// 	}
// }

// function mapStateToProps(state) {
// 	return { videosInSearchResults: state.search_results };
// }

// export default connect(mapStateToProps,)(SearchList)