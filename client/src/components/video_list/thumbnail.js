import React from 'react';
import { Link } from 'react-router-dom';

const Thumbnail = (props) => {
	return (
		<div>
			<Link to={props.videoUrl}><img src={props.thumbnailUrl} /></Link>
		</div>
	)
}

export default Thumbnail;
