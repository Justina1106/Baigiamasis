import React, { useState, useEffect } from "react";

const EditForm = ({ task, handleEditTask, handleCancelEdit }) => {
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting edited task:", editedTask);
    handleEditTask(editedTask);
  };
  console.log("Edited Task:", editedTask);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Vardas ir Pavardė:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={editedTask.name}
        onChange={handleInputChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={editedTask.email}
        onChange={handleInputChange}
      />
      <label htmlFor="year">Gimimo data:</label>
      <input
        type="number"
        id="year"
        name="year"
        value={editedTask.year}
        onChange={handleInputChange}
      />
      <button type="submit">Išsaugoti</button>
      <button type="button" onClick={handleCancelEdit}>
        Atšaukti
      </button>
    </form>
  );
};

export default EditForm;
