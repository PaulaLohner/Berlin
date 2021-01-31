import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Logo from "./logo";
import Menu from "./menu";
import InitialMap from "./initialMap";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div className="header">
                    <Logo />
                </div>
                <Menu />

                <Route
                    path="/"
                    render={() => <InitialMap className="initial-map" />}
                />
            </BrowserRouter>
        </div>
    );
};

export default App;
