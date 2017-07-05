import React from 'react';
import YoutubePlayer from './youtube_player';
import VideoList from '../video_list/video_list';
import VideoInfoBox from './video_info_box';
import { connect } from 'react-redux';
import { fetchVideos, getRelatedVideos } from '../../actions';
import Disqus from '../disqus/disqus';

class WatchScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state={
			id: this.props.match.params.id
		}
	}

	componentDidMount() {
		console.log('this.props', this.props);
		//Make sure state is populated with videos in database
		this.props.fetchVideos();
		//Get related videos
		this.props.getRelatedVideos(this.props.match.params.id);
		// const idInDatabase = Boolean(this.props.videosInDatabase[this.props.match.params.id]);
		// this.setState({
		// 	idInDatabase: idInDatabase
		// })
	}
	//this code should probably be changed to have the title be from the state, but it works
	//so i'm keeping it for now devquestion
	render() {
		//get id from url
		// const { id } = this.props.match.params;
		const { videosInDatabase } = this.props;
		console.log('videosInDatabase', videosInDatabase);
		console.log('this.props.match.params.id', this.props.match.params.id)
		let title = '';
		let channelTitle = '';
		if (this.props.match.params.id in videosInDatabase) { //videosInDatabase[this.props.match.params.id]
			title = videosInDatabase[this.props.match.params.id].title;
			channelTitle = videosInDatabase[this.props.match.params.id].channelTitle;
		}

		return (
			<div className="container">
		    <div className="row">
					<div className="col-md-8">
						<YoutubePlayer id={this.props.match.params.id} key={this.props.match.params.id} />
						<VideoInfoBox 
							id={this.props.match.params.id}
							title={title}
							channelTitle={channelTitle}
							idInDatabase={this.props.match.params.id in videosInDatabase} //Boolean(this.props.videosInDatabase[this.props.match.params.id])
						/>
						<Disqus
							key={'disqus' + this.props.match.params.id}
							identifier={this.props.match.params.id}
							url={this.props.match.url}
						/>
					</div>
					<div className="col-md-4" style={{backgroundColor: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.1)', paddingTop: '10px', paddingRight: '10px'}}>
						<h2>Related Videos</h2>
						<VideoList caller='WatchScreen' videosToRender={this.props.relatedVideos} />
					</div>
				</div>
			</div>
		)

	}
}

function mapStateToProps(state) {
	return { 
		videosInDatabase: state.videos,
		relatedVideos: state.related_videos
		};
}

export default connect(mapStateToProps, { fetchVideos, getRelatedVideos })(WatchScreen);












// import React from 'react';
// import YoutubePlayer from './youtube_player';
// import VideoList from '../video_list/video_list';
// import VideoInfoBox from './video_info_box';
// import { connect } from 'react-redux';
// import { fetchVideos, getRelatedVideos } from '../../actions';
// import Disqus from '../disqus/disqus';

// class WatchScreen extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		this.state={
// 			id: this.props.match.params.id,
// 			video: { 
// 				title: null,
// 				channelTitle: null,
// 				description: null,
// 				addedBy: null
// 			}
// 		}
// 	}

// 	componentDidMount() {
// 		//Make sure state is populated with videos in database
// 		this.props.fetchVideos();
// 		//Get related videos
// 		this.props.getRelatedVideos(this.state.id);

// 	}

// 	componentDidUpdate() {
// 		console.log('componentDidUpdate ran');
// 		const { id } = this.state;
// 		const { videosInDatabase } = this.props;
// 		if (this.state.id in videosInDatabase) {
// 			this.setState({
// 				video: {
// 					title: videosInDatabase[id].title,
// 					channelTitle: videosInDatabase[id].channelTitle,
// 					description: videosInDatabase[id].description,
// 					addedBy: videosInDatabase[id].addedBy

// 				}
// 			});
// 		}

// 	}
// 	//this code should probably be changed to have the title be from the state, but it works
// 	//so i'm keeping it for now devquestion
// 	render() {
// 		//get id from url
// 		// const { id } = this.props.match.params;
		
// 		const { videosInDatabase } = this.props;
// 		// console.log('videosInDatabase', videosInDatabase);
// 		// console.log('this.props.match.params.id', this.props.match.params.id)
// 		// let title = '';
// 		// let channelTitle = '';
// 		// let description = '';
// 		// if (this.props.match.params.id in videosInDatabase) { //videosInDatabase[this.props.match.params.id]
// 		// 	title = videosInDatabase[this.props.match.params.id].title;
// 		// 	channelTitle = videosInDatabase[this.props.match.params.id].channelTitle;
// 		// 	if (videosInDatabase[this.props.match.params.id].description) {
// 		// 		description = videosInDatabase[this.props.match.params.id].description;
// 		// 	}
// 		// }

// //id below can be this.state.id probably test later devquestion idInDatabase could be turned into state
// 		return (
// 			<div className="container">
// 		    <div className="row">
// 					<div className="col-md-8">
// 						<YoutubePlayer id={this.props.match.params.id} />
// 						<VideoInfoBox 
// 							id={this.props.match.params.id}
// 							title={this.state.video.title}
// 							channelTitle={this.state.video.channelTitle}
// 							idInDatabase={this.props.match.params.id in videosInDatabase}
// 							description={this.state.video.description}
// 						/>
// 						<Disqus />
// 					</div>
// 					<div className="col-md-4 container-box" style={{paddingTop: '10px', paddingRight: '10px'}}>
// 						<h2>Related Videos</h2>
// 						<VideoList caller='WatchScreen' videosToRender={this.props.relatedVideos} />
// 					</div>
// 				</div>
// 			</div>
// 		)

// 	}
// }

// function mapStateToProps(state) {
// 	return { 
// 		videosInDatabase: state.videos,
// 		relatedVideos: state.related_videos
// 		};
// }

// export default connect(mapStateToProps, { fetchVideos, getRelatedVideos })(WatchScreen);