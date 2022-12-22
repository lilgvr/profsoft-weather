import React, { FC } from 'react';
import { HeaderMobile } from "../components/mobile/header";
import { Outlet } from "react-router-dom";

export const LayoutMobile: FC = () => {
    return (
        <>
            <HeaderMobile/>

            <Outlet/>
        </>
    );
};
