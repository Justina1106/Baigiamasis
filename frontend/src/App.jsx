import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { fetchTasks, deleteTask } from "./api/tasks";
import "./app.css";

const App = () => {
  const [tasks, setTasks] = useState([]);


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

  const handleDeleteTask = (taskId) => {
    // Funkcija ištrinanti vartotoją
    deleteTask(taskId)
      .then(() => {
        // Po sėkmingo ištrynimo, atnaujiname vartotojų sąrašą
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <UserForm handleAddTask={handleAddTask} />
      <h2 className="text">Užsiregistravę vartotojai</h2>  
      
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          {task.name} - {task.email} - {task.gimimodata}{" "}
          <button onClick={() => handleDeleteTask(task._id)}>Ištrinti</button>
          </li>
        
      ))}
    </ul>
    
  </div>
  );
};

export default App;