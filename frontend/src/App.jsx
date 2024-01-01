
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Užkraunama esami vartotojai
    axios.get('/api/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleRegistration = () => {
    // Vartotojo registracija
    axios.post('/api/users', { name, email, age }).then((response) => {
      setUsers([...users, response.data]);
    });
  };

  return (
    <div>
      <h1>Renginių Organizavimo Programa</h1>
      <div>
        <h2>Registracija</h2>
        <label>Vardas:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <br />
        <label>El. paštas:</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Amžius:</label>
        <input type="text" onChange={(e) => setAge(e.target.value)} />
        <br />
        <button onClick={handleRegistration}>Registruotis</button>
      </div>
      <div>
        <h2>Užsiregistravę vartotojai</h2>
        <table>
          <thead>
            <tr>
              <th>Vardas</th>
              <th>El. paštas</th>
              <th>Amžius</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
