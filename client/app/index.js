
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
// import App from './App';
import Reducers from './reducers';
import registerServiceWorker from './register_service_worker';
import AppRoutes from './routes';
const root = document.getElementById('root');
// registerServiceWorker();

render(
	<Provider store={createStore(Reducers, applyMiddleware(thunk))}>
		<AppRoutes />
	</Provider>
	, root
	);
