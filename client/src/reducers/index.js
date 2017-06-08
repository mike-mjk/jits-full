import { combineReducers } from 'redux';
import videoReducer from './reducer_videos';
import searchReducer from './reducer_search';
import authReducer from './reducer_auth';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	form: formReducer,
	videos: videoReducer,
	search_results: searchReducer,
	auth: authReducer
});

export default rootReducer;