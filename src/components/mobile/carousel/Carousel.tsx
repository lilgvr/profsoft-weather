import React, { FC, useEffect, useState } from 'react';
import styles from "./carousel.module.scss";
import { useAppSelector } from "../../../hooks";
import { CarouselDot, CarouselIndicator } from "./CarouselIndicator";
import { ErrorBlock } from "../../common/error-block";
import { getLocalizedDate } from "../../../utils";
import { IDay } from "../../../models";
import { useSwipeable } from "react-swipeable";
import { SvgIcon } from "../../common/svg-icon";

export const Carousel: FC = () => {
    const { weather } = useAppSelector(state => state.weather);
    const [dayIndex, setDayIndex] = useState(0);
    const [currentDay, setCurrentDay] = useState<IDay>();
    const swipeHandlers = useSwipeable({
        onSwipedRight: () => {
            if (dayIndex === 0) return;
            setDayIndex(prevState => prevState - 1);
        },
        onSwipedLeft: () => {
            if (weather && dayIndex === weather.days.length - 1) return;
            setDayIndex(prevState => prevState + 1);
        }
    });

    useEffect(() => {
        if (weather) {
            setCurrentDay(() => weather.days[dayIndex]);
        }
    }, [dayIndex, weather]);

    return (
        <>
            {
                weather && currentDay ?
                    <section className={ styles.carouselCtr }>
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

                        <div className={ styles.carousel } { ...swipeHandlers }>
                            <p>{ getLocalizedDate(new Date(currentDay.datetime)) }</p>

                            <div className={ styles.carouselTemp }>
                                <p>{ currentDay.temp }</p>
                                <SvgIcon
                                    name={ `weather/${ currentDay.icon }` }
                                    width="10vh"
                                />
                            </div>

                            <div className={ styles.carouselInfo }>
                                <p>Ощущается как <span>{ currentDay.feelslike }</span></p>
                                <p>{ currentDay.conditions }</p>
                            </div>
                        </div>

                        <div className={ styles.carouselMeasures }>

                        </div>
                    </section>
                    : <ErrorBlock message=""/>
            }
        </>
    );
};
