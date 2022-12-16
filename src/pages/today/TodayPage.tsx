import { FC, lazy, useEffect, useState } from "react";
import { TodayCtr } from "../../components/today/today-ctr";
import { DaysCtr } from "../../components/today/days-ctr";
import { useAppSelector } from "../../hooks";
import { splitFirst, splitLast } from "../../utils/service/StringService";
import { IDay } from "../../models";
import { getLocalizedDate } from "../../utils";
import styles from "./today-page.module.scss";
import { ErrorBlock } from "../../components/error-block";

const WeatherIcon = lazy(() => import('../../components/weather-icon/WeatherIcon'));
const Measure = lazy(() => import('../../components/measure/Measure'));
const DayCard = lazy(() => import('../../components/today/day-card/DayCard'));

const TodayPage: FC = () => {
    const { weather } = useAppSelector(state => state.weather);
    const { isError } = useAppSelector(state => state.geolocation);
    const [cityData, setCityData] = useState<string[]>();
    const [days, setDays] = useState<IDay[]>();

    useEffect(() => {
        if (weather) {
            setCityData(splitFirst(weather.resolvedAddress, ','));
            setDays(weather.days);
        }
    }, [weather]);

    return (
        <>
            {
                isError ?
                    <ErrorBlock message="Ошибка загрузки геолокации. Введите название города вручную."/> :
                    <main className={ styles.todayPageCtr }>
                        {
                            days && cityData &&
                          <>
                            <TodayCtr>
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
                                      { days[0].temp }
                                  </p>
                                  <p>
                                    Ощущается как
                                    <span>
                                      { days[0].feelslike }
                                    </span>
                                  </p>
                                </div>
                                <p>
                                    { getLocalizedDate(new Date(days[0].datetime)) }
                                </p>
                              </div>

                              <WeatherIcon
                                icon={ days[0].icon as string }
                                caption={ days[0].conditions as string }
                              />

                              <div className={ styles.measures }>
                                <Measure
                                  icon="humidity"
                                  title="Влажность"
                                  value={ `${ days[0].humidity }%` }
                                />
                                <Measure
                                  icon="sunrise"
                                  title="Восход"
                                  value={ splitLast(days[0].sunrise, ':')[0] }
                                />
                                <Measure
                                  icon="sunset"
                                  title="Закат"
                                  value={ splitLast(days[0].sunset, ':')[0] }
                                />
                              </div>
                            </TodayCtr>

                            <DaysCtr>
                                { days.map(
                                    day => <DayCard
                                        day={ day }
                                        key={ day.datetime }
                                    />) }
                            </DaysCtr>
                          </>
                        }
                    </main>
            }
        </>
    )
}

export { TodayPage }
