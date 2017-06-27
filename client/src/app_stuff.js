      //I reuse extractFromResponse for the youtube "Search" api and your "Videos" api,
      //They are slightly different so I pass in id path by hand as the third arg.
import axios from 'axios';
export function extractFromResponse(response, idPath) {
	console.log('idPath', idPath);
	var videos = response.data.items.map(result => {
		return ({
			title: result.snippet.title,
      channelTitle: result.snippet.channelTitle,
     	id: eval(idPath),
    	thumbnail: result.snippet.thumbnails.medium.url,
    	description: result.snippet.description,
    	tags: result.snippet.tags,
		})
	})
	return videos;
}

export const categories = [
	'Competition', 
	'Submissions', 
	'Guard Passes', 
	'Sweeps',
	'Takedowns',
	'Escapes',
	'Other'
	 ]

// export function getUsernameDisplayNameObj() {
// 	return new Promise((resolve, reject) => {
// 		axios.get('/api/getusernamedisplaynameobj')
// 		.then(response => {
// 			resolve(response.data);
// 		});
// 	});
// }

export async function getUsernameDisplayNameObj() {
	let response = await axios.get('/api/getusernamedisplaynameobj');
	return response.data;
}





export function getDisplayName() {
	const config = {
		headers: { 'authorization': localStorage.getItem('token') }
	};

	return new Promise((resolve, reject) => {
		axios.get('/api/displayName', config)
			.then(response => {
				resolve(response.data);
			});
	});
}

export function getUsername() {
	const config = {
		headers: { 'authorization': localStorage.getItem('token') }
	};

	return new Promise((resolve, reject) => {
		axios.get('/api/username', config)
			.then(response => {
				resolve(response.data);
			});
	});
}

export function isLikedByMe(id) {
	const config = {
		headers: { 'authorization': localStorage.getItem('token') },
		params: { 'id': id }
	};

	return new Promise((resolve, reject) => {
		axios.get('/api/islikedbyme', config)
			.then(response => {
				resolve(response.data);
			});
	});
}

export function addToLiked(id) {
	const config = {
		headers: { 'authorization': localStorage.getItem('token') },
		params: { 'id': id }
	};
	return new Promise((resolve, reject) => {
		axios.get('/api/addtoliked', config)
			.then(response => {
				resolve(response.data);
			});
	});
}

export function removeFromLiked(id) {
	const config = {
		headers: { 'authorization': localStorage.getItem('token') },
		params: { 'id': id }
	};
	return new Promise((resolve, reject) => {
		axios.get('/api/removefromliked', config)
			.then(response => {
				resolve(response.data);
			});
	});
}

export function incrementLikes(id) {
	const config = {
		params: { 'id': id }
	};

	return new Promise((resolve, reject) => {
		axios.get('/api/incrementlikes', config)
			.then(response => {
				resolve(response.data)
			});
	});
}

export function decrementLikes(id) {
	const config = {
		params: { 'id': id }
	};

	return new Promise((resolve, reject) => {
		axios.get('/api/decrementlikes', config)
			.then(response => {
				resolve(response.data)
			});
	});
}

export function getNumberOfLikes(id) {
	const config = {
		params: { 'id': id }
	};

	return new Promise((resolve, reject) => {
		axios.get('/api/numberoflikes', config)
			.then(response => {
				resolve(response.data);
			});
	});
}

export function authCheck() {
	const config = {
		headers: { 'authorization': localStorage.getItem('token') }
	};

	return new Promise((resolve, reject) => {
		axios.get('/api/authcheck', config)
			.then(response => {
				resolve(response.data);
			})
			.catch(response => {
				reject('Unauthorized');
			});
	});
}

// working version for searchYoutube
// export default function extractFromResponse(response) {
// 	var videos = response.data.items.map(result => {
// 		return ({
// 			title: result.snippet.title,
//       channelTitle: result.snippet.channelTitle,
//      	id: result.id.videoId,
//     	thumbnail: result.snippet.thumbnails.medium.url
// 		})
// 	})
// 	return videos;
// }