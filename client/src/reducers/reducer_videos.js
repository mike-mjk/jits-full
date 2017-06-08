import _ from 'lodash';
import { FETCH_VIDEOS, FETCH_VIDEO } from '../actions';
//later change state to object or array probably
export default function(state = {}, action) {
	switch(action.type) {
	case FETCH_VIDEOS:
		return _.mapKeys(action.payload.data, 'id');
	case FETCH_VIDEO:
		console.log('action.payload in FETCH_VIDEO',action.payload);
		// return {action.payload};
		return { ...state, [action.payload.data.id]: action.payload.data };
	default:
		return state;
	}
}