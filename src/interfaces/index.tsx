
export interface User {
    id?: string | '';
    name: string;
    email: string;
}


export interface UserRegister extends User {
    password: string;
}


export interface Publication {
    id : number;
    title: string;
    content: string;
    author: string;
    date: string;
}

export interface UserToken {
    email: string;
    password: string;
    device_name?: string;
}
