import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { MemoryRouter as Router, Link } from 'react-router-dom'

import UserStatus from '../UserStatus'

describe('UserStatus Component when authenticated', () => {
  const wrapper = shallow(<UserStatus isAuthenticated={true} />)

  beforeEach(() => {
    // Make sure localStorage is clear
    localStorage.clear()
    // Set localStorage with auth_token
    localStorage.setItem('authToken', 'token')
  })

  it('can get authToken from localStorage', ()=> {
    expect(localStorage.getItem('authToken')).toBe('token')
  })

  it('renders properly', () => {
    wrapper.setState({
      id: '1',
      email: 'test@test.com',
      username: 'test',
    })
    const element = wrapper.find('li')

    expect(element.length).toBe(3)
    expect(element.get(0).props.children[0].props.children).toContain(
      'User ID: '
    )
    expect(element.get(0).props.children[1]).toBe(wrapper.state('id'))
    expect(element.get(1).props.children[0].props.children).toContain('Email: ')
    expect(element.get(1).props.children[1]).toBe(wrapper.state('email'))
    expect(element.get(2).props.children[0].props.children).toContain(
      'Username: '
    )
    expect(element.get(2).props.children[1]).toBe(wrapper.state('username'))
  })

  it('renders a snapshot correctly', () => {
    const tree = renderer.create(wrapper).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('UserStatus Component when not authenticated', () => {
  const wrapper = shallow(<UserStatus isAuthenticated={false} />)

  it('renders properly', () => {
    const element = wrapper.find('p')
    const linkWrapper = element.find(Link)

    expect(element.length).toBe(1)
    expect(element.get(0).props.children[0]).toContain(
      'You must be logged in to view this. '
    )
    expect(linkWrapper.length).toBe(1)
    expect(element.get(0).props.children[2]).toContain('to log back in.')
  })

  it('renders a snapshot properly', () => {
    const wrapper = shallow(
      <Router>
        <UserStatus isAuthenticated={false} />
      </Router>
    )
    const tree = renderer.create(wrapper).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
