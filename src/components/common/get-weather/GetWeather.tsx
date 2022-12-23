import React, { FC, useCallback, useEffect } from 'react';
import { useActions, useAppSelector } from "../../../hooks";
import { useLazyGetWeekWeatherQuery } from "../../../store/weather";
import { useLazyGetGeolocationByCoordinatesQuery } from "../../../store/geolocation";

type HandlerTypes = "submitClick" | "locationClick" | "mobileSearchClick";

type Handlers = {
    [title in HandlerTypes]?: boolean;
};

export const GetWeather: FC<{ searchValue: string, handlers?: Handlers }> = ({ searchValue, handlers }) => {
    const { geolocation, isError } = useAppSelector(state => state.geolocation);
    const { setWeather, geolocationSuccess, geolocationError } = useActions();

    const [trigger, { data }] = useLazyGetWeekWeatherQuery();
    const [geoTrigger, {
        data: geoData,
        isSuccess: isGeoSuccess,
    }] = useLazyGetGeolocationByCoordinatesQuery();

    const getGeolocation = useCallback(() => { // get user geolocation
        const success: PositionCallback = (position) => {
            const { latitude, longitude } = position.coords;

            geolocationSuccess([latitude, longitude]);
        }

        const error: PositionErrorCallback = (error) => {
            console.log(error.message);
            geolocationError(null);
        }

        const options: PositionOptions = {
            timeout: 5000,
            maximumAge: Infinity,
            enableHighAccuracy: true
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);

    useEffect(() => {
        getGeolocation();
    }, []);

    useEffect(() => { // fetch city name and weather
        const fetch = async () => {
            if (geolocation) {
                await geoTrigger({ lat: geolocation[0], lon: geolocation[1] });

                if (geoData) {
                    await trigger({ location: geoData });
                    if (data) setWeather(data)
                }
            }
        }

        fetch()
    }, [isGeoSuccess, geolocation, isError]);

    useEffect(() => {
        getGeolocation();
    }, [handlers?.locationClick]);

    const fetch = useCallback(async () => {
        if (searchValue) {
            await trigger({ location: searchValue });
            if (data) setWeather(data);
        }
    }, [data, searchValue, setWeather, trigger]);

    useEffect(() => {
        fetch()
    }, [handlers?.submitClick]);

    useEffect(() => {
        if (!handlers?.mobileSearchClick) fetch();
    }, [handlers?.mobileSearchClick]);

    return (<></>);
};
