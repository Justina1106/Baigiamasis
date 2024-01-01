import axios from "axios";
import {API} from "./const";

export const fetchUsers = async (user) => {
    const response = await axios.get(`${API}/users`);
    return response.data;
};


export const createUser = async (user) => {
    const response = await axios.post(`${API}/users`, user);
    return response.data;
};