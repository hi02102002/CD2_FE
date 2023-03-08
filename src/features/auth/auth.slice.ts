import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

type InitialState = {
    user: any;
    accessToken: string | undefined | null;
};

const initialState: InitialState = {
    user: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setState: (
            state,
            action: PayloadAction<{
                user: any;
                accessToken: string;
            }>,
        ) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.subject,
            };
        },
    },
});

export const { setState } = authSlice.actions;

export default authSlice;
