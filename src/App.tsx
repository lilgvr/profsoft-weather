import React from 'react';
import { Layout } from "./layout";
import { TodayPage } from "./pages/today";
import { Route, Routes } from "react-router-dom";
import { DayPage } from "./pages/day";

function App() {
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
