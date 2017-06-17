import React from 'react';
import VideoList from './video_list/video_list';
import { connect } from 'react-redux';
import { fetchVideos } from '../actions';
import { categories } from '../app_stuff';
import _ from 'lodash';
import { rules } from './video_list/video_list_css';


class HomeList extends React.Component {
	componentDidMount() {
		this.props.fetchVideos();
	}

	//loop through list of categories and grab the videos that represent that
	//category and make some jsx that includes a h1 with category
	//and the videoList with the videos of that category

	makeListWithCategoryJsx() {
		return (
			categories.map(category => {
				return (
					<div>
						<h1>{category}</h1>
						<VideoList header='blueheader' caller='HomeList' videosToRender={this.objByCategory(category)} />
					</div>
				)
			})
		)
	}


	objByCategory(category) {
		const videos = this.props.videosInDatabase;
		const keys = Object.keys(videos);
		var newObj = _.pickBy(videos, function(value, key) {
			return (videos[key].category === category );
		})
		return newObj;
	}


	renderLists() {
		return (
			<div className="container" style={{backgroundColor: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.1)'}}>
				{this.makeListWithCategoryJsx()}
			</div>
		)
	}



	render() {
		return this.renderLists()
	}
}

function mapStateToProps(state) {
	return { videosInDatabase: state.videos };
}

export default connect(mapStateToProps, { fetchVideos })(HomeList)