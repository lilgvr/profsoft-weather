import React, { FC, useEffect, useState } from 'react';
import { useGetWeekWeatherQuery, useLazyGetWeekWeatherQuery } from "../../store/weather/weather.api";
import { useDebounce } from "../../hooks";

export const Header: FC = () => {
    const [position, setPosition] = useState<number[]>();
    const [isPositionError, setIsPositionError] = useState(false);
    const [searchValue, setSearchValue] = useState<string>();
    const [location, setLocation] = useState<string>("");

    const debounce = useDebounce(searchValue, 1000);
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

        // position && trigger({ location: position?.join() });
    }, [setPosition]);

    useEffect(() => {
        // refetch TODO
        // setLocation(data)
    }, [debounce]);

    return (
        <header>

        </header>
    );
};
