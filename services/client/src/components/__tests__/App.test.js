import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import toJson from 'enzyme-to-json'

import App from '../App'

// Using jest.fn() as a mock function
// Since only testing if component renders properly
const options = {
  disableLifecycleMethods: true,
}

test('App renders properly', () => {
  const wrapper = shallow(<App />, options)
  expect(wrapper.find('h1').length).toBe(1)
  expect(wrapper.find('AddUser').length).toBe(1)
  expect(wrapper.find('UsersList').length).toBe(1)
})

test('App renders a snapshot properly', () => {
  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})
