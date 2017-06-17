import React from 'react';
import { Link } from 'react-router-dom';

//devquestion should alt be assigned to something more meaningful
const Thumbnail = (props) => {
	return (
		<div className={props.className}>
			<Link to={props.videoUrl}><img style={{"width": "100%"}} alt="thumbnail" src={props.thumbnailUrl} /></Link>
		</div>
	)
}

export default Thumbnail;
