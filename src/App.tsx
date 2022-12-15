import React, { useEffect } from 'react';
import { Layout } from "./layout";
import { TodayPage } from "./pages/today";
import { Route, Routes } from "react-router-dom";
import { DayPage } from "./pages/day";
import { useActions } from "./hooks";
import { stateMock } from "./mocks/WeatherResponseJson";

function App() {
    const { setWeather } = useActions();

    useEffect(() => {
        setWeather(stateMock);
    }, [setWeather]);

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
