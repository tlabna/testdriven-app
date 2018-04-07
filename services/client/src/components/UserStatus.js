import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class UserStatus extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }

  state = {
    email: '',
    username: '',
    id: '',
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.getUserStatus()
    }
  }

  getUserStatus() {
    const options = {
      url: `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/status`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.authToken}`,
      },
    }

    return axios(options)
      .then((res) => {
        const data = res.data.data
        this.setState({
          id: data.id,
          email: data.email,
          username: data.username,
        })
      })
      .catch((error) => console.warn(error))
  }

  render() {
    const { id, email, username } = this.state

    if (!this.props.isAuthenticated) {
      return (
        <p>
          {'You must be logged in to view this. Click '}
          <Link to="/login">{'here '}</Link>
          {'to log back in.'}
        </p>
      )
    }

    return (
      <div>
        <ul>
          <li>
            <strong>{'User ID: '}</strong>
            {id}
          </li>
          <li>
            <strong>{'Email: '}</strong>
            {email}
          </li>
          <li>
            <strong>{'Username: '}</strong>
            {username}
          </li>
        </ul>
      </div>
    )
  }
}
