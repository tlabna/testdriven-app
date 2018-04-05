import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import UsersList from './UsersList'
import AddUser from './AddUser'
import About from './About'
import NavBar from './NavBar'
import Form from './Form'

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
    const { users, username, email, title, formData } = this.state

    return (
      <Router>
        <div>
          <NavBar title={title} />
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
                    render={() => (
                      <Form formType={'Register'} formData={formData} />
                    )}
                  />
                  <Route
                    exact={true}
                    path="/login"
                    render={() => (
                      <Form formType={'Login'} formData={formData} />
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
