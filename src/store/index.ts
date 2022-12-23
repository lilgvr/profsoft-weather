import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import { weatherApi, weatherReducer } from "./weather";
import { geolocationApi, geolocationReducer } from "./geolocation";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
    [weatherApi.reducerPath]: weatherApi.reducer,
    [geolocationApi.reducerPath]: geolocationApi.reducer,
    weather: weatherReducer,
    geolocation: geolocationReducer
})

const persistConfig = {
    key: 'weather',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(
            thunk,
            weatherApi.middleware,
            geolocationApi.middleware
        ),
    })
;

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
