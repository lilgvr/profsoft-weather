import { Route, Routes } from "react-router-dom";
import { Layout } from "../layout";
import { TodayPage } from "../pages/today";
import { DayPage } from "../pages/day";
import React from "react";
import Media from "react-media";
import { LayoutMobile } from "../layout/LayoutMobile.component";

export const Routing = () => {
    return (
        <Media queries={ {
            desktopOrLaptop: '(min-width: 1224px)',
            tabletOrMobile: '(max-width: 1224px)',
        } }>
            { matches => (
                <>
                    {
                        matches.desktopOrLaptop &&
                      <Routes>
                        <Route path="/" element={ <Layout/> }>
                          <Route index element={ <TodayPage/> }/>
                          <Route path="day/:date" element={ <DayPage/> }/>
                        </Route>
                      </Routes>
                    }
                    {
                        matches.tabletOrMobile &&
                      <Routes>
                        <Route path="/" element={ <LayoutMobile/> }>
                          <Route index element={ <></> }/>
                          <Route path="day/:date" element={ <DayPage/> }/>
                        </Route>
                      </Routes>
                    }
                </>
            ) }
        </Media>
    );
}
