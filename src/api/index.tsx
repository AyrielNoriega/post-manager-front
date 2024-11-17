import axios from 'axios';


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

