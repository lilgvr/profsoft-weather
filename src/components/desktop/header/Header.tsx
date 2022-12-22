import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import styles from "./header.module.scss";
import { useActions, useAppSelector, useDebounceButton } from "../../../hooks";
import { Link, useLocation } from "react-router-dom";
import { useLazyGetWeekWeatherQuery } from "../../../store/weather";
import { useLazyGetGeolocationByCoordinatesQuery } from "../../../store/geolocation";

export const Header: FC = () => {
    const [searchValue, setSearchValue] = useState<string>();

    const { setWeather, geolocationSuccess, geolocationError } = useActions();
    const submitButton = useRef<HTMLButtonElement>(null);
    const location = useLocation();

    const { weather } = useAppSelector(state => state.weather);
    const { geolocation, isError } = useAppSelector(state => state.geolocation);

    const [trigger, { data, error: weatherError }] = useLazyGetWeekWeatherQuery();
    const [geoTrigger, { data: geoData, error: geoError }] = useLazyGetGeolocationByCoordinatesQuery();

    const success: PositionCallback = (position) => {
        const { coords: { latitude, longitude } } = position;
        const res = [latitude, longitude];

        geolocationSuccess(res);
    }

    const error: PositionErrorCallback = (error) => {
        console.log(error.message);
        geolocationError(null);
    }

    useEffect(() => {
        const options: PositionOptions = {
            timeout: 5000,
            maximumAge: Infinity,
            enableHighAccuracy: true
        }
        console.log('render')
        navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);

    useEffect(() => { // fetch city name by [lat, lon]
        if (geolocation && !isError) {
            geoTrigger({ lat: geolocation[0], lon: geolocation[1] });
        }
    }, [trigger, geoTrigger, geolocation, isError]);

    useEffect(() => {
        if (geoData && !geoError) trigger({ location: geoData });

        data && console.log(data);

        setWeather(data);
    }, [geoData, trigger]);

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setSearchValue(target.value);
    }

    const handleSubmit = () => {
        if (submitButton.current?.disabled) return;

        trigger({ location: searchValue });
        if (weatherError) console.log(weatherError)
        data && console.log(data)
        setWeather(data);
    }


    /*const success: PositionCallback = (position) => {
        const { coords: { latitude, longitude } } = position;
        const res = [latitude, longitude];

        setUserPosition(res);
        positionSuccess(res);
    }

    const error: PositionErrorCallback = (error) => {
        console.log(error.message);
        setIsPositionError(true);
        positionError(null);
    }

    useEffect(() => {
            const options: PositionOptions = {
                timeout: 5000,
                maximumAge: Infinity,
                enableHighAccuracy: true
            }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }, [setUserPosition]);

    useEffect(() => {
        if (userPosition && !isPositionError) {
            geoTrigger({ lat: userPosition[0], lon: userPosition[1] });
            geoData && trigger({ location: geoData });

            data && console.log(data)
            setWeather(data);
        }
    }, [isPositionError, trigger, userPosition, geoData, geoTrigger]);

    useEffect(() => {
        if (geoData) {
            setGeolocation(geoData);
        }
    }, [geoData, setGeolocation]);

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setSearchValue(target.value);
    }

    const handleSubmit = () => {
        if (submitButton.current?.disabled) return;

        trigger({ location: searchValue });
        data && console.log(data)
        setWeather(data);
    }*/

    return (
        <header className={ styles.headerWrapper }>
            <div className={ styles.headerCtr }>
                <h1>Weather</h1>

                <div className={ styles.searchCtr }>
                    <div>
                        <label htmlFor="city-input">
                            Город:
                        </label>
                        <input
                            type="text"
                            name="city-input"
                            id="city-input"
                            onChange={ handleInputChange }
                        />
                        <button
                            type="submit"
                            ref={ submitButton }
                            onClick={ handleSubmit }
                        >
                            Поиск
                        </button>
                    </div>
                    {
                        location?.pathname === '/' ?
                            <Link to={ `/day/${ weather?.days[0].datetime }` }>Сегодня</Link> :
                            <Link to="/">Неделя</Link>
                    }
                </div>
            </div>
        </header>
    );
};
