import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { MemoryRouter as Router } from 'react-router-dom'

import NavBar from '../NavBar'
import { NavItem } from 'react-bootstrap'

const title = 'Hello, World!'

describe('NavBar Component when authenticated', () => {
  const component = <NavBar title={title} isAuthenticated={true} />
  it('renders properly', () => {
    const wrapper = shallow(component)
    const element = wrapper.find('span')
    const navItems = wrapper.find(NavItem)
    expect(element.length).toBe(1)
    expect(element.get(0).props.children).toBe(title)
    expect(navItems.length).toBe(4)
    expect(navItems.get(0).props.children).toBe('Home')
    expect(navItems.get(1).props.children).toBe('About')
    expect(navItems.get(2).props.children).toBe('User Status')
    expect(navItems.get(3).props.children).toBe('Log Out')
  })

  it('renders a snapshot properly', () => {
    const tree = renderer
      .create(<Router location="/">{component}</Router>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('NavBar Component when not authenticated', () => {
  const component = <NavBar title={title} isAuthenticated={false} />
  it('renders properly', () => {
    const wrapper = shallow(component)
    const element = wrapper.find('span')
    const navItems = wrapper.find(NavItem)
    expect(element.length).toBe(1)
    expect(element.get(0).props.children).toBe(title)
    expect(navItems.length).toBe(4)
    expect(navItems.get(0).props.children).toBe('Home')
    expect(navItems.get(1).props.children).toBe('About')
    expect(navItems.get(2).props.children).toBe('Register')
    expect(navItems.get(3).props.children).toBe('Log In')
  })

  it('renders a snapshot properly', () => {
    const tree = renderer
      .create(<Router location="/">{component}</Router>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
