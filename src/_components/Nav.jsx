import React from 'react';
import { NavLink } from "react-router-dom";

export { Nav };

function Nav() {
    return (
        <nav>
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">login</NavLink>
                <NavLink to="/signup">signup</NavLink>
            </div>
        </nav>
    );
}
