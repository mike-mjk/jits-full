import axios from 'axios';
import _ from 'lodash';
import config from '../api_key';
import { extractFromResponse } from '../app_stuff';
//attempting to navigate to /search 
// import { browserHistory } from 'react-router';

// import { getSearchResults } from '../app.js';

export const FETCH_VIDEOS = 'fetch_videos';
export const FETCH_VIDEO = 'fetch_video';
export const SEARCH_YOUTUBE = 'search_youtube';
export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error';

//Auth actions
export function signinOrSignupUser({ username, password}, history, inOrUp) {
	return function(dispatch) {
		axios.post(`/api/${inOrUp}server`, { username, password })
			.then(response => {
				//swith auth to true
				dispatch({ type: AUTH_USER });
				//save the JWT token to local storage
				localStorage.setItem('token', response.data.token);
				//redirect back to home
				history.push('/')
			})
			.catch(error => {
				console.log(error.response);
				dispatch(authError(error.response.data.error));
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
	const request = axios.get('/api/videos');

	return {
		type: FETCH_VIDEOS,
		payload: request
	};
}

//This is wrong I think -- What is that get request doing???
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
	  		var videos = extractFromResponse(response)
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

//use id from url to make request to youtube api
//extract relevent info, and add to the database
export function addVideoToDatabase(videoId) {
  var URL = 'https://www.googleapis.com/youtube/v3/videos';
	var query = {
		id: videoId,
		part: 'snippet',
		r: 'json',
		key: config.key
	};

	axios.get(URL, query)
		.then(response => {
			var video = extractFromResponse(response)
			console.log('video', video)

		})

	// $.getJSON(URL, query, function(data) {
 // 	    createVideoObject(data, addVideo);
 // 	});
}