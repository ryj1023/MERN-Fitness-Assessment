import React from 'react'
import Navigations from '../client/app/components/navigations'
import { shallow } from 'enzyme'

describe('Navigation component', () => {
    it('expect to render navigations component', () => {
        expect(shallow(<Navigations />)).toMatchSnapshot()
    })
    it('correctly sets state', () => {
        const wrapper = shallow(<Navigations />)
        expect(shallow(<Navigations />)).toMatchSnapshot()
        wrapper.find('[id="dashboard"]').simulate('click')
        expect(wrapper.state()).toEqual({
            loggedIn: false,
            noTouchOpen: false,
            noTouchClose: false,
            openRight: false,
            isLoading: true,
        })
    })
})
