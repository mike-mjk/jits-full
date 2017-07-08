import React from 'react';
import { Link } from 'react-router-dom';

const VideoText = (props) => {
	return (
		<div className={`${props.className} ${props.watchScreenPadding}`} style={props.style}>
			<h3 className='twoline'><Link to={props.videoUrl}>{props.videoTitle}</Link></h3>
			<p>{props.channelTitle}</p>
			<p>{(props.caller === 'HomeList' ? 'Added By: ' : null )} <Link to={`/profile/${props.userid}`}>{props.addedBy}</Link></p>
			<p>{props.likes}</p>
		</div>
	)
}

export default VideoText;
