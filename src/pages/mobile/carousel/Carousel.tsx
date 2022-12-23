import React, { FC, useState } from 'react';
import styles from "./carousel.module.scss";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { IDay } from "../../../models";

export const Carousel: FC = () => {
    const { weather } = useAppSelector(state => state.weather);
    const [currentDay, setCurrentDay] = useState<IDay>();
    const [cityData, setCityData] = useState<string[]>();

    return (
        <section className={ styles.carouselCtr }>
            {/* h2 city
            h3 region

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

            <div>
                <h2></h2>
                <h3></h3>
            </div>
            <div>
                dots
            </div>

            <p></p>

            <div>
                <p></p>
                icon
            </div>

            <div>
                <p><span></span></p>
                <p></p>
            </div>

            <div>

            </div>
        </section>
    );
};
