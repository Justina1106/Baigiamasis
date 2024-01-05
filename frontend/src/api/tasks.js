import axios from "axios";
import {API} from "./const";

export const fetchTasks = async (task) => {
    const response = await axios.get(`${API}/tasks`);
    return response.data;
};


export const createTask = async (task) => {
    const response = await axios.post(`${API}/tasks`, task);
    return response.data;
};

export const editTask = async (taskId, editedTask) => {
    const response = await axios.put(`${API}/tasks/${taskId}`, editedTask);
    return response.data;
  };

 export const deleteTask = async (taskId) => {
     const response = await axios.delete(`${API}/tasks/${taskId}`);
     return response.data;
   };