import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchVideos } from '../actions';
import { Link } from 'react-router-dom';


class SideBar extends React.Component {
	componentDidMount() {
		this.props.fetchVideos();
	}

	renderList() {
		if(!this.props.videos) {
			return <div>Loading</div>
		}
		console.log('redner ran', this.props.videos);
		return (
			_.map(this.props.videos, (video) => {
				var videoUrl = `/watch/${video.id}`;
				var thumbUrl = `${video.thumbnail}`;

				return (
			    <div className="col-xs-12 xcol-md-6">
		   			<div className="thumbnail">
	    				<div className="row">
		         		<div className="col-xs-5 xcol-md-12">
		            	<Link to={videoUrl}><img className="width-100" src={thumbUrl} /></Link>
		          	</div>
		          	<div className="col-xs-7 xcol-md-12">
		            	<div className="caption">
		              	<h3 className="oneline"><Link to={videoUrl}>{video.title}</Link></h3>
		              	<p>{video.channelTitle}</p>
		            	</div>
		          	</div>
		        	</div>
		      	</div>
		    	</div>
				)
			})
		)
	}
	render() {
		return (
			<div>
	      <div className="row">
	      	{this.renderList()}
	      </div>
		  </div>
		);
	}
}

function mapStateToProps(state) {
	return { videos: state.videos };
}

export default connect(mapStateToProps, { fetchVideos })(SideBar);