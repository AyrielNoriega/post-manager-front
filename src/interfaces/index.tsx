
export interface User {
    id?: string | '';
    name: string;
    username: string;
    email: string;
}

export interface Publication {
    id : number;
    title: string;
    content: string;
    author: string;
    date: string;
}