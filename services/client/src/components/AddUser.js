import React from 'react'
import PropTypes from 'prop-types'

AddUser.propTypes = {
  addUser: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default function AddUser(props) {
  const { addUser, username, email, handleChange } = props
  return (
    <div>
      <form onSubmit={(event) => addUser(event)}>
        <div className="form-group">
          <input
            name="username"
            className="form-control input-lg"
            type="text"
            placeholder="Enter a username"
            required={true}
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            name="email"
            className="form-control input-lg"
            type="email"
            placeholder="Enter an email address"
            required={true}
            value={email}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-lg btn-block"
          value="Submit"
        />
      </form>
    </div>
  )
}
