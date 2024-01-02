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