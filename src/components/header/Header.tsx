import React, { FC, useEffect, useState } from 'react';
import { useGetWeekWeatherQuery } from "../../store/weather/weather.api";
import { useDebounce } from "../../hooks";

export const Header: FC = () => {
    const [position, setPosition] = useState<number[]>();
    const [isPositionError, setIsPositionError] = useState(false);
    const [searchValue, setSearchValue] = useState<string>();
    const [location, setLocation] = useState<string>();

    const debounce = useDebounce(searchValue, 1000);
    const { data: weather } = useGetWeekWeatherQuery({ location });

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
            maximumAge: 0
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }, [setPosition]);

    useEffect(() => {
        weather && console.log(weather);
        position && console.log(position);
    }, [position, weather]);

    return (
        <header>

        </header>
    );
};
