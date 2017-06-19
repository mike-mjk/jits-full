import { combineReducers } from 'redux';
import videoReducer from './reducer_videos';
import searchReducer from './reducer_search';
import authReducer from './reducer_auth';
import relatedVideoReducer from './reducer_related_videos';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	form: formReducer,
	videos: videoReducer,
	search_results: searchReducer,
	auth: authReducer,
	related_videos: relatedVideoReducer
});

export default rootReducer;