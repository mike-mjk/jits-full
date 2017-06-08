import React from 'react';

const VideoInfoBox = (props) => {
	return (
		<div className="video-info-box">
			<h2>{props.title}</h2>
			<p>{props.channelTitle}</p>
		</div>
	)
}

export default VideoInfoBox;