import React, { FC, useCallback, useEffect, useState } from 'react';
import { useActions, useAppSelector } from "../../../hooks";
import { useLazyGetWeekWeatherQuery } from "../../../store/weather";
import { useLazyGetGeolocationByCoordinatesQuery } from "../../../store/geolocation";

type HandlerTypes = "submitClick" | "locationClick" | "mobileSearchClick";

type Handlers = {
    [title in HandlerTypes]?: boolean;
};

export const GetWeather: FC<{ searchValue: string, handlers?: Handlers }> = ({ searchValue, handlers }) => {
    const { geolocation } = useAppSelector(state => state.geolocation);
    const { setWeather, geolocationSuccess, geolocationError } = useActions();

    const [trigger, { data, error: weatherError }] = useLazyGetWeekWeatherQuery();
    const [geoTrigger, { data: geoData, }] = useLazyGetGeolocationByCoordinatesQuery();
    const [geoSuccess, setGeoSuccess] = useState(false);
    const [geoError, setGeoError] = useState(false);
    const [coords, setCoords] = useState<number[]>([]);

    const getGeolocation = useCallback(() => { // get user geolocation
        const success: PositionCallback = (position) => {
            const { latitude, longitude } = position.coords
            setCoords([latitude, longitude]);
            setGeoSuccess(true);
            setGeoError(false);

            // geolocationSuccess([latitude, longitude]);
        }

        const error: PositionErrorCallback = (error) => {
            console.log(error.message);
            setGeoError(true);
            setGeoSuccess(false);
            // geolocationError(null);
        }

        const options: PositionOptions = {
            timeout: 5000,
            maximumAge: Infinity,
            enableHighAccuracy: true
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);

    useEffect(() => {
        if (geoSuccess) geolocationSuccess(coords);
    }, [coords, geoSuccess]);

    useEffect(() => {
        if (geoError) geolocationError(null);
    }, [coords, geoError]);

    const fetchSearch = useCallback(async () => {
        if (searchValue) {
            await trigger({ location: searchValue });
            if (data) {
                setWeather(data);
            }
        }
    }, [searchValue]);

    const fetchGeolocation = useCallback(async () => {
        if (geolocation) {
            await geoTrigger({ lat: geolocation[0], lon: geolocation[1] });

            if (geoData) {
                await trigger({ location: geoData });
                if (weatherError) console.log(weatherError)
                if (data) setWeather(data);
            }
        }
    }, [geolocation]);

    useEffect(() => {
        getGeolocation();
        fetchGeolocation();
    }, [handlers?.locationClick]);

    useEffect(() => {
        if (searchValue) fetchSearch()
    }, [handlers?.submitClick]);

    useEffect(() => {
        if (searchValue) fetchSearch();
    }, [handlers?.mobileSearchClick]);

    return (<></>);
};
