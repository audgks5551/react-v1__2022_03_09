import React from 'react';

import { Nav } from "./_components";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { authAtom } from "_state";
import { useRecoilValue } from "recoil";
import { Signup } from "signup";
import { Login } from "login";
import { Home } from "home";
import {Post} from "./post";

function App() {
    const auth = useRecoilValue(authAtom);
    console.log("auth = " + auth);

    return (
        <div>
            <Router>
                <Nav />
                <div>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/post" element={<Post />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export { App };