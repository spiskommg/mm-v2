import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';

import { authLoginUserSuccess } from './actions/auth';
import { dataFetchData } from './actions/data';
import Root from './containers/Root/Root';
import configureStore from './store/configureStore';


const initialState = {};
const target = document.getElementById('root');

const history = createHistory();
const store = configureStore(initialState, history);

// GOOGLE ANALYTICS EVENTS
ReactGA.initialize('UA-108588159-1');

// INITIAL LOAD SEND THE PAGEVIEW:
ReactGA.set({ page: location.pathname });
ReactGA.pageview(location.pathname);

// LISTEN TO THE PATH CHANGES AND SEND TO GA
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});


const node = (
    <Root store={store} history={history} />
);

const token = sessionStorage.getItem('token');
let user = {};
try {
    user = JSON.parse(sessionStorage.getItem('user'));
} catch (e) {
    // Failed to parse
}

if (token !== null) {
    store.dispatch(authLoginUserSuccess(token, user));
}

ReactDOM.render(node, target);
