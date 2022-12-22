import React, { FC } from 'react';
import styles from "./header-mobile.module.scss";
import { SvgIcon } from "../../svg-icon/SvgIcon";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks";

export const HeaderMobile: FC = () => {
    const { weather } = useAppSelector(state => state.weather);

    const navigate = useNavigate();
    const handleTodayClick = () => {
        navigate(`/day/${ weather?.days[0].datetime }`);
    }

    return (
        <header className={ styles.headerMobileWrapper }>
            <SvgIcon path="" onClick={ handleTodayClick }/>
            <h1>Weather</h1>
            <SvgIcon path=""/>
        </header>
    );
};
