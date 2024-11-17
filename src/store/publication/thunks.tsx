import { Dispatch } from "redux";

import { getPublications, getToken, registerUser, updateUser } from "../../api";
import { setPublications, setUser } from "./publicationSlice";
import { User, UserRegister, UserToken } from "../../interfaces";

// Obtener todas las publicaciones
export const getAllPublications = () => {

    return async (dispatch: Dispatch) => {

        const res = await getPublications();

        dispatch(setPublications(res));

    };
};


// Registro usuario
export const register = (user: UserRegister, navigate: (path: string) => void) => {


    return async (dispatch: Dispatch) => {
        console.log('antes de registro', user);
        const res = await registerUser(user);
        console.log('despues de registro', res);

        // dispatch(setUser(res));
        if (res.status != 201) {
            console.log('No se registro el user', res.data);
        }

        //Obtener token
        const register = await getToken(user);
        if (register.status == 200) {
            const dataToken = {
                access_token: register.data.access_token,
                token_type: register.data.token_type,
            }

            const user_jwt: User = {
                id: user.id,
                name: user.name,
                email: user.email,
            }

            const dataUser: User = {
                id: user_jwt.id,
                name: user_jwt.name,
                email: user_jwt.email,
            }
            // Establecer usuario
            dispatch(setUser(dataUser));
            setTokenLocalStorage(dataToken.access_token);
            setUserInLocalStorage(dataUser);

            navigate('/');
        } else {
            // const data = {
            //     error: register.data.error,
            //     message: register.data.message,
            //     status : register.status
            // }
            console.log("No se pudo obtener el token", register.data);

        }
    };
};

// Actaulizar usuario
export const update = (user: User) => {

    const token = getTokenOrRedirect()
    const id = localStorage.getItem('id') as string;
    console.log(id);
    user.id = id;
    
    return async (dispatch: Dispatch) => {

        const res = await updateUser(user, token);

        console.log(res);
        // Establecer usuario
        dispatch(setUser(user));
        setUserInLocalStorage(user);

    };
};



// Función para autenticar al usuario y guardar el token en localStorage
export const authenticateUser = (user: UserToken, navigate: (path: string) => void) => {

    return async (dispatch: Dispatch) => {
        try {
                //Obtener token
                const register = await getToken(user);

                if (register.status == 200) {

                    const dataUser: User = {
                        id: register.data.data.attributes.id,
                        name: register.data.data.attributes.name,
                        email: register.data.data.attributes.email,
                    }

                    // Establecer usuario
                    dispatch(setUser(dataUser));
                    setTokenLocalStorage(register.data.data.token);
                    setUserInLocalStorage(dataUser);

                    navigate('/');
                } else {

                    console.log("No se pudo obtener el token", register.data);
                }
        } catch (error) {
            console.log('No se pudo autenticar al usuario', error);
        }
    };
};


// Función para verificar si el token ha expirado
const isTokenExpired = (token: string) => {
    try {
        // const { exp } = jwtDecode<{ exp: number }>(token);
        // if (Date.now() >= exp * 1000) {
        //     return true;
        // }
        return false;
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return true;
    }
};


// Función para obtener el token o redirigir al inicio de sesión
export const getTokenOrRedirect = () => {
    const token = getTokenLocalStorage();
    if (!token || isTokenExpired(token)) {
        window.location.href = '/login'; // Redirigir al usuario a la página de inicio de sesión
        throw new Error('Token expirado o no disponible');
    }
    return token;
};


const setTokenLocalStorage = (token: string) => {
    localStorage.setItem('token', token);
}


const getTokenLocalStorage = () => {
    const token = localStorage.getItem('token');
    console.log('Token obtenido de Local Storage:', token);
    return token;
}


// guardar usuario en local storage
export const setUserInLocalStorage = (user: User) => {
    localStorage.setItem('id', user.id as string);
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
};


export const fetchUserFromLocalStorage = () => {
    console.log('Obteniendo usuario de Local Storage');
    
    return (dispatch: Dispatch) => {
        const id = localStorage.getItem('id') as string;
        const name = localStorage.getItem('name') as string;
        const username = localStorage.getItem('username') as string;
        const email = localStorage.getItem('email') as string;

        const user: User = { name, email, id };
        if (name && username && email) {
            dispatch(setUser(user));
        }
    };
};
