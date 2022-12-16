import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { GEO_API_URL } from "../../utils/constants";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IGeolocationResponse } from "../../models";
import { fromGeoResponseDto } from "../../utils/factories/geolocation.factory";

const geolocationApiOptions = {
    reducerPath: 'geolocation/api',
    baseQuery: fetchBaseQuery({
        baseUrl: GEO_API_URL
    }),
    // refetchOnFocus: true,
}

export const geolocationApi = createApi({
    ...geolocationApiOptions,
    endpoints: build => ({
        getGeolocationByCoordinates: build.query({
            query: (args) => ({
                url: '/reverse',
                params: {
                    'lat': args.lat,
                    'lon': args.lon,
                    'appid': process.env.REACT_APP_GEO_API_KEY,
                    'limit': 1
                }
            }),
            transformResponse: (response: IGeolocationResponse) => fromGeoResponseDto(response)
        }),
    })
});

export const { useGetGeolocationByCoordinatesQuery, useLazyGetGeolocationByCoordinatesQuery } = geolocationApi;
