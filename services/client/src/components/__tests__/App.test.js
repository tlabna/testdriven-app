import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import App from '../App'
import AddUser from '../AddUser'
import UsersList from '../UsersList'

describe('App Component', () => {
  it('renders AddUser component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(AddUser)).toHaveLength(1)
  })

  it('renders UsersList component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(UsersList)).toHaveLength(1)
  })

  it(`renders header 'All Users'`, () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('h1').text()).toBe('All Users')
  })

  it('passes props to AddUser component', () => {
    const wrapper = shallow(<App />)
    let addUserWrapper = wrapper.find(AddUser)

    expect(addUserWrapper.props().username).toEqual('')
    expect(addUserWrapper.props().email).toEqual('')
    // Checking instance because wrapper has method as instance and not prop
    expect(addUserWrapper.props().addUser).toBe(wrapper.instance().addUser)
    expect(addUserWrapper.props().handleChange).toBe(
      wrapper.instance().handleChange
    )

    wrapper.setState({
      username: 'test',
      email: 'test@test.com',
    })

    addUserWrapper = wrapper.find(AddUser)
    expect(addUserWrapper.props().username).toEqual('test')
    expect(addUserWrapper.props().email).toEqual('test@test.com')
  })
})

describe('App Component Snapshot', () => {
  test('renders', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
