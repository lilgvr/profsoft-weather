import React from "react";
import type { FC } from 'react';
import { Header } from "../components/header";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
    return (
        <>
            <Header/>

            <Outlet/>
        </>
    );
};

export { Layout };
