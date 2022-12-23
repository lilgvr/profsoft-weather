import React, { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { IDay } from "../../models";
import styles from "./day-page.module.scss";
import { getDirection, getLocalizedDate } from "../../utils";
import { splitFirst, splitLast } from "../../utils/service/StringService";
import WeatherIcon from "../../components/weather-icon/WeatherIcon";
import Measure from "../../components/measure/Measure";

export const DayPage: FC = () => {
    const { date } = useParams();
    const { weather } = useAppSelector(state => state.weather);
    const [currentDay, setCurrentDay] = useState<IDay>();
    const [cityData, setCityData] = useState<string[]>();

    const currentDayMemo = useMemo(() => {
        if (weather) {
            setCityData(() => splitFirst(weather.resolvedAddress, ','))
            return weather?.days.find(day => day.datetime === date);
        }
    }, [date, weather]);

    useEffect(() => {
        setCurrentDay(() => currentDayMemo)
    }, [currentDayMemo]);

    return (
        <main className={ styles.dayPageWrapper }>
            {
                currentDay && cityData &&
              <div className={ styles.dayPageCtr }>
                <div className={ styles.mainInfo }>
                  <div className={ styles.city }>
                    <h2>
                        { cityData[0] }
                    </h2>
                    <h3>
                        { cityData[1] }
                    </h3>
                  </div>
                  <div className={ styles.weather }>
                    <p>
                        { currentDay.temp }
                    </p>
                    <p>
                      Ощущается как <span>{ currentDay.feelslike }</span>
                    </p>
                  </div>
                  <p>
                      { getLocalizedDate(new Date(currentDay.datetime)) }
                  </p>
                </div>

                <WeatherIcon
                  icon={ currentDay.icon as string }
                  caption={ currentDay.conditions as string }
                />

                <div className={ styles.measures }>
                  <Measure
                    icon="humidity"
                    title="Влажность"
                    value={ `${ currentDay.humidity }%` }
                  />
                  <Measure
                    icon="sunrise"
                    title="Восход"
                    value={ splitLast(currentDay.sunrise, ':')[0] }
                  />
                  <Measure
                    icon="sunset"
                    title="Закат"
                    value={ splitLast(currentDay.sunset, ':')[0] }
                  />
                  <div className={ styles.additionalMeasures }>
                    <p>
                      Скорость ветра <span>{ currentDay.windspeed } м/с, { getDirection(currentDay.winddir) }</span>
                    </p>
                    <p>Атмосферное давление <span>{ currentDay.pressure }</span></p>
                  </div>
                </div>
              </div>
            }
        </main>
    );
};
