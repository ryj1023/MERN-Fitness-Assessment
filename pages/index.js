// require('babel-polyfill');
//require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
// import './index.css';
import Reducers from '../client/app/reducers';
import AppRoutes from '../routes';

const Page = (Page) => {
	return class PageWrapper extends Component {
		render() {
		return <Provider store={createStore(Reducers, applyMiddleware(thunk))}>
			<Page />
		</Provider>
		}
	}
}

export default Page;
