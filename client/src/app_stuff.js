export function extractFromResponse(response) {
	var videos = response.data.items.map(result => {
		return ({
			title: result.snippet.title,
      channelTitle: result.snippet.channelTitle,
     	id: result.id.videoId,
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