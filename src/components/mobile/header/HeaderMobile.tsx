import React, { FC, FormEvent, useState } from 'react';
import styles from "./header-mobile.module.scss";
import { SvgIcon } from "../../common/svg-icon";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { GetWeather } from "../../common/get-weather/GetWeather";

export const HeaderMobile: FC = () => {
    const { weather } = useAppSelector(state => state.weather);

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

    const handleSearchClick = () => {
        setIsSearching(!isSearching);
    }

    const handleCloseClick = () => {
        setIsSearching(false);
        setSearchValue("");
    }

    return (
        <header className={ styles.headerMobileWrapper }>
            <GetWeather searchValue={ searchValue } handlers={ { mobileSearchClick: isSearching } }/>
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
                <SvgIcon name="search" onClick={ handleSearchClick }/>
            </div>
        </header>
    );
};
