import React from 'react';
import Thumbnail from './thumbnail';
import VideoText from './video_text';
import _ from 'lodash';
import { rules } from './video_list_css';

class VideoList extends React.Component {

	renderVideos() {
		console.log('this.props.rules in video list', this.props.rules)
		const { videosToRender } = this.props;

		//Existence check. Should always be there though.
		if(!videosToRender) {
			return <div>Loading</div>
		}

		const { caller } = this.props;
		let style = {};
		if( caller === 'HomeList') {
			style = rules.homeList;
		}
		if( caller === 'WatchScreen') {
			style = rules.watchScreen;
		}

		if(caller === 'SearchList') {
			style = rules.searchList;
		}
		return (
			_.map(videosToRender, (video) => {
				return (
					<div style={style.video} className={style.columns} key={video.id}>
						<Thumbnail className={(caller === 'WatchScreen') ? style.col5 : ''} videoUrl={`/watch/${video.id}`} thumbnailUrl={video.thumbnail} />
						<VideoText 
							style={(caller === 'WatchScreen') ? {padding: '0px'} : {}}
							className={style.col7}
							videoUrl={`watch/${video.id}`}
							videoTitle={video.title} 
							channelTitle={video.channelTitle}
							addedBy={video.addedBy ? `Added By: ${video.addedBy}` : ''}
							likes={((caller === 'HomeList') & (video.likes || video.likes === 0)) ? `Likes: ${video.likes}` : ''}
						/>
					</div>
				)
			})
		);
	}


	render() {
		const { caller } = this.props;
		let style = {};
		if( caller === 'HomeList') {
			style = rules.homeList
		}

		return <div className="row" style={(caller === 'HomeList') ? style.row : {}} >{this.renderVideos()}</div>
	}
}

export default VideoList;

