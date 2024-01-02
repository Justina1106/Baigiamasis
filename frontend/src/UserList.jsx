import React from 'react';
import PropTypes from 'prop-types';

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Užsiregistravę Vartotojai</h2>
      <table>
        <thead>
          <tr>
            <th>Vardas</th>
            <th>El. paštas</th>
            <th>Amžius</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                {/* Čia įdėkite mygtukus redagavimui ir trynimui */}
                {/* Pvz.: <button onClick={() => handleEditUser(user)}>Redaguoti</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
