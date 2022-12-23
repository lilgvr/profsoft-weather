import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import styles from "./header.module.scss";
import { useActions, useAppSelector } from "../../../hooks";
import { Link, useLocation } from "react-router-dom";
import { useLazyGetWeekWeatherQuery } from "../../../store/weather";
import { useLazyGetGeolocationByCoordinatesQuery } from "../../../store/geolocation";
import { SvgIcon } from "../../common/svg-icon";

export const Header: FC = () => {
    const [searchValue, setSearchValue] = useState<string>();

    const { setWeather, geolocationSuccess, geolocationError } = useActions();

    const { weather } = useAppSelector(state => state.weather);
    const { geolocation, isError } = useAppSelector(state => state.geolocation);

    const [trigger, { data, error: weatherError, isSuccess }] = useLazyGetWeekWeatherQuery();
    const [geoTrigger, {
        data: geoData,
        error: geoError,
        isSuccess: isGeoSuccess,
    }] = useLazyGetGeolocationByCoordinatesQuery();

    const location = useLocation();

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

    /*
    * ================= Handlers =================
    *
    * */

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setSearchValue(() => target.value);
    }

    const handleSubmit = () => {
        const fetch = async () => {
            await trigger({ location: searchValue });
            if (data) setWeather(data);
        }

        fetch();
    }

    const handleLocationClick = () => {
        getGeolocation();
    }

    return (
        <header className={ styles.headerWrapper }>
            <div className={ styles.headerCtr }>
                <h1>Weather</h1>

                <div className={ styles.searchCtr }>
                    <SvgIcon name="location" onClick={ handleLocationClick }/>
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
