import React, { FC, FormEvent, useEffect, useState } from 'react';
import styles from "./header.module.scss";
import { useAppSelector, useDebounce } from "../../hooks";
import { Link, useLocation } from "react-router-dom";
import { stateMock } from "../../mocks/WeatherResponseJson";

export const Header: FC = () => {
    const { weather } = useAppSelector(state => state.weather);

    const [searchValue, setSearchValue] = useState<string>();
    const debounce = useDebounce(searchValue, 1000);
    const location = useLocation();

    /*const [position, setPosition] = useState<number[]>();
    const [isPositionError, setIsPositionError] = useState(false);

    const [userLocation, setUserLocation] = useState<string>("");
    const [trigger, { data }] = useLazyGetWeekWeatherQuery();

    const success: PositionCallback = (position) => {
        const { coords: { latitude, longitude } } = position;

        setPosition([latitude, longitude]);
    }

    const error: PositionErrorCallback = (positionError) => {
        setIsPositionError(true);
    }

    useEffect(() => {
        const options: PositionOptions = {
            timeout: 5000,
            maximumAge: Infinity
        }
        navigator.geolocation.getCurrentPosition(success, error, options);

        position && trigger({ location: position?.join() });
    }, [setPosition]);*/

    useEffect(() => {
        // refetch TODO
        debounce && console.log(debounce)
    }, [debounce]);

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setSearchValue(target.value);
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
                        <button type="submit">
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
