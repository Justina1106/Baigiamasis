import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { fetchUsers } from "./api/users";
import { fetchTasks } from "./api/tasks";

const App = () => {
  const [tasks, setTasks] = useState([]);

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
    fetchTasks()
    .then((response) => {
      setTasks(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const handleAddTask = (task) => {
    setTasks(prevTasks => [...prevTasks, task])
  }

  console.log(tasks);

  return (
    <div>
      <UserForm handleAddTask={handleAddTask} />
    <ul>
      {tasks.map((task) => (
        <li key={task.name}>{task.name}</li>
      ))}
    </ul>
  </div>
  );
};

export default App;