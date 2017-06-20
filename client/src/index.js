// the babel polyfill line was in there from whatever boilerplate starter this used. not sure if I need it.
//well the old boilerplate before migration to new boilerplate
// require('babel-polyfill');
//marker

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import NavBar from './components/navbar';
// import Video from './components/video';
// import VideoWatch from './components/watch'
// import SideBar from './components/sidebar'
// import Search from './components/search';
import Signin from './components/signin';
import Signout from './components/signout';
import Signup from './components/signup';
// import RequireAuth from './components/require_auth';
import { AUTH_USER } from './actions';

import HomeList from './components/home_list';
import SearchList from './components/search_list';
import WatchScreen from './components/watch_screen/watch_screen';
import UserWelcome from './components/user_welcome';


const logger = createLogger({});
const createStoreWithMiddleware = applyMiddleware(promise, thunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER })
}
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/" component={NavBar} />
        <Switch>
        	<Route path="/watch/:id" component={WatchScreen} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/signup" component={Signup} />
        	<Route path="/search" component={SearchList} />
          <Route path="/welcome" component={UserWelcome} />
          <Route path="/" component={HomeList} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));

//example protected route for future reference
//<Route path="feature" component={RequireAuth(Feature)} />

