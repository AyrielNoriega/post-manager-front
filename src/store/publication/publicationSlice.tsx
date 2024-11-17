import { createSlice } from '@reduxjs/toolkit';
import { Publication, User } from '../../interfaces';



const initialState = {
    publications: [] as Publication[],
    user: {
        id: '',
        name: '',
        email: '',
    } as User,
};

export const publicationSlice = createSlice({
    name: 'publication',
    initialState,
    reducers: {
        setPublications: (state, action) => {
            state.publications = action.payload;
        },
        setUser: (state, action) => {
            console.log("en setUser", action.payload);
            state.user = action.payload;
        },

    }
});

// Action creators are generated for each case reducer function
export const {
    setPublications,
    setUser,
} = publicationSlice.actions;
