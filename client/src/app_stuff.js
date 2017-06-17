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

export function getDisplayName() {
	const config = {
		headers: { 'authorization': localStorage.getItem('token') }
	};

	return new Promise((resolve, reject) => {
		axios.get('/api/displayName', config)
			.then(response => {
				console.log('response.data', response.data);
				resolve(response.data)
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