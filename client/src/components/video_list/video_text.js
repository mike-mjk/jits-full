import React from 'react';
import { Link } from 'react-router-dom';

const VideoText = (props) => {
	return (
		<div>
			<h3><Link to={props.videoUrl}>{props.videoTitle}</Link></h3>
			<p>{props.channelTitle}</p>
		</div>
	)
}

export default VideoText;
