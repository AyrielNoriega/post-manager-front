import axios from 'axios';
import { User, UserRegister, UserToken } from '../interfaces';


export const getPublications = async () => {
    const config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/publications/',
        headers: { }
    };


    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw error;
    }
};

