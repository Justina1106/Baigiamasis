import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { fetchUsers } from "./api/users";

const App = () => {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3000/users")
  //   .then((resp) => resp.json())
  //   .then((response) => {
  //     setUsers(response);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }, []);

  useEffect(() => {
    fetchUsers()
    .then((response) => {
      setUsers(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const handleAddUser = (user) => {
    setUsers(prevUsers => [...prevUsers, user])
  }

  console.log(users);

  return (
    <div>
      <UserForm handleAddUser={handleAddUser} />
    <ul>
      {users.map((user) => (
        <li key={user.name}>{user.name}</li>
      ))}
    </ul>
  </div>
  );
};

export default App;