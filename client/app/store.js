// require('babel-polyfill');
// require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import Reducers from './reducers'

export const configureStore = initialState => {
    const store = createStore(Reducers, applyMiddleware(thunk))
    if (module.hot) {
        module.hot.accept(Reducers, () => {
            const nextRootReducer = require('./reducers')
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}
