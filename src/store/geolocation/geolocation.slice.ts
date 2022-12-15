import { createSlice } from "@reduxjs/toolkit";
import { IGeolocationState } from "../../types";

const initialState: IGeolocationState = {
    geolocation: null
}

const geolocationSlice = createSlice({
    name: 'geolocation',
    initialState,
    reducers: {
        setGeolocation: (state, action) => {
            state.geolocation = action.payload;
        }
    }
})

const geolocationActions = geolocationSlice.actions;
const geolocationReducer = geolocationSlice.reducer;

export { geolocationActions, geolocationReducer }
