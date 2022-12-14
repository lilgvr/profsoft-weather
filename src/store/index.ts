import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import { weatherApi } from "./weather/weather.api";

export const store = configureStore({
    reducer: {
        [weatherApi.reducerPath]: weatherApi.reducer,
        // weather: weatherReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(weatherApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
