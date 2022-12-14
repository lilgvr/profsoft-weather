import React from 'react';
import { Layout } from "./layout";
import { Dashboard } from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={ <Dashboard/> }/>
            </Routes>
        </Layout>
    );
}

export default App;
