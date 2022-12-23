import React, { FC, Fragment, useEffect, useState } from 'react';
import styles from "./carousel.module.scss";
import { useAppSelector } from "../../../hooks";
import { CarouselIndicator, CarouselDot } from "./CarouselIndicator";
import { ErrorBlock } from "../../../components/common/error-block";
import { getLocalizedDate } from "../../../utils";
import { IDay } from "../../../models";
import WeatherIcon from "../../../components/common/weather-icon/WeatherIcon";

export const Carousel: FC = () => {
    const { weather } = useAppSelector(state => state.weather);
    const [dayIndex, setDayIndex] = useState(0);
    const [currentDay, setCurrentDay] = useState<IDay>();

    useEffect(() => {
        if (weather) {
            setCurrentDay(weather.days[dayIndex]);
        }
    }, [dayIndex, weather]);

    return (
        <>
            {
                weather && currentDay ?
                    <section className={ styles.carouselCtr }>
                        {/*
                            dots
                            date
                            temp icon
                            feelslike
                            conditions

                            -----------
                            measure
                            measure
                            measure
                            -----------*/ }


                        <CarouselIndicator>
                            {
                                weather.days.map(
                                    (day, index) =>
                                        <CarouselDot
                                            key={ `${ day.datetime }-dot` }
                                            active={ index === dayIndex }
                                        />
                                )
                            }
                        </CarouselIndicator>

                        <div className={ styles.carousel }>
                            <p>{ getLocalizedDate(new Date(currentDay.datetime)) }</p>

                            <div className={ styles.carouselTemp }>
                                <p>{ currentDay.temp }</p>
                                <WeatherIcon icon={ currentDay.icon }/>
                            </div>

                            <div className={ styles.carouselInfo }>
                                <p>Ощущается как <span>{ currentDay.feelslike }</span></p>
                                <p>{ currentDay.conditions }</p>
                            </div>

                            <div className={ styles.carouselMeasures }>

                            </div>
                        </div>
                    </section>
                    : <ErrorBlock message=""/>
            }
        </>
    );
};
