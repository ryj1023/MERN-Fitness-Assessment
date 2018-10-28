// require('babel-polyfill');
// require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Reducers from '../../reducers';

const App = (Page) => {
	return class PageWrapper extends Component {
		render() {
			const store = createStore(Reducers, applyMiddleware(thunk));
			if (module.hot) {
				module.hot.accept(Reducers, () => {
					store.replaceReducer(Reducers)
				})
			}
		return <Provider store={store}>
			<Page store={store}/>
		</Provider>
		}
	}
}

export default App;




