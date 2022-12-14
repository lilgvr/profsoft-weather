export interface IDay {
    datetime: string,
    conditions: string,
    feelslike: number,
    humidity: number,
    icon: string,
    sunrise: string,
    sunset: string,
    temp: number,
    windspeed: number,
    pressure: number,
    winddir: number,
    hours: HourType[]
}

export type HourType = Omit<IDay, "hours" | "sunset" | "sunrise">

export interface IWeatherResponse {
    resolvedAddress: string,
    days: IDay[],
}
