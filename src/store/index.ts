import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import { weatherApi } from "./weather/weather.api";
import { weatherReducer } from "./weather/weather.slice";

export const rootReducer = combineReducers({
    [weatherApi.reducerPath]: weatherApi.reducer,
    weather: weatherReducer
})

export const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(weatherApi.middleware)
    })
;

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
