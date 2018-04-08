import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
}

export default function UsersList(props) {
  const { users } = props

  return (
    <div>
      <h1>{'All Users'}</h1>
      <hr />
      <br />
      <Table striped={true} bordered={true} condensed={true} hover={true}>
        <thead>
          <tr>
            <th>{'User ID'}</th>
            <th>{'Email'}</th>
            <th>{'Username'}</th>
            <th>{'Active'}</th>
            <th>{'Admin'}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{String(user.active)}</td>
                <td>{String(user.admin)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}
