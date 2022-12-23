import { createSlice } from "@reduxjs/toolkit";
import { IWeatherState } from "../../types";
import { STORAGE_KEY } from "../../utils/constants";

const initialState: IWeatherState = JSON.parse(localStorage.getItem(STORAGE_KEY) as string) ?? {
    weather: null
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather: (state, action) => {
            state.weather = action.payload;
        },
    }
});

const weatherActions = weatherSlice.actions;
const weatherReducer = weatherSlice.reducer;

export { weatherSlice, weatherActions, weatherReducer };
