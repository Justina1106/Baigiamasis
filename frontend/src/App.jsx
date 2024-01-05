import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import EditForm from "./EditForm";
import { fetchTasks, deleteTask, editTask } from "./api/tasks";
import "./app.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);


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

  
  // const handleEditTask = (taskId, editedTask) => {
    const handleEditTask = (editedTask) => {
    // Funkcija, kuri vykdo redagavimą
    console.log("Submitting edited task:", editedTask);

  
    if (editedTask) {
      console.log("Edited Task:", editedTask);

    // editTask(taskId, editedTask)
    editTask(editedTask._id, editedTask)
      .then(() => {
        // Po sėkmingo redagavimo, atnaujiname vartotojų sąrašą
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === editedTask._id ? editedTask : task))
        );
        setEditingTask(null);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      console.error("Edited Task is undefined or null");
    } 
  };


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

    const handleStartEdit = (taskId) => {
      const taskToEdit = tasks.find((task) => task._id === taskId);
      setEditingTask(taskToEdit);
      setIsEditing(true);
    };
  
    const handleCancelEdit = () => {
      setEditingTask(null);
      setIsEditing(false);
    };

  return (
    <div className="container">
      <UserForm handleAddTask={handleAddTask} />
      <h2 className="text">Užsiregistravę vartotojai{" "} <img
          src="https://ik.imagekit.io/mamabubu/images/1655619565-433se6jdkg1.jpeg?tr=w-850"
          alt="People"
        /></h2>  
        {isEditing ? (
        <EditForm
          task={editingTask}
          handleEditTask={handleEditTask}
          handleCancelEdit={handleCancelEdit}
        />
      ) : (

    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
        {task.name} - {task.email} - {task.year}
        <button onClick={() => handleStartEdit(task._id)}>Redaguoti</button>
        <button onClick={() => handleDeleteTask(task._id)}>Ištrinti</button> 
        </li>
        
      ))}
    </ul>
      )}
  </div>
  );
};

export default App;