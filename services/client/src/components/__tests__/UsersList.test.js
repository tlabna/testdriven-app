import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import UsersList from '../UsersList'

const users = [
  {
    active: true,
    email: 'john@doe.com',
    id: 1,
    username: 'john_doe',
  },
  {
    active: true,
    email: 'michael@montreal.org',
    id: 2,
    username: 'michaelmontreal',
  },
]

test('UsersList renders properly', () => {
  const wrapper = shallow(<UsersList users={users} />)
  const element = wrapper.find('h4')
  expect(element.length).toBe(2)
  expect(element.get(0).props.className).toBe('card card-body bg-light')
  expect(element.get(0).props.children).toBe('john_doe')
})

test('UsersList renders a snapshot properly', () => {
  const tree = renderer.create(<UsersList users={users} />).toJSON()
  expect(tree).toMatchSnapshot()
})
