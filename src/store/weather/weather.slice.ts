import { createSlice } from "@reduxjs/toolkit";
import { IWeatherState } from "../../types/IWeatherState";
import { STORAGE_KEY } from "../../utils/constants";

const initialState: IWeatherState = {
    weather: null,
    positionError: false,
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather: (state: IWeatherState, action) => {
            state.weather = action.payload;

            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.weather));
        }
    }
});

const weatherAction = weatherSlice.actions;
const weatherReducer = weatherSlice.reducer;

export { weatherSlice, weatherAction, weatherReducer };
