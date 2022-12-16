import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../utils/constants";
import { IWeatherResponse } from "../../models";
import { fromResponseDto } from "../../utils";

const weatherApiOptions = {
    reducerPath: 'weather/api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    // refetchOnFocus: true,
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
            query: (args) => ({
                url: `/${ args.location }/next6days`,
                params: {
                    ...baseQueryParams
                }
            }),
            transformResponse: (response: IWeatherResponse) => fromResponseDto(response)
        }),
    })
});

export const {
    useGetWeekWeatherQuery,
    useLazyGetWeekWeatherQuery
} = weatherApi;
