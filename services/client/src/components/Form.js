import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

Form.propTypes = {
  formType: PropTypes.string.isRequired,
  handleUserFormSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
}

export default function Form(props) {
  const {
    formType,
    handleUserFormSubmit,
    formData,
    handleFormChange,
    isAuthenticated,
    match,
  } = props

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h1>{formType}</h1>
      <hr />
      <br />
      <form onSubmit={(event) => handleUserFormSubmit(event, match.url)}>
        {formType === 'Register' && (
          <div className="form-group">
            <input
              name="username"
              className="form-control input-lg"
              type="text"
              placeholder="Enter a username"
              required={true}
              value={formData.username}
              onChange={handleFormChange}
            />
          </div>
        )}
        <div className="form-group">
          <input
            name="email"
            className="form-control input-lg"
            type="email"
            placeholder="Enter an email address"
            required={true}
            value={formData.email}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-group">
          <input
            name="password"
            className="form-control input-lg"
            type="password"
            placeholder="Enter a password"
            required={true}
            value={formData.password}
            onChange={handleFormChange}
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
