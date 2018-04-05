import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import About from '../About'

describe('About Component', () => {
  it('renders properly', () => {
    const wrapper = shallow(<About />)
    const element = wrapper.find('p')
    expect(element.length).toBe(1)
    expect(element.text()).toBe('Add something relevant here.')
  })
})

describe('About Component Snapshot', () => {
  test('renders', () => {
    const tree = renderer.create(<About />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
