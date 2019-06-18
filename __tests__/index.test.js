import React from 'react'
import Home from '../pages'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

describe('Home Page component', () => {
    const initialState = { output: 100 }
    const mockStore = configureStore()
    let store, wrapper
    beforeEach(() => {
        store = mockStore(initialState)
        wrapper = shallow(<Home store={store} />)
    })
    it('expect to render Home component', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
