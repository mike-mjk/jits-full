// import _ from 'lodash';
// import React from 'react';
// import { connect } from 'react-redux';
// import { fetchVideos } from '../actions';
// import { Link } from 'react-router-dom';
// //
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router';

// import Delete from './delete';

// //refactor push test
// class Video extends React.Component {


// 	//
// 	static propTypes = {
//     match: PropTypes.object.isRequired,
//     location: PropTypes.object.isRequired,
//     history: PropTypes.object.isRequired
// 	}

// 	componentDidMount() {
// 		this.props.fetchVideos();
// 		// console.log('this props', this);
// 	}


// 	renderVideos() {
// 		if(!this.props.videos) {
// 			return <div>Loading</div>
// 		}
// 		// console.log('passed', this.props.passedUrl);
// 		// const { passedUrl } = this.props;
// 		return (
// 			_.map(this.props.videos, (video) => {
// 				var videoUrl = `/watch/${video.id}`;
// 				var thumbnailUrl = `${video.thumbnail}`;
// 				return (
// 	        <div className={"col-xs-12 " + (this.props.match.path === '/watch/:id' ? '': 'col-md-6')} key={video.id}>
// 	          <div className="thumbnail">
// 	            <div className="row">

// 	              <div className={"col-xs-5 " + (this.props.match.path === '/watch/:id' ? '': 'col-md-12')}>
// 	                <Link to={videoUrl}><img className="width-100" src={thumbnailUrl} /></Link>
// 	              </div>

// 	              <div className={"col-xs-7 " + (this.props.match.path === '/watch/:id' ? '': 'col-md-12')}>
// 	                <div className="caption">
// 	                  <h3 className="oneline"><Link to={videoUrl}>{video.title}</Link></h3>
// 	                  <p>{video.channelTitle}</p>
// 	                  <Delete location={this.props.match.path} />
// 	                </div>
// 	              </div>
// 	            </div>
// 	          </div>
// 	        </div>
// 				);
// 			})
// 		);
// 	}

// 	render() {
// 		//
// 		const { match, location, history} = this.props
		
// 		return (
// 			<div className={(this.props.match.path === '/watch/:id' ? '': 'container')}>
// 				<div className="row">
// 					{this.renderVideos()}
// 				</div>
// 			</div>
// 		)
// 	}
// }

// function mapStateToProps(state) {
// 	return { videos: state.videos };
// }

// //
// const VideoWith = withRouter(Video);

// export default connect(mapStateToProps, { fetchVideos })(VideoWith);