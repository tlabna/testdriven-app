import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import registerServiceWorker from './registerServiceWorker'
import UsersList from './components/UsersList'

class App extends Component {
  state = {
    users: [],
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
      .catch((err) => console.log(err))
  }

  render() {
    const { users } = this.state

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <br />
            <h1>{'All Users'}</h1>
            <hr />
            <br />
            <UsersList users={users} />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
