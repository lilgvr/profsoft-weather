import { IWeatherResponse } from "../models";

export interface IWeatherState {
    weather: IWeatherResponse | null
    positionError: boolean,
    position?: number[]
}
