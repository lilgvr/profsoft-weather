import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "../../utils/constants";
import { IWeatherResponse } from "../../models";
import { fromResponseDto } from "../../utils/factories/weather.factory";

const weatherApiOptions = {
    reducerPath: 'weather/api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    refetchOnFocus: true,
}

const weatherElements = [
    "datetime",
    "conditions",
    "feelslike",
    "humidity",
    "icon",
    "sunrise",
    "sunset",
    "temp",
    "windspeed",
    "pressure",
    "hours",
    "winddir"
]

const baseQueryParams = {
    'unitGroup': 'metric',
    'key': process.env.REACT_APP_API_KEY,
    'contentType': 'json',
    'lang': 'ru',
    'elements': weatherElements.join()
}

export const weatherApi = createApi({
    ...weatherApiOptions,
    endpoints: build => ({
        getWeekWeather: build.query({
            query: (args) => {
                return {
                    url: `/${ args.location }/next6days`,
                    params: {
                        ...baseQueryParams
                    }
                }
            },
            transformResponse: (response: IWeatherResponse) => fromResponseDto(response)
        }),
    })
});

export const {
    useGetWeekWeatherQuery
} = weatherApi;