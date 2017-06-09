import React from 'react';
import AddToCategory from './add_to_category';


const VideoInfoBox = (props) => {
	function onClick() {
		console.log('I was clicked');
	}
	return (
		<div>
			<div className="video-info-box">
				<h2>{props.title}</h2>
				<p>{props.channelTitle}</p>
				{!props.idInDatabase &&
					<button onClick={onClick}>Click me</button>
				}
			</div>
			<div>
				{!props.idInDatabase && 
					<AddToCategory id={props.id} />
				}
			</div>
		</div>
	)
}

export default VideoInfoBox;