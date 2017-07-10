import React from 'react';
import Thumbnail from './thumbnail';
import VideoText from './video_text';
import { VideoTextSideBar } from './video_text';
import _ from 'lodash';
import './video_list_css.css';
import { getUsernameDisplayNameObj } from '../../app_stuff';

class VideoList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			usernameDisplayNameObj: {}
		}
	}

	componentDidMount() {
		getUsernameDisplayNameObj()
		.then(users => {
			this.setState({
				usernameDisplayNameObj: users
			})
		})
	}

	renderVideos() {
		const { videosToRender } = this.props;

		//Existence check. Should always be there though.
		if(!videosToRender) {
			return <div>Loading</div>
		}

		const { caller } = this.props;

		return (
			_.map(videosToRender, (video) => {
				const displayName = this.state.usernameDisplayNameObj[video.addedBy];
				return (
					<div className={`${this.props.columns} ${this.props.video}`} key={video.id}>
						<Thumbnail className={this.props.watchScreenCol5} videoUrl={`/watch/${video.id}`} thumbnailUrl={video.thumbnail} />
						<VideoText
							className={this.props.watchScreenCol7}
							watchScreenPadding={this.props.watchScreenPadding}
							videoUrl={`/watch/${video.id}`}
							videoTitle={video.title}
							channelTitle={video.channelTitle}
							userid={video.addedBy}
							addedBy={video.addedBy ? `${displayName}` : ''}
							likes={((caller === 'HomeList') & (video.likes || video.likes === 0)) ? `Likes: ${video.likes}` : ''}
							caller={caller}
						/>
					</div>
				)
			})
		);
	}


	render() {
		const { caller } = this.props;
		let style = {};

		return <div className={`${this.props.category} row`}>{this.renderVideos()}</div>
	}
}

export default VideoList;


export class VideoListSideBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			usernameDisplayNameObj: {}
		}
	}

	componentDidMount() {
		getUsernameDisplayNameObj()
		.then(users => {
			this.setState({
				usernameDisplayNameObj: users
			})
		})
	}

	renderVideos() {
		const { videosToRender } = this.props;

		//Existence check. Should always be there though.
		if(!videosToRender) {
			return <div>Loading</div>
		}

		const { caller } = this.props;

		return (
			_.map(videosToRender, (video) => {
				const displayName = this.state.usernameDisplayNameObj[video.addedBy];
				return (
					<div className='row' style={{padding: '0px 15px 10px 15px'}}key={video.id}>
						<Thumbnail className='col-xs-5' videoUrl={`/watch/${video.id}`} thumbnailUrl={video.thumbnail} />
						<VideoTextSideBar
							videoUrl={`/watch/${video.id}`}
							videoTitle={video.title}
							channelTitle={video.channelTitle}
							userid={video.addedBy}
							addedBy={video.addedBy ? `${displayName}` : ''}
							likes={((caller === 'HomeList') & (video.likes || video.likes === 0)) ? `Likes: ${video.likes}` : ''}
							caller={caller}
						/>
					</div>
				)
			})
		);
	}


	render() {
		const { caller } = this.props;
		let style = {};

		return <div className={`${this.props.category} row`}>{this.renderVideos()}</div>
	}
}
