import React from 'react';
import { NavLink } from "react-router-dom";

export { Nav };

function Nav() {
    return (
        <nav>
            <div>
                <NavLink exact to="/">Home</NavLink>
                <NavLink exact to="/login">login</NavLink>
                <NavLink exact to="/signup">signup</NavLink>
            </div>
        </nav>
    );
}
