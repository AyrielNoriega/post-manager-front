
export interface User {
    id?: string | '';
    name: string;
    email: string;
}


export interface UserRegister extends User {
    password: string;
}


export interface Post {
    title: string;
    content: string;
}


export interface Publication extends Post {
    id : number;
    author: string;
    date: string;
}

export interface UserToken {
    email: string;
    password: string;
    device_name?: string;
}
