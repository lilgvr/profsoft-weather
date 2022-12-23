import React, { FC, FormEvent, useState } from 'react';
import styles from "./header.module.scss";
import { useAppSelector } from "../../../hooks";
import { Link, useLocation } from "react-router-dom";
import { SvgIcon } from "../../common/svg-icon";
import { GetWeather } from "../../common/get-weather/GetWeather";

export const Header: FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [submitClick, setSubmitClick] = useState(false);
    const [locationClick, setLocationClick] = useState(false);

    const { weather } = useAppSelector(state => state.weather);

    const location = useLocation();

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setSearchValue(() => target.value);
    }

    const handleSubmit = () => {
        setSubmitClick(!submitClick);
    }

    const handleLocationClick = () => {
        setLocationClick(!locationClick);
    }

    return (
        <header className={ styles.headerWrapper }>
            <GetWeather searchValue={ searchValue } handlers={ { submitClick, locationClick } }/>
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
