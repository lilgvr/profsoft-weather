import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={ store }>
        <PersistGate persistor={ persistor } loading={ null }>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
