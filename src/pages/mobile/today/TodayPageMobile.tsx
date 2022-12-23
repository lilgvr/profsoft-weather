import React, { FC, useEffect, useState } from 'react';
import styles from "./today-page.module.scss";
import { useAppSelector } from "../../../hooks";
import { splitFirst } from "../../../utils/service/StringService";
import { Carousel } from "../carousel";

export const TodayPageMobile: FC = () => {
    const { weather } = useAppSelector(state => state.weather);
    const [cityData, setCityData] = useState<string[]>();

    useEffect(() => {
        if (weather) {
            setCityData(() => splitFirst(weather.resolvedAddress, ','));
        }
    }, [weather]);

    return (
        <main className={ styles.todayPageCtrMobile }>
            {
                cityData &&
              <div className={ styles.cityDataCtr }>
                <h2>{ cityData[0] }</h2>
                <h3>{ cityData[1] }</h3>
              </div>
            }
            <Carousel/>
        </main>
    );
};
