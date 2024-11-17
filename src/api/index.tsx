// import axios from 'axios';
import { Publication } from '../interfaces';


export const getPublications = async () => {
    // const config = {
    //     method: 'get',
    //     url: 'http://127.0.0.1:8000/api/v1/publications/',
    //     headers: { }
    // };


    try {
        // const response = await axios.request(config);
        const data: Publication[] = [
            {
                "id": 1,
                "title": "Quibusdam natus consequatur necessitatibus aut.",
                "content": "Et eum nam autem voluptate ut. Laudantium distinctio dolores officia consequatur ea. Soluta voluptas at reprehenderit error. Sit eum molestiae qui facere accusamus. Incidunt sed ipsum inventore sed voluptas autem quos corrupti.",
                "author": 'ayrie s',
                "date": "2024-11-17T00:16:34.000000Z",
            },
            {
                "id": 2,
                "title": "Unde recusandae adipisci soluta enim porro.",
                "content": "Sed qui non quo quia saepe. Corrupti culpa doloribus voluptatem animi expedita consequuntur et. Vero possimus laborum voluptatibus recusandae deserunt distinctio pariatur et. Accusantium aspernatur vel dignissimos sit harum et tempora praesentium.",
                "author": 'ayrie s',
                "date": "2024-11-17T00:16:34.000000Z",
            },
            {
                "id": 3,
                "title": "Culpa delectus possimus architecto aut vel.",
                "content": "Voluptas molestiae velit eveniet corporis iste ipsam. Vel velit earum quaerat minus. Sequi consequuntur voluptatem non aut voluptatibus. Cumque eum harum quia aut nemo incidunt rerum odio.",
                "author": 'ayrie s',
                "date": "2024-11-17T00:16:34.000000Z",
            },
            {
                "id": 4,
                "title": "Laborum perspiciatis recusandae velit quae.",
                "content": "Consequatur voluptas est fuga omnis autem ut. Labore eum quo atque. Incidunt omnis qui dolor.",
                "author": 'ayrie s',
                "date": "2024-11-17T00:16:34.000000Z",
            },
            {
                "id": 5,
                "title": "Ratione tempora blanditiis adipisci commodi qui officia.",
                "content": "Illo impedit soluta veniam eius facilis. Temporibus similique quia magni omnis veritatis quod. Corporis omnis ipsam velit accusantium. Totam explicabo quaerat unde rerum est. Illum repellat consequuntur nemo cupiditate.",
                "author": 'ayrie s',
                "date": "2024-11-17T00:16:34.000000Z",
            },
            {
                "id": 6,
                "title": "Tigulo de post",
                "content": "cotnendio post",
                "author": 'ayrie s',
                "date": "2024-11-17T00:25:15.000000Z",
            }
        ]
        // return response.data;
        return data;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw error;
    }
};

