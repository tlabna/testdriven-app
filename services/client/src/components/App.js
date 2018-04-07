import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import UsersList from './UsersList'
import AddUser from './AddUser'
import About from './About'
import NavBar from './NavBar'
import Form from './Form'
import Logout from './Logout'
import UserStatus from './UserStatus'

export default class App extends Component {
  state = {
    users: [],
    username: '',
    email: '',
    title: 'TestDrivenApp',
    formData: {
      username: '',
      email: '',
      password: '',
    },
    isAuthenticated: false,
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

  handleUserFormSubmit = (event, fromUrl) => {
    event.preventDefault()
    let data = {
      email: this.state.formData.email,
      password: this.state.formData.password,
    }
    const param = fromUrl.split('/').reverse()[0]

    if (fromUrl === '/register') {
      data.username = this.state.formData.username
    }

    const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/${param}`

    axios
      .post(url, data)
      .then((res) => {
        this.setState({
          formData: {
            username: '',
            email: '',
            password: '',
          },
          username: '',
          email: '',
          isAuthenticated: true,
        })

        window.localStorage.setItem('authToken', res.data.auth_token)

        this.getUsers()
      })
      .catch((err) => console.warn(err))
  }

  handleFormChange = (event) => {
    const obj = this.state.formData
    obj[event.target.name] = event.target.value
    this.setState(obj)
  }

  logoutUser = () => {
    window.localStorage.clear()
    this.setState({
      isAuthenticated: false,
    })
  }

  render() {
    const {
      users,
      username,
      email,
      title,
      formData,
      isAuthenticated,
    } = this.state

    return (
      <Router>
        <div>
          <NavBar title={title} isAuthenticated={isAuthenticated} />
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <br />
                <Switch>
                  <Route
                    exact={true}
                    path="/"
                    render={() => (
                      <div>
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
                    )}
                  />
                  <Route exact={true} path="/about" component={About} />
                  <Route
                    exact={true}
                    path="/register"
                    render={({ match }) => (
                      <Form
                        formType={'Register'}
                        formData={formData}
                        handleUserFormSubmit={this.handleUserFormSubmit}
                        handleFormChange={this.handleFormChange}
                        isAuthenticated={isAuthenticated}
                        match={match}
                      />
                    )}
                  />
                  <Route
                    exact={true}
                    path="/status"
                    render={() => (
                      <UserStatus isAuthenticated={isAuthenticated} />
                    )}
                  />
                  <Route
                    exact={true}
                    path="/login"
                    render={({ match }) => (
                      <Form
                        formType={'Login'}
                        formData={formData}
                        handleUserFormSubmit={this.handleUserFormSubmit}
                        handleFormChange={this.handleFormChange}
                        isAuthenticated={isAuthenticated}
                        match={match}
                      />
                    )}
                  />
                  <Route
                    exact={true}
                    path="/logout"
                    render={() => (
                      <Logout
                        logoutUser={this.logoutUser}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
