import { ThunkAction, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action, combineReducers } from 'redux';

import { authSlice } from '@/features/auth';

const reducers = {
    [authSlice.name]: authSlice.reducer,
};

const reducer = combineReducers(reducers);

const makeStore = () =>
    configureStore({
        reducer,
        devTools: true,
        middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;
export type RootState = ReturnType<typeof reducer>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
