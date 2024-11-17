import axios from 'axios';
import { Post, User, UserRegister, UserToken } from '../interfaces';


export const getPublications = async () => {
    const config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/posts',
        headers: { }
    };


    try {
        const response = await axios.request(config);
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw error;
    }
};


export const registerUser = async (user: UserRegister) => {
    const config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/v1/users',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: user
    };


    try {
        const response = await axios.request(config);
        return response;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw error;
    }
};


export const updateUser = async (user: User, token: string) => {
    console.log(user);
    
    const config = {
        method: 'put',
        url: `http://127.0.0.1:8000/api/v1/users/${user.id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: user
    };


    try {
        const response = await axios.request(config);
        return response;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw error;
    }
};


export const getToken = async (user: UserToken) => {

    user.device_name = 'web';
    console.log(user);
    const config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/token',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: user
    };

    try {
        const response = await axios.request(config);
        return response;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw error;
    }
};


export const storePost = async (post: Post, token: string, user_id: int) => {

    console.log(post);
    const config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/v1/posts',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: {...post, user_id}
    };

    try {
        const response = await axios.request(config);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw error;
    }
};
