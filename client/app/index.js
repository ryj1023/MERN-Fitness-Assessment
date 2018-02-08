
// import React from 'react';
// import ReactDOM from 'react-dom';
// import {Provider} from 'react-redux';
// import {createStore} from 'redux';
// import './index.css';
// import App from './components/App/app';
// import Reducers from './reducers';
// //import registerServiceWorker from './registerServiceWorker';

// //registerServiceWorker();

// ReactDOM.render(
// 	<Provider store={createStore(Reducers)}>
// 		<App />
// 	</Provider>
// 	, document.getElementById('app')
// 	);

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import Reducers from './reducers';
import registerServiceWorker from '../public/register_service_worker';

registerServiceWorker();

render(
	<Provider store={createStore(Reducers, applyMiddleware(thunk))}>
		<App />
	</Provider>
	, document.getElementById('root')
	);

