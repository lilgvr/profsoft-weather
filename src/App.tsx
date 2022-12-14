import React from 'react';
import { Layout } from "./layout";
import { Dashboard } from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";

function App() {
    return (
        <>
            <Header/>
            <Layout>
                <Routes>
                    <Route path="/" element={ <Dashboard/> }/>
                </Routes>
            </Layout>
        </>
    );
}

export default App;
