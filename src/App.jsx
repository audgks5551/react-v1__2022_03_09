import React from 'react';

import { Nav } from "./_components";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { Signup } from "./signup";
import { Login } from "./login";
import { Home } from "./home";

function App() {
    return (
        <div>
            <Router>
                <Nav />
                <div>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export { App };