import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

export default function NavBar(props) {
  return (
    <Navbar inverse={true} collapseOnSelect={true}>
      <Navbar.Header>
        <Navbar.Brand>
          <span>{props.title}</span>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/">
            <NavItem eventKey={1}>{'Home'}</NavItem>
          </LinkContainer>
          <LinkContainer to="/about">
            <NavItem eventKey={2}>{'About'}</NavItem>
          </LinkContainer>
          {props.isAuthenticated && (
            <LinkContainer to="/status">
              <NavItem eventKey={3}>{'User Status'}</NavItem>
            </LinkContainer>
          )}
        </Nav>
        <Nav pullRight={true}>
          {!props.isAuthenticated && (
            <LinkContainer to="/register">
              <NavItem eventKey={1}>{'Register'}</NavItem>
            </LinkContainer>
          )}
          {!props.isAuthenticated && (
            <LinkContainer to="/login">
              <NavItem eventKey={2}>{'Log In'}</NavItem>
            </LinkContainer>
          )}
          {props.isAuthenticated && (
            <LinkContainer to="/logout">
              <NavItem eventKey={3}>{'Log Out'}</NavItem>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
