import React from 'react';

const Delete = (props) => {
	var toRender = null;
	// console.log('in delete', props.location);
	if (props.location == '/') {
		toRender = <p><button className="delete btn btn-danger btn-xs" role="button"><i className="fa fa-times"></i> Delete Video</button></p>;
	}

	
	return (
		toRender
	)
}

export default Delete;