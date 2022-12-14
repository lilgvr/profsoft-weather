import { IWeatherResponse } from "../../models";

export const fromResponseDto = (dto: IWeatherResponse): IWeatherResponse => ({
    resolvedAddress: dto.resolvedAddress,
    days: dto.days.map(day => ({
        ...day,
        feelslike: Math.round(day?.feelslike), // celsius
        humidity: Math.round(day?.humidity), // %
        temp: Math.round(day?.temp), // celsius
        windspeed: Math.round(day?.windspeed / 3.6), // m/s
        pressure: Math.round(day?.pressure * 767.3 / 1000), // mmHg

        hours: day?.hours?.map(hour => ({
            ...hour,
            feelslike: Math.round(hour?.feelslike),
            humidity: Math.round(hour?.humidity),
            temp: Math.round(hour?.temp),
            windspeed: Math.round(hour?.windspeed / 3.6),
            pressure: Math.round(hour?.pressure * 767.3 / 1000),
        }))
    })),
})

