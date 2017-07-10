import React from 'react';
import { Link } from 'react-router-dom';

const VideoText = (props) => {
	return (
		<div className={`${props.className} ${props.watchScreenPadding}`} style={props.style}>
			<h3 style={{marginTop: '5px', marginBottom: '0px', fontFamily:"'Lato', sans-serif", fontSize:"140%"}}className='twoline'><Link to={props.videoUrl}>{props.videoTitle}</Link></h3>
			<p style={{color: '#777', }}>{props.channelTitle}</p>
			<p>{(props.caller === 'HomeList' ? 'Added By: ' : null )} <Link to={`/profile/${props.userid}`}>{props.addedBy}</Link></p>
			<p>{props.likes}</p>
		</div>
	)
}

export default VideoText;


export const VideoTextSideBar = (props) => {
	return (
		<div className='watch-screen-padding col-xs-7'>
			<h3 style={{margin: '0px', fontSize: '100%', fontFamily:"'Lato', sans-serif"}}className='twoline'><Link to={props.videoUrl}>{props.videoTitle}</Link></h3>
			<p style={{color: '#777'}}>{props.channelTitle}</p>
		</div>
	)
}



