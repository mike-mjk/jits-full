import _ from 'lodash';
import { SEARCH_YOUTUBE } from '../actions';
import { transformResults } from '../app';

export default function(state = {}, action) {
	switch(action.type) {
	case SEARCH_YOUTUBE:
		console.log('case SEARCH_YOUTUBE in reducer is called with this action.payload:', action.payload);
		return (action.payload);
	default:
		return state

	}
}


// import _ from 'lodash';
// import { FETCH_VIDEOS, FETCH_VIDEO } from '../actions';
// //later change state to object or array probably
// export default function(state = {}, action) {
// 	switch(action.type) {
// 	case FETCH_VIDEOS:
// 		return _.mapKeys(action.payload.data, 'id');
// 	case FETCH_VIDEO:
// 		return { ...state, [action.payload.data.id]: action.payload.data };
// 	default:
// 		return state;
// 	}
// }