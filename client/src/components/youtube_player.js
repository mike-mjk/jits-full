import React from 'react';

const YoutubePlayer = (props) => {
	return (
    <div className="auto-size-container">
      <iframe 
      	id="ytplayer" 
      	type="text/html" 
      	className="auto-size-video" 
      	src={`https://www.youtube.com/embed/${props.id}`} 
      	frameBorder="0" 
      	allowFullScreen>
      </iframe>
    </div>
	)
}

export default YoutubePlayer;