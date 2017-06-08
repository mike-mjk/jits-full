import axios from 'axios';
// export const getSearchResults = (term) => {
// 	const baseURL = 'https://www.googleapis.com/youtube/v3/search';
// 	const query = {
//     q: term,
//     part: 'snippet',
//     type: 'video',
//     maxResults: 15,
//     key: 'AIzaSyCIdQfwZ7qDSA1BhnfzEBa-6AB8ma8YY9k'
//   }
//   $.getJSON(baseURL, query, (response) => {
//   	console.log('response: ', response);
//   	var vids = transformResults(response.items);
//   	console.log('vids', vids);
//   	return vids;
//   	//var videos = transformResults(response);
//   })
//   console.log('outer', vids);
// }


export const getSearchResults = (term) => {
  console.log('getSearchResults');
	const baseURL = 'https://www.googleapis.com/youtube/v3/search';
	const query = {params: {
    q: term,
    part: 'snippet',
    type: 'video',
    maxResults: 15,
    key: 'AIzaSyCIdQfwZ7qDSA1BhnfzEBa-6AB8ma8YY9k'
  }}
  const request = axios.get(baseURL, query)
    .then(response => {
      transformResults(response);
      console.log('under transformResults')
    })
  return request;
}



export const transformResults = (results) => {
	var videos = results.map(result => {
		return ({
			title: result.snippet.title,
      channelTitle: result.snippet.channelTitle,
      id: result.id.videoId,
      thumbnail: result.snippet.thumbnails.medium.url
		})
	})
	return videos;
}
