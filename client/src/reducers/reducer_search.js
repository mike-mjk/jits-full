import _ from 'lodash';
import { SEARCH_YOUTUBE } from '../actions';
// import { transformResults } from '../app';

export default function(state = {}, action) {
	switch(action.type) {
	case SEARCH_YOUTUBE:
		console.log('case SEARCH_YOUTUBE in reducer is called with this action.payload:', action.payload);
		return (action.payload);
	default:
		return state
	}
}

