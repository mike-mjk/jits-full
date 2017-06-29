import React from 'react';
import AddToCategory from './add_to_category';
import LikeButton from './like_button';


const VideoInfoBox = (props) => {
	console.log('props.idInDatabase', props.idInDatabase);
	return (
		<div>
			<div className="container-box">
				<h2>{props.title}</h2>
				<p>{props.channelTitle}</p>
				{props.idInDatabase &&
					<LikeButton id={props.id} />
				}

			</div>
			<div>
				{!props.idInDatabase && 
					<AddToCategory id={props.id} />
				}
			</div>
			<div className="container-box" style={{marginTop: '15px', padding: '12px'}}>
				{props.description}
			</div>
		</div>
	)
}

export default VideoInfoBox;