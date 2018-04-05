import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class Logout extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.logoutUser()
  }

  render() {
    return (
      <div>
        <p>
          {'You are now logged out. Click '}
          <Link to="/login">{'here '}</Link>{'to log back in.'}
        </p>
      </div>
    )
  }
}
