import React from 'react';
import { Link } from 'react-router-dom';

//devquestion should alt be assigned to something more meaningful
const Thumbnail = (props) => {
	return (
		<div>
			<Link to={props.videoUrl}><img alt="thumbnail" src={props.thumbnailUrl} /></Link>
		</div>
	)
}

export default Thumbnail;
