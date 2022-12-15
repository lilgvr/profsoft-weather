import React, { FC, lazy } from 'react';
import { IDay } from "../../../models";
import styles from "./day-card.module.scss";
import { getLocalizedDate } from "../../../utils";
import { useNavigate } from "react-router-dom";

const WeatherIcon = lazy(() => import('../../../components/weather-icon/WeatherIcon'));

const DayCard: FC<{ day: IDay }> = ({ day }) => {
    const { datetime, icon, conditions, temp, feelslike } = day;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/day/${ datetime }`)
    }

    return (
        <div
            className={ styles.dayCardCtr }
            onClick={ handleClick }
        >
            <p>{ getLocalizedDate(new Date(datetime)) }</p>
            <WeatherIcon
                icon={ icon }
                caption={ conditions }
                className={ styles.weatherIcon }
            />
            <p className={ styles.temp }>{ temp }</p>
            <p>Ощущается как <span>{ feelslike }</span></p>
        </div>
    );
};
export default DayCard;
