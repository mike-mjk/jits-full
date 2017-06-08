import React from 'react';
import Thumbnail from './thumbnail';
import VideoText from './video_text';
import _ from 'lodash';

class VideoList extends React.Component {

	renderVideos() {
		const { videosToRender } = this.props;

		//Existence check. Should always be there though.
		if(!videosToRender) {
			return <div>Loading</div>
		}

		return (
			_.map(videosToRender, (video) => {
				return (
					<div key={video.id}>
						<Thumbnail videoUrl={`/watch/${video.id}`} thumbnailUrl={video.thumbnail} />
						<VideoText 
							videoUrl={`watch/${video.id}`}
							videoTitle={video.title} 
							channelTitle={video.channelTitle}
							addedBy={video.addedBy ? `Added By: ${video.addedBy}` : ''}
							likes={video.likes ? `Likes: ${video.likes}` : ''}
						/>
					</div>
				)
			})
		);
	}


	render() {
		return <div>{this.renderVideos()}</div>
	}
}

export default VideoList;