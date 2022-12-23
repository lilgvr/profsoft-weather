import React, { FC, FormEvent, useState } from 'react';
import styles from "./header-mobile.module.scss";
import { SvgIcon } from "../../common/svg-icon";
import { useLocation, useNavigate } from "react-router-dom";
import { useActions, useAppSelector } from "../../../hooks";
import { useLazyGetWeekWeatherQuery } from "../../../store/weather";

export const HeaderMobile: FC = () => {
    const { weather } = useAppSelector(state => state.weather);
    const [trigger, { data, error: weatherError }] = useLazyGetWeekWeatherQuery();
    const { setWeather } = useActions();

    const [isSearching, setIsSearching] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const handleTodayClick = (path: "today" | "week") => {
        const today = weather?.days[0].datetime
        if (!today) return;
        navigate(path === "today" ? `/day/${ today }` : "/");
    }

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setSearchValue(target.value);
    }

    const handleSearchInactiveClick = () => {
        setIsSearching(true);
    }

    const handleSearchActiveClick = () => {
        trigger({ location: searchValue });
        if (weatherError) console.log(weatherError)
        if (data) {
            console.log(data);
            setSearchValue("");
        }
        setWeather(data);
    }

    const handleCloseClick = () => {
        setIsSearching(false);
        setSearchValue("");
    }

    return (
        <header className={ styles.headerMobileWrapper }>
            <div className={ styles.headerMobileCtr }>
                {
                    !isSearching ?
                        <>
                            <SvgIcon name={ location.pathname === "/" ? "today" : "week" }
                                     onClick={
                                         () => {
                                             handleTodayClick(location.pathname === "/" ? "today" : "week")
                                         }
                                     }/>
                            <h1>Weather</h1>
                        </> :
                        <>
                            <SvgIcon name="close" onClick={ handleCloseClick }/>
                            <input type="text" onChange={ handleInputChange }/>
                        </>

                }
                <SvgIcon name="search" onClick={ isSearching ? handleSearchActiveClick : handleSearchInactiveClick }/>
            </div>
        </header>
    );
};
