import { IWeatherResponse } from "../models";

export interface IWeatherState {
    weather: IWeatherResponse | null
    isPositionError: boolean,
    position?: number[]
}
