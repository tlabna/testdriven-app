import React from 'react'
import PropTypes from 'prop-types'

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
}

export default function UsersList(props) {
  const { users } = props

  return (
    <div>
      {users.map((user) => {
        return (
          <h4 key={user.id} className="card card-body bg-light">
            {user.username}
          </h4>
        )
      })}
    </div>
  )
}
