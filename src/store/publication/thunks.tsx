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

            const dataUser: User = {
                id: register.data.data.attributes.id,
                name: register.data.data.attributes.name,
                email: register.data.data.attributes.email,
            }
            // Establecer usuario
            dispatch(setUser(dataUser));
            setTokenLocalStorage(register.data.token);
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

    const token = getTokenLocalStorage();
    const id = localStorage.getItem('id') as string;
    user.id = id;

    return async (dispatch: Dispatch) => {
        const res = await updateUser(user, token);

        const dataUser: User = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
        }
        // Establecer usuario
        dispatch(setUser(dataUser));
        setUserInLocalStorage(dataUser);

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
                    setTokenLocalStorage(register.data.token);
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




// Función para obtener el token o redirigir al inicio de sesión
export const getTokenOrRedirect = () => {
    const token = getTokenLocalStorage();
    if (!token) {
        window.location.href = '/login'; // Redirigir al usuario a la página de inicio de sesión
        throw new Error('Token expirado o no disponible');
    }
    return token;
};


const setTokenLocalStorage = (token: string) => {
    console.log('Guardando token en Local Storage:', token);
    
    localStorage.setItem('token', token);
}


const getTokenLocalStorage = () => {
    const token = localStorage.getItem('token') as string;
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
        const email = localStorage.getItem('email') as string;

        const user: User = { name, email, id };
        if (name && email) {
            dispatch(setUser(user));
        }
    };
};

