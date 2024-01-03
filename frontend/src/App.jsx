import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { fetchTasks, deleteTask } from "./api/tasks";
import "./app.css";

const App = () => {
  const [tasks, setTasks] = useState([]);


  // useEffect(() => {
  //   fetch("http://localhost:3000/tasks")
  //        .then((resp) => resp.json())
  //        .then((response) => {
  //          setTasks(response);
  //        })
  //        .catch((error) => {
  //          console.error(error);
  //        });
  //    }, []);

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
      <h2 className="text">Užsiregistravę vartotojai{" "} <img
          src="https://ik.imagekit.io/mamabubu/images/1655619565-433se6jdkg1.jpeg?tr=w-850"
          alt="People"
        /></h2>  
      
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
        {task.name} - {task.email} - {task.year}
        { <button onClick={() => handleDeleteTask(task._id)}>Ištrinti</button> }
        </li>
        
      ))}
    </ul>
    
  </div>
  );
};

export default App;