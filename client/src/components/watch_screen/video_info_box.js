import React from 'react';
import AddToCategory from './add_to_category';
import LikeButton from './like_button';


const VideoInfoBox = (props) => {
	const description = <div className="container-box" style={{marginTop: '15px', padding: '12px'}}>
				{props.description}
			</div>
	return (
		<div>
			<div className="container-box" style={{padding: '15px'}}>
				<h2 style={{margin: '0px', marginBottom: '5px'}}>{props.title}</h2>
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

			{props.description ? description : null}

		</div>
	)
}

export default VideoInfoBox;