import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import styles from "./header.module.scss";
import { useActions, useAppSelector, useDebounceButton } from "../../hooks";
import { Link, useLocation } from "react-router-dom";
import { useLazyGetWeekWeatherQuery } from "../../store/weather/weather.api";

export const Header: FC = () => {
    const [searchValue, setSearchValue] = useState<string>();
    const [userPosition, setUserPosition] = useState<number[]>();
    const [userLocation, setUserLocation] = useState<string>("");
    const [isPositionError, setIsPositionError] = useState(false);

    const submitButton = useRef<HTMLButtonElement>(null);
    const debounce = useDebounceButton(searchValue, 1000, submitButton);
    const location = useLocation();

    const { weather } = useAppSelector(state => state.weather);
    const { positionSuccess, positionError, setWeather } = useActions();
    const [trigger, { data }] = useLazyGetWeekWeatherQuery();

    const success: PositionCallback = (position) => {
        const { coords: { latitude, longitude } } = position;
        const res = [latitude, longitude];
        console.log(res);

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
            setUserLocation(userPosition?.join())
            // trigger({ location: userLocation });
            data && console.log(data);
        }
    }, [data, isPositionError, trigger, userLocation, userPosition]);

    useEffect(() => {

    }, [debounce]);

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setSearchValue(target.value);
    }

    const handleSubmit = () => {
        if (submitButton.current?.disabled) return;

        console.log('submit')
    }

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
