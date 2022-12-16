import { createSlice } from "@reduxjs/toolkit";
import { IGeolocationState } from "../../types";

const initialState: IGeolocationState = {
    geolocation: null,
    isError: false
}

const geolocationSlice = createSlice({
    name: 'geolocation',
    initialState,
    reducers: {
        geolocationSuccess: (state, action) => {
            state.geolocation = action.payload;
            state.isError = false;
        },
        geolocationError: (state, action) => {
            state.geolocation = null;
            state.isError = true;
        }
    }
})

const geolocationActions = geolocationSlice.actions;
const geolocationReducer = geolocationSlice.reducer;

export { geolocationActions, geolocationReducer }
