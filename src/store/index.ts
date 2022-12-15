import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import { weatherApi } from "./weather";
import { weatherReducer } from "./weather";
import { geolocationApi, geolocationReducer } from "./geolocation";

export const rootReducer = combineReducers({
    [weatherApi.reducerPath]: weatherApi.reducer,
    [geolocationApi.reducerPath]: geolocationApi.reducer,
    weather: weatherReducer,
    geolocation: geolocationReducer
})

export const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
            weatherApi.middleware,
            geolocationApi.middleware
        )
    })
;

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
