
export interface User {
    id?: string | '';
    name: string;
    username: string;
    email: string;
}


export interface UserRegister extends User {
    password: string;
}


export interface UserToken {
    username: string;
    password: string;
}