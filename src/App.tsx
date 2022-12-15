import React, { useEffect } from 'react';
import { Layout } from "./layout";
import { TodayPage } from "./pages/today";
import { Route, Routes } from "react-router-dom";
import { DayPage } from "./pages/day";
import { useActions, useAppSelector } from "./hooks";

function App() {
    const { weather, isPositionError } = useAppSelector(state => state.weather);
    const { setWeather } = useActions();

    useEffect(() => {
        console.log(weather)
        // setWeather(stateMock);
        if (weather && !isPositionError) {
            setWeather(weather);
        }
    }, [isPositionError, setWeather, weather]);

    return (
        <>
            <Routes>
                <Route path="/" element={ <Layout/> }>
                    <Route index element={ <TodayPage/> }/>
                    <Route path="day/:date" element={ <DayPage/> }/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
