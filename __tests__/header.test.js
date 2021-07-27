import React from 'react'
import Header from '../client/app/components/headers'
import { shallow } from 'enzyme'

it('expect to render header component', () => {
    expect(shallow(<Header />)).toMatchSnapshot()
})
