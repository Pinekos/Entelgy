import axios from "axios";

const USERS_URL = 'http://localhost:8081/api/users';

export const findAllUsers = async () => {
    try {
        const response = await axios.get(USERS_URL);
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const createUser = async ({ username, password, email }) => {
    try {
        const response = await axios.post(USERS_URL, {
            username,
            password,
            email
        });
        return response;
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export const updateUser = async ({ username, password, email }) => {
    try {
        const response = await axios.put(`${USERS_URL}/${id}`, {
            username,
            password,
            email
        });
        return response;
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export const removeUser = async (id) => {

    try {
        await axios.delete(`${USERS_URL}/${id}`);
    } catch (error) {
        console.log(error);
    }
}
/*
export const login = (user) => {
    return axios.post(`${API_URL}/login`, user);
}*/

