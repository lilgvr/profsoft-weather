import { createSlice } from "@reduxjs/toolkit";
import { IWeatherState } from "../../types/IWeatherState";
import { STORAGE_KEY } from "../../utils/constants";

const initialState: IWeatherState = {
    weather: null,
    isPositionError: false,
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather: (state, action) => {
            state.weather = action.payload;

            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        },
        positionSuccess: (state, action) => {
            state.isPositionError = false;
            state.position = action.payload.position;

            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        },
        positionError: (state, action) => {
            state.isPositionError = true;
            state.position = undefined;

            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        },
    }
});

const weatherActions = weatherSlice.actions;
const weatherReducer = weatherSlice.reducer;

export { weatherSlice, weatherActions, weatherReducer };
