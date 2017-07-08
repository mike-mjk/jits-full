import React from 'react';
import VideoList from './video_list/video_list';
import { connect } from 'react-redux';
import { fetchVideos } from '../actions';
import { categories } from '../app_stuff';
import _ from 'lodash';
import { Button, Collapse } from 'react-bootstrap';




class HomeList extends React.Component {
	constructor(props) {
		super(props);

		this.state = { Competition: true };
	}
	componentDidMount() {
		this.props.fetchVideos();
	}

	//loop through list of categories and grab the videos that represent that
	//category and make some jsx that includes a h1 with category
	//and the videoList with the videos of that category

	makeListWithCategoryJsx() {
		return (
			categories.map(category => {
				let open = category;
				return (
					<div>
						<Button
							style={{fontSize: '250%', margin: '5px 0'}}
							className={this.state[open] ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} 
							onClick={ ()=> this.setState({ [open]: !this.state[open] })}>
							{category}
						</Button>
						<Collapse in={this.state[open]}>
							<div>
								<VideoList
									watchScreenCol5=''
									watchScreenCol7=''
									video='big-video'
									columns='col-md-3'
									caller='HomeList'
									category='category'
									videosToRender={this.objByCategory(category)}
								/>
							</div>
						</Collapse>
					</div>
				)
			})
		)
	}


	objByCategory(category) {
		const videos = this.props.videosInDatabase;
		// const keys = Object.keys(videos);
		var newObj = _.pickBy(videos, function(value, key) {
			return (videos[key].category === category );
		})
		return newObj;
	}


	renderLists() {
		return (
			<div className="container container-box" >
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