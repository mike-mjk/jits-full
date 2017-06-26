// import React from 'react';
// import { connect } from 'react-redux';
// import { fetchVideo } from '../actions';
// //import SideBar from './sidebar';
// import Video from './video';

// class VideoWatch extends React.Component {
// 	componentDidMount() {
// 		const { id } = this.props.match.params;
// 		console.log('id in mount VideoWatch', id);
// 		this.props.fetchVideo(id);
// 	}


// 	render() {
// 		const { video } = this.props;
// 		if (!video) {
// 			return <div>Loading</div>
// 		}

// 		var videoUrl = `https://www.youtube.com/embed/${video.id}`
// 		var id = `${video.id}`
// 		return (
// 			<div className="container">
// 		    <div className="row">
		      
// 		      <div className="col-md-8">
// 		        <div className="auto-size-container">
// 		          <iframe id="ytplayer" type="text/html" className="auto-size-video" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
// 		        </div>
		  
// 		        <form id="add-description-form">
// 		          <div className="form-group">
// 		            <input id="add-description-input" data-id={id} type="text" className="form-control" placeholder="Add description here" />
// 		          </div>
// 		        </form>
// 		      </div>

// 		      <div className="col-md-4 video-list">
// 		      	<Video passedUrl={this.props.match.path} />
// 		      </div>
// 		    </div>
// 		  </div>
// 		);
// 	}
// }

// function mapStateToProps({ videos }, ownProps) {
// 	return { video: videos[ownProps.match.params.id] };
// }

// export default connect(mapStateToProps, { fetchVideo })(VideoWatch);