import React, { Component } from 'react'
import axios from 'axios'
import UsersList from './UsersList'
import AddUser from './AddUser'

export default class App extends Component {
  state = {
    users: [],
    username: '',
    email: '',
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
      .then((response) => {
        this.setState({
          users: response.data.data.users,
        })
      })
      .catch((err) => console.warn(err))
  }

  addUser = (event) => {
    event.preventDefault()
    const data = {
      username: this.state.username,
      email: this.state.email,
    }
    axios
      .post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
      .then((res) => {
        this.getUsers()
        this.setState({
          username: '',
          email: '',
        })
      })
      .catch((err) => console.warn(err))
  }

  handleChange = (event) => {
    const obj = {}
    obj[event.target.name] = event.target.value
    this.setState(obj)
  }

  render() {
    const { users, username, email } = this.state

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <br />
            <h1>{'All Users'}</h1>
            <hr />
            <br />
            <AddUser
              username={username}
              email={email}
              addUser={this.addUser}
              handleChange={this.handleChange}
            />
            <br />
            <UsersList users={users} />
          </div>
        </div>
      </div>
    )
  }
}