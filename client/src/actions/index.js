import axios from 'axios';
import _ from 'lodash';
import config from '../api_key';
import { extractFromResponse } from '../app_stuff';
import { getUsername } from '../app_stuff';
//attempting to navigate to /search 
// import { browserHistory } from 'react-router';

// import { getSearchResults } from '../app.js';

export const FETCH_VIDEOS = 'fetch_videos';
export const FETCH_VIDEO = 'fetch_video';
export const SEARCH_YOUTUBE = 'search_youtube';
export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error';
export const GET_RELATED_VIDEOS = 'get_related_videos';

//Auth actions
export function signinOrSignupUser({ username, password, displayName}, history, inOrUp) {
	return function(dispatch) {
		axios.post(`/api/${inOrUp}server`, { username, password, displayName })
			.then(response => {
				//save the JWT token to local storage
				localStorage.setItem('token', response.data.token);
				//swith auth to true
				dispatch({ type: AUTH_USER });
				//redirect back to home
				history.push('/')
			})
			.catch(error => {
				console.log('error console log', error.response);
				dispatch(authError('The username and password you have supplied are incorrect.'));
			});
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function signoutUser() {
	localStorage.removeItem('token');
	// console.log(localStorage.getItem('token'));
	return { type: UNAUTH_USER };
}

//End of Auth actions------------------------------------------------------------------



export function fetchVideos() {
	console.log('fetch videos start');
	const request = axios.get('/api/videos');

	return {
		type: FETCH_VIDEOS,
		payload: request
	};
}

//This is wrong I think -- What is that get request doing??? devquestion
export function fetchVideo(id) {
	const request = axios.get(`/videos/${id}`);
	console.log('request in fetchVideo', request);
	return {
		type: FETCH_VIDEO,
		payload: request
	}
}


export function searchYoutube(term, history) {
	return function(dispatch) {
		//Define arguments for GET request
		const URL = 'https://www.googleapis.com/youtube/v3/search';
		const query = {params: {
	    q: term,
	    part: 'snippet',
	    type: 'video',
	    maxResults: 15,
	    key: config.key
	  }}

	  axios.get(URL, query)
	  	.then(response => {
	  		//Extract needed data from API response
	  		var videos = extractFromResponse(response, 'result.id.videoId')
				//Transform array of videos into object
	  		videos = _.mapKeys(videos, 'id');

	  		dispatch(
	  			{ type: SEARCH_YOUTUBE,
	  				payload: videos
	  			})
	  		history.push('/search');
	  	})
	}
}

export function getRelatedVideos(videoId) {
	return function(dispatch) {
		const URL = 'https://www.googleapis.com/youtube/v3/search';
		const query = {params: {
	    part: 'snippet',
	    type: 'video',
	    relatedToVideoId: videoId,
	    maxResults: 25,
	    key: config.key
	  }}

	  axios.get(URL, query)
  	.then(response => {
  		//Extract needed data from API response
  		var videos = extractFromResponse(response, 'result.id.videoId')
			//Transform array of videos into object
  		videos = _.mapKeys(videos, 'id');

  		dispatch(
  			{ type: GET_RELATED_VIDEOS,
  				payload: videos
  		  }
  		)
  	})
	}
}

//use id from url to make request to youtube api
//extract relevent info, and add to the database

//latest non working
export function addVideoToDatabase(videoId, category) {
	return function(dispatch) {
	  var URL = 'https://www.googleapis.com/youtube/v3/videos';
		var query = {
			params: {
				id: videoId,
				part: 'snippet',
				r: 'json',
				key: config.key
			}
		};
		axios.get(URL, query)
		.then(response => {
			//'result.id' is a string that gets used because I use extractFromResponse for searching as well as adding
			//and the Youtube API is slightly different
			var video = extractFromResponse(response, 'result.id')
			video[0].category = category;
			
			getUsername()
			.then((name) => {
				video[0].addedBy = name;

				axios.post('/api/videos', video[0])
				.then(() => {
					axios.get('/api/videos')
					.then((data) => {
						//console.log('data', data)
						
						dispatch({
							type: FETCH_VIDEOS,
							payload: data
						}) 
					})
				});
			})
		})
	}
}

export function getVideoInfo(id) {
	var URL = 'https://www.googleapis.com/youtube/v3/videos';
	var query = {
		params: {
			id: id,
			part: 'snippet',
			r: 'json',
			key: config.key
		}
	};
	axios.get(URL, query)
	.then(response => {
		//'result.id' is a string that gets used because I use extractFromResponse for searching as well as adding
		//and the Youtube API is slightly different
		var video = extractFromResponse(response, 'result.id')
	});
}







