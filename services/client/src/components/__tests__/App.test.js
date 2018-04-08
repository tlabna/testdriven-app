import React from 'react'
import { mount, shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import App from '../App'
import UsersList from '../UsersList'
import NavBar from '../NavBar'

describe('App Component', () => {
  let wrapper = mount(<App />)
  const shallowWrapper = shallow(<App />)

  it('renders NavBar component', () => {
    expect(wrapper.find(NavBar)).toHaveLength(1)
  })

  it('passes props to NavBar component', () => {
    let navBarWrapper = wrapper.find(NavBar)

    wrapper.setState({
      title: 'title',
      isAuthenticated: true,
    })

    navBarWrapper = wrapper.find(NavBar)
    expect(navBarWrapper.props().title).toEqual('title')
    expect(navBarWrapper.props().isAuthenticated).toEqual(true)
  })

  /**
   * Removing AddUser test for now since we're not using it
   */
  // it('renders AddUser component', () => {
  //   expect(wrapper.find(AddUser)).toHaveLength(1)
  // })

  it('renders UsersList component', () => {
    expect(wrapper.find(UsersList)).toHaveLength(1)
  })

  it(`renders header 'All Users'`, () => {
    expect(wrapper.find('h1').text()).toBe('All Users')
  })

  /**
   * Removing AddUser test for now since we're not using it
   */
  // it('passes props to AddUser component', () => {
  //   let addUserWrapper = wrapper.find(AddUser)

  //   expect(addUserWrapper.props().username).toEqual('')
  //   expect(addUserWrapper.props().email).toEqual('')
  //   // Checking instance because wrapper has method as instance and not prop
  //   expect(addUserWrapper.props().addUser).toBe(wrapper.instance().addUser)
  //   expect(addUserWrapper.props().handleChange).toBe(
  //     wrapper.instance().handleChange
  //   )

  //   wrapper.setState({
  //     username: 'test',
  //     email: 'test@test.com',
  //   })

  //   addUserWrapper = wrapper.find(AddUser)
  //   expect(addUserWrapper.props().username).toEqual('test')
  //   expect(addUserWrapper.props().email).toEqual('test@test.com')
  // })

  it('renders a snapshot properly when user is not authenticated', () => {
    const tree = renderer.create(shallowWrapper).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a snapshot properly when user is authenticated', () => {
    shallowWrapper.setState({
      isAuthenticated: true,
    })

    const tree = renderer.create(shallowWrapper).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
