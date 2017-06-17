import React from 'react';
import { Link } from 'react-router-dom';

const VideoText = (props) => {
	return (
		<div className={props.className} style={props.style}>
			<h3><Link to={props.videoUrl}>{props.videoTitle}</Link></h3>
			<p>{props.channelTitle}</p>
			<p>{props.addedBy}</p>
			<p>{props.likes}</p>
		</div>
	)
}

export default VideoText;
