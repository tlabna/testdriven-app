import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import toJson from 'enzyme-to-json'

import AddUser from '../AddUser'

// Using jest.fn() as a mock function
// Since only testing if component renders properly
const props = {
  username: '',
  email: '',
  addUser: jest.fn(),
  handleChange: jest.fn(),
}

test('AddUser renders properly', () => {
  const wrapper = shallow(<AddUser {...props} />)
  const element = wrapper.find('form')
  expect(element.find('input').length).toBe(3)
  expect(element.find('input').get(0).props.name).toBe('username')
  expect(element.find('input').get(1).props.name).toBe('email')
  expect(element.find('input').get(2).props.type).toBe('submit')
})

test('AddUser renders a snapshot properly', () => {
  const tree = renderer.create(<AddUser {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('AddUser onSubmit function is called', () => {
  const wrapper = shallow(<AddUser {...props} />)
  const element = wrapper.find('form')
  const preventDefault = jest.fn()
  element.simulate('submit')
  expect(toJson(wrapper)).toMatchSnapshot()
  expect(props.addUser).toBeCalled()
})
